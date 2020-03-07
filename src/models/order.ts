/* eslint-disable new-cap */
import {sequelize, Sequelize} from './index';
import {DocterWork} from './docterWork';
import {Docters} from './docter';

export const Order = sequelize.define('Order', {
  // 属性
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
    unique: true,
  },
  wokrId: {
    type: Sequelize.STRING(12),
    references: {
      model: DocterWork,
      key: 'wokrId',
    },
    allowNull: false,
  },
  workerId: {
    type: Sequelize.STRING(12),
    references: {
      model: Docters,
      key: 'workerId',
    },
    allowNull: false,
  },
  patientCases: { // ,分割数组
    type: Sequelize.TEXT,
  },
  limit: { // 上限
    type: Sequelize.INTEGER,
    allowNull: true,
  },
}, {
  // 参数
  timestamps: false,
  freezeTableName: true,
});

export const createTableOrder= function() {
  Order.sync({force: true}).then(() => {
    console.log('创建成功');
  });
};


export const insert = (info: any) => {
  return Order.create(info).then((res: { id: any; })=> {
    console.log(res.id);
    return true;
  }).catch((e: any) => {
    console.log(e);
    return false;
  });
};

export const findOneByKey= (params: any, attributes: string[]) => {
  return Order.findOne({
    where: {...params},
  }).then((info: any) => {
    return info && info.dataValues;
  });
};


export const findAllByKey= (params: any) => {
  return Order.findAll({
    where: {...params},
  }).then((info: any) => {
    return info && info.map((item: { dataValues: any; })=> {
      return item.dataValues;
    });
  });
};

export const destroy = (Params: any) =>{
  return Order.destroy({
    where: {
      ...Params,
    },
  });
};

export const update = (updateParams: any, selectParams: any) =>{
  return Order.update(updateParams, {
    where: {
      ...selectParams,
    },
  });
};
