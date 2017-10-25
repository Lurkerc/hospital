<!----------------------------------
****--轮转要求(科室要求)(emTrainingStandards_list)
****--@date     2017/9/14
****--@author   zyc<332533011@qq.com
----------------------------------->
<template>
  <require-set :userType="'JXS'"></require-set>
</template>
<script>
  /*当前组件必要引入*/
  import requireSet from "../../../intern/internBasisData/deptRequireSet/deptRequireSet_edit.vue";
  //当前组件引入全局的util
  let Util = null;
  export default{
    data() {
      return {}
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
      requireSet
    }
  }
</script>
