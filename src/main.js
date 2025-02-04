import Vue from 'vue'
import App from './App.vue'
import router from './router'

// 引入阿里图标库
import '../public/iconfont/iconfont.css'
import '../public/exiticon/iconfont.css'
import '../public/iconfont/iconfont.js'
Vue.config.productionTip = false

// 导入vue-awesome-swiper 滑动特效插件 挂载轮播图
import VueAwesomeSwiper from 'vue-awesome-swiper'
import 'swiper/swiper-bundle.css'
Vue.use(VueAwesomeSwiper);
// 视频播放器
import 'vue-video-player/src/custom-theme.css'
import 'video.js/dist/video-js.css'

// ElementUI
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);

// 自定义弹窗
import Toast from './components/toast/toast.js'
// 将组件注册到vue的原型链,这样就可以在所有的VUE的实例里面使用this.$toast()
Vue.prototype.$toast=Toast   //注册全局组件

import uploader from 'vue-simple-uploader'
Vue.use(uploader)

import Axios from 'axios'
Vue.prototype.$http = Axios
Axios.defaults.baseURL = 'http://localhost:8080/'

// http request 拦截器
Axios.interceptors.request.use(function (config) {
  const token=localStorage.getItem('authorization')
  token?config.headers.Authorization=token:null;
  return config;
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error)
})



// 添加响应拦截器
Axios.interceptors.response.use(function (res) { // 当状态码为2xx/3xx开头的进这里
  if(res.data.code=== 401||res.status===401){
    if(window.location.href!='http://localhost:8080/#/tbsign'){
      router.replace('/sign');
      localStorage.removeItem('authorization')
    }
  }
  return res
}, async function (error) { // 响应状态码4xx/5xx进这里
  // 对响应错误做点什么
 if (error.response.status === 401) { // 身份过期/token无效
  router.replace('/sign');
  localStorage.removeItem('authorization');
  return Promise.reject(error);
  }
})


new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
