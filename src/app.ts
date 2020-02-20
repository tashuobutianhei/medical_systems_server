import Koa from 'koa';
const app = new Koa();

import views from 'koa-views';
import json from 'koa-json';
import bodyparser from 'koa-bodyparser';
import logger from 'koa-logger';

import index from './routes/index';
import users from './routes/users';

import {connectMysql} from './models/index';

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

// error-handling
app.on('error', (err, ctx) => {
  console.error('server error', err, ctx);
});

module.exports = app;
