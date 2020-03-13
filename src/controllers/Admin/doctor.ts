
import randomString from 'random-string';
import {
  insert as insertDoctor,
  update as updateDoctor
} from '../../models/docter';
import {encode} from '../../utils/bcrypt';

export const addDocter= async (ctx: any, next: any) => {
  try {
    const docterInfo = ctx.request.body;
    if (!(typeof docterInfo === 'object' && Object.keys(docterInfo).length > 0)) {
      return ctx.body = {
        code: -2,
        message: '参数有错误',
      };
    }
    docterInfo.workerId = randomString({length: 12, numbers: true});
    docterInfo.password = encode(randomString({length: 6, numbers: true}));
    const result = await insertDoctor(docterInfo);
    return ctx.body = {
      code: result ? 0 : 1,
      message: result ? '添加成功' : '添加失败',
    };
  } catch (e) {
    return ctx.body = {
      code: -3,
      message: '服务错误',
    };
  }
};

export const outDoctor = async (ctx: any, next: any) => {
  try {
    const docterInfo = ctx.request.body;
    if (!docterInfo.workerId) {
      return ctx.body = {
        code: -2,
        message: '参数有错误',
      };
    }
    const res = await updateDoctor({
      status: -1,
    }, {
      workerId: docterInfo.workerId,
    });

    return ctx.body = {
      code: res ? 0 : 1,
      message: res ? '删除' : '删除失败',
    };
  } catch (e) {
    return ctx.body = {
      code: -3,
      message: '服务错误',
    };
  }
};


