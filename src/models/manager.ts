/* eslint-disable new-cap */
import {sequelize, Sequelize} from './index';


export const Admin = sequelize.define('Admin', {
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
    type: Sequelize.STRING(60),
    allowNull: false,
  },
}, {
  // 参数
  timestamps: false,
  freezeTableName: true,
});

export const createTableAdmin= function() {
  Admin.sync({force: true}).then(() => {
    console.log('创建成功');
  });
};

type adminType = {
  uid: string,
  username: string,
  password: string
}

export const insert = (adminInfo: adminType) => {
  return Admin.create(adminInfo).then((res: { id: any; })=> {
    return true;
  }).catch((e: any) => {
    console.log(e);
    return false;
  });
};

export const findOneByKey= (key: string, value: any, attributes: string[]) => {
  const params:{[proppName:string]:any} = {};
  params[key] = value;
  return Admin.findOne({
    where: {...params},
    attributes: [...attributes],
  }).then((info: any) => {
    return info && info.dataValues;
  });
};


// create Table Admin {
//   uid varchar(12) NOT NULL UNIQUE PRIMARY KEY,
//   username varchar(12) NOT NULL,
//   password varchar(60) NOT NULL,
// }