import Vue from "vue";
import Vuex from "vuex";
Vue.use(Vuex);
export default new Vuex.Store({
  state: {
    isOk:false,
    justBrowse: false,
    user: {
      username: "小Y",
      autograph: "主人很懒，什么签名也没写哦",
    },
    allContent:'',
  },
  mutations: {
    getName(state,palyod){
        state.user.username = palyod
    },
    isLogin(state,palyod){
      state.justBrowse = palyod
    }
  },
  actions: {
   
  },
});
