<template>
  <div class="topicMain">
    <panel width="70%" class="postPanel">
      <template #headered>
        <div class="postTitle"><span class="homePage" to="home" @click="gohome">主页</span
        ><span>/发布话题</span></div>
      </template>
      <template #content>
        <div class="headerpost">
          <span>选择版块</span>
          <select id="selectTopic">
            <option value="choose">请选择</option>
            <option value="share">分享</option>
            <option value="ask">问答</option>
            <option value="job">招聘</option>
            <option value="dev">客户端测试</option>
          </select>
        </div>
        <el-input
          v-model="title"
          size="normal"
          placeholder=" 标题字数10字以上"
          clearable
          minlength="10"
          class="selectInput"
        ></el-input>
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
</template>

<script>
import Editor from "@tinymce/tinymce-vue";
import panel from "../layout/panel";
export default {
  components: { panel, editor: Editor },
  name: "postTopic",
  methods: {
    gohome() {
      this.$router.push("/");
    },
    submit:function() {
      var activeEditor = tinymce.activeEditor;
      var editBody = activeEditor.getBody();
      activeEditor.selection.select(editBody);
      this.text = activeEditor.selection.getContent({
        format: "text",
      });
      var dom = document.getElementById("selectTopic");
      var value = dom.value;
      this.$checkAuth(()=>{
        if (this.title.length <= 10 || value === "choose") {
        alert("检查标题字数和是否选择文章分类");
      } else {
        this.$http
          .post("/topics", {
            accesstoken: "ed08a6ba-1151-425c-b786-324e568ab429",
            title: this.title,
            tab: value,
            content: this.text,
          })
          .then((res) => {
            this.title = "";
            this.text = "";
            this.$router.go(-1)
          })
          .catch((err) => {
            console.log(err);
          });
      }
      },localStorage.getItem('token'))
    },
  },
  data() {
    return {
      title: "",
      text: "",
    };
  },
};
</script>

<style lang="less" scoped>
.postPanel {
  position: relative;
  z-index: 9;
  left: 3%;
}
.homePage {
  color: #80bd01;
  cursor: pointer;
}
.headerpost {
  border-top: 1px solid #eee;
  height: 50px;
  padding-left: 5px;
}
#selectTopic {
  width: 150px;
  height: 30px;
  border-radius: 5px;
  margin-left: 5px;
}
.selectInput {
  width: calc(99% - 10px);
  padding: 10px 10px;
}
</style>
