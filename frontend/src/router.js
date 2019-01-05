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
<<<<<<< HEAD
      path: '/loginmem',
      name: 'loginmem',
      component: () => import('./components/LoginMember.vue')
    },
    {
      path: '/register',
      name: 'register',
      component: () => import('./components/RegisterMember.vue')
=======
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
    },
    {
      path: '/createuser',
      name: 'createuser',
      component: () => import('./components/CreateUser.vue')
    },
    {
      path: '/createaccount',
      name: 'createaccount',
      component: () => import('./components/CreateAccount.vue')
    },
    {
      path: '/listaccount',
      name: 'listaccount',
      component: () => import('./components/U_ListAccount.vue')
    },
    {
      path: '/listreceiver',
      name: 'listreceiver',
      component: () => import('./components/U_ListReceiver.vue')
    },
    {
      path: '/viewhistory/:numaccount',
      name: 'viewhistory',
      props: true,
      component: () => import('./components/U_ViewHistory')
    },
    {
      path: '/transfers',
      name: 'transfers',
      component: () => import('./components/Transfers.vue')
>>>>>>> master
    }
  ]
})
