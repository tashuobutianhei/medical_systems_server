import {encode, compare} from '../utils/bcrypt';
import {insert as insertPatient, findOneByKey} from '../models/patient';
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
    if (!userInfo.username || !userInfo.password) {
      return ctx.body = {
        code: -2,
        message: '参数有错误',
      };
    }
    const info = await findOneByKey('username', userInfo.username,
        ['username', 'uid', 'name', 'password', 'idcard', 'sex', 'age', 'tel', 'address']);
    const comparesResult = compare(userInfo.password, info.password);
    if (comparesResult) {
      // 验证成功，登陆
      const token = jwt.sign({
        name: userInfo.username,
        _uid: info.uid,
      }, tokenKey, {expiresIn: '72h'});

      delete info.password;
      info.type = 1;

      ctx.body = {
        code: 0,
        data: {
          token: token,
          user: info,
        },
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

export const getUser = async (ctx: any, next: any) => {
  // 身份 0 管理 1 患者 2 医生
  const token = ctx.header.authorization;
  console.log(token)
  if (!token) {
    return ctx.body = {
      code: 401,
      message: '无权限',
    };
  }

  await jwt.verify(token.split(' ')[1], tokenKey,
      async (err: any, info: any)=> {
        if (err) {
          ctx.body = {
            code: 1,
            message: '服务错误',
          };
        } else {
          const userInfo = await findOneByKey('uid', info._uid,
              ['username', 'uid', 'name', 'idcard', 'sex', 'age', 'tel', 'address']);
          if (userInfo) {
            userInfo.type = 1;
            ctx.body = {
              code: 0,
              data: {
                token: token,
                user: userInfo,
              },
            };
          } else {
            ctx.body = {
              code: 401,
              message: '无权限',
            };
          }
        }
      });
};

