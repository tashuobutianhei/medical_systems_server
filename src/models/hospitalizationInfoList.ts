/* eslint-disable new-cap */
import {sequelize, Sequelize} from './index';
import {PatientCase} from './patientCase';


export const HospitalizationInfoList = sequelize.define(
    'HospitalizationInfoList', {
      HospitalizationId: {
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
      patientStatus: {
        type: Sequelize.STRING(12),
        allowNull: false,
      },
      medicine: {
        type: Sequelize.STRING(100),
        allowNull: false,
      },
      TreatmentRecord: {
        type: Sequelize.STRING(100),
        allowNull: false,
      },
      recovery: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      date: {
        type: Sequelize.DATE,
        allowNull: false,
      },
    }, {
      // 参数
      timestamps: false,
      freezeTableName: true,
    });

export const createTableHospitalizationInfoList= function() {
  HospitalizationInfoList.sync({force: true}).then(() => {
    console.log('创建成功');
  });
};
