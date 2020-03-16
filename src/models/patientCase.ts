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
  doctorId: {
    type: Sequelize.STRING(12),
  },
  registerDate: {
    type: Sequelize.DATE,
    allowNull: false,
  },
  describe: {
    type: Sequelize.TEXT,
    allowNull: false,
  },
  doctorView: {
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
    type: Sequelize.TEXT,
  },
  assayId: {
    type: Sequelize.TEXT,
  },
  status: {
    type: Sequelize.INTEGER, //
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


export const insert = (info: any) => {
  return PatientCase.create(info).then((res: { id: any; })=> {
    console.log(res.id);
    return true;
  }).catch((e: any) => {
    console.log(e);
    return false;
  });
};

export const findOneByKey= (params: any, attributes: string[]) => {
  return PatientCase.findOne({
    where: {...params},
  }).then((info: any) => {
    return info && info.dataValues;
  });
};


export const findAllByKey= (params: any) => {
  return PatientCase.findAll({
    where: {...params},
  }).then((info: any) => {
    return info && info.map((item: { dataValues: any; })=> {
      return item.dataValues;
    });
  });
};

export const destroy = (Params: any) =>{
  return PatientCase.destroy({
    where: {
      ...Params,
    },
  });
};

export const update = (updateParams: any, selectParams: any) =>{
  return PatientCase.update(updateParams, {
    where: {
      ...selectParams,
    },
  });
};
