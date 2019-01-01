import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/accountmg',
      name: 'accountmg',
      component: () => import('./components/Accountmanager.vue')
    },
    {
      path: '/loginmem',
      name: 'loginmem',
      component: () => import('./components/LoginMember.vue')
    },
    {
      path: '/register',
      name: 'register',
      component: () => import('./components/RegisterMember.vue')
    }
  ]
})
