import Vue from 'vue'
import store from './store'
import App from './App.vue'
import router from "./router";
import Axios from 'axios'

Vue.prototype.$http = Axios;
const token = localStorage.getItem('token')
if (token) {
  Vue.prototype.$http.defaults.headers.common['Authorization'] = 'JWT '+token
}

var VueCookie = require('vue-cookie');
// Tell Vue to use the plugin

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')

Vue.use(VueCookie);

