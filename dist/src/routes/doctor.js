"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var koa_router_1 = __importDefault(require("koa-router"));
var doctor_1 = require("../controllers/doctor/doctor");
var errorLog_1 = require("../middware/errorLog");
var router = new koa_router_1.default();
router.prefix('/doctor');
router.get('/', doctor_1.getDoctors);
// 错误处理
router.use(errorLog_1.logError);
exports.default = router;
