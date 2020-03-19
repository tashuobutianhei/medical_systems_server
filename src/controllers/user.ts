import {encode, compare} from '../utils/bcrypt';
import {
  insert as insertPatient,
  findOneByKey as findOneByKeyPatient} from '../models/patient';
import {findOneByKey as findOneByKeyDoctor} from '../models/doctor';
import {findOneByKey as findOneByKeyAdmin} from '../models/manager';
import randomString from 'random-string';
import jwt from 'jsonwebtoken';
import {tokenKey} from '../config';
import fs from 'fs';
import path from 'path';
import {PatientCase} from '../models/patientCase';


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
            console.log(e);
            return false;
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


export const login= async (ctx: any, next: any) => {
  try {
    const userInfo = ctx.request.body;
    let info: any;
    if (!userInfo.username || !userInfo.password || !userInfo.userType) {
      return ctx.body = {
        code: -2,
        message: '参数有错误',
      };
    }
    switch (userInfo.userType) {
      case '1':
        info = await findOneByKeyPatient('username', userInfo.username,
            ['username', 'uid', 'name', 'password', 'idcard', 'sex', 'age', 'tel', 'address']);
        break;
      case '2':
        info = await findOneByKeyDoctor('workerId', userInfo.username,
            ['workerId', 'name', 'password', 'idcard', 'sex', 'age', 'tel', 'address']);
        break;
      case '0':
        info = await findOneByKeyAdmin('username', userInfo.username,
            ['uid', 'password']);
        break;
    }
    const comparesResult = compare(userInfo.password, info.password);

    if (comparesResult) {
      const id = info.uid || info.workerId;
      // 验证成功，登陆
      const token = jwt.sign({
        name: userInfo.username,
        _uid: id,
        userType: userInfo.userType,
      }, tokenKey, {expiresIn: '72h'});

      delete info.password;
      info.type = userInfo.userType;

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
          let userInfo: any;
          switch (info.userType) {
            case '0':
              userInfo = await await findOneByKeyAdmin('username', info.name,
                  ['uid', 'username']);
              break;
            case '1':
              userInfo = await findOneByKeyPatient('uid', info._uid,
                  ['username', 'uid', 'name', 'idcard', 'sex', 'age', 'tel', 'address']);
              break;
            case '2':
              userInfo = await findOneByKeyDoctor('workerId', info._uid,
                  ['workerId', 'name', 'idcard', 'sex', 'age',
                    'tel', 'address', 'information', 'position', 'university', 'departmentId']);
              break;
          }

          if (userInfo) {
            userInfo.type = info.userType - 0;
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

export const updateUser = async (ctx:any, next: any) => {
  if (!ctx.state.usefInfo) {
    return ctx.body = {
      code: 401,
      message: '无权限',
    };
  }

  try {
    console.log(ctx.state.usefInfo);
    // 获取后缀
    const postfix = ctx.request.body.avatar.match(/^data:image\/(\w+);base64,/)[1];
    // 去掉图片base64码前面部分data:image/png;base64
    const base64 = ctx.request.body.avatar.replace(/^data:image\/\w+;base64,/, '');
    // 把base64码转成buffer对象，
    const dataBuffer = new Buffer(base64, 'base64');

    const filename = path.resolve(__dirname, '../../public') + '/Patient/Avatar/' + ctx.state.usefInfo._uid + `.${postfix}`;
    const res = await fs.writeFileSync(filename, dataBuffer);
    ctx.body = {
      code: 0,
      message: '操作成功',
    };
  } catch (e) {
    ctx.body = {
      code: -1,
      message: '服务错误',
    };
  }
};

