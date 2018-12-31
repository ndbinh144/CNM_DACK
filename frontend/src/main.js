import Vue from 'vue'
import './plugins/axios'
import App from './App.vue'
import router from './router'
import store from './store'
import Buefy from 'buefy'
import BootstrapVue from 'bootstrap-vue'
/* Import css */
import 'buefy/dist/buefy.css'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import * as Css from '../public/css/common.css';

Vue.use(BootstrapVue)
Vue.use(Buefy)
Vue.use(Css)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
