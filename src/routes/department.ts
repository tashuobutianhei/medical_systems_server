import Router from 'koa-router';
import {getDepartment} from '../controllers/department';
import {getExamination} from '../controllers/examination';


const router = new Router();

router.prefix('/department');


router.use(async (ctx: any, next) => {
  // department接口对管理员开放
  let auth = false;

  if (ctx.request.method === 'GET') {
    auth = true;
  }

  if (auth || (ctx.state.user && ctx.state.user.userType !== -1)) {
    await next();
  } else {
    return ctx.body = {
      code: 401,
      message: '无权限',
    };
  }
});

router.get('/', getDepartment); // 获取所有科室

router.get('/examination', getExamination); // 获取检查信息

export default router;
