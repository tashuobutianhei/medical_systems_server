import Router from 'koa-router';
import {
  createWorkList,
  addSchedule,
  getSchedule,
  deleteSchedule,
  getScheduleOfPeriod,
  getScheduleToday,
} from '../controllers/doctor/schedule';

const router = new Router();

router.prefix('/schedule');

router.use(async (ctx: any, next) => {
  // department接口对管理员开放
  let auth = false;
  if (ctx.request.url !== '/createWork' && ctx.request.method === 'GET') {
    auth = true;
  }

  if (auth || ctx.state.user && ctx.state.user.userType == 2) {
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

router.get('/getScheduleOfPeriod', getScheduleOfPeriod); // 查

router.delete('/', deleteSchedule); // 删

router.get('/today', getScheduleToday); // 查今日排班

export default router;
