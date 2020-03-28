

import {
  findAllByKey,
} from '../models/examination';

export const getExaminationMethod = async () => {
  return await findAllByKey({});
};

export const getExamination = async (ctx: any) => {
  try {
    const res = await findAllByKey({});
    ctx.body = {
      code: 0,
      data: res,
    };
  } catch (e) {
    ctx.body = {
      code: -1,
      data: e,
    };
  }
};
