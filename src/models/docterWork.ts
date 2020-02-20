/* eslint-disable new-cap */
import {sequelize, Sequelize} from './index';
import {Department} from './department';


export const DocterWork = sequelize.define('DocterWork', {
  // 属性
  wokrId: {
    type: Sequelize.STRING(12),
    allowNull: false,
    primaryKey: true,
    unique: true,
  },
  departmentId: {
    type: Sequelize.INTEGER,
    references: {
      model: Department,
      key: 'departmentId',
    },
    allowNull: false,
  },
  data: {
    type: Sequelize.DATE,
    allowNull: false,
  },
  shifts: {
    type: Sequelize.INTEGER, // 0:早班 1:下午班 2:急诊
    allowNull: false,
  },
  docters: {
    type: Sequelize.STRING(240),
    allowNull: true,
  },
}, {
  // 参数
  timestamps: false,
  freezeTableName: true,
});

export const createTableDocterWork = function() {
  DocterWork.sync({force: true}).then(() => {
    console.log('创建成功');
  });
};
