"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable new-cap */
var index_1 = require("./index");
exports.Article = index_1.sequelize.define('Article', {
    textId: {
        type: index_1.Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        unique: true,
        autoIncrement: true,
    },
    title: {
        type: index_1.Sequelize.TEXT,
        allowNull: false,
        defaultValue: '',
    },
    value: {
        type: index_1.Sequelize.TEXT,
        allowNull: false,
        defaultValue: '',
    },
    type: {
        type: index_1.Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0,
    },
    update: {
        type: index_1.Sequelize.DATE,
        allowNull: false,
        defaultValue: new Date(),
    },
}, {
    // 参数
    timestamps: false,
    freezeTableName: true,
});
exports.createTableAssay = function () {
    exports.Article.sync({ force: true }).then(function () {
        console.log('创建成功');
    });
};
exports.insert = function (info) {
    return exports.Article.create(info).then(function (res) {
        return res.dataValues;
    }).catch(function (e) {
        console.log(e);
        return false;
    });
};
exports.findAllByKey = function (params) {
    return exports.Article.findAll({
        where: __assign({}, params),
    }).then(function (info) {
        return info && info.map(function (item) {
            return item.dataValues;
        });
    });
};
exports.findOneByKey = function (params) {
    return exports.Article.findOne({
        where: __assign({}, params),
    }).then(function (info) {
        return info && info.dataValues;
    });
};
exports.destroy = function (Params) {
    return exports.Article.destroy({
        where: __assign({}, Params),
    });
};
exports.update = function (updateParams, selectParams) {
    return exports.Article.update(updateParams, {
        where: __assign({}, selectParams),
    });
};
