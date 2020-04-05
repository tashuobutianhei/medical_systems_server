import log4js from 'koa-log4';
import path from 'path';

log4js.configure({
  appenders: {
    access: {
      type: 'dateFile',
      pattern: '-yyyy-MM-dd.log', // 生成文件的规则
      filename: path.join('src/logs/', 'access.log'), // 生成文件名
    },
    application: {
      type: 'dateFile',
      pattern: '-yyyy-MM-dd.log',
      filename: path.join('src/logs/', 'application.log'),
    },
    out: {
      type: 'console',
    },
  },
  categories: {
    default: {appenders: ['out'], level: 'info'},
    access: {appenders: ['access'], level: 'info'},
    application: {appenders: ['application'], level: 'WARN'},
  },
});

export const accessLogger = () => log4js.koaLogger(log4js.getLogger('access')); // 记录所有访问级别的日志
export const logger = log4js.getLogger('application'); // 记录所有应用级别的日志
