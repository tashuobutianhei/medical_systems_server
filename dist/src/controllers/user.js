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
var bcrypt_1 = require("../utils/bcrypt");
var patient_1 = require("../models/patient");
var random_string_1 = __importDefault(require("random-string"));
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var config_1 = require("../config");
exports.registerPatient = function (ctx, next) { return __awaiter(void 0, void 0, void 0, function () {
    var userInfo, sesult, e_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 4, , 5]);
                userInfo = ctx.request.body;
                if (!(typeof userInfo === 'object' && Object.keys(userInfo).length > 0)) return [3 /*break*/, 2];
                // 密码加密
                userInfo.password = bcrypt_1.encode(userInfo.password);
                // 生成随机 uid TODO:uid从数据库校验
                userInfo.uid = random_string_1.default({ length: 12, numbers: true });
                return [4 /*yield*/, patient_1.insert(userInfo)
                        .catch(function (e) {
                        throw new Error(e);
                    })];
            case 1:
                sesult = _a.sent();
                if (sesult) {
                    ctx.body = {
                        code: 1,
                        message: '成功',
                    };
                }
                else {
                    throw new Error('sql error');
                }
                return [3 /*break*/, 3];
            case 2:
                ctx.body = {
                    code: -1,
                    message: '参数有错误',
                };
                _a.label = 3;
            case 3: return [3 /*break*/, 5];
            case 4:
                e_1 = _a.sent();
                ctx.body = {
                    code: -1,
                    message: e_1,
                };
                return [3 /*break*/, 5];
            case 5: return [2 /*return*/];
        }
    });
}); };
exports.loginPatient = function (ctx, next) { return __awaiter(void 0, void 0, void 0, function () {
    var userInfo, info, comparesResult, token, e_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                userInfo = ctx.request.body;
                console.log(userInfo);
                if (!userInfo.username || !userInfo.password) {
                    return [2 /*return*/, ctx.body = {
                            code: -2,
                            message: '参数有错误',
                        }];
                }
                return [4 /*yield*/, patient_1.findOneByUsername(userInfo.username, ['password', 'uid'])];
            case 1:
                info = _a.sent();
                comparesResult = bcrypt_1.compare(userInfo.password, info.password);
                if (comparesResult) {
                    token = jsonwebtoken_1.default.sign({
                        name: userInfo.username,
                        _uid: info.uid,
                    }, config_1.tokenKey, { expiresIn: '72h' });
                    ctx.body = {
                        code: 0,
                        data: token,
                        message: '登陆成功',
                    };
                }
                else {
                    ctx.body = {
                        code: -1,
                        message: '密码错误',
                    };
                }
                return [3 /*break*/, 3];
            case 2:
                e_2 = _a.sent();
                ctx.body = {
                    code: -3,
                    message: '用户名不存在',
                };
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
