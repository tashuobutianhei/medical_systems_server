// import Sequelize from 'sequelize';
export const Sequelize = require('sequelize');

// import {createTableAssay} from './assay';
// import {createTableDepartment} from './department';
// import {createTableDocters} from './docter';
// import {createTableDocterWork} from './docterWork';
// import {createTableHospitalizationInfoList} from './hospitalizationInfoList';
// import {createTablePatient} from './patient';
// import {createTablePatientCase} from './patientCase';

export const sequelize = new Sequelize('test', 'root', '1997123long', {
  host: 'localhost',
  dialect: 'mysql',
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
});

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
  // createTableDocters();
  // createTableDocterWork();
};
