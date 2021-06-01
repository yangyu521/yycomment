<template>
  <div class="list">
  <img :src="item.author.avatar_url" :title="item.author.loginname" alt="" @click="goHomePage(item.author.loginname)" />
    <span class="clickNum" v-if="item.reply_count"
      ><span>{{ item.reply_count }}</span
      >/{{ item.visit_count }}</span
    >
    <div
      class="top"
      v-if="!tab || tab === 'all' || item.top || item.good"
      :class="[item.top ? 'green' : item.good ? 'green' : 'gray']"
    >
      <span class="topSelect">{{ item | fromatPutTop }}</span>
    </div>
    <div class="contentText">
      <!-- $route.path==='' ? pa -->
      <span class="goDetailStyle"  @click="senddetail(item)">
        {{ item.title }}
      </span>
    </div>
    <span class="time">{{ item.last_reply_at | formatDate }}</span>
  </div>
</template>

<script>
import moment from "moment";
import "moment/locale/zh-cn";
export default {
  name: "listDemo",
  filters: {
    formatDate(value) {
      return moment(value)
        .startOf("day")
        .fromNow();
    },
  },
  methods: {
    senddetail(e) {
         this.$router.push('/topic/'+e.id)
    },
    goHomePage(e){
        this.$router.push("/user/"+e)
    }
  },
  props: {
    item: {
      type: Object,
    },
    tab: String,
  },
  computed: {},
  computed: {},
};
</script>

<style lang="less" scoped>
.textActive {
  text-decoration: none;
  color: black;
}
.list:hover {
  background-color: #f9f6f6;
}
.list {
  padding: 10px 10px;
  display: flex;
  line-height: 30px;
  align-items: center;
  img {
    width: 30px;
    height: 30px;
    padding: 0 5px;
  }
  .clickNum {
    padding: 0 5px;
  }
  .top {
    width: 32px;
    height: 18px;
    padding: 2px 4px;
    line-height: 40px;
    color: #fff;
    font-size: 12px;
    .topSelect {
      display: block;
      line-height: 20px;
      text-align: center;
    }
  }
  .contentText {
    padding: 0 5px;
    width: 60%;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .time {
    flex: 1;
    text-align: right;
    color: #999999;
    font-size: 12px;
  }
}
.green {
  background-color: #80bd01;
}
.gray {
  background-color: #999999;
}
.goDetailStyle{
  cursor: pointer;
}
</style>
