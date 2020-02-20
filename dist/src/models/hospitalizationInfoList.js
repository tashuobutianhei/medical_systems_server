"use strict";
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
