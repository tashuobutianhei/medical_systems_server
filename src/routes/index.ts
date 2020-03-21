import Router from 'koa-router';

import users from './users';
import department from './department';
import doctor from './doctor';
import schedule from './schedule';
import order from './order';
import patientCase from './patientCase';
import admin from './admin';

const router = new Router();

// routes
router.use(users.routes()).use(users.allowedMethods());
router.use(department.routes()).use(department.allowedMethods());
router.use(doctor.routes()).use(doctor.allowedMethods());
router.use(schedule.routes()).use(schedule.allowedMethods());
router.use(order.routes()).use(order.allowedMethods());
router.use(patientCase.routes()).use(patientCase.allowedMethods());
router.use(admin.routes()).use(admin.allowedMethods());
// module.exports = router

export default router;

