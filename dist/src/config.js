"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var redis_1 = __importDefault(require("redis"));
exports.tokenKey = 'coderlismedicalsystems';
exports.mysqlDbOption = {
    db: 'test',
    name: 'root',
    password: '1997123long',
    options: {
        host: 'localhost',
        dialect: 'mysql',
        pool: {
            max: 5,
            min: 0,
            acquire: 30000,
            idle: 10000,
        },
    },
};
var client = redis_1.default.createClient(6379, '127.0.0.1');
exports.redisOption = { client: client, db: 1 };
