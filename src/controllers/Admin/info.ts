import {
  findAllByKey
} from '../../models/commonInfo';

const getCommonInfoMethod = async () => {
  try {
    const info = await findAllByKey({});
    return info;
  } catch (e) {
    throw new Error(e);
  }
};

export const getCommonInfo = async (ctx: any) => {
  try {
    const info = await getCommonInfoMethod();
    ctx.body = {
      code: 0,
      data: info[0],
    };
  } catch (e) {
    ctx.body = {
      code: -1,
      error: e,
    };
  }
};
