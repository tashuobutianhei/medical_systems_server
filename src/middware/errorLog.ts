import {logger} from '../logger';

export const logError = async (ctx: any, next: any) => {
  try {
    const {nextInfo} = ctx.state;
    const url = `${ctx.request.method}--${ctx.request.url}`;
    if (nextInfo) {
      if (nextInfo.type === -1) {
        // 错误处理

        logger.error({
          ctx: url,
          error: nextInfo.error,
        });
        ctx.body = {
          code: -1,
          message: '服务错误',
          error: nextInfo.error,
        };
      }
    }
    return await next();
  } catch (e) {
    logger.error({
      ctx,
      error: e,
    });
    ctx.body = {
      code: -1,
      message: '服务错误',
      error: e,
    };
    return await next();
  }
};
