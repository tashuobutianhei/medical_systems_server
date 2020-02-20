import Router from 'koa-router';
const router = new Router();
router.get('/', async (ctx, next) => {
  // await ctx.render('index', {
  //   title: 'Hello Koa 2!'
  // })
})

router.get('/string', async (ctx, next) => {
  console.log(123);
  ctx.body = 'koa2 string'
})

router.get('/json', async (ctx, next) => {
  ctx.body = {
    title: 'koa2 json'
  }
})

// module.exports = router

export default router;
