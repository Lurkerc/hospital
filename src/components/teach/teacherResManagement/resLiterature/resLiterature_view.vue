<!----------------------------------
****--新建-视频(resCaseLibrary_add)
****--@date     2017/8/4
****--@author   zyc<332533011@qq.com
----------------------------------->
<template>
  <view-doc>
    <h2 slot="header">重新分发的文档名称</h2>
  </view-doc>
</template>
<script>
  /*当前组件必要引入*/
  import viewDoc from "../../../study/common/viewDoc.vue";
  //当前组件引入全局的util
  let Util = null;
  export default{
    data() {
      return {

      }
    },
    methods: {
      //初始化请求列表数据
      init(){

      },

    },
    created(){
      this.init();
    },
    mounted(){
    },
    components: {
      viewDoc
    }
  }
</script>
