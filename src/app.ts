import Koa from 'koa';

import views from 'koa-views';
import json from 'koa-json';
// import bodyparser from 'koa-bodyparser';
import logger from 'koa-logger';
import cors from 'koa2-cors';
import koajwt from 'koa-jwt';
import jwt from 'jsonwebtoken';
import path from 'path';
// import koaBody from 'koa-body';

// route路由
import index from './routes/index';

import {connectMysql} from './models/index';
import {tokenKey} from './config';

const app = new Koa();
const koaBody = require('koa-body');

// 中间件
app.use(koaBody({
  multipart: true, // 允许上传多个文件
  strict: false,
}));
app.use(json());
app.use(logger());
// console.log(path.resolve(__dirname, '../public'));
app.use(require('koa-static')(path.resolve(__dirname, '../public')));
app.use(views(__dirname + '/views', {
  extension: 'pug',
}));
app.use(cors({
  origin: function(ctx) {
    if (ctx.url === '/test') {
      return '*';
    }
    return 'http://localhost:3001'; // 运行的域名
  },
  exposeHeaders: ['WWW-Authenticate', 'Server-Authorization'],
  maxAge: 5,
  credentials: true,
  allowMethods: ['GET', 'POST', 'DELETE', 'DELETE', 'OPTIONS', 'PUT'],
  allowHeaders: ['Content-Type', 'Authorization', 'Accept'],
}));

// 错误处理
app.use(async (ctx, next: any) => {
  return await next().catch(async (err: any) => {
    if (err.status === 401) {
      ctx.status = 401;
      ctx.body = 'Protected resource, use Authorization header to get access\n';
    } else {
      throw err;
    }
  });
});

app.use(koajwt({
  secret: tokenKey,
}).unless({ // 未登陆可访问
  path: [
    // /\/*/,
    /\/users\/login/,
    /\/users\/register/,
    /\/users\/getUser/,
    /\/department/, // 查看科室信息
    /\/doctor/, // 查看医生信息
    /\/patientCase\/all/,
    /\/schedule\/today/,
    /\/schedule\/getScheduleOfPeriod/,
    /\/admin\/department/,
  ],
}));

app.use(async (ctx, next) => {
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
});

// logger
app.use(async (ctx, next) => {
  connectMysql();
  await next();
  console.log('enter server');
  console.log(`${ctx.method} ${ctx.url}`);
});

// routes
app.use(index.routes()).use(index.allowedMethods());

// error-handling
app.on('error', (err, ctx) => {
  console.error('server error', err, ctx);
});

module.exports = app;
