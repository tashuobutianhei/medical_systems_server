import Koa from 'koa';
const app = new Koa()

// const views = require('koa-views')
// const json = require('koa-json')
// const onerror = require('koa-onerror')
// const bodyparser = require('koa-bodyparser')
// const logger = require('koa-logger')

import views from 'koa-views'
import json  from 'koa-json'
import bodyparser from 'koa-bodyparser'
import logger  from 'koa-logger'

// const index = require('./routes/index')
// const users = require('./routes/users')

import index from './routes/index';
import users from './routes/users';


// middlewares
app.use(bodyparser({
  enableTypes:['json', 'form', 'text']
}))
app.use(json())
app.use(logger())
app.use(require('koa-static')(__dirname + '/public'))

app.use(views(__dirname + '/views', {
  extension: 'pug'
}))

// logger
app.use(async (ctx, next) => {
  const start = new Date()
  await next()
  // const ms = new Date() - start
  console.log(112);
  console.log(`${ctx.method} ${ctx.url}`)
})

// routes
app.use(index.routes()).use(index.allowedMethods());
app.use(users.routes()).use(users.allowedMethods());

// error-handling
app.on('error', (err, ctx) => {
  console.error('server error', err, ctx)
});

module.exports = app
