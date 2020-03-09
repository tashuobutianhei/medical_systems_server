import Router from 'koa-router';
import {
  getPatientCase as getByworkerId,
  setPatientCaseModeDoctor,
} from '../controllers/docter/patientCase';

const router = new Router();

router.prefix('/patientCase');

router.use(async (ctx: any, next) => {

  if (false || ctx.state.user && ctx.state.user.userType == 2) {
    await next();
  } else {
    return ctx.body = {
      code: 401,
      message: '无权限',
    };
  }
});

router.get('/', getByworkerId); // 查

router.post('/doctor', setPatientCaseModeDoctor); // 诊断模式下病例

export default router;
