
import {
  findAllByKey,
  findOneByKey,
  update as updatePatientCase,
} from '../../models/patientCase';
import {
  findOneByKey as findPatient,
} from '../../models/patient';
import {
  insert as insertAssay,
  findOneByKey as findOneAssay,
} from '../../models/assay';
import {
  insert as insertHos,
  findOneByKey as findOneHos,
} from '../../models/hospitalizationInfoList';
import randomString from 'random-string';


export const getPatientCase = async (ctx: any) => {
  if (Object.keys(ctx.query).length === 0) {
    return ctx.body = {
      code: -2,
      message: '参数有错误',
    };
  }
  try {
    const params = ctx.query;
    let resList:any[] = [];
    const res = await findAllByKey({
      docterId: params.workerId,
    });
    if (res.length > 0) {
      const resMap = res.map(async (item: any, index: number, array: any[]) => {
        const patient = await findPatient('uid', item.uid,
            ['username', 'uid', 'name', 'idcard', 'sex', 'age', 'tel', 'address']);
        if (patient) {
          return {
            ...item,
            'patientInfo': patient,
          };
        } else {
          throw new Error('not find patient');
        }
      });
      resList = await Promise.all(resMap);
    }


    const resCasesPromise = resList.map(async (item: any) => {
      // 存在住院记录id的情况下
      if (item.HospitalizationId != '-1' &&
       item.HospitalizationId != '0' &&
      item.HospitalizationId.length > 1) {
        const hosfindPromise = item.HospitalizationId.split(',').map(async (itemHosId : string) => {
          const hosRes = await findOneHos({
            'HospitalizationId': itemHosId,
          }, []);
          if (hosRes) {
            return hosRes;
          } else {
            throw new Error('医院记录查找失败');
          }
        });

        const hostList = await Promise.all(hosfindPromise);

        // 获取检查list
        const hostListresult = await Promise.all(hostList.map(async (itemHos: any) => {
          if (itemHos.assayId.length > 0) {
            return {
              ...itemHos,
              assayList: await Promise.all(itemHos.assayId.split(',').map(async (assayId: any) => {
                const assay = await findOneAssay({
                  assayId,
                });
                if (assay) {
                  return assay;
                } else {
                  throw new Error('查找化验记录失败');
                }
              })),
            };
          }
          return {
            ...itemHos,
            assayList: [],
          };
        }));

        return {
          ...item,
          hostList: hostListresult,
        };
      } else {
        return item;
      }
    });

    const resCases = await Promise.all(resCasesPromise);

    ctx.body = {
      code: resCases ? 0 : -1,
      data: resCases,
    };
  } catch (e) {
    ctx.body = {
      code: -1,
      data: e,
    };
  }
};

export const setPatientCaseModeDoctor = async (ctx: any) => {
  try {
    if (Object.keys(ctx.request.body).length < 0) {
      return ctx.body = {
        code: -2,
        message: '参数有错误',
      };
    }
    const params = ctx.request.body;
    const assay = JSON.parse(params.assay);
    const {docterView = undefined, result = undefined, medicine = undefined, Hospitalization = false, caseId} = params;
    const assayMap = assay.map(async (item: { examinationId: any; examinationResult: any; }) => {
      const res = await insertAssay({
        'caseId': caseId,
        'assayName': item.examinationId,
        'assayResult': item.examinationResult,
        'assayDate': new Date(),
      });
      if (res) {
        return res;
      } else {
        throw new Error('insert error');
      }
    });
    const assayMapRes = await Promise.all(assayMap);

    if (!assayMapRes) {
      throw new Error('insert error');
    }
    const assayId = assayMapRes.map((item: any) => item.assayId).join(',');

    const updateRes = await updatePatientCase({
      docterView,
      result,
      medicine,
      assayId,
      HospitalizationId: Hospitalization ? 0 : -1,
      status: Hospitalization ? 2 : 1, // 诊断完成
    }, {
      'caseId': caseId,
    });
    ctx.body = {
      code: updateRes ? 0 : -1,
      message: '更新成功',
    };
  } catch (e) {
    ctx.body = {
      code: -1,
      message: '服务错误',
    };
  }
};

// 增加检查记录并返回id
const insertAssayAndGetId = async (assay: any[], caseId: any) => {
  const assayMap = assay.map(async (item: { examinationId: any; examinationResult: any; }) => {
    const res = await insertAssay({
      'caseId': caseId,
      'assayName': item.examinationId,
      'assayResult': item.examinationResult,
      'assayDate': new Date(),
    });
    if (res) {
      return res;
    } else {
      throw new Error('insert error');
    }
  });
  const assayMapRes = await Promise.all(assayMap);

  if (!assayMapRes) {
    throw new Error('insert error');
  }
  return assayMapRes.map((item: any) => item.assayId).join(',');
};


export const setPatientCaseModeHos = async (ctx: any) => {
  try {
    if (Object.keys(ctx.request.body).length < 0) {
      return ctx.body = {
        code: -2,
        message: '参数有错误',
      };
    }

    const params = ctx.request.body;
    const hospitalList = JSON.parse(params.hospitalList);
    const {caseId} = params;

    // 创建检查记录
    const assayPromise = hospitalList.map(async (item:any) => {
      if (item.assays.length > 0 && item.assays[0].examinationId !== null) {
        return {
          HospitalizationId: item.HospitalizationId,
          assayId: await insertAssayAndGetId(item.assays, caseId),
        };
      };
      return {};
    });

    const assayList = await Promise.all(assayPromise);

    // 创建住院记录，将检查记录对应
    const hosPromise = hospitalList.map(async (item: any) => {
      const mid: any = assayList.find((assay: any) => {
        return assay.HospitalizationId === item.HospitalizationId;
      }) || {assayId: ''};
      mid.assayId;

      const res = await insertHos({
        HospitalizationId: randomString({length: 12, numbers: true}),
        caseId,
        assayId: mid.assayId,
        patientStatus: item.patientStatus || '',
        medicine: item.medicine || '',
        TreatmentRecord: item.TreatmentRecord || '',
        recovery: item.recovery || '',
        date: new Date(),
      });
      if (res) {
        return res;
      } else {
        throw new Error('insert error');
      }
    });

    const hosRes = await Promise.all(hosPromise);

    if (!hosRes) {
      throw new Error('insert error');
    }

    // 病例更新
    const Hospitalization = hosRes.map((item: any) => item.HospitalizationId);

    const updateItem = await findOneByKey({
      caseId: caseId,
    }, []);

    const updateHospitalizationId =
      updateItem.HospitalizationId == 0 ?
      Hospitalization.join(',') :
      [...updateItem.HospitalizationId.split(','), ...Hospitalization];

    const status = hospitalList.some((item : any) => {
      return item.recovery == '1';
    });

    const updateRes = await updatePatientCase({
      HospitalizationId: updateHospitalizationId,
      status: status ? 3 : 2, // 出院与否
    }, {
      'caseId': caseId,
    });

    ctx.body = {
      code: updateRes ? 0 : -1,
      data: updateRes,
    };
  } catch (e) {
    ctx.body = {
      code: -1,
      message: '服务错误',
      data: e,
    };
  }
};
