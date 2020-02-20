/* eslint-disable new-cap */
import {sequelize, Sequelize} from './index';

export const Department = sequelize.define('Department', {
  // 属性
  departmentId: {
    type: Sequelize.INTEGER,
    allowNull: false,
    primaryKey: true,
    unique: true,
  },
  departmentName: {
    type: Sequelize.STRING(12),
    allowNull: false,
  },
  information: {
    type: Sequelize.STRING(100),
    allowNull: false,
  },
}, {
  // 参数
  timestamps: false,
  freezeTableName: true,
});

export const createTableDepartment = function() {
  Department.sync({force: true}).then(() => {
    console.log('创建成功');
  });
};

