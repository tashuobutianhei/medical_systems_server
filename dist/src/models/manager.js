"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable new-cap */
var index_1 = require("./index");
exports.Admin = index_1.sequelize.define('Admin', {
    // 属性
    uid: {
        type: index_1.Sequelize.STRING(12),
        allowNull: false,
        primaryKey: true,
        unique: true,
    },
    username: {
        type: index_1.Sequelize.STRING(12),
        allowNull: false,
        unique: true,
    },
    password: {
        type: index_1.Sequelize.STRING(60),
        allowNull: false,
    },
}, {
    // 参数
    timestamps: false,
    freezeTableName: true,
});
exports.createTableAdmin = function () {
    exports.Admin.sync({ force: true }).then(function () {
        console.log('创建成功');
    });
};
exports.insert = function (adminInfo) {
    return exports.Admin.create(adminInfo).then(function (res) {
        return true;
    }).catch(function (e) {
        console.log(e);
        return false;
    });
};
exports.findOneByKey = function (key, value, attributes) {
    var params = {};
    params[key] = value;
    return exports.Admin.findOne({
        where: __assign({}, params),
        attributes: __spreadArrays(attributes),
    }).then(function (info) {
        return info && info.dataValues;
    });
};
// create Table Admin {
//   uid varchar(12) NOT NULL UNIQUE PRIMARY KEY,
//   username varchar(12) NOT NULL,
//   password varchar(60) NOT NULL,
// }
