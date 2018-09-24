<template>
  <div id="app">
    <keep-alive>
      <router-view/>
    </keep-alive>
  </div>
</template>
<script>
  export default {
    name: 'App',
    components:{

    }
  }
</script>
<style lang="scss" rel="stylesheet/scss" src="./style/common.scss">
  #app{
    position: absolute;
    margin: 0;
    padding: 0;
    left: 0;
    right: 0;
    top:0;
    height: 100%;
    background‐color: #999999;
  }
</style>
