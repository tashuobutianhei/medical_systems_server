/* eslint-disable new-cap */
import {sequelize, Sequelize} from './index';
import {PatientCase} from './patientCase';


export const Assay = sequelize.define('Assay', {
  assayId: {
    type: Sequelize.STRING(12),
    allowNull: false,
    primaryKey: true,
    unique: true,
  },
  caseId: {
    type: Sequelize.STRING(12),
    references: {
      model: PatientCase,
      key: 'caseId',
    },
  },
  assayName: {
    type: Sequelize.STRING(12),
    allowNull: false,
  },
  assayResult: {
    type: Sequelize.STRING(12),
    allowNull: false,
  },
  assayDate: {
    type: Sequelize.DATE,
    allowNull: false,
  },
}, {
  // 参数
  timestamps: false,
  freezeTableName: true,
});

export const createTableAssay = function() {
  Assay.sync({force: true}).then(() => {
    console.log('创建成功');
  });
};
