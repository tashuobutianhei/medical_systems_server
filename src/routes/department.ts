import Router from 'koa-router';
import {addDepartment} from '../controllers/department';
import {addDocter} from '../controllers/docter/docter';
import {addAdmin} from '../controllers/department';


const router = new Router();

router.prefix('/department');

router.use(async (ctx: any, next) => {
  // department接口对管理员开放
  if (ctx.state.user && ctx.state.user.userType !== 0) {
    await next();
  } else {
    return ctx.body = {
      code: 401,
      message: '无权限',
    };
  }
});

router.post('/', addDepartment); // 添加科室

router.post('/docters', addDocter); // 添加医生

router.post('/admin', addAdmin); // 增加管理员


export default router;
