import Router from 'koa-router';
import {
  Order,
  findOrder,
  orderInfo
} from '../controllers/docter/order';

const router = new Router();

router.prefix('/order');

router.use(async (ctx: any, next) => {
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

router.post('/info', orderInfo); // 完善信息

export default router;
