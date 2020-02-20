"use strict";
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
        type: index_1.Sequelize.STRING(50),
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
