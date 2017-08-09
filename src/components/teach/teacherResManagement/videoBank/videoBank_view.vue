<!----------------------------------
****--查看-病历库(resCaseLibrary_add)
****--@date     2017/8/4
****--@author   zyc<332533011@qq.com
----------------------------------->
<template>
  <div class="showContent">
    <div class="video-type-box" style="text-align: center">
      <h2>视频名称</h2>
    </div>
    <div style="width: 100%;height: 500px">
      <showVideo ></showVideo>
    </div>
    <introduce :content="formValidate.content"></introduce>
    <chatteris></chatteris>
  </div>
</template>
<script>
  /*当前组件必要引入*/
  import showVideo from "../../../common/video.vue";
  import introduce from "../../../study/common/introduce.vue";
  import chatteris from "../../../study/common/chatteris.vue";
  //当前组件引入全局的util
  let Util = null;
  export default{
    data() {
      return {
        formValidate: {
          name:"",
          content: "1.Visitors are shown an audio-visual presen-tation before touring the cellars.参观酒窖前，游客们先观看了有声的视频介绍。2.Nearly 60% of our bookings come from repeat business and personal recommendation.我们近60%的订单来自于回头客和熟人介绍。3.Tamar Golan, a Paris-based journalist, profiles the rebel leader.驻巴黎记者塔玛·戈兰对反叛者的首领进行了介绍。"
        }
      }
    },
    methods: {
      //初始化请求列表数据
      init(){

      },
      handleIconClick(ev) {
        console.log(ev);
      }

    },
    created(){
      this.init();
    },
    mounted(){
    },
    components: {
      showVideo,
      introduce,
      chatteris
    }
  }
</script>
<style>
  @import "../../../../assets/ambuf/css/videoStudy/default.css";
</style>
