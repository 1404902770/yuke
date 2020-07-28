import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

// 引入axios
import axios from 'axios'
import vueAxios from 'vue-axios'
Vue.use(vueAxios, axios)

// Element-Ui
import 'element-ui/lib/theme-chalk/index.css'
import element from 'element-ui'
Vue.use(element)

// echarts
import echarts from 'echarts'
Vue.prototype.$echarts = echarts

// ueditor
import '../public/static/ue/ueditor.config.js'
import '../public/static/ue/ueditor.all.js'
import '../public/static/ue/lang/zh-cn/zh-cn.js'
import '../public/static/ue/ueditor.parse.js'

import animated from 'animate.css'
Vue.use(animated)

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
