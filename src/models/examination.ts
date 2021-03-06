/* eslint-disable new-cap */
import {sequelize, Sequelize} from './index';

export const Examination = sequelize.define('Examination', {
  // 属性
  examinationId: {
    type: Sequelize.INTEGER,
    allowNull: false,
    primaryKey: true,
    unique: true,
    autoIncrement: true,
  },
  examinationName: {
    type: Sequelize.STRING(255),
    allowNull: false,
  },
  examinationDesc: {
    type: Sequelize.TEXT,
  },
}, {
  // 参数
  timestamps: false,
  freezeTableName: true,
});

export const inset = async function(info: any) {
  return Examination.create({...info}).then((res: { id: any; })=> {
    return true;
  }).catch((e: any) => {
    console.log(e);
    return false;
  });
};


export const findAllByKey= (params: any) => {
  return Examination.findAll({}).then((info: any) => {
    return info && info.map((item: { dataValues: any; })=> {
      return item.dataValues;
    });
  });
};


export const destroy = (Params: any) =>{
  return Examination.destroy({
    where: {
      ...Params,
    },
  });
};
