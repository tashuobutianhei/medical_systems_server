import {encode, compare} from '../utils/bcrypt';
import {
  insert as insertPatient,
  findOneByKey as findOneByKeyPatient,
  update as updatePatient,
} from '../models/patient';
import {
  findOneByKey as findOneByKeyDoctor,
  update as updateDoctor,
} from '../models/doctor';
import {findOneByKey as findOneByKeyAdmin} from '../models/manager';
import randomString from 'random-string';
import jwt from 'jsonwebtoken';
import {tokenKey} from '../config';
import fs from 'fs';
import path from 'path';
import {
  storeUser,
  getUserStore,
} from '../store/user';
import {resetInfoStore} from '../store/info';

export const registerPatient = async (ctx: any, next: any) => {
  try {
    const userInfo = ctx.request.body;
    // 传参校验
    if (typeof userInfo === 'object' && Object.keys(userInfo).length > 0) {
      const phoneCaptcha = ctx.cookies.get('regPhoneCaptcha');
      if (!compare(userInfo.phoneCaptcha, phoneCaptcha)) {
        return ctx.body = {
          code: -1,
          message: '手机验证码错误',
        };
      }

      // 密码加密
      userInfo.password = encode(userInfo.password);
      // 生成随机 uid TODO:uid从数据库校验
      userInfo.uid = randomString({length: 12, numbers: true});

      delete userInfo.phoneCaptcha;
      // 插入
      const sesult = await insertPatient(userInfo)
          .catch((e:any) => {
            console.log(e);
            return false;
          });

      if (sesult) {
        ctx.body = {
          code: 0,
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
    ctx.state.nextInfo = {
      type: -1,
      error: e,
    };
    await next();
  }
};


export const login= async (ctx: any, next: any) => {
  try {
    let {userType, loginType} = ctx.request.body;
    const loginInfo = JSON.parse(ctx.request.body.userInfo);
    loginType = parseInt(loginType);
    let info: any;

    if (loginType === 0) {
      // 验证码+密码登陆
      const captcha = ctx.cookies.get('captcha');
      if (captcha !== loginInfo.captcha) {
        return ctx.body = {
          code: -1,
          message: '验证码错误',
        };
      }
    } else if (loginType === 1) {
      const phoneCaptcha = ctx.cookies.get('loginPhoneCaptcha');
      if (!compare(loginInfo.loginPhoneCaptcha, phoneCaptcha)) {
        return ctx.body = {
          code: -1,
          message: '手机验证码错误',
        };
      }
    };

    switch (userType) {
      case '1':
        if (loginType === 0) {
          info = await findOneByKeyPatient('username', loginInfo.username,
              ['username', 'uid', 'name', 'password', 'idcard', 'sex', 'age', 'tel', 'address', 'avatar']);
        } else if (loginType === 1) {
          info = await findOneByKeyPatient('tel', loginInfo.tel,
              ['username', 'uid', 'name', 'password', 'idcard', 'sex', 'age', 'tel', 'address', 'avatar']);
        }
        break;
      case '2':
        info = await findOneByKeyDoctor('workerId', loginInfo.username,
            ['workerId', 'name', 'password', 'idcard', 'sex', 'age', 'tel', 'address',
              'information', 'position', 'university', 'departmentId', 'avatar']);
        break;
      case '0':
        info = await findOneByKeyAdmin('username', loginInfo.username,
            ['uid', 'password']);
        break;
    }

    if (!info) {
      return ctx.body = {
        code: 1,
        message: '用户不存在',
      };
    }

    let comparesResult = false;
    // 两种登陆方式，电话验证码和密码
    if (loginType === 1) {
      comparesResult = true;
    } else if (loginType === 0) {
      comparesResult = compare(loginInfo.password, info.password);
    }

    if (comparesResult) {
      const id = info.uid || info.workerId;
      // 验证成功，登陆
      const token = jwt.sign({
        name: loginInfo.username,
        _uid: id,
        userType: userType,
      }, tokenKey, {expiresIn: '72h'});

      delete info.password;
      info.type = userType;

      storeUser(id, info);

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
    ctx.state.nextInfo = {
      type: -1,
      error: e,
    };
    await next();
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
          if (err.name === 'TokenExpiredError') {
            return ctx.body = {
              code: 1000,
              message: '过期',
            };
          }
          ctx.state.nextInfo = {
            type: -1,
            error: err,
          };
          await next();
        } else {
          let userInfo: any = await getUserStore(info._uid); // 使用redis缓存用户信息

          if (!userInfo) { // 防止redis出错
            switch (info.userType) {
              case '0':
                userInfo = await await findOneByKeyAdmin('username', info.name,
                    ['uid', 'username']);
                break;
              case '1':
                userInfo = await findOneByKeyPatient('uid', info._uid,
                    ['username', 'uid', 'name', 'idcard', 'sex', 'age', 'tel', 'address', 'avatar']);
                break;
              case '2':
                userInfo = await findOneByKeyDoctor('workerId', info._uid,
                    ['workerId', 'name', 'idcard', 'sex', 'age',
                      'tel', 'address', 'information', 'position', 'university', 'departmentId', 'avatar']);
                break;
            }
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

const getUserInfoFromdb = async (userInfo: any) => {
  let info: any;
  switch (userInfo.userType) {
    case '1':
      info = await findOneByKeyPatient('uid', userInfo._uid,
          ['username', 'uid', 'name', 'password', 'idcard', 'sex', 'age', 'tel', 'address', 'avatar']);
      break;
    case '2':
      info = await findOneByKeyDoctor('workerId', userInfo._uid,
          ['workerId', 'name', 'password', 'idcard', 'sex', 'age', 'tel', 'address',
            'information', 'position', 'university', 'departmentId', 'avatar']);
      break;
    case '0':
      info = await findOneByKeyAdmin('uid', userInfo._uid,
          ['uid', 'password']);
      break;
  }
  return info;
};


const upPhoto = async (avatar: any, _uid: any, userType: any) => {
  try {
    // 如果存在首先删除文件
    let user; let pathUrl;
    if (userType == 1) {
      user = await findOneByKeyPatient('uid', _uid, ['avatar']);
      pathUrl = 'Patient';
    } else if (userType == 2) {
      user = await findOneByKeyDoctor('workerId', _uid, ['avatar']);
      pathUrl = 'Doctor';
    }

    if (user.avatar) {
      await fs.unlinkSync(path.resolve(__dirname, '../../public') + user.avatar);
    }

    // 上传
    // 获取后缀
    const postfix = avatar.match(/^data:image\/(\w+);base64,/)[1];
    // 去掉图片base64码前面部分data:image/png;base64
    const base64 = avatar.replace(/^data:image\/\w+;base64,/, '');
    // 把base64码转成buffer对象，
    const dataBuffer = Buffer.from(base64, 'base64');

    const filename = path.resolve(__dirname, '../../public') + `/${pathUrl}/Avatar/` + _uid + `.${postfix}`;
    await fs.writeFileSync(filename, dataBuffer);

    return `/${pathUrl}/Avatar/` + _uid + `.${postfix}`;
  } catch (e) {
    throw new Error(e);
  }
};

export const updateUser = async (ctx:any, next: any) => {
  if (!ctx.state.userInfo) {
    return ctx.body = {
      code: 401,
      message: '无权限',
    };
  }

  try {
    const data = ctx.request.body;
    const updateParams: any = {};
    Object.keys(data).forEach((item) => {
      updateParams[item] = data[item];
    });
    if (data.password) {
      updateParams['password'] = encode(data.password);
    }
    if (data.avatar) {
      // 上传头像
      const url = await upPhoto(ctx.request.body.avatar, ctx.state.userInfo._uid, ctx.state.userInfo.userType);
      updateParams.avatar = url;
    };

    let res;
    if (ctx.state.userInfo.userType == 1) {
      res = await updatePatient({
        ...updateParams,
      }, {
        uid: ctx.state.userInfo._uid,
      });
    } else if (ctx.state.userInfo.userType == 2) {
      res = await updateDoctor({
        ...updateParams,
      }, {
        workerId: ctx.state.userInfo._uid,
      });
      resetInfoStore(); // 更新redis中信息
    }

    // 更新用户信息后，保持redis和mysql一致性
    const userinfoNew = await getUserInfoFromdb(ctx.state.userInfo);
    delete userinfoNew.password;
    userinfoNew.type = ctx.state.userInfo.userType;

    storeUser(ctx.state.userInfo._uid, userinfoNew);

    ctx.body = {
      code: res ? 0 : -1,
      message: '修改成功',
    };
  } catch (e) {
    ctx.state.nextInfo = {
      type: -1,
      error: e,
    };
    await next();
  }
};

