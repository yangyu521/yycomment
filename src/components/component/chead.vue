<template>
  <div class="header">
    <div class="gif" @click="clickgif"></div>
    <div class="head-point">
      <router-link class="homeTitle" to="/">首页</router-link>
      <div class="message" @click="postHasRead">
        <div class="mess" v-show="notReadMessage && $store.state.justBrowse">
          <span>{{ notReadMessage }}</span>
        </div>
        <span class="homeTitle" @click="goMessage">消息</span>
        <!-- <router-link  to="/message">消息</router-link> -->
      </div>
      <div>
        <span class="homeTitle" @click="checkIsLogin">{{
          $store.state.justBrowse ? "退出" : "登陆"
        }}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "chead",
  created() {
    this.getMessage();
    setTimeout(()=>{
      this.isLogin = localStorage.getItem('token')
    })
  },
  data() {
    return {
      notReadMessage: "",
      isLogin: true,
    };
  },
  methods: {
    getMessage: function() {
      const res = this.$http.get("message/count", {
        params: { accesstoken: "ed08a6ba-1151-425c-b786-324e568ab429" },
      });
      res.then((res) => {
        this.notReadMessage = res.data.data;
      });
    },
    postHasRead: function() {
      this.$http.post("/message/mark_all", {
        accesstoken: "ed08a6ba-1151-425c-b786-324e568ab429",
      });
    },
    checkIsLogin() {
      if (localStorage.token) {
        localStorage.removeItem("token");
        localStorage.removeItem("username");
        this.$router.push("/login");
      } else {
        this.$router.push("/login");
      }
    },
    clickgif() {
      this.$router.push("/");
    },
    goMessage:function(){
     this.$checkAuth(()=>{
        this.$router.push('/message')
      this.$http.post('/message/mark_all',{accesstoken:"ed08a6ba-1151-425c-b786-324e568ab429"}).then(res=>{
        console.log(res)
      })
     },localStorage.getItem('token'))
    }
  },
};
</script>

<style lang="less" scoped>
.homeTitle {
  text-decoration: none;
  color: gray;
  cursor: pointer;
}
.message {
  float: left;
  &:hover {
    color: wheat;
  }
}
.mess {
  width: 30px;
  height: 20px;
  border-radius: 5px;
  float: left;
  margin-right: 5px;
  background-color: #9acd32;
  display: flex;
  justify-content: center;
  align-items: center;
  span {
    color: white;
  }
}
.header {
  width: 100%;
  height: 70px;
  background-color: white;
}
.gif {
  position: relative;
  top: -62px;
  width: 200px;
  height: 200px;
  background-image: url("../../assets/image/yy.gif");
  background-repeat: no-repeat;
  background-size: cover;
  margin-left: 90px;
  z-index: 1;
  cursor: pointer;
}
.head-point {
  float: right;
  position: relative;
  top: -200px;
  height: 70px;
  display: flex;
  justify-content: space-around;
  align-items: center;
  width: 200px;
}
</style>
