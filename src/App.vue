<template>
  <div id="app">
    <keep-alive exclude="Detail">
      <router-view/>
    </keep-alive>
    <main-tab-bar/>
  </div>
</template>

<style>
  @import "assets/css/base.css";
</style>
<script>
  import MainTabBar from "components/content/mainTabbar/MainTabBar";
  export default {
    components: {MainTabBar}
  }
</script>