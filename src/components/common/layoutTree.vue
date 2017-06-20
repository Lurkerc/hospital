<!--左右机构的tree-->
<template>
  <div class="container">
    <div class="treeLeft">
      <slot name="left"></slot>
    </div>
    <div class="treeRight">
      <slot name="right"></slot>
    </div>
  </div>
</template>
<style>
  .container{
    position: relative;
    height: 100%;
  }
  .treeLeft{
    width: 220px;
    height: 100%;
  }
  .treeRight{
    position: absolute;
    left: 228px;
    top: 0;
    right: 0;
    bottom:0;
    overflow: hidden
  }
</style>
<script>
  export default{
      props:["treeOptions"]
  }
</script>

