import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import  io  from 'socket.io-client';
import { EnvironmentConstants } from './constants/enviromentConstants'
import VueSocketIOExt from 'vue-socket.io-extended';

Vue.config.productionTip = false
const socket = io(EnvironmentConstants.SOCKET_HOST);

import dotenv from 'dotenv'
dotenv.config()
Vue.use(BootstrapVue)
Vue.use(IconsPlugin)
Vue.use(VueSocketIOExt, socket);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
