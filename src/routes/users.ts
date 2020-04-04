import Router from 'koa-router';
import {registerPatient, login, getUser, updateUser} from '../controllers/user';
import {captcha, checkUserInfo, phone} from '../controllers/tool';
import {createTable} from '../models/index';

const router = new Router();

router.prefix('/users');

router.use(async (ctx, next) => {
  return await next();
});

router.get('/', function(ctx, next) {
  ctx.body = 'this is a users response!';
});

router.post('/register', registerPatient);

router.post('/login', login);

router.get('/getUser', getUser);

router.get('/create', createTable);

router.put('/', updateUser);

router.get('/captcha', captcha);

router.get('/checkUserInfo', checkUserInfo);

router.get('/phone', phone);

export default router;
