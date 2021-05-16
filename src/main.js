import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import "./assets/global.less"
import instance from "./http/index"
import "./filter/filter"
import './plugins/element.js'
import "./assets/fonts/iconfont.css"
import "./assets/yycnodefont/iconfont.css"
import "./assets/animate.min.css"
Vue.config.productionTip = false
Vue.prototype.$http = instance
Vue.prototype.$checkAuth = (callback,accesstoken)=>{
  accesstoken = localStorage.getItem('token')
  if(!accesstoken){
    alert("请先登录再进行操作")
     router.push('/login')
  }else{
      callback()
  }
}
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
