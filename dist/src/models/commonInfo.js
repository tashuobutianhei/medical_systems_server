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
// import {DoctorWork} from './doctorWork';
// import {Doctors} from './doctor';
exports.CommonInfo = index_1.sequelize.define('CommonInfo', {
    // 属性
    id: {
        type: index_1.Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
        unique: true,
    },
    carousel: {
        type: index_1.Sequelize.TEXT,
        allowNull: true,
    },
    order: {
        type: index_1.Sequelize.TEXT,
        allowNull: true,
    },
    doctor: {
        type: index_1.Sequelize.TEXT,
        allowNull: true,
    },
}, {
    // 参数
    timestamps: false,
    freezeTableName: true,
});
exports.insert = function (info) {
    return exports.CommonInfo.create(info).then(function (res) {
        console.log(res.id);
        return true;
    }).catch(function (e) {
        console.log(e);
        return false;
    });
};
exports.findOneByKey = function (params, attributes) {
    return exports.CommonInfo.findOne({
        where: __assign({}, params),
    }).then(function (info) {
        return info && info.dataValues;
    });
};
exports.findAllByKey = function (params) {
    return exports.CommonInfo.findAll({
        where: __assign({}, params),
    }).then(function (info) {
        return info && info.map(function (item) {
            return item.dataValues;
        });
    });
};
exports.destroy = function (Params) {
    return exports.CommonInfo.destroy({
        where: __assign({}, Params),
    });
};
exports.update = function (updateParams, selectParams) {
    return exports.CommonInfo.update(updateParams, {
        where: __assign({}, selectParams),
    });
};
