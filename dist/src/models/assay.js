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
var patientCase_1 = require("./patientCase");
exports.Assay = index_1.sequelize.define('Assay', {
    assayId: {
        type: index_1.Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        unique: true,
        autoIncrement: true,
    },
    caseId: {
        type: index_1.Sequelize.STRING(12),
        references: {
            model: patientCase_1.PatientCase,
            key: 'caseId',
        },
    },
    assayName: {
        type: index_1.Sequelize.INTEGER,
        allowNull: false,
    },
    assayResult: {
        type: index_1.Sequelize.STRING(12),
        allowNull: false,
    },
    assayDate: {
        type: index_1.Sequelize.DATE,
        allowNull: false,
    },
}, {
    // 参数
    timestamps: false,
    freezeTableName: true,
});
exports.createTableAssay = function () {
    exports.Assay.sync({ force: true }).then(function () {
        console.log('创建成功');
    });
};
exports.insert = function (info) {
    return exports.Assay.create(info).then(function (res) {
        return res.dataValues;
    }).catch(function (e) {
        console.log(e);
        return false;
    });
};
exports.findAllByKey = function (params) {
    return exports.Assay.findAll({
        where: __assign({}, params),
    }).then(function (info) {
        return info && info.map(function (item) {
            return item.dataValues;
        });
    });
};
