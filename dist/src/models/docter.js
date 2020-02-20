"use strict";
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
        type: index_1.Sequelize.STRING(50),
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
