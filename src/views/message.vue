<template>
  <div class="messagePage">
      <div v-if="!hasRead"> <div class="load"><h1>请稍等，我亲爱的主人...</h1></div></div>
   <div v-else>
        <panel width="70%" class="messagePanel">
      <template #headered>
        <span class="messageHome">主页</span><span class="messageCurrent">  / 新消息</span>
      </template>
      <template #content>
          <div v-if="! hasRead.hasnot_read_messages.length" class="noneMessage">暂无消息</div>
            <div  v-else class="replyMessage" v-for="item in hasRead.hasnot_read_messages" :key="item.id">
                <span class="messageRoute" @click="gouserDetail(item)">{{item.author.loginname}}</span>  回复了你的话题 <span class="messageRoute" @click="detailReplyTopic(item.id)">{{item.topic.title}}</span>
            </div>
      </template>
    </panel>
     <panel width="70%" class="messagePanel">
      <template #headered>
       <span class="messageCurrent">过往消息</span>
      </template>
      <template #content>
          <div v-if="! hasRead.has_read_messages.length" class="noneMessage">暂无消息</div>
            <div  v-else class="replyMessage" v-for="item in hasRead.has_read_messages" :key="item.id">
                <span class="messageRoute" @click="gouserDetail(item)">{{item.author.loginname}}</span>  回复了你的话题 <span class="messageRoute" @click="detailReplyTopic(item.topic.id)">{{item.topic.title}}</span>
            </div>
      </template>
    </panel>
   </div>
  </div>
</template>

<script>
import panel from "../layout/panel";
export default {
  name: "message",
  data() {
      return {
          hasRead: null
      }
  },
  created () {
     this.getMessageData();
     console.log(this.hasRead)
  },
  components: {
    panel,
  },
  methods: {
     async getMessageData() {
        const res = await this.$http.get('/messages',{params:{accesstoken: "ed08a6ba-1151-425c-b786-324e568ab429"}}) 
        this.hasRead = res.data.data
        console.log(this.hasRead)
      },
      gouserDetail(e){
        // this.$router.push(e.author.loginname)
      this.$router.push("/user/"+e.author.loginname)
      },
      detailReplyTopic(e){
         this.$router.push('/topic/'+e)
        console.log(e)
      }
  },
};
</script>

<style lang="less">
.load {
  width: 100%;
  height: 100%;
  background-image: linear-gradient(#f5d6d6, #f2e2e2);
  text-align: center;
  line-height: 500px;
  color: #eee;
}
.messagePage {
  width: 100%;
  background-color: #eee;
  position: relative;
  z-index: 9;
  padding-top: 20px;
}
.messagePanel {
  margin-left: 50px;
}
.messageHome{
    color: yellowgreen;
}
.messageCurrent{
    color: silver;
}
.replyMessage{
    padding:8px 10px;
    border-bottom: 1px solid #eee;
    &:hover{
      background-color: #f5f1f1;
    }
}
.messageRoute{
    text-decoration: none;
    color: #0088cc;
    cursor: pointer;
}
.noneMessage{
    padding:10px 10px;
}
</style>
