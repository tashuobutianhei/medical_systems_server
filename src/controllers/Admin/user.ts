import {
  findAllByKey,
} from '../../models/patient';

export const findAllPatient = async (ctx:any) => {
  try {
    const query = ctx.query;
    let params = {
      userInfo: {},
      offset: 0,
      limit: 20,
    };
    if (query.page && query.size) {
      params.offset = (query.page - 1) * query.size;
      params.limit = query.size - 0;
    };
    if (query.userInfo) {
      params.userInfo = JSON.parse(query.userInfo);
    }
    const userList = await findAllByKey(params);
    ctx.body = {
      code: 0,
      data: userList,
    };
  } catch (e) {
    ctx.status = 500;
    ctx.body = {
      code: 500,
      message: e,
    };
  }
};
