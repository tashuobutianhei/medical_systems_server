import Router from 'koa-router';
import {registerPatient, loginPatient} from '../controllers/user';

const router = new Router();

router.prefix('/users');

router.get('/', function(ctx, next) {
  ctx.body = 'this is a users response!';
});

router.post('/register', registerPatient);

router.post('/login', loginPatient);

export default router;
