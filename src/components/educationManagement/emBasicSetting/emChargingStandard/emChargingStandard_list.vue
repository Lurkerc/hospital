<!----------------------------------
****--收费标准(emChargingStandard_list)
****--@date     2017/9/14
****--@author   zyc<332533011@qq.com
----------------------------------->
<template>
  <standard :userType="'JXS'"></standard>
</template>
<script>
  /*当前组件必要引入*/
  import standard from "../../../intern/internBasisData/chargingStandard/chargingStandard_list.vue";
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
      standard
    }
  }
</script>
