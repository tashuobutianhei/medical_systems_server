/* eslint-disable new-cap */
import {sequelize, Sequelize} from './index';
import {Department} from './department';
import {doctorInfo as doctorInfoType} from '../type/doctorType';

export const Doctors = sequelize.define('Doctors', {
  // 属性
  workerId: {
    type: Sequelize.STRING(12),
    allowNull: false,
    primaryKey: true,
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
  sex: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  age: {
    type: Sequelize.INTEGER,
  },
  idcard: {
    type: Sequelize.STRING(18),
    allowNull: false,
    unique: true,
  },
  tel: {
    type: Sequelize.STRING(11),
    allowNull: false,
  },
  address: {
    type: Sequelize.STRING(200),
  },
  information: {
    type: Sequelize.STRING(100),
    allowNull: false,
  },
  position: {
    type: Sequelize.STRING(18),
    allowNull: false,
  },
  university: {
    type: Sequelize.STRING(18),
    allowNull: false,
  },
  departmentId: {
    type: Sequelize.INTEGER,
    references: {
      model: Department,
      key: 'departmentId',
    },
    allowNull: false,
  },
  status: {
    type: Sequelize.INTEGER, // 0 或者 null 为在职 -1为离职
    defaultValue: 0,
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

export const createTableDoctors = function() {
  Doctors.sync({force: true}).then(() => {
    console.log('创建成功');
  });
};

export const insert = (doctorInfo: doctorInfoType) => {
  return Doctors.create(doctorInfo).then((res: { id: any; })=> {
    return true;
  }).catch((e: any) => {
    console.log(e);
    return false;
  });
};


export const findOneByKey= (key: string, value: any, attributes: string[]) => {
  const params:{[proppName:string]:any} = {};
  params[key] = value;
  return Doctors.findOne({
    where: {...params},
    attributes: [...attributes],
  }).then((info: any) => {
    return info && info.dataValues;
  });
};


export const findAllByKey= (params: any) => {
  return Doctors.findAll({
    where: {...params},
  }).then((info: any) => {
    return info && info.map((item: { dataValues: any; })=> {
      return item.dataValues;
    });
  });
};


export const destroy = (Params: any) =>{
  return Doctors.destroy({
    where: {
      ...Params,
    },
  });
};

export const update = (updateParams: any, selectParams: any) =>{
  return Doctors.update(updateParams, {
    where: {
      ...selectParams,
    },
  });
};