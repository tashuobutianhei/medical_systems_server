/* eslint-disable new-cap */
import {sequelize, Sequelize} from './index';


export const Article = sequelize.define('Article', {
  textId: {
    type: Sequelize.INTEGER,
    allowNull: false,
    primaryKey: true,
    unique: true,
    autoIncrement: true,
  },
  title: {
    type: Sequelize.TEXT,
    allowNull: true,
  },
  value: {
    type: Sequelize.TEXT,
    allowNull: true,
  },
  type: { // 0 医院公告 1 文章
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  update: {
    type: Sequelize.DATE,
    allowNull: false,
  },
}, {
  // 参数
  timestamps: false,
  freezeTableName: true,
});

export const createTableAssay = function() {
  Article.sync({force: true}).then(() => {
    console.log('创建成功');
  });
};

export const insert = (info: any) => {
  return Article.create(info).then((res:any)=> {
    return res.dataValues;
  }).catch((e: any) => {
    console.log(e);
    return false;
  });
};


export const findAllByKey= (params: any) => {
  return Article.findAll({
    where: {...params},
  }).then((info: any) => {
    return info && info.map((item: { dataValues: any; })=> {
      return item.dataValues;
    });
  });
};

export const findOneByKey= (params: any) => {
  return Article.findOne({
    where: {...params},
  }).then((info: any) => {
    return info && info.dataValues;
  });
};

export const destroy = (Params: any) =>{
  return Article.destroy({
    where: {
      ...Params,
    },
  });
};

export const update = (updateParams: any, selectParams: any) =>{
  return Article.update(updateParams, {
    where: {
      ...selectParams,
    },
  });
};