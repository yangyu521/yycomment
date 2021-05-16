<template>
  <div class="Mask">
    <div v-if="!userTopic">请稍等</div>
    <div v-else>
      <panel class="panelTopic" width="70%">
        <template #headered>
          <span class="green" @click="goback">主页 </span><span style="color:gray">/ </span
          ><span class="green">{{ userTopic.loginname }}的主页</span>
        </template>
      </panel>
      <panel class="panelTopic" width="70%">
        <template #headered>
          <span style="color:gray">{{ userTopic.loginname }} 最近创建的话题</span>
        </template>
        <template #content>
          <div v-if="!userTopic.recent_topics.length" class="none">
                <span>{{userTopic.loginname}}最近没有创建话题哦，请看看其他的</span>
          </div>
          <div v-else v-for="item in userTopic.recent_topics" :key="item.id">
            <list-demo :item="item"></list-demo>
          </div>
        </template>
      </panel>
    </div>
    <div class="bottom">已经到底了</div>
  </div>
</template>

<script>
import panel from "../layout/panel";
import listDemo from "../components/component/listDemo"
export default {
  name: "usernameTopic",
  created() {
    this.userTopic = JSON.parse(sessionStorage.getItem("usernameTopic"));
    console.log(this.userTopic)
  },
  components: {
    panel,
    listDemo
  },
  methods: {
    goback() {
      this.$router.back()
    }
  },
  data() {
    return {
      userTopic: null,
    };
  },
};
</script>

<style lang="less">
.Mask {
  width: 100%;
  height: calc(100% - 70px);
  background-color: #eee;
  position: relative;
  z-index: 9;
}
.panelTopic {
  margin-left: 50px;
}
.green {
  color: #9acd32;
  cursor: pointer;
}
.bottom{
    width: 70%;
    height: 30px;
    line-height: 30px;
    background-color: #eee;
    margin-left: 50%;
    transform: translate(-20%);
}
.none{
  padding: 10px 10px;
}
</style>
