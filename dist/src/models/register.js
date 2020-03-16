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
var order_1 = require("./order");
var patientCase_1 = require("./patientCase");
exports.Register = index_1.sequelize.define('Register', {
    // 属性
    registerId: {
        type: index_1.Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
        unique: true,
    },
    id: {
        type: index_1.Sequelize.INTEGER,
        references: {
            model: order_1.Order,
            key: 'id',
        },
        allowNull: false,
    },
    caseId: {
        type: index_1.Sequelize.STRING(12),
        references: {
            model: patientCase_1.PatientCase,
            key: 'caseId',
        },
        allowNull: false,
    },
}, {
    // 参数
    timestamps: false,
    freezeTableName: true,
});
exports.createTableOrder = function () {
    exports.Register.sync({ force: true }).then(function () {
        console.log('创建成功');
    });
};
exports.insert = function (info) {
    return exports.Register.create(info).then(function (res) {
        console.log(res.id);
        return true;
    }).catch(function (e) {
        console.log(e);
        return false;
    });
};
exports.findOneByKey = function (params, attributes) {
    return exports.Register.findOne({
        where: __assign({}, params),
    }).then(function (info) {
        return info && info.dataValues;
    });
};
exports.findAllByKey = function (params) {
    return exports.Register.findAll({
        where: __assign({}, params),
    }).then(function (info) {
        return info && info.map(function (item) {
            return item.dataValues;
        });
    });
};
exports.destroy = function (Params) {
    return exports.Register.destroy({
        where: __assign({}, Params),
    });
};
exports.update = function (updateParams, selectParams) {
    return exports.Register.update(updateParams, {
        where: __assign({}, selectParams),
    });
};
