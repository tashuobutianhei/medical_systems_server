import {
  insert as inserWork,
  findOneByKey,
  findAllByKey,
  update,
} from '../../models/doctorWork';
import {addOrder, deleteOrder} from './order';
import moment from 'moment';


const getScheduleDateList = () => {
  const ScheduleDateList = [];
  const step = 86400000;
  for (let i = 0; i < 6; i++) {
    const itemDate = new Date(Date.now() + i * step);
    ScheduleDateList.push(moment(itemDate).format('YYYY-MM-DD'));
  }
  return ScheduleDateList;
};

const transFormwokrId = (date: string, departmentId: string, shifts: number) => {
  const id = departmentId.length > 1 ? departmentId : '0' + departmentId;
  return date.split('-').join('') + id + shifts;
};

export const createWorkList = async (ctx: any, next: any) => {
  if (Object.keys(ctx.query).length === 0) {
    return ctx.body = {
      code: -2,
      message: '参数有错误',
    };
  }
  const departmentId = ctx.query.departmentId;

  getScheduleDateList().forEach(async (date) => {
    const DoctorWork = await findOneByKey('data', `${date}T00:00:00.000Z`, ['wokrId']);
    if (DoctorWork) {

    } else {
      [0, 1, 2].forEach(async (item) => {
        const result = inserWork({
          wokrId: transFormwokrId(date, departmentId, item),
          departmentId: departmentId - 0,
          data: date,
          shifts: item,
        });
        if (!result) {
          return ctx.body = {
            code: -1,
            message: '服务错误',
          };
        }
      });
    };
  });

  ctx.body = {
    code: 1,
    message: 'success',
  };
};

export const deleteSchedule = async (ctx: any, next: any) => {
  try {
    if (Object.keys(ctx.request.body).length < 0) {
      return ctx.body = {
        code: -2,
        message: '参数有错误',
      };
    }
    const params = ctx.request.body;
    const findResult = await findOneByKey('wokrId', params.wokrId, ['wokrId', 'doctors']);
    if (!findResult) {
      throw new Error('查找失败');
    }
    if (findResult.doctors === null) {
      throw new Error('无法删除');
    }
    const midArray = findResult.doctors.split(',');
    midArray.splice(midArray.indexOf(params.workerId), 1);

    const res = update({
      doctors: midArray.length > 0 ? midArray.join(',') : null,
      editer: ctx.state.userInfo._uid,
    }, {
      wokrId: params.wokrId,
    });

    //  同时更新挂号表
    const deleteRes = await deleteOrder({
      wokrId: params.wokrId,
      workerId: params.workerId,
    });

    ctx.body = {
      code: res && deleteRes ? 0 : -1,
      data: res && deleteRes ? '更新成功' : '更新失败',
    };
  } catch (e) {
    ctx.state.nextInfo = {
      type: -1,
      error: e,
    };
    await next();
  }
};

export const addSchedule = async (ctx: any, next: any) => {
  try {
    if (Object.keys(ctx.request.body).length < 0) {
      return ctx.body = {
        code: -2,
        message: '参数有错误',
      };
    }
    const params = ctx.request.body;
    const findResult = await findOneByKey('wokrId', params.wokrId, ['wokrId', 'doctors']);
    if (!findResult) {
      throw new Error('查找失败');
    }
    // 拼接
    const newDoctors = findResult.doctors === null || findResult.doctors === '' ?
     params.workerId : findResult.doctors + `,${params.workerId}`;
    const res = update({
      doctors: Array.from(new Set(newDoctors.split(','))).join(','),
      editer: ctx.state.userInfo._uid,
    }, {
      wokrId: params.wokrId,
    });

    //  同时更新挂号表
    const addOrderRes = await addOrder({
      wokrId: params.wokrId,
      workerId: params.workerId,
    });

    ctx.body = {
      code: res && addOrderRes ? 0 : -1,
      data: res && addOrderRes ? '更新成功' : '更新失败',
    };
  } catch (e) {
    ctx.state.nextInfo = {
      type: -1,
      error: e,
    };
    await next();
  }
};


// 查询某天的排班
export const getSchedule = async (ctx: any, next: any) => {
  try {
    if (Object.keys(ctx.query).length === 0) {
      return ctx.body = {
        code: -2,
        message: '参数有错误',
      };
    }
    const departmentId = ctx.query.departmentId;
    const date = moment(ctx.query.date).format('YYYY-MM-DD');
    const schdelue = await findAllByKey({
      departmentId,
      data: `${date}T00:00:00.000Z`,
    });
    ctx.body = {
      code: schdelue.length ? 0 : -1,
      data: schdelue,
    };
  } catch (e) {
    ctx.state.nextInfo = {
      type: -1,
      error: e,
    };
    await next();
  }
};

// 查询排班周期中的排班
export const getScheduleOfPeriod = async (ctx: any, next: any) => {
  try {
    if (Object.keys(ctx.query).length === 0) {
      return ctx.body = {
        code: -2,
        message: '参数有错误',
      };
    }
    const departmentId = ctx.query.departmentId;

    const listPromise = getScheduleDateList().map(async (date: any) => {
      const schdelue = await findAllByKey({
        departmentId,
        data: `${date}T00:00:00.000Z`,
      });
      if (schdelue) {
        return schdelue;
      } else {
        throw new Error('');
      }
    });
    const schdelueLists = await Promise.all(listPromise);
    ctx.body = {
      code: 0,
      data: schdelueLists,
    };
  } catch (e) {
    ctx.state.nextInfo = {
      type: -1,
      error: e,
    };
    await next();
  }
};

export const getScheduleToday = async (ctx: any, next: any) => {
  try {
    const schdelue = await findAllByKey({
      data: `${moment(new Date()).format('YYYY-MM-DD')}T00:00:00.000Z`,
    });

    ctx.body = {
      code: schdelue ? 0 : -1,
      data: schdelue,
    };
  } catch (e) {
    ctx.state.nextInfo = {
      type: -1,
      error: e,
    };
    await next();
  }
};

