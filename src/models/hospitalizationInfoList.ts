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
      assayId: {
        type: Sequelize.TEXT,
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

export const insert = (info: any) => {
  return HospitalizationInfoList.create(info).then((res: { id: any; })=> {
    console.log(res.id);
    return true;
  }).catch((e: any) => {
    console.log(e);
    return false;
  });
};

export const findOneByKey= (params: any, attributes: string[]) => {
  return HospitalizationInfoList.findOne({
    where: {...params},
  }).then((info: any) => {
    return info && info.dataValues;
  });
};


export const findAllByKey= (params: any) => {
  return HospitalizationInfoList.findAll({
    where: {...params},
  }).then((info: any) => {
    return info && info.map((item: { dataValues: any; })=> {
      return item.dataValues;
    });
  });
};

export const destroy = (Params: any) =>{
  return HospitalizationInfoList.destroy({
    where: {
      ...Params,
    },
  });
};

export const update = (updateParams: any, selectParams: any) =>{
  return HospitalizationInfoList.update(updateParams, {
    where: {
      ...selectParams,
    },
  });
};
