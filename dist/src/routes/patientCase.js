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
var koa_router_1 = __importDefault(require("koa-router"));
var patientCase_1 = require("../controllers/doctor/patientCase");
var assay_1 = require("../controllers/doctor/assay");
var errorLog_1 = require("../middware/errorLog");
var router = new koa_router_1.default();
router.prefix('/patientCase');
router.use(function (ctx, next) { return __awaiter(void 0, void 0, void 0, function () {
    var auth;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                auth = false;
                if (ctx.request.method === 'GET') {
                    auth = true;
                }
                if (!(auth || ctx.state.userInfo && ctx.state.userInfo.userType == 2)) return [3 /*break*/, 2];
                return [4 /*yield*/, next()];
            case 1:
                _a.sent();
                return [3 /*break*/, 3];
            case 2: return [2 /*return*/, ctx.body = {
                    code: 401,
                    message: '无权限',
                }];
            case 3: return [2 /*return*/];
        }
    });
}); });
router.get('/', patientCase_1.getPatientCase); // 根据医生id查找对应病例
router.get('/patient', patientCase_1.getByPatient); // 查找患者下的所有病例
router.get('/all', patientCase_1.getAll); // 查所有病例
router.post('/doctor', patientCase_1.setPatientCaseModeDoctor); // 诊断模式下病例
router.post('/hospital', patientCase_1.setPatientCaseModeHos); // 诊断模式下病例
router.get('/assay', assay_1.getAssayById); // 获取化验结果
// 错误处理
router.use(errorLog_1.logError);
exports.default = router;
