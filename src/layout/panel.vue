<template>
  <div :style="{ width: width,height:height}" class="panel">
   <header>
      <slot name="headered" />
   </header>
    <slot class="content" name="content"></slot>
  </div>
</template>

<script>
//这是一个布局组件panel
export default {
  name: "panel",
  props: ['width','height'],
  computed: {
    formatWidth() {
      const { width } = this;
      return typeof width === "number" ? width+"px" : width
    },
  },
};
</script>

<style lang="less">
.panel {
  width: 100%;
  border-radius: 4px;
  background-color: #fff;
  border-radius: 0 0 3px 3px;
  header {
    padding: 10px;
    background-color: #f6f6f6;
    display: block;
    height: 30px;
    line-height: 30px;
  }
}
</style>
