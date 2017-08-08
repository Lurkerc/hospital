<!----------------------------------
****--视频学习(videoStudy_list)
****--@date     2017/8/7
****--@author   zyc<332533011@qq.com
----------------------------------->
<template>
  <div class="showContent">
    <div class="video-type-box">
      <div class="video-title-left">
        <el-breadcrumb separator="/">
          <el-breadcrumb-item>内科</el-breadcrumb-item>
          <el-breadcrumb-item>呼吸内科</el-breadcrumb-item>
          <el-breadcrumb-item>picc置管后的维护技术</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <div class="video-title-right">
        <el-row>
          <el-col :span="12">
            <el-input
              placeholder="视频资源名称"
              icon="search"
              v-model="formValidate.name"
              :on-icon-click="handleIconClick">
            </el-input>
          </el-col>
          <el-col :span="10" :offset="2">
            <el-button>记录</el-button>
            <el-button>收藏</el-button>
          </el-col>
        </el-row>
      </div>
    </div>
    <div style="width: 100%;height: 500px">
      <showVideo></showVideo>
    </div>
    <introduce :content="formValidate.content"></introduce>
    <chatteris></chatteris>
  </div>
</template>
<script>
  /*当前组件必要引入*/
  import showVideo from "../../../common/video.vue";
  import introduce from "../../common/introduce.vue";
  import chatteris from "../../common/chatteris.vue";
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
