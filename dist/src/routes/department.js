"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var koa_router_1 = __importDefault(require("koa-router"));
var department_1 = require("../controllers/department");
var examination_1 = require("../controllers/examination");
var router = new koa_router_1.default();
router.prefix('/department');
router.get('/', department_1.getDepartment); // 获取所有科室
router.get('/examination', examination_1.getExamination); // 获取检查信息
exports.default = router;
