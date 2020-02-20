"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable new-cap */
var index_1 = require("./index");
var department_1 = require("./department");
exports.DocterWork = index_1.sequelize.define('DocterWork', {
    // 属性
    wokrId: {
        type: index_1.Sequelize.STRING(12),
        allowNull: false,
        primaryKey: true,
        unique: true,
    },
    departmentId: {
        type: index_1.Sequelize.INTEGER,
        references: {
            model: department_1.Department,
            key: 'departmentId',
        },
        allowNull: false,
    },
    data: {
        type: index_1.Sequelize.DATE,
        allowNull: false,
    },
    shifts: {
        type: index_1.Sequelize.INTEGER,
        allowNull: false,
    },
    docters: {
        type: index_1.Sequelize.STRING(240),
        allowNull: true,
    },
}, {
    // 参数
    timestamps: false,
    freezeTableName: true,
});
exports.createTableDocterWork = function () {
    exports.DocterWork.sync({ force: true }).then(function () {
        console.log('创建成功');
    });
};
