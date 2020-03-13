import {
  inset as insertDepartment,
  findAllByKey as findAllByKeyDerpartment} from '../../models/department';
import {insert} from '../../models/manager';
import randomString from 'random-string';
import {
  findAllByKey as findAllDoctors,
  insert as insertDoctor
} from '../../models/docter';

export const getDepartmentExpendDoctor = async (ctx: any) => {
  try {
    const departmentList = await findAllByKeyDerpartment({});

    const DepartmentExpendDoctor = await Promise.all(
        departmentList.map(async (item: any) => {
          const doctors = await findAllDoctors({
            departmentId: item.departmentId,
          });
          return {
            ...item,
            doctorList: doctors,
          };
        }),
    );

    ctx.body = {
      code: DepartmentExpendDoctor ? 0 : -1,
      data: DepartmentExpendDoctor,
    };
  } catch (e) {
    ctx.body = {
      code: -3,
      message: '服务错误',
    };
  }
};

export const addDepartment = async (ctx: any, next: any) => {
  try {
    const departmentInfo = ctx.request.body;

    if (!departmentInfo.departmentName || !departmentInfo.information) {
      return ctx.body = {
        code: -2,
        message: '参数有错误',
      };
    }
    const result = await insertDepartment(departmentInfo);
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

export const addAdmin= async (ctx: any, next: any) => {
  try {
    const adminInfo = ctx.request.body;

    if (!adminInfo.username || !adminInfo.password) {
      return ctx.body = {
        code: -2,
        message: '参数有错误',
      };
    }
    adminInfo.uid = randomString({length: 12, numbers: true});

    const result = await insert(adminInfo);
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

