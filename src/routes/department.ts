import Router from 'koa-router';
import {addDepartment} from '../controllers/department';
import {addDocter} from '../controllers/docter/docter';
import {addAdmin, getDepartment} from '../controllers/department';
import {getExamination} from '../controllers/examination';


const router = new Router();

router.prefix('/department');


router.use(async (ctx: any, next) => {
  // department接口对管理员开放
  let auth = false;
  if (ctx.request.url === '/department' && ctx.request.method === 'GET') {
    auth = true;
  }
  if (ctx.request.url === '/department/examination' && ctx.request.method === 'GET') {
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

router.post('/', addDepartment); // 添加科室

router.post('/docters', addDocter); // 添加医生

router.post('/admin', addAdmin); // 增加管理员

router.get('/examination', getExamination); // 获取检查信息

export default router;
