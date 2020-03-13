/* eslint-disable new-cap */
import {sequelize, Sequelize} from './index';
import {Department} from './department';
import {docterInfo as docterInfoType} from '../type/docterType';

export const Docters = sequelize.define('Docters', {
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
  },
}, {
  // 参数
  timestamps: false,
  freezeTableName: true,
});

export const createTableDocters = function() {
  Docters.sync({force: true}).then(() => {
    console.log('创建成功');
  });
};

export const insert = (docterInfo: docterInfoType) => {
  return Docters.create(docterInfo).then((res: { id: any; })=> {
    return true;
  }).catch((e: any) => {
    console.log(e);
    return false;
  });
};


export const findOneByKey= (key: string, value: any, attributes: string[]) => {
  const params:{[proppName:string]:any} = {};
  params[key] = value;
  return Docters.findOne({
    where: {...params},
    attributes: [...attributes],
  }).then((info: any) => {
    return info && info.dataValues;
  });
};


export const findAllByKey= (params: any) => {
  return Docters.findAll({
    where: {...params},
  }).then((info: any) => {
    return info && info.map((item: { dataValues: any; })=> {
      return item.dataValues;
    });
  });
};


export const destroy = (Params: any) =>{
  return Docters.destroy({
    where: {
      ...Params,
    },
  });
};

export const update = (updateParams: any, selectParams: any) =>{
  return Docters.update(updateParams, {
    where: {
      ...selectParams,
    },
  });
};