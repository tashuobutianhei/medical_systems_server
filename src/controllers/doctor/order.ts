
import {
  insert,
  destroy,
  findOneByKey,
  update,
} from '../../models/order';
import {
  insert as insertCase,
  update as updateCase,
} from '../../models/patientCase';
import {
  findAllByKey as findAllregister,
  insert as insertRegister,
} from '../../models/register';

import randomString from 'random-string';


type addOrderParams = {
  workerId: string
  wokrId: number | string
}

export const addOrder = async (params: addOrderParams) => {
  const {wokrId, workerId} = params;

  const result = await insert({
    workerId,
    wokrId,
  });
  return result;
};


export const deleteOrder = async (params: addOrderParams) => {
  try {
    return await destroy(params);
  } catch (e) {
    return false;
  }
};


export const findOrder = async (ctx: any) => {
  try {
    if (Object.keys(ctx.query).length === 0) {
      return ctx.body = {
        code: -2,
        message: '参数有错误',
      };
    }
    const params = ctx.query;
    const orderRes = await findOneByKey(params, []);

    const resgisterList = await findAllregister({
      id: orderRes.id,
    });

    const dataResult = {
      ...orderRes,
      patientCases: resgisterList,
    };

    ctx.body = {
      code: dataResult ? 0 : -1,
      data: dataResult,
    };
  } catch (e) {
    console.log(e);
    ctx.body = {
      code: -1,
    };
    return false;
  }
};

export const Order = async (ctx: any) => {
  try {
    const params = ctx.request.body;
    if (ctx.state.user.userType !== 1) {
      ctx.body = {
        code: 402,
        message: '用户身份错误',
      };
    }

    // 找到医生挂号信息
    const findRes = await findOneByKey(params, []);
    if (!findRes) {
      throw new Error('查找失败');
    }

    // 挂号对应关系
    const requestList = await findAllregister({
      id: findRes.id,
    });

    if (!(findRes.limit === null || requestList.length < findRes.limit)) {
      return ctx.body = {
        code: -2,
        message: '挂号已满',
      };
    }

    const uid = ctx.state.user._uid;
    const caseId = randomString({length: 12, numbers: true});

    // 生成病例
    const insertRes = await insertCase({
      uid,
      caseId,
      registerDate: new Date(),
      doctorId: params.workerId,
      describe: '',
      doctorView: '',
      result: '',
    });

    if (!insertRes) {
      throw new Error('');
    }

    const res = await insertRegister({
      id: findRes.id,
      caseId: caseId,
    });

    ctx.body = {
      code: res ? 0 : -1,
      data: {caseId},
    };
  } catch (e) {
    ctx.body = {
      code: -1,
      data: e,
    };
  }
};

export const orderInfo = async (ctx: any) => {
  const params = ctx.request.body;

  try {
    const {time, status, todo, medicine, attention, hospital, result = undefined} = params;

    let describe = '';
    describe += Boolean(time != 'undefined') ? `患者于[${time}]开始发病，`: '';
    describe += Boolean(status != 'undefined')? `症状表现为[${status}],` : '';
    describe += Boolean(todo != 'undefined') ? `个人经历有[${todo}],` : '';
    describe += Boolean(medicine != 'undefined') ? `曾服用药物[${medicine}],` : '';
    describe += Boolean(attention != 'undefined') ?`注意事项有[${attention}]。` : '';

    if (hospital) {
      describe += `曾就医，诊断结果为${Boolean(attention != 'undefined') ? result : '无描述'}`;
    }

    const res = await updateCase({
      describe,
    }, {
      caseId: params.caseId,
    });

    ctx.body = {
      code: res ? 0 : 1,
    };
  } catch (e) {
    ctx.body = {
      code: -1,
      message: '服务错误',
      date: e,
    };
  }
};
