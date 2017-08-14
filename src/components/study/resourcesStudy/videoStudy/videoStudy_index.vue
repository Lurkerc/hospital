<!----------------------------------
****--视频学习(videoStudy_list)
****--@date     2017/8/7
****--@author   zyc<332533011@qq.com
----------------------------------->
<template>
<div>
  <div class="video-type-box">
    <div class="video-title-left">
      <a class="videoHome-type">
        分类
        <div class="videoHome-type-content">
          <ul class="videoHome-type-content-list">
            <li>
              内科<i class="el-icon-arrow-right arrow-right"></i>
              <div class="videoHome-type-subContent">
                <div class="videoHome-type-subContent-title">
                  内科
                </div>
                <div class="videoHome-type-subContent-typesBox">
                  <dl class="videoHome-type-subContent-types">
                    <dd @click="searchByDep">心血管内科</dd>
                    <dd>心血管内科</dd>
                    <dd>心血管内科</dd>
                    <dd>心血管内科</dd>
                    <dd>心血管内科</dd>
                    <dd>心血管内科</dd>
                  </dl>
                </div>
              </div>
            </li>
            <li>外科<i class="el-icon-arrow-right arrow-right"></i></li>
            <li>儿科<i class="el-icon-arrow-right arrow-right"></i></li>
            <li>妇产科<i class="el-icon-arrow-right arrow-right"></i></li>
            <li>保健<i class="el-icon-arrow-right arrow-right"></i></li>
          </ul>
        </div>
      </a>
    </div>
    <div class="video-title-right">
      <el-row style="float: right">
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
  <div class="videoHome-list">
    <div class="videoHome-list-item" v-for="item in 16">
      <div class="videoHome-list-item-img">
        <img src="/static/swiper-img/nature1.jpg" alt="">
        <el-button @click="playerVideo" class="btn" type="primary" icon="caret-right"></el-button>
        <div class="playerBox"></div>
      </div>
      <div class="videoHome-list-item-mess">
        <el-row>
          <el-col :span="14"><div class="videoHome-list-item-name overflow-txt1" title="视频名称视频名称视频名称">视频名称视频名称视频名称</div></el-col>
          <el-col :span="10" style="text-align: right;">5225次学习</el-col>
        </el-row>
        学习进度:
        <el-row>
          <el-col :span="24">
            <el-progress :percentage="100"></el-progress>
          </el-col>
        </el-row>
      </div>
    </div>
  </div>
  <div class="showMore">
    <el-button v-if="true" type="text">查看更多视频>></el-button>
    <span v-if="false">已经没有更多视频可查看!</span>
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
      look: "index",
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
    },

    //分类查询
    searchByDep(){

    },

    playerVideo(){
      this.$emit('show', 'show',{});
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
