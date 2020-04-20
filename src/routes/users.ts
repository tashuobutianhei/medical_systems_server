import Router from 'koa-router';
import {registerPatient, login, getUser, updateUser} from '../controllers/user';
import {captcha, checkUserInfo, phone} from '../controllers/tool';
import {createTable} from '../models/index';
// import {logger} from '../logger';
import {logError} from '../middware/errorLog';

const router = new Router();

router.prefix('/users');

router.use(async (ctx, next) => {
  return await next();
});

router.get('/', function(ctx, next) {
  ctx.body = 'this is a users response!';
});

router.post('/register', registerPatient); // 注册

router.post('/login', login); // 登陆

router.get('/getUser', getUser); // 验证token

router.put('/', updateUser); // 更新用户信息

router.get('/captcha', captcha); // 获取图形验证码

router.get('/checkUserInfo', checkUserInfo); // 检查信息是否重复存储

router.get('/phone', phone); // 获取短信验证码

router.get('/create', createTable); // 废弃

// 错误处理
router.use(logError);

export default router;
