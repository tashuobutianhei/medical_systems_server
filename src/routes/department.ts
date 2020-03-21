import Router from 'koa-router';
import {getDepartment} from '../controllers/department';
import {getExamination} from '../controllers/examination';


const router = new Router();

router.prefix('/department');

router.get('/', getDepartment); // 获取所有科室

router.get('/examination', getExamination); // 获取检查信息

export default router;
