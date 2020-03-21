import Router from 'koa-router';
import {
  getPatientCase as getByworkerId,
  setPatientCaseModeDoctor,
  setPatientCaseModeHos,
  getAll,
  getByPatient,
} from '../controllers/doctor/patientCase';
import {
  getAssayById,
} from '../controllers/doctor/assay';

const router = new Router();

router.prefix('/patientCase');

router.use(async (ctx: any, next) => {

  // let auth = false;
  // if (ctx.request.method === 'GET') {
  //   auth = true;
  // }
  if (true || ctx.state.user && ctx.state.user.userType == 2) {
    await next();
  } else {
    return ctx.body = {
      code: 401,
      message: '无权限',
    };
  }
});

router.get('/', getByworkerId); // 查

router.get('/patient', getByPatient); // 查找患者下的所有病例

router.get('/all', getAll); // 查

router.post('/doctor', setPatientCaseModeDoctor); // 诊断模式下病例

router.post('/hospital', setPatientCaseModeHos); // 诊断模式下病例

router.get('/assay', getAssayById); //

export default router;
