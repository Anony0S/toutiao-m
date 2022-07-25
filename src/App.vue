<template>
  <div>
    <router-view></router-view>
    <h1>黑马头条</h1>
    <span class="iconfont icon-shouye"></span>
    <van-button type="primary">主要按钮</van-button>
    <div class="box"></div>
  </div>
</template>

<script>
export default {
  name: "App",
};
</script>

<style>
  .box {
    width: 375px;
    height: 100px;
    background-color: pink;
  }
</style>
