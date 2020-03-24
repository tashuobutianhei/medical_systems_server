"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var koa_redis_1 = __importDefault(require("koa-redis"));
var config_1 = require("../config");
exports.store = koa_redis_1.default(config_1.redisOption);
