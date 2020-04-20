import Router from 'koa-router';

import {
  getDepartmentExpendDoctor,
  addDepartment,
  deleteDeparment,
} from '../controllers/Admin/department';
import {
  addDoctor,
  outDoctor,
} from '../controllers/Admin/doctor';
import {
  findAllPatient,
} from '../controllers/Admin/user';
import {
  getCommonInfo,
  update as updateCommonInfo,
} from '../controllers/Admin/info';
import {
  addExamination,
  deleteExamination,
} from '../controllers/examination';
import {
  insertOfArticle,
  deleteOfArticle,
  updateOfArticle,
  findOfArticle,
} from '../controllers/Admin/article';
import {resetInfoStore} from '../store/info';
import {logError} from '../middware/errorLog';


const router = new Router();

router.prefix('/admin');

router.use(async (ctx: any, next) => {
  // 只有管理员可访问
  let auth = false;
  if (ctx.request.method === 'GET') {
    auth = true;
  }
  if (auth || (ctx.state.userInfo && ctx.state.userInfo.userType == 0)) {
    await next();
  } else {
    return ctx.body = {
      code: 401,
      message: '无权限',
    };
  }
});

router.get('/department', getDepartmentExpendDoctor); // 获取所有科室,包含医生

router.get('/user', findAllPatient); // 获取患者/分页

router.post('/department', addDepartment); // 添加科室

router.delete('/department', deleteDeparment); // 删除科室

router.post('/doctors', addDoctor); // 添加医生

router.delete('/doctors', outDoctor); // 删除医生

router.get('/info', getCommonInfo); // 获取医院信息

router.post('/info', updateCommonInfo); // 更新信息

router.post('/exam', addExamination); // 更新检查项目

router.delete('/exam', deleteExamination); // 删除检查项目

// 文章系统，增删改查
router.get('/article', findOfArticle);

router.post('/article', insertOfArticle);

router.put('/article', updateOfArticle);

router.delete('/article', deleteOfArticle);


router.use(async (ctx, next) => {
  if (ctx.request.method !== 'GET') {
    resetInfoStore();
  };
  await next();
});

// 错误处理
router.use(logError);

// router.post('/admin', addAdmin); // 增加管理员

export default router;
