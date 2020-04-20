import {findAllByKey} from '../models/department';

// export const addDepartment = async (ctx: any, next: any) => {
//   try {
//     const departmentInfo = ctx.request.body;

//     if (!departmentInfo.departmentName || !departmentInfo.information) {
//       return ctx.body = {
//         code: -2,
//         message: '参数有错误',
//       };
//     }
//     const result = await inset(departmentInfo);
//     ctx.body = {
//       code: result ? 0 : 1,
//       message: result ? '添加成功' : '添加失败',
//     };
//   } catch (e) {
//     ctx.body = {
//       code: -3,
//       message: '服务错误',
//     };
//   }
// };


// export const addAdmin= async (ctx: any, next: any) => {
//   try {
//     const adminInfo = ctx.request.body;

//     if (!adminInfo.username || !adminInfo.password) {
//       return ctx.body = {
//         code: -2,
//         message: '参数有错误',
//       };
//     }
//     adminInfo.uid = randomString({length: 12, numbers: true});

//     const result = await insert(adminInfo);
//     ctx.body = {
//       code: result ? 0 : 1,
//       message: result ? '添加成功' : '添加失败',
//     };
//   } catch (e) {
//     ctx.body = {
//       code: -3,
//       message: '服务错误',
//     };
//   }
// };

export const getDepartment = async (ctx: any, next: any) => {
  try {
    const params = ctx.query;

    const department = await findAllByKey(params || {});
    ctx.body = {
      code: department.length ? 0 : -1,
      data: department,
    };
  } catch (e) {
    ctx.state.nextInfo = {
      type: -1,
      error: e,
    };
    await next();
  }
};
