<template>
  <div class="detailContainer">
    <div class="detail">
      <div v-if="!content">
        <div class="load"><h1>请稍等，我亲爱的主人...</h1></div>
      </div>
      <div class="title" v-else>
        <span class="contentTitleTop">{{ content | fromatPutTop }}</span>
        <span class="contentTitle">{{ content.title }}</span>
        <div>
          <span style="fontSize:2px">
            -发布于{{ content.create_at | formatDate }}-作者{{
              content.author.loginname
            }}-浏览数{{ content.visit_count }}-最后一次编辑时间
            {{ content.last_reply_at | formatDate }}-来自{{
              content | formatContentTop
            }}
          </span>
          <el-button
            v-if="$store.state.justBrowse"
            :type="collect ? 'success' : 'info'"
            size="mini"
            class="collection"
            @click="collectionContent(content.id)"
            :class="[collect ? '' : 'canelCollect']"
            >{{ collect ? "收藏" : "已收藏" }}</el-button
          >
        </div>
      </div>
      <div v-if="!content"></div>
      <div v-else>
        <div v-html="content.content"></div>
      </div>
      <div v-if="!content"></div>
      <div v-else>
        <panel>
          <template #headered style="backgroundColor:red">
            <span>{{ content.replies.length }} 回复</span>
          </template>
          <template #content>
            <div v-for="(item1, index) in content.replies" :key="index">
              <comment-list
                :item1="item1"
                :index="index"
                :authorname="content.author.loginname"
              />
            </div>
          </template>
        </panel>
      </div>
      <panel>
        <template #headered>添加回复</template>
        <template #content>
          <div>
            <editor
              api-key="hg4jm1l1dpfhd8xdqjevq8cfbcc7xelv0jrcwufq5h9j7mxi"
              v-model="text"
              :init="{
                height: 500,
                menubar: false,
              }"
            ></editor>
          </div>
          <el-button type="primary" size="mini" @click="submit">提交</el-button>
        </template>
      </panel>
    </div>
    <div class="detailAuthor">
     <div class="authorinformation">
        <div v-if="!detailAuthor"></div>
      <div v-else>
        <panel class="detailAuthorPanel">
          <template #headered>
            <span>作者</span>
          </template>
          <template #content>
            <div class="author">
              <img :src="detailAuthor.avatar_url" alt="这是一张图" />
              <span>{{ detailAuthor.loginname }}</span>
            </div>
            <div class="score">
              <span>积分：</span><span>{{detailAuthor.score}}</span>
            </div>
          </template>
        </panel>
      </div>
     </div>
    <div class="otherTopic">
       <div v-if="!detailAuthor"></div>
      <div v-else>
        <panel class="detailAuthorPanel">
          <template #headered>
            <span>作者其他话题</span>
          </template>
          <template #content>
           <div v-for="item in detailAuthor.recent_topics" :key="item.id" class="limitLength">
             <span>{{item.title}}</span>
           </div>
          </template>
        </panel>
      </div>
    </div>
      <div class="noReplyTopic">
         <div v-if="!detailAuthor"></div>
      <div v-else>
        <panel class="detailAuthorPanel">
          <template #headered>
            <span>无人回复的话题</span>
          </template>
          <template #content>
           <div v-for="item in detailAuthor.recent_topics" :key="item.id" class="limitLength">
             <span>{{item.title}}</span>
           </div>
          </template>
        </panel>
      </div>
      </div>
    </div>
  </div>
</template>

<script>
import commentList from "../components/component/commentList";
import panel from "../layout/panel";
import Editor from "@tinymce/tinymce-vue";
import moment from "moment";
import "moment/locale/zh-cn";
export default {
  name: "detail",
  created() {
    this.getDetailData();
    window.scrollTo(0,0)
  },
  data() {
    return {
      text: "",
      content: null,
      collect: true,
      detailAuthor: null,
    };
  },
  watch: {
    content: {
      handler(newValue) {
        if (newValue) {
          this.$http.get(`/user/${newValue.author.loginname}`).then((res) => {
            this.detailAuthor = res.data.data;
            console.log(this.detailAuthor);
          });
        }
      },
    },
  },
  methods: {
    getDetailData() {
      this.$http.get(`${this.$route.path}`).then((res) => {
        this.content = res.data.data;
      });
    },
    collectionContent(e) {
      if (this.collect) {
        this.$http
          .post("/topic_collect/collect", {
            accesstoken: "ed08a6ba-1151-425c-b786-324e568ab429",
            topic_id: e,
          })
          .then((res) => {
            this.collect = !this.collect;
            console.log(res.data);
          })
          .catch((err) => {
            console.log(err);
          });
      } else {
        this.$http
          .post("topic_collect/de_collect", {
            accesstoken: "ed08a6ba-1151-425c-b786-324e568ab429",
            topic_id: e,
          })
          .then((res) => {
            console.log(res.data);
            this.collect = !this.collect;
          })
          .catch((err) => {
            console.log(err);
          });
      }
    },
    submit: function() {
      var activeEditor = tinymce.activeEditor;
      var editBody = activeEditor.getBody();
      activeEditor.selection.select(editBody);
      this.text = activeEditor.selection.getContent({
        format: "text",
      });
      this.$checkAuth(() => {
        if (!this.text) {
          alert("请输入内容");
        } else {
          this.$http
            .post(`/topic/${this.content.id}/replies`, {
              accesstoken: "ed08a6ba-1151-425c-b786-324e568ab429",
              content: `${this.text}`,
            })
            .then(() => {
              this.text = "";
              this.getDetailData();
            });
        }
      }, localStorage.getItem("token"));
    },
  },
  filters: {
    formatDate(value) {
      return moment(value)
        .startOf("day")
        .fromNow();
    },
  },
  components: {
    editor: Editor,
    panel,
    commentList,
  },
};
</script>

<style lang="less">
.detailAuthor{
  width: 35%;
}
.otherTopic{
  margin-top: 20px;
}
.noReplyTopic{
  margin-top: 10px;
}
.score{
  padding: 10px 10px;
}
.author {
  display: flex;
  align-items: center;
  img {
    width: 48px;
    height: 48px;
    padding: 10px 10px;
  }
}
.detailAuthorPanel {
   width: 80%;
  margin-left: 40px;
}
.detailContainer {
  width: 100%;
  display: flex;
  position: relative;
  top: -170px;
}
p {
  font-size: 15px;
  line-height: 1.7em;
  overflow: auto;
}
.load {
  width: 100%;
  height: 500px;
  background-image: linear-gradient(#f5d6d6, #f2e2e2);
  text-align: center;
  line-height: 500px;
  color: #eee;
}
.detail {
  width: 100%;
  background-image: linear-gradient(#ccc, #9198e5);
  overflow: hidden;
  padding: 10px 10px;
  margin: 10px 20px;
  margin-left: 50px;
  img {
    width: 60%;
    height: 60%;
    display: block;
  }
}
.contentTitleTop {
  width: 32px;
  height: 18px;
  padding: 2px 4px;
  line-height: 40px;
  color: #fff;
  font-size: 12px;
  background-color: yellowgreen;
}
.contentTitle {
  font-size: 20px;
  font-weight: 700;
  margin-left: 20px;
  width: 60%;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.collection {
  float: right;
}
.canelCollect {
  background-color: gray;
}
.limitLength{
  width: 100%;
   white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  padding: 10px 10px;
}
</style>
