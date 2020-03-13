
import randomString from 'random-string';
import {
  insert as insertDoctor,
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
    docterInfo.password = encode(docterInfo.password);
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

