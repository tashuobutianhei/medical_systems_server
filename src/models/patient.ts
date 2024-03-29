/* eslint-disable new-cap */
import {sequelize, Sequelize} from './index';
import {patientInfo} from '../type/patientType';

export const Patient = sequelize.define('Patient', {
  // 属性
  uid: {
    type: Sequelize.STRING(12),
    allowNull: false,
    primaryKey: true,
    unique: true,
  },
  username: {
    type: Sequelize.STRING(12),
    allowNull: false,
    unique: true,
  },
  password: {
    type: Sequelize.STRING(60),
    allowNull: false,
  },
  name: {
    type: Sequelize.TEXT,
    allowNull: false,
  },
  idcard: {
    type: Sequelize.STRING(18),
    allowNull: false,
    unique: true,
  },
  sex: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  age: {
    type: Sequelize.INTEGER,
    defaultValue: 0,
  },
  tel: {
    type: Sequelize.STRING(11),
    allowNull: false,
  },
  address: {
    type: Sequelize.STRING(200),
    defaultValue: '',
  },
  avatar: {
    type: Sequelize.STRING(255),
    defaultValue: '',
  },
}, {
  // 参数
  timestamps: false,
  freezeTableName: true,
});

export const createTablePatient = function() {
  Patient.sync({force: true}).then(() => {
    console.log('创建成功');
  });
};

export const insert = (patientInfo: patientInfo) => {
  return Patient.create(patientInfo).then((res: { id: any; })=> {
    console.log(res.id);
    return true;
  }).catch((e: any) => {
    console.log(e);
    return e;
  });
};

export const findOneByKey= (key: string, value: any, attributes: string[]) => {
  const params:{[proppName:string]:any} = {};
  params[key] = value;
  return Patient.findOne({
    where: {...params},
    attributes: [...attributes],
  }).then((info: any) => {
    return info && info.dataValues;
  });
};

export const update = (updateParams: any, selectParams: any) =>{
  return Patient.update(updateParams, {
    where: {
      ...selectParams,
    },
  });
};

export const findAllByKey= (params: {
  userInfo: any
  offset: number,
  limit: number
}) => {
  return Patient.findAll({
    where: params.userInfo,
    offset: params.offset, limit: params.limit,
  }).then((info: any) => {
    return info && info.map((item: { dataValues: any; })=> {
      return item.dataValues;
    });
  });
};


