<!----------------------------------
****--视频学习(videoStudy_list)
****--@date     2017/8/7
****--@author   zyc<332533011@qq.com
----------------------------------->
<template>
  <div class="showContent">
    <div class="video-type-box">
      <div class="video-title-left">
        <a class="videoHome-type">
          分类
          <div class="videoHome-type-content">
            <ul class="videoHome-type-content-list">
              <li>内科</li>
              <li>外科</li>
              <li>儿科</li>
              <li>妇产科</li>
              <li>保健</li>
            </ul>
          </div>
        </a>
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
    <div class="videoHome-list-sort">
      <el-radio-group v-model="sortFeild">
        <el-radio-button label="综合排序"></el-radio-button>
        <el-radio-button label="最新发布"></el-radio-button>
        <el-radio-button label="最多播放"></el-radio-button>
      </el-radio-group>
    </div>
  </div>
</template>
<script>
/*当前组件必要引入*/

//当前组件引入全局的util
let Util = null;
export default{
  data() {
    return {
      formValidate: {
        name: "",
      },

      //排序
      sortFeild:"综合排序"
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
  components: {}
}
</script>
<style>
  @import "../../../../assets/ambuf/css/videoStudy/default.css";
</style>
