"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var koa_router_1 = __importDefault(require("koa-router"));
var user_1 = require("../controllers/user");
var index_1 = require("../models/index");
var router = new koa_router_1.default();
router.prefix('/users');
router.get('/', function (ctx, next) {
    ctx.body = 'this is a users response!';
});
router.post('/register', user_1.registerPatient);
router.post('/login', user_1.login);
router.get('/getUser', user_1.getUser);
router.get('/create', index_1.createTable);
exports.default = router;
