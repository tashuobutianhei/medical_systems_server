import Router from 'koa-router';
import {
  Order,
  findOrder,
  orderInfo,
} from '../controllers/doctor/order';

const router = new Router();

router.prefix('/order');

router.use(async (ctx: any, next) => {
  if (ctx.state.userInfo) {
    await next();
  } else {
    return ctx.body = {
      code: 401,
      message: '无权限',
    };
  }
});

router.get('/', findOrder); // 查

router.post('/', Order); // 挂号

router.post('/info', orderInfo); // 完善信息

export default router;
