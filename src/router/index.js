import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Login from '@/view/login'
import Index from '@/view/index'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'login',
//    component: HelloWorld
      component: (resolve) => require(['../view/login'], resolve),
    },
    {
    	path:'/index',
    	name:'index',
    	component:Index,
    },
  ]
})
