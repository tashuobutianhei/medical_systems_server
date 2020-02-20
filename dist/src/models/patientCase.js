"use strict";
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
