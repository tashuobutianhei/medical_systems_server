"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
var order_1 = require("../../models/order");
var patientCase_1 = require("../../models/patientCase");
var register_1 = require("../../models/register");
var random_string_1 = __importDefault(require("random-string"));
exports.addOrder = function (params) { return __awaiter(void 0, void 0, void 0, function () {
    var wokrId, workerId, result;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                wokrId = params.wokrId, workerId = params.workerId;
                return [4 /*yield*/, order_1.insert({
                        workerId: workerId,
                        wokrId: wokrId,
                    })];
            case 1:
                result = _a.sent();
                return [2 /*return*/, result];
        }
    });
}); };
exports.deleteOrder = function (params) { return __awaiter(void 0, void 0, void 0, function () {
    var e_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, order_1.destroy(params)];
            case 1: return [2 /*return*/, _a.sent()];
            case 2:
                e_1 = _a.sent();
                return [2 /*return*/, false];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.findOrder = function (ctx, next) { return __awaiter(void 0, void 0, void 0, function () {
    var params, orderRes, resgisterList, dataResult, e_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 3, , 5]);
                if (Object.keys(ctx.query).length === 0) {
                    return [2 /*return*/, ctx.body = {
                            code: -2,
                            message: '参数有错误',
                        }];
                }
                params = ctx.query;
                return [4 /*yield*/, order_1.findOneByKey(params, [])];
            case 1:
                orderRes = _a.sent();
                return [4 /*yield*/, register_1.findAllByKey({
                        id: orderRes.id,
                    })];
            case 2:
                resgisterList = _a.sent();
                dataResult = __assign(__assign({}, orderRes), { patientCases: resgisterList });
                ctx.body = {
                    code: dataResult ? 0 : -1,
                    data: dataResult,
                };
                return [3 /*break*/, 5];
            case 3:
                e_2 = _a.sent();
                console.log(e_2);
                ctx.state.nextInfo = {
                    type: -1,
                    error: e_2,
                };
                return [4 /*yield*/, next()];
            case 4:
                _a.sent();
                return [2 /*return*/, false];
            case 5: return [2 /*return*/];
        }
    });
}); };
exports.Order = function (ctx, next) { return __awaiter(void 0, void 0, void 0, function () {
    var params, findRes, requestList, uid, caseId, insertRes, res, e_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 5, , 7]);
                params = ctx.request.body;
                if (ctx.state.userInfo.userType !== 1) {
                    ctx.body = {
                        code: 402,
                        message: '用户身份错误',
                    };
                }
                return [4 /*yield*/, order_1.findOneByKey(params, [])];
            case 1:
                findRes = _a.sent();
                if (!findRes) {
                    throw new Error('查找失败');
                }
                return [4 /*yield*/, register_1.findAllByKey({
                        id: findRes.id,
                    })];
            case 2:
                requestList = _a.sent();
                if (!(findRes.limit === null || requestList.length < findRes.limit)) {
                    return [2 /*return*/, ctx.body = {
                            code: -2,
                            message: '挂号已满',
                        }];
                }
                uid = ctx.state.userInfo._uid;
                caseId = random_string_1.default({ length: 12, numbers: true });
                return [4 /*yield*/, patientCase_1.insert({
                        uid: uid,
                        caseId: caseId,
                        registerDate: new Date(),
                        doctorId: params.workerId,
                        describe: '',
                        doctorView: '',
                        result: '',
                    })];
            case 3:
                insertRes = _a.sent();
                if (!insertRes) {
                    throw new Error('');
                }
                return [4 /*yield*/, register_1.insert({
                        id: findRes.id,
                        caseId: caseId,
                    })];
            case 4:
                res = _a.sent();
                ctx.body = {
                    code: res ? 0 : -1,
                    data: { caseId: caseId },
                };
                return [3 /*break*/, 7];
            case 5:
                e_3 = _a.sent();
                ctx.state.nextInfo = {
                    type: -1,
                    error: e_3,
                };
                return [4 /*yield*/, next()];
            case 6:
                _a.sent();
                return [3 /*break*/, 7];
            case 7: return [2 /*return*/];
        }
    });
}); };
exports.orderInfo = function (ctx, next) { return __awaiter(void 0, void 0, void 0, function () {
    var params, time, status_1, todo, medicine, attention, hospital, _a, result, describe, res, e_4;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                params = ctx.request.body;
                _b.label = 1;
            case 1:
                _b.trys.push([1, 3, , 5]);
                time = params.time, status_1 = params.status, todo = params.todo, medicine = params.medicine, attention = params.attention, hospital = params.hospital, _a = params.result, result = _a === void 0 ? undefined : _a;
                describe = '';
                describe += Boolean(time != 'undefined') ? "\u60A3\u8005\u4E8E[" + time + "]\u5F00\u59CB\u53D1\u75C5\uFF0C" : '';
                describe += Boolean(status_1 != 'undefined') ? "\u75C7\u72B6\u8868\u73B0\u4E3A[" + status_1 + "]," : '';
                describe += Boolean(todo != 'undefined') ? "\u4E2A\u4EBA\u7ECF\u5386\u6709[" + todo + "]," : '';
                describe += Boolean(medicine != 'undefined') ? "\u66FE\u670D\u7528\u836F\u7269[" + medicine + "]," : '';
                describe += Boolean(attention != 'undefined') ? "\u6CE8\u610F\u4E8B\u9879\u6709[" + attention + "]\u3002" : '';
                if (!!hospital) {
                    describe += "\u66FE\u5C31\u533B\uFF0C\u8BCA\u65AD\u7ED3\u679C\u4E3A" + (Boolean(attention != 'undefined') ? result : '无描述');
                }
                return [4 /*yield*/, patientCase_1.update({
                        describe: describe,
                    }, {
                        caseId: params.caseId,
                    })];
            case 2:
                res = _b.sent();
                ctx.body = {
                    code: res ? 0 : 1,
                };
                return [3 /*break*/, 5];
            case 3:
                e_4 = _b.sent();
                ctx.state.nextInfo = {
                    type: -1,
                    error: e_4,
                };
                return [4 /*yield*/, next()];
            case 4:
                _b.sent();
                return [3 /*break*/, 5];
            case 5: return [2 /*return*/];
        }
    });
}); };
