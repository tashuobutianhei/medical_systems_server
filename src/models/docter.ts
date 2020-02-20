/* eslint-disable new-cap */
import {sequelize, Sequelize} from './index';
import {Department} from './department';

export const Docters = sequelize.define('Docters', {
  // 属性
  workerId: {
    type: Sequelize.STRING(12),
    allowNull: false,
    primaryKey: true,
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

