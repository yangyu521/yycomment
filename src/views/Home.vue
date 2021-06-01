<template>
  <div class="home">
    <div v-if="!userDetail">请稍等</div>
    <div v-else>
      <panel width="70%" class="mainPanel one">
        <template #headered>
          <span class="maintitle">主页</span><span class="xiegang">/</span>
        </template>
        <template #content>
          <div class="topstyle">
            <img :src="userDetail.avatar_url" alt="" />
            <span>{{ userDetail.loginname }}</span>
          </div>
          <div class="homedetail">
            <ul>
              <li>{{ userDetail.score }}积分</li>
            </ul>
          </div>
        </template>
      </panel>
      <panel width="70%" class="mainPanel two">
        <template #headered>
          <span>创建的话题</span>
        </template>
        <template #content>
          <div v-if="!recentTopics">暂无创建话题</div>
          <div v-else v-for="item in recentTopics" :key="item.id">
            <list-demo :item="item"></list-demo>
          </div>
          <div class="more" @click="gomoreTopic(userDetail)">查看最近创建会话</div>
        </template>
      </panel>
      <panel width="70%" class="mainPanel three">
          <template #headered>
            <span>参与过的话题</span>
          </template>
          <template #content>
            <div v-for="item in recenrReply" :key="item.id">
                 <list-demo :item="item"></list-demo> 
            </div>
             <div class="more" @click="gomoreReply()">查看最近参与话题</div>
          </template>
      </panel>
    </div>
  </div>
</template>
<script>
import panel from "../layout/panel";
import listDemo from "../components/component/listDemo";
export default {
  name: "home",
  components: {
    panel,
    listDemo,
  },
  data() {
    return {
      userDetail: null,
      recentTopics: null,
      recenrReply:null
    };
  },
  created() {
    this.getUserData();
  },
  methods: {
    async getUserData() {
      const username = this.$route.path;
      const res = await this.$http.get(username);
      this.userDetail = res.data.data;
      this.recentTopics = this.userDetail.recent_topics.splice(0, 5);
      this.recenrReply = this.userDetail.recent_replies.splice(0,5)
    },
    gomoreTopic(e) {
      sessionStorage.setItem("usernameTopic", JSON.stringify(e));
      this.$router.push(this.$route.path + "/topics");
    },
    gomoreReply(){
        this.$router.push(this.$route.path+"/replies")
    }
  },
};
</script>

<style lang="less" scoped>
.mainPanel {
  position: relative;
  z-index: 9;
  margin-left: 50px;
}
.two{
  margin-top: 20px;
}
.three{
  margin-top: 20px;
}
.maintitle {
  color: yellowgreen;
  padding-left: 10px;
}
.xiegang {
  color: gray;
}
.topstyle {
  display: flex;
  img {
    width: 40px;
    height: 40px;
    padding: 10px 10px;
  }
  span {
    padding: 10px 10px;
    color: gray;
  }
}
.homedetail {
  ul {
    margin: 0;
    padding: 0;
    li {
      list-style-type: none;
    }
  }
}
.more {
  width:calc(100% - 20px);
  height: 30px;
  line-height: 30px;
  background-color: white;
  padding-left: 20px;
  border-top: 1px solid #eee;
  cursor: pointer;
  &:hover {
    background-color: #eae7e7;
  }
}
</style>
