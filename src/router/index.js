import Vue from "vue";
import VueRouter from "vue-router";
import contain from "../views/contain.vue";
import detailContain from "../components/component/detailContain.vue"
Vue.use(VueRouter);

const routes = [
  {
    path:"/message",
    name:"message",
    component:()=>import("../views/message.vue")
  },
  {
    path: "/login",
    name: "login",
    // const login=()=>import('../components/common/login.vue')
    component: () => import("../components/common/login.vue"),
  },
  {
    path: "/:tab",
    name: "content",
    component: contain,
  },
  {
    path: "/",
    name: "home",
    component: contain,
  },
  {
    path: "/topic/topic",
    name: "gotopic",
    component: ()=>import("../views/postTopic.vue")
  },
  {
    path: "/topic/:id",
    name: "detail",
    component: detailContain,
  },
  {
    path: "/user/:username",
    name: "userPage",
    component: ()=>import("../views/home.vue"),
  },
  //这里不应该用childrn因为使用嵌套路由是基于一个router-view
  {
    path: "/user/:username/topics",
    name: "usernameTopic",
    component: ()=>import("../views/usernameTopic.vue"),
  },
  {
    path: "/user/:username/replies",
    name: "usernameReply",
    component: ()=>import("../views/usernameReply.vue"),
  },
];

const router = new VueRouter({
  mode: "hash",
  base: process.env.BASE_URL,
  routes,
});

export default router;
