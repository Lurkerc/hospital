<!----------------------------------
****--医学图谱(normCourseTree_list)
****--@date     2017/8/4
****--@author   zyc<332533011@qq.com
----------------------------------->
<template>
  <div>
    <viewPPT>
      <h2 slot="header">这里是分发进来的PPT的标题</h2>
    </viewPPT>
    <div slot="content" style="margin: 0 auto; width: 1000px;">
      介绍的内容XXXXXXXXXXXXXXXXXX可以自己定义
    </div>
  </div>
</template>

<script>
  /*当前组件必要引入*/
  import viewPPT from "../../../study/common/viewPPT.vue";
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
    computed: {
    },
    mounted(){},
    components: {
      viewPPT
    }
  }
</script>
<style>
  @import '../../../../assets/ambuf/css/manage_v1.0/swiper.css';
</style>

