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
Object.defineProperty(exports, "__esModule", { value: true });
var graphql_1 = require("graphql");
var department_1 = require("../controllers/Admin/department");
var examination_1 = require("../controllers/examination");
var info_1 = require("../controllers/Admin/info");
var article_1 = require("../controllers/Admin/article");
var info_2 = require("../store/info");
var examiationType = new graphql_1.GraphQLObjectType({
    name: 'exainationType',
    description: '化验项目',
    fields: function () {
        return {
            examinationId: { type: graphql_1.GraphQLInt },
            examinationName: { type: graphql_1.GraphQLString },
            examinationDesc: { type: graphql_1.GraphQLString },
        };
    },
});
var doctorType = new graphql_1.GraphQLObjectType({
    name: 'doctorType',
    description: '医生信息',
    fields: function () {
        return {
            workerId: { type: graphql_1.GraphQLString },
            name: { type: graphql_1.GraphQLString },
            sex: { type: graphql_1.GraphQLInt },
            age: { type: graphql_1.GraphQLInt },
            idcard: { type: graphql_1.GraphQLString },
            tel: { type: graphql_1.GraphQLString },
            address: { type: graphql_1.GraphQLString },
            information: { type: graphql_1.GraphQLString },
            position: { type: graphql_1.GraphQLString },
            university: { type: graphql_1.GraphQLString },
            departmentId: { type: graphql_1.GraphQLInt },
            status: { type: graphql_1.GraphQLString },
            avatar: { type: graphql_1.GraphQLString },
        };
    },
});
var departmentType = new graphql_1.GraphQLObjectType({
    name: 'departmentType',
    description: '化验项目',
    fields: function () {
        return {
            departmentId: { type: graphql_1.GraphQLInt },
            departmentName: { type: graphql_1.GraphQLString },
            information: { type: graphql_1.GraphQLString },
            doctorList: { type: new graphql_1.GraphQLList(doctorType) },
        };
    },
});
var commonInfoType = new graphql_1.GraphQLObjectType({
    name: 'commonInfo',
    description: '医院信息',
    fields: function () {
        return {
            id: { type: graphql_1.GraphQLInt },
            carousel: { type: graphql_1.GraphQLString },
            order: { type: graphql_1.GraphQLString },
            doctor: { type: graphql_1.GraphQLString },
        };
    },
});
var articleInfoType = new graphql_1.GraphQLObjectType({
    name: 'articleInfo',
    description: '文章公告',
    fields: function () {
        return {
            textId: { type: graphql_1.GraphQLInt },
            title: { type: graphql_1.GraphQLString },
            value: { type: graphql_1.GraphQLString },
            type: { type: graphql_1.GraphQLInt },
            update: { type: graphql_1.GraphQLString },
        };
    },
});
// 定义单个文章对象
var Info = new graphql_1.GraphQLObjectType({
    name: 'info',
    description: '医院数据',
    fields: function () {
        return {
            departmentInfoList: { type: new graphql_1.GraphQLList(departmentType) },
            examiation: { type: new graphql_1.GraphQLList(examiationType) },
            commonInfo: { type: commonInfoType },
            articleInfo: { type: new graphql_1.GraphQLList(articleInfoType) },
        };
    },
});
// 定义文章列表对象
var hosipatalInfo = {
    name: 'query articles list',
    type: Info,
    args: {
        departmentId: {
            name: 'departmentId',
            type: graphql_1.GraphQLInt,
        },
    },
    resolve: function (root, params, options) {
        return __awaiter(this, void 0, void 0, function () {
            var redisData, result, examiation, commonInfo, articleInfo;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, info_2.getInfoStore()];
                    case 1:
                        redisData = _a.sent();
                        if (!(redisData && Object.keys(redisData).length > 0)) return [3 /*break*/, 2];
                        return [2 /*return*/, redisData];
                    case 2: return [4 /*yield*/, department_1.getHosptalInfo(params.departmentId)];
                    case 3:
                        result = _a.sent();
                        return [4 /*yield*/, examination_1.getExaminationMethod()];
                    case 4:
                        examiation = _a.sent();
                        return [4 /*yield*/, info_1.getCommonInfoMethod()];
                    case 5:
                        commonInfo = _a.sent();
                        return [4 /*yield*/, article_1.findOfArticleMehtod()];
                    case 6:
                        articleInfo = _a.sent();
                        info_2.storeInfo({
                            departmentInfoList: result,
                            examiation: examiation,
                            commonInfo: commonInfo[0],
                            articleInfo: articleInfo,
                        });
                        return [2 /*return*/, {
                                departmentInfoList: result,
                                examiation: examiation,
                                commonInfo: commonInfo[0],
                                articleInfo: articleInfo,
                            }];
                }
            });
        });
    },
};
exports.default = hosipatalInfo;
