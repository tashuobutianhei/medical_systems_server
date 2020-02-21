"use strict";
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
exports.Patient = index_1.sequelize.define('Patient', {
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
    name: {
        type: index_1.Sequelize.TEXT,
        allowNull: false,
    },
    idcard: {
        type: index_1.Sequelize.STRING(18),
        allowNull: false,
        unique: true,
    },
    sex: {
        type: index_1.Sequelize.INTEGER,
        allowNull: false,
    },
    age: {
        type: index_1.Sequelize.INTEGER,
    },
    tel: {
        type: index_1.Sequelize.STRING(11),
        allowNull: false,
    },
    address: {
        type: index_1.Sequelize.STRING(200),
    },
}, {
    // 参数
    timestamps: false,
    freezeTableName: true,
});
exports.createTablePatient = function () {
    exports.Patient.sync({ force: true }).then(function () {
        console.log('创建成功');
    });
};
exports.insert = function (patientInfo) {
    return exports.Patient.create(patientInfo).then(function (res) {
        console.log(res.id);
        return true;
    });
};
exports.findOneByUsername = function (username, attributes) {
    return exports.Patient.findOne({
        where: { username: username },
        attributes: __spreadArrays(attributes),
    }).then(function (info) {
        return info && info.dataValues;
    });
};
