import Router from 'koa-router';
import {
  createWorkList,
  addSchedule,
  getSchedule,
  deleteSchedule,
  getScheduleOfPeriod,
  getScheduleToday,
} from '../controllers/doctor/schedule';
import {logError} from '../middware/errorLog';


const router = new Router();

router.prefix('/schedule');

router.use(async (ctx: any, next) => {
  // department接口对管理员开放
  let auth = false;
  if (ctx.request.url !== '/createWork' && ctx.request.method === 'GET') {
    auth = true;
  }

  if (auth || ctx.state.userInfo && ctx.state.userInfo.userType == 2) {
    await next();
  } else {
    return ctx.body = {
      code: 401,
      message: '无权限',
    };
  }
});

router.get('/createWork', createWorkList); // 增加排班

router.post('/', addSchedule); // 改

router.get('/', getSchedule); // 查

router.get('/getScheduleOfPeriod', getScheduleOfPeriod); // 查近期排班

router.delete('/', deleteSchedule); // 删

router.get('/today', getScheduleToday); // 查今日排班

// 错误处理
router.use(logError);

export default router;
