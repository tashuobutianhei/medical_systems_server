"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var koa_1 = __importDefault(require("koa"));
var koa_views_1 = __importDefault(require("koa-views"));
var koa_json_1 = __importDefault(require("koa-json"));
// import bodyparser from 'koa-bodyparser';
var koa_logger_1 = __importDefault(require("koa-logger"));
var koa2_cors_1 = __importDefault(require("koa2-cors"));
var koa_jwt_1 = __importDefault(require("koa-jwt"));
var path_1 = __importDefault(require("path"));
// 没有声明文件
// const { ApolloServer, gql } = require('apollo-server-koa');
var logger_1 = require("./logger");
// import koaBody from 'koa-body';
// route路由
var index_1 = __importDefault(require("./routes/index"));
var index_2 = require("../src/graphql/index");
var index_3 = require("./models/index");
var config_1 = require("./config");
var userInfo_1 = __importDefault(require("./middware/userInfo"));
var app = new koa_1.default();
var koaBody = require('koa-body');
// 记录访问日志
app.use(logger_1.accessLogger());
// 引入grahql
index_2.graphql.applyMiddleware({ app: app });
// 中间件
app.use(koaBody({
    multipart: true,
    strict: false,
}));
app.use(koa_json_1.default());
app.use(koa_logger_1.default());
// console.log(path.resolve(__dirname, '../public'));
app.use(require('koa-static')(path_1.default.resolve(__dirname, '../public')));
app.use(koa_views_1.default(__dirname + '/views', {
    extension: 'pug',
}));
app.use(koa2_cors_1.default({
    origin: function (ctx) {
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
app.use(function (ctx, next) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, next().catch(function (err) { return __awaiter(void 0, void 0, void 0, function () {
                    return __generator(this, function (_a) {
                        if (err.status === 401) {
                            ctx.status = 401;
                            ctx.body = 'Protected resource, use Authorization header to get access\n';
                        }
                        else {
                            throw err;
                        }
                        return [2 /*return*/];
                    });
                }); })];
            case 1: return [2 /*return*/, _a.sent()];
        }
    });
}); });
app.use(koa_jwt_1.default({
    secret: config_1.tokenKey,
}).unless({
    path: [
        /\/*/,
        /\/users\/*/,
        /\/users\/login/,
        /\/users\/register/,
        /\/users\/getUser/,
        /\/department/,
        /\/doctor/,
        /\/patientCase\/all/,
        /\/schedule\/today/,
        /\/schedule\/getScheduleOfPeriod/,
        /\/admin\/department/,
        /\/admin\/article/,
    ],
}));
// 兼容jwt，获取token信息
app.use(userInfo_1.default);
// app.use(async (ctx, next) => {
//   const token = ctx.header.authorization;
//   if (!token) {
//     ctx.state.userInfo = {};
//     return await next();
//   }
//   await jwt.verify(token.split(' ')[1], tokenKey,
//       async (err: any, info: any)=> {
//         if (err) {
//           ctx.body = {
//             code: 1,
//             message: '服务错误',
//           };
//         } else {
//           ctx.state.userInfo = info;
//         }
//       });
//   await next();
// });
// logger
app.use(function (ctx, next) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                index_3.connectMysql();
                return [4 /*yield*/, next()];
            case 1:
                _a.sent();
                console.log('enter server');
                console.log(ctx.method + " " + ctx.url);
                return [2 /*return*/];
        }
    });
}); });
// routes
app.use(index_1.default.routes()).use(index_1.default.allowedMethods());
// error-handling
app.on('error', function (err, ctx) {
    console.error('server error', err, ctx);
    logger_1.logger.error(err);
});
module.exports = app;
