import {inset} from '../models/department';

export const addDepartment = async (ctx: any, next: any) => {
  try {
    const departmentInfo = ctx.request.body;

    if (!departmentInfo.departmentName || !departmentInfo.information) {
      return ctx.body = {
        code: -2,
        message: '参数有错误',
      };
    }
    const result = await inset(departmentInfo);
    ctx.body = {
      code: result ? 0 : 1,
      message: result ? '添加成功' : '添加失败',
    };
  } catch (e) {
    ctx.body = {
      code: -3,
      message: '服务错误',
    };
  }
};
