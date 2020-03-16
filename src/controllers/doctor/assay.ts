import {findAllByKey} from '../../models/assay';


export const getAssayById = async (ctx:any) => {
  try {
    const params = ctx.query;
    if (!(params.assayIds)) {
      return ctx.body = {
        code: -2,
        message: '参数有错误',
      };
    }

    const ResPromise = params.assayIds.split(',').map(async (item: any) => {

      const assayItem = await findAllByKey({
        assayId: item,
      });
      if (assayItem) {
        return assayItem[0];
      } else {
        throw new Error('');
      }
    });

    const assayList = await Promise.all(ResPromise);
    ctx.body = {
      code: assayList.length ? 0 : -1,
      data: assayList,
    };
  } catch (e) {
    return ctx.body = {
      code: -3,
      message: '服务错误',
    };
  }
};
