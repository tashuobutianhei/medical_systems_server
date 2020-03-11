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
exports.HospitalizationInfoList = index_1.sequelize.define('HospitalizationInfoList', {
    HospitalizationId: {
        type: index_1.Sequelize.STRING(12),
        allowNull: false,
        primaryKey: true,
        unique: true,
    },
    caseId: {
        type: index_1.Sequelize.STRING(12),
        references: {
            model: patientCase_1.PatientCase,
            key: 'caseId',
        },
    },
    assayId: {
        type: index_1.Sequelize.TEXT,
    },
    patientStatus: {
        type: index_1.Sequelize.STRING(12),
        allowNull: false,
    },
    medicine: {
        type: index_1.Sequelize.STRING(100),
        allowNull: false,
    },
    TreatmentRecord: {
        type: index_1.Sequelize.STRING(100),
        allowNull: false,
    },
    recovery: {
        type: index_1.Sequelize.INTEGER,
        allowNull: false,
    },
    date: {
        type: index_1.Sequelize.DATE,
        allowNull: false,
    },
}, {
    // 参数
    timestamps: false,
    freezeTableName: true,
});
exports.createTableHospitalizationInfoList = function () {
    exports.HospitalizationInfoList.sync({ force: true }).then(function () {
        console.log('创建成功');
    });
};
exports.insert = function (info) {
    return exports.HospitalizationInfoList.create(info).then(function (res) {
        console.log(res.id);
        return res.dataValues;
    }).catch(function (e) {
        console.log(e);
        return false;
    });
};
exports.findOneByKey = function (params, attributes) {
    return exports.HospitalizationInfoList.findOne({
        where: __assign({}, params),
    }).then(function (info) {
        return info && info.dataValues;
    });
};
exports.findAllByKey = function (params) {
    return exports.HospitalizationInfoList.findAll({
        where: __assign({}, params),
    }).then(function (info) {
        return info && info.map(function (item) {
            return item.dataValues;
        });
    });
};
exports.destroy = function (Params) {
    return exports.HospitalizationInfoList.destroy({
        where: __assign({}, Params),
    });
};
exports.update = function (updateParams, selectParams) {
    return exports.HospitalizationInfoList.update(updateParams, {
        where: __assign({}, selectParams),
    });
};
