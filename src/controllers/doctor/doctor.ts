import {findAllByKey} from '../../models/doctor';

export const getDoctors = async (ctx:any, next: any) => {
  try {
    // if (Object.keys(ctx.query).length === 0) {
    //   return ctx.body = {
    //     code: -2,
    //     message: '参数有错误',
    //   };
    // }
    const params = ctx.query;
    const doctors = await findAllByKey({
      ...params,
    });
    ctx.body = {
      code: doctors.length ? 0 : -1,
      data: doctors,
    };
  } catch (e) {
    ctx.state.nextInfo = {
      type: -1,
      error: e,
    };
    await next();
  }
};
