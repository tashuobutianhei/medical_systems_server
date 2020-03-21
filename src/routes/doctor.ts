import Router from 'koa-router';
import {getDoctors} from '../controllers/doctor/doctor';

const router = new Router();

router.prefix('/doctor');

router.get('/', getDoctors);

export default router;
