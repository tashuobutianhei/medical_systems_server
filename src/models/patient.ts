/* eslint-disable new-cap */
import {sequelize, Sequelize} from './index';


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
    type: Sequelize.STRING(50),
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
  },
  tel: {
    type: Sequelize.STRING(11),
    allowNull: false,
  },
  address: {
    type: Sequelize.STRING(200),
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

