"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var koa_router_1 = __importDefault(require("koa-router"));
var users_1 = __importDefault(require("./users"));
var department_1 = __importDefault(require("./department"));
var doctor_1 = __importDefault(require("./doctor"));
var schedule_1 = __importDefault(require("./schedule"));
var order_1 = __importDefault(require("./order"));
var patientCase_1 = __importDefault(require("./patientCase"));
var admin_1 = __importDefault(require("./admin"));
var router = new koa_router_1.default();
// routes
router.use(users_1.default.routes()).use(users_1.default.allowedMethods());
router.use(department_1.default.routes()).use(department_1.default.allowedMethods());
router.use(doctor_1.default.routes()).use(doctor_1.default.allowedMethods());
router.use(schedule_1.default.routes()).use(schedule_1.default.allowedMethods());
router.use(order_1.default.routes()).use(order_1.default.allowedMethods());
router.use(patientCase_1.default.routes()).use(patientCase_1.default.allowedMethods());
router.use(admin_1.default.routes()).use(admin_1.default.allowedMethods());
// module.exports = router
exports.default = router;
