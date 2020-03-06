"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable new-cap */
var index_1 = require("./index");
var docterWork_1 = require("./docterWork");
var docter_1 = require("./docter");
exports.Order = index_1.sequelize.define('Order', {
    // 属性
    id: {
        type: index_1.Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
        unique: true,
    },
    wokrId: {
        type: index_1.Sequelize.STRING(12),
        references: {
            model: docterWork_1.DocterWork,
            key: 'wokrId',
        },
        allowNull: false,
    },
    workerId: {
        type: index_1.Sequelize.STRING(12),
        references: {
            model: docter_1.Docters,
            key: 'workerId',
        },
        allowNull: false,
    },
    patientCases: {
        type: index_1.Sequelize.TEXT,
    },
    limit: {
        type: index_1.Sequelize.INTEGER,
        allowNull: true,
    },
}, {
    // 参数
    timestamps: false,
    freezeTableName: true,
});
exports.createTableOrder = function () {
    exports.Order.sync({ force: true }).then(function () {
        console.log('创建成功');
    });
};
