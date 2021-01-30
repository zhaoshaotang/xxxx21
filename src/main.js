import Vue from 'vue'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import axios from 'axios';
import  vueAxios from 'vue-axios'
import router from './router.js';
import App from './App.vue'
import store from './store'
import './styles/common.scss'
import './styles/components.scss'
import { url } from '@/config'
import { download } from "@/utils/utils";
import dayjs from 'dayjs';
Vue.prototype.dayjs = dayjs;
Vue.prototype.download = download;
// Vue.propertype.$bus = new Vue();
// import '@/mock/'
//注册自定义组件
import './components/'
//导入主题文件
import '@/theme/index.js'
Vue.use(vueAxios, axios)
// window.axios = axios;

Vue.config.productionTip = false
Vue.prototype.url = url;
Vue.use(window.AVUE, {
  size: 'mini'
});
Vue.use(ElementUI);
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
