/* eslint-disable new-cap */
import {sequelize, Sequelize} from './index';
import {Order} from './order';
import {PatientCase} from './patientCase';

export const Register = sequelize.define('Register', {
  // 属性
  registerId: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
    unique: true,
  },
  id: {
    type: Sequelize.INTEGER,
    references: {
      model: Order,
      key: 'id',
    },
    allowNull: false,
  },
  caseId: {
    type: Sequelize.STRING(12),
    references: {
      model: PatientCase,
      key: 'caseId',
    },
    allowNull: false,
  },
}, {
  // 参数
  timestamps: false,
  freezeTableName: true,
});

export const createTableOrder= function() {
  Register.sync({force: true}).then(() => {
    console.log('创建成功');
  });
};


export const insert = (info: any) => {
  return Register.create(info).then((res: { id: any; })=> {
    console.log(res.id);
    return true;
  }).catch((e: any) => {
    console.log(e);
    return false;
  });
};

export const findOneByKey= (params: any, attributes: string[]) => {
  return Register.findOne({
    where: {...params},
  }).then((info: any) => {
    return info && info.dataValues;
  });
};


export const findAllByKey= (params: any) => {
  return Register.findAll({
    where: {...params},
  }).then((info: any) => {
    return info && info.map((item: { dataValues: any; })=> {
      return item.dataValues;
    });
  });
};

export const destroy = (Params: any) =>{
  return Register.destroy({
    where: {
      ...Params,
    },
  });
};

export const update = (updateParams: any, selectParams: any) =>{
  return Register.update(updateParams, {
    where: {
      ...selectParams,
    },
  });
};
