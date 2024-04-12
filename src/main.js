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

Axios.interceptors.response.use(res=>{
  if(res.data.code=== 401){
      if(window.location.href!='http://localhost:8080/#/tbsign'){
        router.replace('/sign');
        localStorage.removeItem('authorization')
      }
    }
  return res
})


new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
