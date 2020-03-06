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

