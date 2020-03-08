
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
    const res = await findOneByKey(params, []);
    ctx.body = {
      code: res ? 0 : -1,
      data: res,
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

    const findRes = await findOneByKey(params, []);
    if (!findRes) {
      throw new Error('查找失败');
    }

    if (!(findRes.limit === null || findRes.patientCases.split(',').length < findRes.limit)) {
      return ctx.body = {
        code: -2,
        message: '挂号已满',
      };
    }

    const uid = ctx.state.user.uid;
    const caseId = randomString({length: 12, numbers: true});

    const insertRes = await insertCase({
      uid,
      caseId,
      registerDate: new Date(),
      docterId: params.workerId,
      describe: '',
      docterView: '',
      result: '',
    });

    if (!insertRes) {
      throw new Error('');
    }

    // 拼接
    const newCases = findRes.patientCases === null || findRes.patientCases === '' ?
      caseId : findRes.patientCases + `,${caseId}`;

    const res = await update({
      patientCases: newCases,
    }, {
      ...params,
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
