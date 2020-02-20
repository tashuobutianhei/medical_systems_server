"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// import Sequelize from 'sequelize';
exports.Sequelize = require('sequelize');
// import {createTableAssay} from './assay';
// import {createTableDepartment} from './department';
// import {createTableDocters} from './docter';
// import {createTableDocterWork} from './docterWork';
// import {createTableHospitalizationInfoList} from './hospitalizationInfoList';
// import {createTablePatient} from './patient';
// import {createTablePatientCase} from './patientCase';
exports.sequelize = new exports.Sequelize('test', 'root', '1997123long', {
    host: 'localhost',
    dialect: 'mysql',
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000,
    },
});
exports.connectMysql = function () {
    exports.sequelize.authenticate().then(function () {
        console.log('Connection has been established successfully.');
    }).catch(function (err) {
        console.error('Unable to connect to the database:', err);
    });
};
exports.createTable = function () {
    // createTableHospitalizationInfoList();
    // createTableAssay();
    // createTablePatient();
    // createTablePatientCase();
    // createTableDepartment();
    // createTableDocters();
    // createTableDocterWork();
};
