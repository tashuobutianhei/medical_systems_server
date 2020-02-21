"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var bcryptjs_1 = __importDefault(require("bcryptjs"));
var salt = bcryptjs_1.default.genSaltSync(10);
exports.encode = function (password) {
    return bcryptjs_1.default.hashSync(password, salt);
};
exports.compare = function (paramPwd, dbPwd) {
    return bcryptjs_1.default.compareSync(paramPwd, dbPwd);
};
