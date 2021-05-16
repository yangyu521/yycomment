<template>
  <div class="contain">
    <div class="left">
      <div class="title">
        <img class="commentImg" :src="item1.author.avatar_url" alt="" />
        <span>{{ item1.loginname }}</span
        ><span>{{ index + 1 }}楼-{{ item1.create_at }}</span>
      </div>
      <div class="content" v-html="item1.content"></div>
    </div>
    <div class="commentRight">
      <span
        class="iconfont yy-dianzan support animated up"
        @click="up(item1)"
      ></span
      ><span v-if="item1.ups.length">{{ item1.ups.length }}</span
      ><span class="iconfont yy-hanhan-01-01 support"></span>
    </div>
  </div>
</template>

<script>
export default {
  name: "commentList",
  props: ["item1", "index", "authorname"],
  data() {
    return {};
  },
  methods: {
    // up: async function(e) {
    //   if (e.author.loginname === this.authorname) {
    //     alert("不允许给自己点赞哦");
    //   } else {
    //     const res = await this.$http.post(`/reply/${e.id}/ups`, {
    //       accesstoken: "ed08a6ba-1151-425c-b786-324e568ab429",
    //     });
    //     res.data.action === "up"
    //       ? this.item1.ups.push(1)
    //       : this.item1.ups.pop(1);
    //   }
    // },
    up:function(e) {
      // console.log(this.$checkAuth)
     this.$checkAuth(() => {
        if (e.author.loginname === this.authorname) {
          alert("不允许给自己点赞");
        } else {
          setTimeout(()=>{
            const res =  this.$http.post(`/reply/${e.id}/ups`, {
            accesstoken: "ed08a6ba-1151-425c-b786-324e568ab429",
          });
          res.then(res=>{
             res.data.action === "up"
            ? this.item1.ups.push(1)
            : this.item1.ups.pop(1);
          })
         
          })
          
        }
      },localStorage.getItem('token'));
    },
  },
};
</script>

<style lang="less" scoped>
.contain {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 5px 10px;
  border-bottom: 1px solid #ccc;
}

.commentImg {
  width: 20px !important;
  height: 20px !important;
}

.title {
  display: flex;
  flex-direction: row;
  img {
    padding: 0 5px;
  }
}

.left {
  display: flex;
  flex-direction: column;
}
.content {
  padding: 5px 5px;
}
.support {
  padding-right: 5px;
  cursor: pointer;
}
</style>
