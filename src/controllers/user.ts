import {encode, compare} from '../utils/bcrypt';
import {insert as insertPatient, findOneByUsername} from '../models/patient';
import randomString from 'random-string';
import jwt from 'jsonwebtoken';
import {tokenKey} from '../config';


export const registerPatient = async (ctx: any, next: any) => {
  try {
    const userInfo = ctx.request.body;
    // 传参校验
    if (typeof userInfo === 'object' && Object.keys(userInfo).length > 0) {
      // 密码加密
      userInfo.password = encode(userInfo.password);
      // 生成随机 uid TODO:uid从数据库校验
      userInfo.uid = randomString({length: 12, numbers: true});
      // 插入
      const sesult = await insertPatient(userInfo)
          .catch((e:any) => {
            throw new Error(e);
          });

      if (sesult) {
        ctx.body = {
          code: 1,
          message: '成功',
        };
      } else {
        throw new Error('sql error');
      }
    } else {
      ctx.body = {
        code: -1,
        message: '参数有错误',
      };
    }
  } catch (e) {
    ctx.body = {
      code: -1,
      message: e,
    };
  }
};


export const loginPatient = async (ctx: any, next: any) => {
  try {
    const userInfo = ctx.request.body;
    console.log(userInfo);
    if (!userInfo.username || !userInfo.password) {
      return ctx.body = {
        code: -2,
        message: '参数有错误',
      };
    }

    const info = await findOneByUsername(userInfo.username, ['password', 'uid']);
    const comparesResult = compare(userInfo.password, info.password);
    if (comparesResult) {
      // 验证成功，登陆
      const token = jwt.sign({
        name: userInfo.username,
        _uid: info.uid,
      }, tokenKey, {expiresIn: '72h'});

      ctx.body = {
        code: 0,
        data: token,
        message: '登陆成功',
      };
    } else {
      ctx.body = {
        code: -1,
        message: '密码错误',
      };
    }
  } catch (e) {
    ctx.body = {
      code: -3,
      message: '用户名不存在',
    };
  }
};

