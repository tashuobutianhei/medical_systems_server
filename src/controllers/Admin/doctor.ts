
import randomString from 'random-string';
import {
  insert as insertDoctor,
  update as updateDoctor
} from '../../models/doctor';
import {encode} from '../../utils/bcrypt';

export const addDoctor= async (ctx: any, next: any) => {
  try {
    const doctorInfo = ctx.request.body;
    if (!(typeof doctorInfo === 'object' && Object.keys(doctorInfo).length > 0)) {
      return ctx.body = {
        code: -2,
        message: '参数有错误',
      };
    }
    doctorInfo.workerId = randomString({length: 12, numbers: true});
    const password = randomString({length: 6, numbers: true});
    doctorInfo.password = encode(password);
    const result = await insertDoctor(doctorInfo);
    await next();
    return ctx.body = {
      code: result ? 0 : 1,
      data: password,
      message: result ? '添加成功' : '添加失败',
    };
  } catch (e) {
    ctx.state.nextInfo = {
      type: -1,
      error: e,
    };
    await next();
  }
};

export const outDoctor = async (ctx: any, next: any) => {
  try {
    const doctorInfo = ctx.request.body;
    if (!doctorInfo.workerId) {
      return ctx.body = {
        code: -2,
        message: '参数有错误',
      };
    }
    const res = await updateDoctor({
      status: -1,
    }, {
      workerId: doctorInfo.workerId,
    });

    await next();
    return ctx.body = {
      code: res ? 0 : 1,
      message: res ? '删除' : '删除失败',
    };
  } catch (e) {
    ctx.state.nextInfo = {
      type: -1,
      error: e,
    };
    await next();
  }
};


