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
var docterWork_1 = require("../../models/docterWork");
var order_1 = require("./order");
var moment_1 = __importDefault(require("moment"));
var getScheduleDateList = function () {
    var ScheduleDateList = [];
    var step = 86400000;
    for (var i = 0; i < 6; i++) {
        var itemDate = new Date(Date.now() + i * step);
        ScheduleDateList.push(moment_1.default(itemDate).format('YYYY-MM-DD'));
    }
    return ScheduleDateList;
};
var transFormwokrId = function (date, departmentId, shifts) {
    var id = departmentId.length > 1 ? departmentId : '0' + departmentId;
    return date.split('-').join('') + id + shifts;
};
exports.createWorkList = function (ctx, next) { return __awaiter(void 0, void 0, void 0, function () {
    var departmentId;
    return __generator(this, function (_a) {
        if (Object.keys(ctx.query).length === 0) {
            return [2 /*return*/, ctx.body = {
                    code: -2,
                    message: '参数有错误',
                }];
        }
        departmentId = ctx.query.departmentId;
        getScheduleDateList().forEach(function (date) { return __awaiter(void 0, void 0, void 0, function () {
            var DocterWork;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, docterWork_1.findOneByKey('data', date + "T00:00:00.000Z", ['wokrId'])];
                    case 1:
                        DocterWork = _a.sent();
                        if (DocterWork) {
                        }
                        else {
                            [0, 1, 2].forEach(function (item) { return __awaiter(void 0, void 0, void 0, function () {
                                var result;
                                return __generator(this, function (_a) {
                                    result = docterWork_1.insert({
                                        wokrId: transFormwokrId(date, departmentId, item),
                                        departmentId: departmentId - 0,
                                        data: date,
                                        shifts: item,
                                    });
                                    if (!result) {
                                        return [2 /*return*/, ctx.body = {
                                                code: -1,
                                                message: '服务错误',
                                            }];
                                    }
                                    return [2 /*return*/];
                                });
                            }); });
                        }
                        ;
                        return [2 /*return*/];
                }
            });
        }); });
        ctx.body = {
            code: 1,
            message: 'success',
        };
        return [2 /*return*/];
    });
}); };
exports.deleteSchedule = function (ctx) { return __awaiter(void 0, void 0, void 0, function () {
    var params, findResult, midArray, res, deleteRes, e_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 3, , 4]);
                if (Object.keys(ctx.request.body).length < 0) {
                    return [2 /*return*/, ctx.body = {
                            code: -2,
                            message: '参数有错误',
                        }];
                }
                params = ctx.request.body;
                return [4 /*yield*/, docterWork_1.findOneByKey('wokrId', params.wokrId, ['wokrId', 'docters'])];
            case 1:
                findResult = _a.sent();
                if (!findResult) {
                    throw new Error('查找失败');
                }
                if (findResult.docters === null) {
                    throw new Error('无法删除');
                }
                midArray = findResult.docters.split(',');
                midArray.splice(midArray.indexOf(params.workerId), 1);
                res = docterWork_1.update({
                    docters: midArray.length > 0 ? midArray.join(',') : null,
                    editer: ctx.state.user._uid,
                }, {
                    wokrId: params.wokrId,
                });
                return [4 /*yield*/, order_1.deleteOrder({
                        wokrId: params.wokrId,
                        workerId: params.workerId,
                    })];
            case 2:
                deleteRes = _a.sent();
                ctx.body = {
                    code: res && deleteRes ? 0 : -1,
                    data: res && deleteRes ? '更新成功' : '更新失败',
                };
                return [3 /*break*/, 4];
            case 3:
                e_1 = _a.sent();
                ctx.body = {
                    code: -1,
                    message: '服务错误',
                    data: e_1,
                };
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.addSchedule = function (ctx) { return __awaiter(void 0, void 0, void 0, function () {
    var params, findResult, newDocters, res, addOrderRes, e_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 3, , 4]);
                if (Object.keys(ctx.request.body).length < 0) {
                    return [2 /*return*/, ctx.body = {
                            code: -2,
                            message: '参数有错误',
                        }];
                }
                params = ctx.request.body;
                return [4 /*yield*/, docterWork_1.findOneByKey('wokrId', params.wokrId, ['wokrId', 'docters'])];
            case 1:
                findResult = _a.sent();
                if (!findResult) {
                    throw new Error('查找失败');
                }
                newDocters = findResult.docters === null || findResult.docters === '' ?
                    params.workerId : findResult.docters + ("," + params.workerId);
                res = docterWork_1.update({
                    docters: Array.from(new Set(newDocters.split(','))).join(','),
                    editer: ctx.state.user._uid,
                }, {
                    wokrId: params.wokrId,
                });
                return [4 /*yield*/, order_1.addOrder({
                        wokrId: params.wokrId,
                        workerId: params.workerId,
                    })];
            case 2:
                addOrderRes = _a.sent();
                ctx.body = {
                    code: res && addOrderRes ? 0 : -1,
                    data: res && addOrderRes ? '更新成功' : '更新失败',
                };
                return [3 /*break*/, 4];
            case 3:
                e_2 = _a.sent();
                ctx.body = {
                    code: -1,
                    message: '服务错误',
                    data: e_2,
                };
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
// 查询某天的排班
exports.getSchedule = function (ctx) { return __awaiter(void 0, void 0, void 0, function () {
    var departmentId, date, schdelue, e_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                if (Object.keys(ctx.query).length === 0) {
                    return [2 /*return*/, ctx.body = {
                            code: -2,
                            message: '参数有错误',
                        }];
                }
                departmentId = ctx.query.departmentId;
                date = moment_1.default(ctx.query.date).format('YYYY-MM-DD');
                return [4 /*yield*/, docterWork_1.findAllByKey({
                        departmentId: departmentId,
                        data: date + "T00:00:00.000Z",
                    })];
            case 1:
                schdelue = _a.sent();
                ctx.body = {
                    code: schdelue.length ? 0 : -1,
                    data: schdelue,
                };
                return [3 /*break*/, 3];
            case 2:
                e_3 = _a.sent();
                ctx.body = {
                    code: -1,
                    message: '服务错误',
                    data: e_3,
                };
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
// 查询排班周期中的排班
exports.getScheduleOfPeriod = function (ctx) { return __awaiter(void 0, void 0, void 0, function () {
    var departmentId_1, listPromise, schdelueLists, e_4;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                if (Object.keys(ctx.query).length === 0) {
                    return [2 /*return*/, ctx.body = {
                            code: -2,
                            message: '参数有错误',
                        }];
                }
                departmentId_1 = ctx.query.departmentId;
                listPromise = getScheduleDateList().map(function (date) { return __awaiter(void 0, void 0, void 0, function () {
                    var schdelue;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0: return [4 /*yield*/, docterWork_1.findAllByKey({
                                    departmentId: departmentId_1,
                                    data: date + "T00:00:00.000Z",
                                })];
                            case 1:
                                schdelue = _a.sent();
                                if (schdelue) {
                                    return [2 /*return*/, schdelue];
                                }
                                else {
                                    throw new Error('');
                                }
                                return [2 /*return*/];
                        }
                    });
                }); });
                return [4 /*yield*/, Promise.all(listPromise)];
            case 1:
                schdelueLists = _a.sent();
                ctx.body = {
                    code: 0,
                    data: schdelueLists,
                };
                return [3 /*break*/, 3];
            case 2:
                e_4 = _a.sent();
                ctx.body = {
                    code: -1,
                    message: '服务错误',
                    data: e_4,
                };
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
