/* eslint-disable new-cap */
import {sequelize, Sequelize} from './index';
import {PatientCase} from './patientCase';


export const Assay = sequelize.define('Assay', {
  assayId: {
    type: Sequelize.INTEGER,
    allowNull: false,
    primaryKey: true,
    unique: true,
    autoIncrement: true,
  },
  caseId: {
    type: Sequelize.STRING(12),
    references: {
      model: PatientCase,
      key: 'caseId',
    },
  },
  assayName: {
    type: Sequelize.INTEGER,
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

export const insert = (info: any) => {
  return Assay.create(info).then((res:any)=> {
    return res.dataValues;
  }).catch((e: any) => {
    console.log(e);
    return false;
  });
};


export const findAllByKey= (params: any) => {
  return Assay.findAll({
    where: {...params},
  }).then((info: any) => {
    return info && info.map((item: { dataValues: any; })=> {
      return item.dataValues;
    });
  });
};

export const findOneByKey= (params: any) => {
  return Assay.findOne({
    where: {...params},
  }).then((info: any) => {
    return info && info.dataValues;
  });
};
