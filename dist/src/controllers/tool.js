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
var patient_1 = require("../models/patient");
var axios_1 = __importDefault(require("axios"));
var bcrypt_1 = require("../utils/bcrypt");
var urlencode_1 = __importDefault(require("urlencode"));
var captchapng = require('captchapng');
exports.phone = function (ctx, next) { return __awaiter(void 0, void 0, void 0, function () {
    var query, code, response, e_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 4]);
                query = ctx.query;
                code = Math.floor(Math.random() * 9000 + 1000) + '';
                console.log(code);
                return [4 /*yield*/, axios_1.default({
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        url: 'http://api01.monyun.cn:7901/sms/v2/std/single_send',
                        data: {
                            userid: 'E10CR1',
                            pwd: 'w1dF98',
                            apikey: '8074e341df6d201b15f71e72492845ff',
                            mobile: query.mobile,
                            content: urlencode_1.default("\u9A8C\u8BC1\u7801\uFF1A" + code + "\uFF0C\u6253\u6B7B\u90FD\u4E0D\u8981\u544A\u8BC9\u522B\u4EBA\u54E6\uFF01", 'gbk'),
                        },
                    })];
            case 1:
                response = _a.sent();
                console.log(response.data);
                if (response.data.result === 0) {
                    ctx.cookies.set(query.type === 'login' ? 'loginPhoneCaptcha' : 'regPhoneCaptcha', bcrypt_1.encode(code), { maxAge: 360000, httpOnly: true });
                    return [2 /*return*/, ctx.body = {
                            code: 0,
                        }];
                }
                else {
                    ctx.body = {
                        code: -1,
                        error: '验证服务错误',
                    };
                }
                return [3 /*break*/, 4];
            case 2:
                e_1 = _a.sent();
                ctx.state.nextInfo = {
                    type: -1,
                    error: e_1,
                };
                return [4 /*yield*/, next()];
            case 3:
                _a.sent();
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.captcha = function (ctx, next) { return __awaiter(void 0, void 0, void 0, function () {
    var cap, p, base64, e_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 1, , 3]);
                cap = Math.floor(Math.random() * 9000 + 1000);
                p = new captchapng(80, 30, cap);
                p.color(0, 0, 0, 0);
                p.color(80, 80, 80, 255);
                base64 = p.getBase64();
                ctx.cookies.set('captcha', cap, { maxAge: 360000, httpOnly: true });
                ctx.status = 200;
                // ctx.set({'Content-Type' : 'image/png');
                ctx.body = {
                    code: 0,
                    cap: 'data:image/png;base64,' + base64,
                };
                return [3 /*break*/, 3];
            case 1:
                e_2 = _a.sent();
                ctx.state.nextInfo = {
                    type: -1,
                    error: e_2,
                };
                return [4 /*yield*/, next()];
            case 2:
                _a.sent();
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.checkUserInfo = function (ctx, next) { return __awaiter(void 0, void 0, void 0, function () {
    var query, info, e_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 4]);
                query = ctx.query;
                return [4 /*yield*/, patient_1.findOneByKey(query.key, query.value, ['username', 'uid', 'name', 'idcard', 'sex', 'age', 'tel', 'address', 'avatar'])];
            case 1:
                info = _a.sent();
                ctx.body = {
                    code: 0,
                    data: info,
                };
                return [3 /*break*/, 4];
            case 2:
                e_3 = _a.sent();
                ctx.state.nextInfo = {
                    type: -1,
                    error: e_3,
                };
                return [4 /*yield*/, next()];
            case 3:
                _a.sent();
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
