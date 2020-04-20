import {findOneByKey as findOneByKeyPatient} from '../models/patient';
import axios from 'axios';
import {encode} from '../utils/bcrypt';
import urlencode from 'urlencode';

const captchapng = require('captchapng');

export const phone = async (ctx: any, next: any) => {
  try {
    const query:any = ctx.query;

    const code = Math.floor(Math.random() * 9000+1000) + '';
    console.log(code);
    const response = await axios({
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      url: 'http://api01.monyun.cn:7901/sms/v2/std/single_send',
      data: {
        userid: 'E10CR1',
        pwd: 'w1dF98',
        apikey: '8074e341df6d201b15f71e72492845ff',
        mobile: query.mobile,
        content: urlencode(`验证码：${code}，打死都不要告诉别人哦！`, 'gbk'),
      },
    });
    console.log(response.data);
    if (response.data.result === 0) {
      ctx.cookies.set( query.type === 'login' ? 'loginPhoneCaptcha' : 'regPhoneCaptcha', encode(code), {maxAge: 360000, httpOnly: true});
      return ctx.body = {
        code: 0,
      };
    } else {
      ctx.body = {
        code: -1,
        error: '验证服务错误',
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


export const captcha = async (ctx:any, next: any) => {
  try {
    const cap = Math.floor(Math.random() * 9000+1000);
    const p = new captchapng(80, 30, cap);
    p.color(0, 0, 0, 0);
    p.color(80, 80, 80, 255);
    const base64 = p.getBase64();

    ctx.cookies.set('captcha', cap, {maxAge: 360000, httpOnly: true});
    ctx.status = 200;
    // ctx.set({'Content-Type' : 'image/png');
    ctx.body = {
      code: 0,
      cap: 'data:image/png;base64,' + base64,
    };
  } catch (e) {
    ctx.state.nextInfo = {
      type: -1,
      error: e,
    };
    await next();
  }
};

export const checkUserInfo = async (ctx: any, next: any) => {
  try {
    const query = ctx.query;
    const info = await findOneByKeyPatient(query.key, query.value,
        ['username', 'uid', 'name', 'idcard', 'sex', 'age', 'tel', 'address', 'avatar']);

    ctx.body = {
      code: 0,
      data: info,
    };
  } catch (e) {
    ctx.state.nextInfo = {
      type: -1,
      error: e,
    };
    await next();
  }
};
