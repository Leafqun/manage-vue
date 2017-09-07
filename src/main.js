import Vue from 'vue'
import App from './App.vue'
import store from './store'
import router from './router/router.js'
import VueHtml5Editor from 'vue-html5-editor'
import iView from 'iview';
import 'iview/dist/styles/iview.css';
import 'jquery'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.min'
import './assets/css/main.css'
import axios from 'axios'
import './assets/css/style.css'
import './assets/js/klorofil-common'
import url from './router/url'
import './assets/css/iconfont/iconfont.css'

import vue_html5_editor_config from './config/vue-html5-editor-config'

Vue.prototype.axios = axios;
Vue.prototype.url = url;

Vue.use(VueHtml5Editor, vue_html5_editor_config);
Vue.use(iView);




new Vue({
  el: '#app',
  store,
  router,
  render: h => h(App)
});
