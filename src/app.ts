import Koa from 'koa';
const app = new Koa();

import views from 'koa-views';
import json from 'koa-json';
import bodyparser from 'koa-bodyparser';
import logger from 'koa-logger';
import cors from 'koa2-cors';
import koajwt from 'koa-jwt';

import index from './routes/index';
import users from './routes/users';

import {connectMysql} from './models/index';

import {tokenKey} from './config';

// middlewares
app.use(bodyparser({
  enableTypes: ['json', 'form', 'text'],
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
    return '*'; // 运行的域名
  },
  exposeHeaders: ['WWW-Authenticate', 'Server-Authorization'],
  maxAge: 5,
  credentials: true,
  allowMethods: ['GET', 'POST', 'DELETE', 'DELETE', 'OPTIONS'],
  allowHeaders: ['Content-Type', 'Authorization', 'Accept'],
}));

// 错误处理
app.use((ctx, next) => {
  return next().catch((err) => {
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
}).unless({
  path: [/\/users\/login/],
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

// app.use(async (ctx, next) => {
//   console.log(123)
// })

// error-handling
app.on('error', (err, ctx) => {
  console.error('server error', err, ctx);
});

module.exports = app;
