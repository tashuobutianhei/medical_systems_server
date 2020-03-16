import {mysqlDbOption} from '../config';

export const Sequelize = require('sequelize');


export const sequelize = new Sequelize(
    mysqlDbOption.db,
    mysqlDbOption.name,
    mysqlDbOption.password, {
      ...mysqlDbOption.options,
    });


// import {createTableAssay} from './assay';
// import {createTableDepartment} from './department';
// import {createTableDoctors} from './doctor';
// import {createTableDoctorWork} from './doctorWork';
// import {createTableHospitalizationInfoList} from './hospitalizationInfoList';
// import {createTablePatient} from './patient';
// import {createTablePatientCase} from './patientCase';
import {createTableOrder} from './order';
// import {createTableAdmin} from './manager';

export const connectMysql = () => {
  sequelize.authenticate().then(() => {
    console.log('Connection has been established successfully.');
  }).catch((err: any) => {
    console.error('Unable to connect to the database:', err);
  });
};

export const createTable = () => {
  // createTableHospitalizationInfoList();
  // createTableAssay();
  // createTablePatient();
  // createTablePatientCase();
  // createTableDepartment();
  // createTableDoctors();
  // createTableDoctorWork();
  console.log(111);
  createTableOrder();
};
