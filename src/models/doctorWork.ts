/* eslint-disable new-cap */
import {sequelize, Sequelize} from './index';
import {Department} from './department';


export const DoctorWork = sequelize.define('DoctorWork', {
  // 属性
  wokrId: {
    type: Sequelize.STRING(12), // 2020 02 26 01 0
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
  doctors: {
    type: Sequelize.STRING(240),
    allowNull: true,
  },
  editer: {
    type: Sequelize.STRING(30),
    allowNull: true,
  },
}, {
  // 参数
  timestamps: false,
  freezeTableName: true,
});

export const createTableDoctorWork = function() {
  DoctorWork.sync({force: true}).then(() => {
    console.log('创建成功');
  });
};

export const insert = (doctorWorkInfo: any) => {
  return DoctorWork.create(doctorWorkInfo).then((res: { id: any; })=> {
    console.log(res.id);
    return true;
  }).catch((e: any) => {
    console.log(e);
    return false;
  });
};

export const findOneByKey= (key: string, value: any, attributes: string[]) => {
  const params:{[proppName:string]:any} = {};
  params[key] = value;
  return DoctorWork.findOne({
    where: {...params},
    attributes: [...attributes],
  }).then((info: any) => {
    return info && info.dataValues;
  });
};


export const findAllByKey= (params: any) => {
  return DoctorWork.findAll({
    where: {...params},
  }).then((info: any) => {
    return info && info.map((item: { dataValues: any; })=> {
      return item.dataValues;
    });
  });
};

export const update = (updateParams: any, selectParams: any) =>{
  console.log(selectParams);
  return DoctorWork.update(updateParams, {
    where: {
      ...selectParams,
    },
  });
};
