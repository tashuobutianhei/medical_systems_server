import {
  insert as insertArticle,
  update as updateArticle,
  destroy as deleteArticle,
  findAllByKey as findArticle,
} from '../../models/article';

export const findOfArticleMehtod = async () => {
  try {
    const val = await findArticle({});
    return val;
  } catch (e) {
    throw new Error(e);
  };
};

export const findOfArticle = async (ctx:any) => {
  try {
    const val = await findOfArticleMehtod();

    ctx.body = {
      code: 0,
      data: val,
    };
  } catch (e) {
    ctx.body = {
      code: -1,
      error: e,
    };
  }
};


export const insertOfArticle = async (ctx: any, next: any) => {
  try {
    const body = ctx.request.body;
    const {value, title, type} = body;
    const val = await insertArticle({
      value,
      title,
      type: parseInt(type),
      update: new Date(),
    });

    ctx.body = {
      code: 0,
      data: val,
    };
    await next();
  } catch (e) {
    ctx.body = {
      code: -1,
      error: e,
    };
  }
};

export const updateOfArticle = async (ctx: any, next: any) => {
  try {
    const body = ctx.request.body;
    const {value, title, textId} = body;
    const val = await updateArticle({
      value,
      title,
      update: new Date(),
    }, {
      textId,
    });

    ctx.body = {
      code: 0,
      data: val,
    };
    await next();
  } catch (e) {
    ctx.body = {
      code: -1,
      error: e,
    };
  }
};

export const deleteOfArticle = async (ctx: any, next: any) => {
  try {
    const body = ctx.request.body;
    const {textId} = body;
    const val = await deleteArticle({
      textId,
    });

    ctx.body = {
      code: 0,
      data: val,
    };
    await next();
  } catch (e) {
    ctx.body = {
      code: -1,
      error: e,
    };
  }
};

