import Vue from 'vue'
import Router from 'vue-router'
import home from '@/pages/home'
import demo from '@/pages/demo'
Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: home
    },
    {
      path: '/demo',
      name: 'demo',
      component: demo
    }
  ]
})
