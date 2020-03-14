import Koa from 'koa';
const app = new Koa();

import views from 'koa-views';
import json from 'koa-json';
// import bodyparser from 'koa-bodyparser';
import logger from 'koa-logger';
import cors from 'koa2-cors';
import koajwt from 'koa-jwt';
// import koaBody from 'koa-body';

import index from './routes/index';
import users from './routes/users';
import department from './routes/department';
import doctor from './routes/doctor';
import schedule from './routes/schedule';
import order from './routes/order';
import patientCase from './routes/patientCase';
import admin from './routes/admin';


import {connectMysql} from './models/index';
import {tokenKey} from './config';

const koaBody = require('koa-body');

// middlewares
// app.use(bodyparser({
//   enableTypes: ['json', 'form', 'text'],
// }));
app.use(koaBody({
  multipart: true, // 允许上传多个文件
  strict: false,
}));
app.use(json());
app.use(logger());
app.use(require('koa-static')(__dirname + '/public'));
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
  allowMethods: ['GET', 'POST', 'DELETE', 'DELETE', 'OPTIONS'],
  allowHeaders: ['Content-Type', 'Authorization', 'Accept'],
}));

// 错误处理
app.use(async (ctx, next: any) => {
  return await next().catch(async (err: any) => {
    if (err.status === 401) {
      return await next();
      ctx.status = 401;
      ctx.body = 'Protected resource, use Authorization header to get access\n';
    } else {
      throw err;
    }
  });
});

app.use(koajwt({
  secret: tokenKey,
}).unless({
  path: [
    // /\/users\/login/,
    // /\/users\/register/,
    // /\/users\/getUser/,
    // /\/department/, // 查看科室信息
    // /\/doctor/, // 查看医生信息
    // /\/patientCase\/all/,
    // /\/schedule\/today/,
  ],
}));

// logger
app.use(async (ctx, next) => {
  connectMysql();
  await next();
  console.log('enter server');
  console.log(`${ctx.method} ${ctx.url}`);
});

// routes
app.use(index.routes()).use(index.allowedMethods());
app.use(users.routes()).use(users.allowedMethods());
app.use(department.routes()).use(department.allowedMethods());
app.use(doctor.routes()).use(doctor.allowedMethods());
app.use(schedule.routes()).use(schedule.allowedMethods());
app.use(order.routes()).use(order.allowedMethods());
app.use(patientCase.routes()).use(patientCase.allowedMethods());
app.use(admin.routes()).use(admin.allowedMethods());

// app.use(async (ctx, next) => {
//   console.log(123)
// })

// error-handling
app.on('error', (err, ctx) => {
  console.error('server error', err, ctx);
});

module.exports = app;
