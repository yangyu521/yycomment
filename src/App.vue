<template>
  <div id="app">
    <div id="nav">
      <chead />
    </div>
    <router-view />
  </div>
</template>

<script>
import chead from "./components/component/chead";
export default {
  name: "app",
  components: {
    chead,
  },
};
</script>

<style lang="less">
html {
  height: 100%;
}
body {
  height: 100%;
}
#app{
  background-color: #eee;
}
</style>
