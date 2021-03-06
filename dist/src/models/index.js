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
var config_1 = require("../config");
exports.Sequelize = require('sequelize');
exports.sequelize = new exports.Sequelize(config_1.mysqlDbOption.db, config_1.mysqlDbOption.name, config_1.mysqlDbOption.password, __assign({}, config_1.mysqlDbOption.options));
// import {createTableAssay} from './assay';
// import {createTableDepartment} from './department';
// import {createTableDoctors} from './doctor';
// import {createTableDoctorWork} from './doctorWork';
// import {createTableHospitalizationInfoList} from './hospitalizationInfoList';
// import {createTablePatient} from './patient';
// import {createTablePatientCase} from './patientCase';
var order_1 = require("./order");
// import {createTableAdmin} from './manager';
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
    // createTableDoctors();
    // createTableDoctorWork();
    console.log(111);
    order_1.createTableOrder();
};
