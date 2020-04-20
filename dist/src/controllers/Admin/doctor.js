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
var random_string_1 = __importDefault(require("random-string"));
var doctor_1 = require("../../models/doctor");
var bcrypt_1 = require("../../utils/bcrypt");
exports.addDoctor = function (ctx, next) { return __awaiter(void 0, void 0, void 0, function () {
    var doctorInfo, result, e_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 3, , 5]);
                doctorInfo = ctx.request.body;
                if (!(typeof doctorInfo === 'object' && Object.keys(doctorInfo).length > 0)) {
                    return [2 /*return*/, ctx.body = {
                            code: -2,
                            message: '参数有错误',
                        }];
                }
                doctorInfo.workerId = random_string_1.default({ length: 12, numbers: true });
                doctorInfo.password = bcrypt_1.encode(random_string_1.default({ length: 6, numbers: true }));
                return [4 /*yield*/, doctor_1.insert(doctorInfo)];
            case 1:
                result = _a.sent();
                return [4 /*yield*/, next()];
            case 2:
                _a.sent();
                return [2 /*return*/, ctx.body = {
                        code: result ? 0 : 1,
                        message: result ? '添加成功' : '添加失败',
                    }];
            case 3:
                e_1 = _a.sent();
                ctx.state.nextInfo = {
                    type: -1,
                    error: e_1,
                };
                return [4 /*yield*/, next()];
            case 4:
                _a.sent();
                return [3 /*break*/, 5];
            case 5: return [2 /*return*/];
        }
    });
}); };
exports.outDoctor = function (ctx, next) { return __awaiter(void 0, void 0, void 0, function () {
    var doctorInfo, res, e_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 3, , 5]);
                doctorInfo = ctx.request.body;
                if (!doctorInfo.workerId) {
                    return [2 /*return*/, ctx.body = {
                            code: -2,
                            message: '参数有错误',
                        }];
                }
                return [4 /*yield*/, doctor_1.update({
                        status: -1,
                    }, {
                        workerId: doctorInfo.workerId,
                    })];
            case 1:
                res = _a.sent();
                return [4 /*yield*/, next()];
            case 2:
                _a.sent();
                return [2 /*return*/, ctx.body = {
                        code: res ? 0 : 1,
                        message: res ? '删除' : '删除失败',
                    }];
            case 3:
                e_2 = _a.sent();
                ctx.state.nextInfo = {
                    type: -1,
                    error: e_2,
                };
                return [4 /*yield*/, next()];
            case 4:
                _a.sent();
                return [3 /*break*/, 5];
            case 5: return [2 /*return*/];
        }
    });
}); };
