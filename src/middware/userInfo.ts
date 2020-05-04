
import jwt from 'jsonwebtoken';
import {tokenKey} from '../config';


export default async (ctx: any, next: any) => {
  const token = ctx.header.authorization;
  if (!token) {
    ctx.state.userInfo = {};
    return await next();
  }
  await jwt.verify(token.split(' ')[1], tokenKey,
      async (err: any, info: any)=> {
        if (err) {
          ctx.body = {
            code: 1,
            message: '服务错误',
          };
        } else {
          ctx.state.userInfo = info;
        }
      });
  await next();
};
