
import {
  findAllByKey,
  update as updatePatientCase,
} from '../../models/patientCase';
import {
  findOneByKey as findPatient,
} from '../../models/patient';
import {
  insert as insertAssay,
} from '../../models/assay';

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
    ctx.body = {
      code: resList ? 0 : -1,
      data: resList,
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

    const assayId = assay.map((item: any) => item.assayId).join(',');

    const updateRes = await updatePatientCase({
      docterView,
      result,
      medicine,
      assayId,
      HospitalizationId: Hospitalization ? 1 : 0,
      status: 1, // 诊断完成
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
