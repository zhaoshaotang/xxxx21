import Router from 'vue-router';vueRouter
import Vue from 'vue';
import userToken from './utils/userToken';
Vue.use(Router)
const vueRouter = new Router({
  mode: 'history',
  routes: [{
    path: '/',
    name: '列表页',
    component: () =>
      import( /* webpackChunkName: "page" */ '@/page/index')
  }, {
    path: '/build/:id',
    name: 'build',
    component: () =>
      import( /* webpackChunkName: "page" */ '@/page/build')
  }, {
    path: '/view/:id',
    name: 'view',
    component: () =>
      import( /* webpackChunkName: "page" */ '@/page/view')
  }]
})

//从任何路由中检测
vueRouter.beforeEach((to, from, next) => {

  if(userToken.isExitToken()){
    next();
    return;
  }

  //如果没有token则处理 这里自己处理跳转
  alert("没有带token 可以执行跳转到登录页面去");
  
  next(false);
})

export default vueRouter;
