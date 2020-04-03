import {findOneByKey as findOneByKeyPatient} from '../models/patient';
const captchapng = require('captchapng');


export const captcha = (ctx:any) => {
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
    ctx.body = {
      code: -1,
      data: e,
    };
  }
};

export const checkUserInfo = async (ctx: any) => {
  try {
    const query = ctx.query;
    const info = await findOneByKeyPatient(query.key, query.value,
        ['username', 'uid', 'name', 'idcard', 'sex', 'age', 'tel', 'address', 'avatar']);

    ctx.body = {
      code: 0,
      data: info,
    };
  } catch (e) {
    ctx.body = {
      code: -1,
      error: e,
    };
  }
};
