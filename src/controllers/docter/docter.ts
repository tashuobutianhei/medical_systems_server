import {findAllByKey} from '../../models/docter';

export const getDoctors = async (ctx:any) => {
  try {
    if (Object.keys(ctx.query).length === 0) {
      return ctx.body = {
        code: -2,
        message: '参数有错误',
      };
    }
    const params = ctx.query;
    const doctors = await findAllByKey({
      ...params,
    });
    ctx.body = {
      code: doctors.length ? 0 : -1,
      data: doctors,
    };
  } catch (e) {
    return ctx.body = {
      code: -3,
      message: '服务错误',
    };
  }
};
