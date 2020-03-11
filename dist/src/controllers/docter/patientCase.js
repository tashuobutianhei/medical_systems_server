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
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var patientCase_1 = require("../../models/patientCase");
var patient_1 = require("../../models/patient");
var assay_1 = require("../../models/assay");
var hospitalizationInfoList_1 = require("../../models/hospitalizationInfoList");
exports.getPatientCase = function (ctx) { return __awaiter(void 0, void 0, void 0, function () {
    var params, resList, res, resMap, e_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if (Object.keys(ctx.query).length === 0) {
                    return [2 /*return*/, ctx.body = {
                            code: -2,
                            message: '参数有错误',
                        }];
                }
                _a.label = 1;
            case 1:
                _a.trys.push([1, 5, , 6]);
                params = ctx.query;
                resList = [];
                return [4 /*yield*/, patientCase_1.findAllByKey({
                        docterId: params.workerId,
                    })];
            case 2:
                res = _a.sent();
                if (!(res.length > 0)) return [3 /*break*/, 4];
                resMap = res.map(function (item, index, array) { return __awaiter(void 0, void 0, void 0, function () {
                    var patient;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0: return [4 /*yield*/, patient_1.findOneByKey('uid', item.uid, ['username', 'uid', 'name', 'idcard', 'sex', 'age', 'tel', 'address'])];
                            case 1:
                                patient = _a.sent();
                                if (patient) {
                                    return [2 /*return*/, __assign(__assign({}, item), { 'patientInfo': patient })];
                                }
                                else {
                                    throw new Error('not find patient');
                                }
                                return [2 /*return*/];
                        }
                    });
                }); });
                return [4 /*yield*/, Promise.all(resMap)];
            case 3:
                resList = _a.sent();
                _a.label = 4;
            case 4:
                ctx.body = {
                    code: resList ? 0 : -1,
                    data: resList,
                };
                return [3 /*break*/, 6];
            case 5:
                e_1 = _a.sent();
                ctx.body = {
                    code: -1,
                    data: e_1,
                };
                return [3 /*break*/, 6];
            case 6: return [2 /*return*/];
        }
    });
}); };
exports.setPatientCaseModeDoctor = function (ctx) { return __awaiter(void 0, void 0, void 0, function () {
    var params, assay, _a, docterView, _b, result, _c, medicine, _d, Hospitalization, caseId_1, assayMap, assayMapRes, assayId, updateRes, e_2;
    return __generator(this, function (_e) {
        switch (_e.label) {
            case 0:
                _e.trys.push([0, 3, , 4]);
                if (Object.keys(ctx.request.body).length < 0) {
                    return [2 /*return*/, ctx.body = {
                            code: -2,
                            message: '参数有错误',
                        }];
                }
                params = ctx.request.body;
                assay = JSON.parse(params.assay);
                _a = params.docterView, docterView = _a === void 0 ? undefined : _a, _b = params.result, result = _b === void 0 ? undefined : _b, _c = params.medicine, medicine = _c === void 0 ? undefined : _c, _d = params.Hospitalization, Hospitalization = _d === void 0 ? false : _d, caseId_1 = params.caseId;
                assayMap = assay.map(function (item) { return __awaiter(void 0, void 0, void 0, function () {
                    var res;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0: return [4 /*yield*/, assay_1.insert({
                                    'caseId': caseId_1,
                                    'assayName': item.examinationId,
                                    'assayResult': item.examinationResult,
                                    'assayDate': new Date(),
                                })];
                            case 1:
                                res = _a.sent();
                                if (res) {
                                    return [2 /*return*/, res];
                                }
                                else {
                                    throw new Error('insert error');
                                }
                                return [2 /*return*/];
                        }
                    });
                }); });
                return [4 /*yield*/, Promise.all(assayMap)];
            case 1:
                assayMapRes = _e.sent();
                if (!assayMapRes) {
                    throw new Error('insert error');
                }
                assayId = assayMapRes.map(function (item) { return item.assayId; }).join(',');
                return [4 /*yield*/, patientCase_1.update({
                        docterView: docterView,
                        result: result,
                        medicine: medicine,
                        assayId: assayId,
                        HospitalizationId: Hospitalization ? 0 : -1,
                        status: Hospitalization ? 2 : 1,
                    }, {
                        'caseId': caseId_1,
                    })];
            case 2:
                updateRes = _e.sent();
                ctx.body = {
                    code: updateRes ? 0 : -1,
                    message: '更新成功',
                };
                return [3 /*break*/, 4];
            case 3:
                e_2 = _e.sent();
                ctx.body = {
                    code: -1,
                    message: '服务错误',
                };
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
var insertAssayAndGetId = function (assay, caseId) { return __awaiter(void 0, void 0, void 0, function () {
    var assayMap, assayMapRes;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                assayMap = assay.map(function (item) { return __awaiter(void 0, void 0, void 0, function () {
                    var res;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0: return [4 /*yield*/, assay_1.insert({
                                    'caseId': caseId,
                                    'assayName': item.examinationId,
                                    'assayResult': item.examinationResult,
                                    'assayDate': new Date(),
                                })];
                            case 1:
                                res = _a.sent();
                                if (res) {
                                    return [2 /*return*/, res];
                                }
                                else {
                                    throw new Error('insert error');
                                }
                                return [2 /*return*/];
                        }
                    });
                }); });
                return [4 /*yield*/, Promise.all(assayMap)];
            case 1:
                assayMapRes = _a.sent();
                if (!assayMapRes) {
                    throw new Error('insert error');
                }
                return [2 /*return*/, assayMapRes.map(function (item) { return item.assayId; }).join(',')];
        }
    });
}); };
exports.setPatientCaseModeHos = function (ctx) { return __awaiter(void 0, void 0, void 0, function () {
    var params, hospitalList, caseId_2, assayPromise, assayList_1, hosPromise, hosRes, Hospitalization, updateItem, updateHospitalizationId, updateRes, e_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 5, , 6]);
                if (Object.keys(ctx.request.body).length < 0) {
                    return [2 /*return*/, ctx.body = {
                            code: -2,
                            message: '参数有错误',
                        }];
                }
                params = ctx.request.body;
                hospitalList = JSON.parse(params.hospitalList);
                caseId_2 = params.caseId;
                assayPromise = hospitalList.map(function (item) { return __awaiter(void 0, void 0, void 0, function () {
                    var _a;
                    return __generator(this, function (_b) {
                        switch (_b.label) {
                            case 0:
                                if (!(item.assays.length > 0 && item.assays[0].examinationId !== null)) return [3 /*break*/, 2];
                                _a = {
                                    HospitalizationId: item.HospitalizationId
                                };
                                return [4 /*yield*/, insertAssayAndGetId(item.assays, caseId_2)];
                            case 1: return [2 /*return*/, (_a.assayId = _b.sent(),
                                    _a)];
                            case 2:
                                ;
                                return [2 /*return*/, {}];
                        }
                    });
                }); });
                return [4 /*yield*/, Promise.all(assayPromise)];
            case 1:
                assayList_1 = _a.sent();
                hosPromise = hospitalList.map(function (item) { return __awaiter(void 0, void 0, void 0, function () {
                    var mid, res;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                mid = assayList_1.find(function (assay) {
                                    return assay.HospitalizationId === item.HospitalizationId;
                                }) || { assayId: '' };
                                mid.assayId;
                                return [4 /*yield*/, hospitalizationInfoList_1.insert({
                                        caseId: caseId_2,
                                        assayId: mid.assayId,
                                        patientStatus: item.patientStatus || '',
                                        medicine: item.medicine || '',
                                        TreatmentRecord: item.TreatmentRecord || '',
                                        recovery: item.recovery || '',
                                        date: new Date(),
                                    })];
                            case 1:
                                res = _a.sent();
                                if (res) {
                                    return [2 /*return*/, res];
                                }
                                else {
                                    throw new Error('insert error');
                                }
                                return [2 /*return*/];
                        }
                    });
                }); });
                return [4 /*yield*/, Promise.all(hosPromise)];
            case 2:
                hosRes = _a.sent();
                if (!hosRes) {
                    throw new Error('insert error');
                }
                Hospitalization = hosRes.map(function (item) { return item.HospitalizationId; });
                return [4 /*yield*/, patientCase_1.findOneByKey({
                        caseId: caseId_2,
                    }, [])];
            case 3:
                updateItem = _a.sent();
                updateHospitalizationId = updateItem.HospitalizationId == 0 ?
                    Hospitalization.join(',') : __spreadArrays(updateItem.HospitalizationId.split(','), Hospitalization);
                return [4 /*yield*/, patientCase_1.update({
                        HospitalizationId: updateHospitalizationId,
                        status: Hospitalization ? 2 : 1,
                    }, {
                        'caseId': caseId_2,
                    })];
            case 4:
                updateRes = _a.sent();
                ctx.body = {
                    code: updateRes ? 0 : -1,
                    data: updateRes,
                };
                return [3 /*break*/, 6];
            case 5:
                e_3 = _a.sent();
                ctx.body = {
                    code: -1,
                    message: '服务错误',
                };
                return [3 /*break*/, 6];
            case 6: return [2 /*return*/];
        }
    });
}); };
