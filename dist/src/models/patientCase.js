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
var patient_1 = require("./patient");
exports.PatientCase = index_1.sequelize.define('PatientCase', {
    caseId: {
        type: index_1.Sequelize.STRING(12),
        allowNull: false,
        primaryKey: true,
        unique: true,
    },
    uid: {
        type: index_1.Sequelize.STRING(12),
        references: {
            model: patient_1.Patient,
            key: 'uid',
        },
    },
    docterId: {
        type: index_1.Sequelize.STRING(12),
        unique: true,
    },
    registerDate: {
        type: index_1.Sequelize.DATE,
        allowNull: false,
    },
    describe: {
        type: index_1.Sequelize.STRING(100),
        allowNull: false,
    },
    docterView: {
        type: index_1.Sequelize.STRING(100),
        allowNull: false,
    },
    result: {
        type: index_1.Sequelize.STRING(100),
        allowNull: false,
    },
    medicine: {
        type: index_1.Sequelize.STRING(200),
    },
    HospitalizationId: {
        type: index_1.Sequelize.INTEGER,
    },
}, {
    // 参数
    timestamps: false,
    freezeTableName: true,
});
exports.createTablePatientCase = function () {
    exports.PatientCase.sync({ force: true }).then(function () {
        console.log('创建成功');
    });
};
exports.insert = function (info) {
    return exports.PatientCase.create(info).then(function (res) {
        console.log(res.id);
        return true;
    }).catch(function (e) {
        console.log(e);
        return false;
    });
};
exports.findOneByKey = function (params, attributes) {
    return exports.PatientCase.findOne({
        where: __assign({}, params),
    }).then(function (info) {
        return info && info.dataValues;
    });
};
exports.findAllByKey = function (params) {
    return exports.PatientCase.findAll({
        where: __assign({}, params),
    }).then(function (info) {
        return info && info.map(function (item) {
            return item.dataValues;
        });
    });
};
exports.destroy = function (Params) {
    return exports.PatientCase.destroy({
        where: __assign({}, Params),
    });
};
exports.update = function (updateParams, selectParams) {
    return exports.PatientCase.update(updateParams, {
        where: __assign({}, selectParams),
    });
};
