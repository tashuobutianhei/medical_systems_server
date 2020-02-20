/* eslint-disable new-cap */
import {sequelize, Sequelize} from './index';
import {Patient} from './patient';


export const PatientCase = sequelize.define('PatientCase', {
  caseId: {
    type: Sequelize.STRING(12),
    allowNull: false,
    primaryKey: true,
    unique: true,
  },
  uid: {
    type: Sequelize.STRING(12),
    references: {
      model: Patient,
      key: 'uid',
    },
  },
  docterId: {
    type: Sequelize.STRING(12),
    unique: true,
  },
  registerDate: {
    type: Sequelize.DATE,
    allowNull: false,
  },
  describe: {
    type: Sequelize.STRING(100),
    allowNull: false,
  },
  docterView: {
    type: Sequelize.STRING(100),
    allowNull: false,
  },
  result: {
    type: Sequelize.STRING(100),
    allowNull: false,
  },
  medicine: {
    type: Sequelize.STRING(200),
  },
  HospitalizationId: {
    type: Sequelize.INTEGER,
  },
}, {
  // 参数
  timestamps: false,
  freezeTableName: true,
});

export const createTablePatientCase = function() {
  PatientCase.sync({force: true}).then(() => {
    console.log('创建成功');
  });
};
