<template>
  <div class="contain">
    <panel class="rightPanel" width="20%">
      <template #headered>
        <span class="username"
          >尊敬的
          {{
            $store.state.user.username ? $store.state.user.username : "小Y"
          }}</span
        >
        <span> 欢迎来到yy论</span>
      </template>
      <template #content>
        <div
          class="rightContent"
          style="height:50px"
          v-if="!$store.state.justBrowse"
        >
          <el-button
            type="primary"
            size="mini"
            @click="goLogin"
            v-if="!$store.state.justBrowse"
            >去登陆</el-button
          >
          <span>会有更好体验哦</span>
        </div>
        <div v-else class="rightContent1">
          <span>{{ $store.state.user.autograph }}</span>
        </div>
        <div class="postTopic">
          <el-button type="success" size="mini" @click="gotopic"
            >发布话题</el-button
          >
        </div>
      </template>
    </panel>
    <panel width="70%" class="panelContent">
      <template v-slot:headered>
        <router-link to="/all" class="link-style">全部</router-link>
        <router-link to="/good" class="link-style">精华</router-link>
        <router-link to="/share" class="link-style">分享</router-link>
        <router-link to="/ask" class="link-style">问答</router-link>
        <router-link to="/job" class="link-style">招聘</router-link>
        <router-link to="/dev" class="link-style">客户端测试</router-link>
      </template>
      <template #content>
        <div v-if="!list" style="height:100%">
          <div class="load"><h1>请稍等，我亲爱的主人...</h1></div>
        </div>
        <div v-else v-for="item in list" :key="item.id">
          <list-demo :item="item" :tab="tab" />
        </div>
      </template>
    </panel>
    <el-pagination
      v-if="list"
      class="pagination"
      @current-change="changePage"
      :current-page.sync="page"
      background
      layout="prev, pager, next"
      :total="1000"
    >
    </el-pagination>
  </div>
</template>

<script>
import panel from "../layout/panel";
import listDemo from "../components/component/listDemo";
export default {
  created() {
    this.$store.commit("getName", localStorage.getItem("username"));
    this.$store.commit("isLogin", localStorage.getItem("justBrowse"));
    this.page = Number(sessionStorage.getItem("page"));
    this.getList(this.tab, this.page);
    this.checkJustBrowse();
  },
  name: "contain",
  data() {
    return {
      list: null,
      tab: "",
      page: 1,
      allPage: "",
    };
  },
  watch: {
    "$route.path": {
      handler(newvalue, oldvalue) {
        this.list = "";
        if (oldvalue === "undefined") {
          this.$nextTick(function() {
            this.getList(this.tab, this.page);
          });
        } else {
          var realValue = newvalue
            .split("")
            .splice(1)
            .join("");
          this.tab = realValue;
          this.page = 1;
          this.$nextTick(function() {
            this.getList(this.tab, this.page);
          });
        }
      },
      immediate: true,
    },
  },
  methods: {
    getList(value, page) {
      this.$http
        .get(`/topics?page=${page}&limit=40&tab=${value}`)
        .then((res) => {
          this.list = res.data.data;
        });
    },
    goLogin() {
      this.$router.push("/login");
    },
    changePage() {
      this.list = "";
      sessionStorage.setItem("page", this.page);
      this.getList(this.tab, this.page);
      window.scrollTo(0, 0);
    },
    gotopic:function() {
      this.$checkAuth(()=>{
         this.$router.push("/topic/topic");
      },localStorage.getItem('token'))
     
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
  components: {
    panel,
    listDemo,
  },
};
</script>

<style lang="less" scoped>
.username {
  width: 50%;
  display: block;
  float: left;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.contain {
  width: 100%;
  background-color: #eee;
  position: relative;
  z-index: 9;
  padding-top: 20px;
}
.panelContent {
  margin-left: 90px;
}
.link-style {
  text-decoration: none;
  margin-left: 10px;
  line-height: 30px;
  background-color: #80bd01;
  color: #fff;
  padding: 3px 4px;
  border-radius: 3px;
}

::v-deep {
  .el-pagination.is-background .el-pager li:not(.disabled).active {
    background-color: #80bd01;
    color: black;
  }
}
.pagination {
  margin-left: 300px;
}
.load {
  width: 100%;
  height: 100%;
  background-image: linear-gradient(#f5d6d6, #f2e2e2);
  text-align: center;
  line-height: 500px;
  color: #eee;
}
.rightPanel {
  height: 60px;
  position: absolute;
  right: 10px;
  top: 20px;
}
.rightPanel header {
  height: 5px;
}
.rightContent {
  height: 50px;
  background-color: white;
  display: flex;
  align-items: center;
  justify-content: center;
}
.rightContent1 {
  height: 50px;
  background-color: white;
  display: flex;
  align-items: center;
  justify-content: center;
}
.postTopic {
  height: 50px;
  background-color: #fff;
  margin-top: 30px;
  line-height: 50px;
}
</style>
