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
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable new-cap */
var index_1 = require("./index");
var doctorWork_1 = require("./doctorWork");
var doctor_1 = require("./doctor");
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
            model: doctorWork_1.DoctorWork,
            key: 'wokrId',
        },
        allowNull: false,
    },
    workerId: {
        type: index_1.Sequelize.STRING(12),
        references: {
            model: doctor_1.Doctors,
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
exports.insert = function (info) {
    return exports.Order.create(info).then(function (res) {
        console.log(res.id);
        return true;
    }).catch(function (e) {
        console.log(e);
        return false;
    });
};
exports.findOneByKey = function (params, attributes) {
    return exports.Order.findOne({
        where: __assign({}, params),
    }).then(function (info) {
        return info && info.dataValues;
    });
};
exports.findAllByKey = function (params) {
    return exports.Order.findAll({
        where: __assign({}, params),
    }).then(function (info) {
        return info && info.map(function (item) {
            return item.dataValues;
        });
    });
};
exports.destroy = function (Params) {
    return exports.Order.destroy({
        where: __assign({}, Params),
    });
};
exports.update = function (updateParams, selectParams) {
    return exports.Order.update(updateParams, {
        where: __assign({}, selectParams),
    });
};
