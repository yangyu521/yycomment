<template>
  <div class="wrap">
    <div class="login-show">
      <router-link to="/" class="tourist">游客</router-link>
      <h2>系统登录</h2>
      <div class="logInput">
        <span class="iconfont icon-denglu"></span>
        <input type="text" class="SignIn " v-model="username" />
      </div>

      <div class="logpass">
        <span class="iconfont icon-mima"></span>
        <input type="password" class="sinPass" v-model="password" />
      </div>
      <button class="btn" @click="loginIn">登录</button>
      <div class="tip">
        账号：随便 密码：ed08a6ba-1151-425c-b786-324e568ab429
      </div>
    </div>
  </div>
</template>

<script>
export default {
  //this.$route下有一个meta属性
  //该属性是一个数组，记录了当前地址匹配到的路由记录
  //在路由记录内可以访问到对应的路由的 路由元信息 就是meta字段
  //通过路由元信息，增加权限属性，实现权限处理问题
  //实现的就是当前路由会匹配到很多路由（包含嵌套的子路由），只要某一个路由通过路由元信息设置了权限，那么就需要遍历$route.matched去查询
  name: "login",
  created() {
    this.checkJustBrowse();
  },
  data() {
    return {
      username: "",
      password: "",
    };
  },
  methods: {
    loginIn() {
      if (this.username) {
        localStorage.setItem("username", this.username);
        localStorage.setItem("justBrowse", true);
        localStorage.setItem("token", this.password);
        this.$router.push("/");
      } else {
        alert("账号密码错误，请重新输入");
        this.username = "";
        this.password = "";
      }
    },
    checkJustBrowse() {
      if (!localStorage.getItem("token")) {
        localStorage.setItem("justBrowse", false);
        this.$store.state.justBrowse = false;
      } else {
        localStorage.setItem("justBrowse", true);
        this.$store.state.justBrowse = true;
      }
    },
  },
};
</script>

<style>
.tourist {
  position: absolute;
  right: 50px;
  text-decoration: none;
  color: white;
  padding: 10px 15px;
  background-color: #8dd9f0;
  top: 10px;
}
.wrap {
  width: 100%;
  height: calc(100% - 70px);
  background-color: #eee;
  z-index: 99;
}
.login-show {
  width: 630px;
  height: 440px;
  background-color: white;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  margin: auto;
}
.login-show h2 {
  margin: 0;
  text-align: center;
  color: black;
}
.logInput {
  margin-top: 30px;
}
.SignIn {
  width: 492px;
  height: 60px;
  border-radius: 5px;
  background-color: #f4e6e6;
  display: block;
  float: left;
  margin-left: 50%;
  padding-left: 60px;
  transform: translateX(-50%);
  color: black;
  font-size: 15px;
  font-weight: 700;
}
.sinPass {
  width: 492px;
  height: 60px;
  border-radius: 5px;
  background-color: #f4e6e6;
  display: block;
  float: left;
  margin-left: 50%;
  padding-left: 60px;
  transform: translateX(-50%);
  color: black;
  font-size: 15px;
  font-weight: 700;
}
.btn {
  width: 492px;
  height: 40px;
  background-color: #f4e6e6;
  outline: none;
  float: left;
  margin-left: 50%;
  margin-top: 20px;
  transform: translateX(-50%);
}
.tip {
  width: 500px;
  height: 50px;
  background-color: #eee;
  text-align: center;
  line-height: 50px;
  position: absolute;
  bottom: 20px;
  left: 70px;
}
</style>
