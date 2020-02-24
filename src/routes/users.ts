import Router from 'koa-router';
import {registerPatient, login, getUser} from '../controllers/user';

const router = new Router();

router.prefix('/users');

router.get('/', function(ctx, next) {
  ctx.body = 'this is a users response!';
});

router.post('/register', registerPatient);

router.post('/login', login);

router.get('/getUser', getUser);

export default router;
