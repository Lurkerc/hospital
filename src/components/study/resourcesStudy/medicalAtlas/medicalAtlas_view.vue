<!----------------------------------
****--医学图谱(medicalAtlas_list)
****--@date     2017/8/7
****--@author   zyc<332533011@qq.com
----------------------------------->
<template>
  <div class="showContent">
    <div class="video-type-box">
      <div class="video-title-left" style="padding-top:8px;">
        <el-breadcrumb separator="/">
          <el-breadcrumb-item>医学图谱</el-breadcrumb-item>
          <el-breadcrumb-item>picc置管后的维护技术</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <div class="video-title-right">
        <el-row>
          <el-col :span="18">
            <el-input
              placeholder="请输入文档文献名称"
              icon="search"
              v-model="formValidate.name"
              :on-icon-click="handleIconClick">
            </el-input>
          </el-col>
          <el-col :span="2">&nbsp;</el-col>
          <el-col :span="4">
            <el-button type="primary" icon="arrow-left" @click="goBack">返回</el-button>
          </el-col>
        </el-row>
      </div>
    </div>
    <viewPPT>
      <h2 slot="header">这里是分发进来的PPT的标题</h2>
    </viewPPT>
    <div slot="content" style="margin: 0 auto; width: 1000px;">
      介绍的内容XXXXXXXXXXXXXXXXXX可以自己定义
    </div>
    <div class="downLoadDoc"><el-button type="primary" icon="arrow-down">下载</el-button></div>
    <chatteris :types="'LITERATURE'"></chatteris>
  </div>
</template>

<script>
  /*当前组件必要引入*/
  import viewPPT from "../../../study/common/viewPPT.vue";
  import introduce from  "../../common/introduce.vue";
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
      },
      goBack(){
        this.$emit('show', 'index',{});
      }
    },
    created(){
      this.init();
    },
    computed: {
    },
    mounted(){},
    components: {
      viewPPT,
      introduce,
      chatteris,
    }
  }
</script>
<style>
  @import '../../../../assets/ambuf/css/manage_v1.0/swiper.css';
</style>
