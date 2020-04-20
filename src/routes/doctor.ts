import Router from 'koa-router';
import {getDoctors} from '../controllers/doctor/doctor';
import {logError} from '../middware/errorLog';


const router = new Router();

router.prefix('/doctor');

router.get('/', getDoctors);

// 错误处理
router.use(logError);

export default router;
