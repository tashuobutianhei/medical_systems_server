import Router from 'koa-router';
import {
  Order,
  findOrder,
} from '../controllers/docter/order';

const router = new Router();

router.prefix('/order');

router.use(async (ctx: any, next) => {
  // // department接口对管理员开放
  // let auth = false;
  // if (ctx.request.url === '/' && ctx.request.method === 'GET') {
  //   auth = true;
  // }
  if (ctx.state.user) {
    await next();
  } else {
    return ctx.body = {
      code: 401,
      message: '无权限',
    };
  }
});

router.get('/', findOrder); // 查

router.post('/', Order); //

export default router;
