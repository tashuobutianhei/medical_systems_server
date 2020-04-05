"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var koa_log4_1 = __importDefault(require("koa-log4"));
var path_1 = __importDefault(require("path"));
koa_log4_1.default.configure({
    appenders: {
        access: {
            type: 'dateFile',
            pattern: '-yyyy-MM-dd.log',
            filename: path_1.default.join('src/logs/', 'access.log'),
        },
        application: {
            type: 'dateFile',
            pattern: '-yyyy-MM-dd.log',
            filename: path_1.default.join('src/logs/', 'application.log'),
        },
        out: {
            type: 'console',
        },
    },
    categories: {
        default: { appenders: ['out'], level: 'info' },
        access: { appenders: ['access'], level: 'info' },
        application: { appenders: ['application'], level: 'WARN' },
    },
});
exports.accessLogger = function () { return koa_log4_1.default.koaLogger(koa_log4_1.default.getLogger('access')); }; // 记录所有访问级别的日志
exports.logger = koa_log4_1.default.getLogger('application'); // 记录所有应用级别的日志
