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
var commonInfo_1 = require("../../models/commonInfo");
var fs_1 = __importDefault(require("fs"));
var path_1 = __importDefault(require("path"));
exports.getCommonInfoMethod = function () { return __awaiter(void 0, void 0, void 0, function () {
    var info, e_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, commonInfo_1.findAllByKey({})];
            case 1:
                info = _a.sent();
                return [2 /*return*/, info];
            case 2:
                e_1 = _a.sent();
                throw new Error(e_1);
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.getCommonInfo = function (ctx) { return __awaiter(void 0, void 0, void 0, function () {
    var info, e_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, exports.getCommonInfoMethod()];
            case 1:
                info = _a.sent();
                ctx.body = {
                    code: 0,
                    data: info[0],
                };
                return [3 /*break*/, 3];
            case 2:
                e_2 = _a.sent();
                ctx.body = {
                    code: -1,
                    error: e_2,
                };
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
var upFile = function (file) { return __awaiter(void 0, void 0, void 0, function () {
    var filename, base64, dataBuffer;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                filename = path_1.default.resolve(__dirname, '../../../public') + ("/Common/carousel/" + file.name);
                base64 = file.thumbUrl.replace(/^data:image\/\w+;base64,/, '');
                dataBuffer = Buffer.from(base64, 'base64');
                return [4 /*yield*/, fs_1.default.writeFileSync(filename, dataBuffer)];
            case 1:
                _a.sent();
                return [2 /*return*/, "/Common/carousel/" + file.name];
        }
    });
}); };
var updateCarousel = function (body) { return __awaiter(void 0, void 0, void 0, function () {
    var data, storeMap_1, storeFile_1, e_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 4, , 5]);
                data = JSON.parse(body.data);
                storeMap_1 = [];
                storeFile_1 = [];
                data.forEach(function (item) {
                    if (/^store-*/.test(item.uid)) {
                        storeMap_1.push(item.name); // 已经存储图片了，无需存储
                    }
                    else {
                        storeFile_1.push(item);
                    }
                });
                if (!(storeFile_1.length > 0)) return [3 /*break*/, 2];
                return [4 /*yield*/, Promise.all(storeFile_1.map(function (item) { return __awaiter(void 0, void 0, void 0, function () {
                        var fileUrl;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0: return [4 /*yield*/, upFile(item)];
                                case 1:
                                    fileUrl = _a.sent();
                                    storeMap_1.push(fileUrl);
                                    return [2 /*return*/];
                            }
                        });
                    }); }))];
            case 1:
                _a.sent();
                _a.label = 2;
            case 2: return [4 /*yield*/, commonInfo_1.update({
                    carousel: storeMap_1.join(','),
                }, { id: 1 })];
            case 3:
                _a.sent();
                return [3 /*break*/, 5];
            case 4:
                e_3 = _a.sent();
                throw new Error(e_3);
            case 5: return [2 /*return*/];
        }
    });
}); };
exports.update = function (ctx, next) { return __awaiter(void 0, void 0, void 0, function () {
    var body, _a, e_4;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 10, , 11]);
                body = ctx.request.body;
                _a = body.type;
                switch (_a) {
                    case 'carousel': return [3 /*break*/, 1];
                    case 'order': return [3 /*break*/, 3];
                    case 'doctor': return [3 /*break*/, 5];
                }
                return [3 /*break*/, 7];
            case 1: return [4 /*yield*/, updateCarousel(body)];
            case 2:
                _b.sent();
                return [3 /*break*/, 8];
            case 3: return [4 /*yield*/, commonInfo_1.update({
                    order: body.data,
                }, { id: 1 })];
            case 4:
                _b.sent();
                return [3 /*break*/, 8];
            case 5: return [4 /*yield*/, commonInfo_1.update({
                    doctor: body.data,
                }, { id: 1 })];
            case 6:
                _b.sent();
                return [3 /*break*/, 8];
            case 7: return [3 /*break*/, 8];
            case 8:
                ctx.body = {
                    code: 0,
                };
                return [4 /*yield*/, next()];
            case 9:
                _b.sent();
                return [3 /*break*/, 11];
            case 10:
                e_4 = _b.sent();
                ctx.body = {
                    code: -1,
                    error: e_4,
                };
                return [3 /*break*/, 11];
            case 11: return [2 /*return*/];
        }
    });
}); };
