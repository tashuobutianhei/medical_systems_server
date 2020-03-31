

import {
  findAllByKey,
  inset,
  destroy
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

export const addExamination = async (ctx: any, next: any) => {
  try {
    const body = ctx.request.body;
    console.log(body);
    const res = await inset(body);
    ctx.body = {
      code: res ? 0: -1,
      data: res,
    };
    await next();
  } catch (e) {
    ctx.body = {
      code: -1,
      data: e,
    };
  }
};

export const deleteExamination = async (ctx: any, next: any) => {
  try {
    const body = ctx.request.body;
    const res = await destroy({
      examinationId: body.examinationId,
    });
    ctx.body = {
      code: res ? 0: -1,
      data: res,
    };
    await next();
  } catch (e) {
    ctx.body = {
      code: -1,
      data: e,
    };
  }
};