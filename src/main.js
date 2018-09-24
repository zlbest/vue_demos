// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
//import store from './store/index'
import axios from './config/api'
import 'lib-flexible/flexible.js'
import FastClick from 'fastclick'
import toast from './components/common/toast.js'
import lazyLoad from './components/demo/lazyLoad'

Vue.prototype.$http = axios;
Vue.config.productionTip = false;
Vue.prototype.$toast = toast;
Vue.use(lazyLoad);

if('addEventListener' in document) {
    document.addEventListener('DOMContentLoaded', function () {
       FastClick.attach(document.body);
    }, false);
}
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  //store,
  components: { App },
  template: '<App/>'
});
