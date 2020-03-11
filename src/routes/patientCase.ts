import Router from 'koa-router';
import {
  getPatientCase as getByworkerId,
  setPatientCaseModeDoctor,
  setPatientCaseModeHos,
} from '../controllers/docter/patientCase';
import {
  getAssayById
} from '../controllers/docter/assay';

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

router.post('/hospital', setPatientCaseModeHos); // 诊断模式下病例

router.get('/assay', getAssayById); //

export default router;
