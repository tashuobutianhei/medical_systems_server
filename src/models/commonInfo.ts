/* eslint-disable new-cap */
import {sequelize, Sequelize} from './index';
// import {DoctorWork} from './doctorWork';
// import {Doctors} from './doctor';

export const CommonInfo = sequelize.define('CommonInfo', {
  // 属性
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
    unique: true,
  },
  carousel: {
    type: Sequelize.TEXT,
    allowNull: true,
  },
  order: {
    type: Sequelize.TEXT,
    allowNull: true,
  },
  doctor: {
    type: Sequelize.TEXT,
    allowNull: true,
  },
}, {
  // 参数
  timestamps: false,
  freezeTableName: true,
});

export const insert = (info: any) => {
  return CommonInfo.create(info).then((res: { id: any; })=> {
    console.log(res.id);
    return true;
  }).catch((e: any) => {
    console.log(e);
    return false;
  });
};

export const findOneByKey= (params: any, attributes: string[]) => {
  return CommonInfo.findOne({
    where: {...params},
  }).then((info: any) => {
    return info && info.dataValues;
  });
};


export const findAllByKey= (params: any) => {
  return CommonInfo.findAll({
    where: {...params},
  }).then((info: any) => {
    return info && info.map((item: { dataValues: any; })=> {
      return item.dataValues;
    });
  });
};

export const destroy = (Params: any) =>{
  return CommonInfo.destroy({
    where: {
      ...Params,
    },
  });
};

export const update = (updateParams: any, selectParams: any) =>{
  return CommonInfo.update(updateParams, {
    where: {
      ...selectParams,
    },
  });
};
