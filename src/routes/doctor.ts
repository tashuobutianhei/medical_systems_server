import Router from 'koa-router';
import {getDoctors} from '../controllers/doctor/doctor';

const router = new Router();

router.prefix('/doctor');

router.use(async (ctx: any, next) => {
  let auth = false;
  if (ctx.request.method === 'GET') {
    auth = true;
  }

  if (auth || (ctx.state.user && ctx.state.user.userType == 2)) {
    await next();
  } else {
    return ctx.body = {
      code: 401,
      message: '无权限',
    };
  }
});
router.get('/', getDoctors);

export default router;
