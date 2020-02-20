"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable new-cap */
var index_1 = require("./index");
exports.Department = index_1.sequelize.define('Department', {
    // 属性
    departmentId: {
        type: index_1.Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        unique: true,
    },
    departmentName: {
        type: index_1.Sequelize.STRING(12),
        allowNull: false,
    },
    information: {
        type: index_1.Sequelize.STRING(100),
        allowNull: false,
    },
}, {
    // 参数
    timestamps: false,
    freezeTableName: true,
});
exports.createTableDepartment = function () {
    exports.Department.sync({ force: true }).then(function () {
        console.log('创建成功');
    });
};
