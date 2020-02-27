import Router from 'koa-router';
import {
  createWorkList,
  addSchedule,
  getSchedule,
  deleteSchedule,
} from '../controllers/docter/schedule';

const router = new Router();

router.prefix('/schedule');

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

router.get('/createWork', createWorkList); // 增

router.post('/', addSchedule); // 改

router.get('/', getSchedule); // 查

router.delete('/', deleteSchedule); // 删

export default router;
