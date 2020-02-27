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
var department_1 = require("./department");
exports.Docters = index_1.sequelize.define('Docters', {
    // 属性
    workerId: {
        type: index_1.Sequelize.STRING(12),
        allowNull: false,
        primaryKey: true,
        unique: true,
    },
    password: {
        type: index_1.Sequelize.STRING(60),
        allowNull: false,
    },
    name: {
        type: index_1.Sequelize.TEXT,
        allowNull: false,
    },
    sex: {
        type: index_1.Sequelize.INTEGER,
        allowNull: false,
    },
    age: {
        type: index_1.Sequelize.INTEGER,
    },
    idcard: {
        type: index_1.Sequelize.STRING(18),
        allowNull: false,
        unique: true,
    },
    tel: {
        type: index_1.Sequelize.STRING(11),
        allowNull: false,
    },
    address: {
        type: index_1.Sequelize.STRING(200),
    },
    information: {
        type: index_1.Sequelize.STRING(100),
        allowNull: false,
    },
    position: {
        type: index_1.Sequelize.STRING(18),
        allowNull: false,
    },
    university: {
        type: index_1.Sequelize.STRING(18),
        allowNull: false,
    },
    departmentId: {
        type: index_1.Sequelize.INTEGER,
        references: {
            model: department_1.Department,
            key: 'departmentId',
        },
        allowNull: false,
    },
}, {
    // 参数
    timestamps: false,
    freezeTableName: true,
});
exports.createTableDocters = function () {
    exports.Docters.sync({ force: true }).then(function () {
        console.log('创建成功');
    });
};
exports.insert = function (docterInfo) {
    return exports.Docters.create(docterInfo).then(function (res) {
        return true;
    }).catch(function (e) {
        console.log(e);
        return false;
    });
};
exports.findOneByKey = function (key, value, attributes) {
    var params = {};
    params[key] = value;
    return exports.Docters.findOne({
        where: __assign({}, params),
        attributes: __spreadArrays(attributes),
    }).then(function (info) {
        return info && info.dataValues;
    });
};
exports.findAllByKey = function (params) {
    return exports.Docters.findAll({
        where: __assign({}, params),
    }).then(function (info) {
        return info && info.map(function (item) {
            return item.dataValues;
        });
    });
};
