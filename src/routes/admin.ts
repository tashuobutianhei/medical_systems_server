import Router from 'koa-router';

import {
  getDepartmentExpendDoctor,
  addDepartment,
} from '../controllers/Admin/department';
import {
  addDocter,
} from '../controllers/Admin/doctor';

const router = new Router();

router.prefix('/admin');

router.use(async (ctx: any, next) => {
  // TODO 权限控制
  // if (ctx.state.user && ctx.state.user.userType === 0) {
  //   await next();
  // } else {
  //   return ctx.body = {
  //     code: 401,
  //     message: '无权限',
  //   };
  // }
  await next();
});

router.get('/department', getDepartmentExpendDoctor); // 获取所有科室,包含医生

router.post('/department', addDepartment); // 添加科室

router.post('/docters', addDocter); // 添加医生

// router.post('/admin', addAdmin); // 增加管理员

export default router;
