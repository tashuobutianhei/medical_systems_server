"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable new-cap */
var index_1 = require("./index");
var patientCase_1 = require("./patientCase");
exports.Assay = index_1.sequelize.define('Assay', {
    assayId: {
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
    assayName: {
        type: index_1.Sequelize.STRING(12),
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
