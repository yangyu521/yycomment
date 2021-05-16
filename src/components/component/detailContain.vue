<template>
  <div class="detailContain">
    <detail />
  </div>
</template>

<script>
import Detail from '../../views/detail.vue';

export default {
  name: "detailContain",
  components: {
    Detail
  },
};
</script>

<style>
.detailContain {
  width: 100%;
   background-image: linear-gradient(#f9f0f0, #fff);
  position: relative;
  z-index: 9;
  padding-top: 20px;
}
</style>
