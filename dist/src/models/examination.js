"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable new-cap */
var index_1 = require("./index");
exports.Examination = index_1.sequelize.define('Examination', {
    // 属性
    examinationId: {
        type: index_1.Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        unique: true,
        autoIncrement: true,
    },
    examinationName: {
        type: index_1.Sequelize.STRING(255),
        allowNull: false,
    },
    examinationDesc: {
        type: index_1.Sequelize.TEXT,
    },
}, {
    // 参数
    timestamps: false,
    freezeTableName: true,
});
// export const createTableDepartment = function() {
//   Examination.sync({force: true}).then(() => {
//     console.log('创建成功');
//   });
// };
// export const inset = async function(department: any) {
//   const result = await Examination.findAndCountAll();
//   const departmentId = ++result.count;
//   return Examination.create({...department, departmentId: departmentId}).then((res: { id: any; })=> {
//     return true;
//   }).catch((e: any) => {
//     console.log(e);
//     return false;
//   });
// };
exports.findAllByKey = function (params) {
    return exports.Examination.findAll({}).then(function (info) {
        return info && info.map(function (item) {
            return item.dataValues;
        });
    });
};
