import Router from 'koa-router';
import {createWorkList} from '../controllers/docter/schedule';


const router = new Router();

router.prefix('/doctor');

router.use(async (ctx: any, next) => {
  // department接口对管理员开放
  if (ctx.state.user && ctx.state.user.userType !== 2) {
    await next();
  } else {
    return ctx.body = {
      code: 401,
      message: '无权限',
    };
  }
});

router.get('/createWork', createWorkList);

export default router;
