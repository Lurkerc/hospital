<!--课程学习-->
<template>
  <div class="coursesStudy">
    <!-- 顶部 -->
    <div class="coursesStudyHeader">
      <class-menu></class-menu>
      <div class="coursesStudyInfo">
        <p align="right">
          <el-input class="searchStudy" placeholder="搜索课程" v-model="input5">
            <el-button slot="append" icon="search"></el-button>
          </el-input>
        </p>
        <div class="coursesStudyTask coursesStudyBorder">
          <h3>学习任务</h3>
          <el-row class="coursesStudyTaskMain">
            <el-col class="coursesStudyItem" :span="22" :offset="2" v-for="(item,index) in 3" :key="index">
              <el-col :span="7">
                <p class="coursesStudyTitle overflow-txt1">课程名称课程名称课程名称课程名称</p>
              </el-col>
              <el-col :span="12" :offset="1">
                <el-progress :text-inside="true" :stroke-width="20" :percentage="item * 20"></el-progress>
              </el-col>
              <el-col :span="4" align="right">
                <el-button size="small" type="success">快速进入</el-button>
              </el-col>
              <el-col>
              </el-col>
            </el-col>
          </el-row>
          <p class="coursesStudyHours overflow-txt1">
            <b>本月学习时长：15小时20分钟</b>
          </p>
        </div>
      </div>
    </div>
    <!-- 内容部分 -->
    <el-row class="coursesStudyBody">
      <el-col :span="17" class="coursesStudyBorder coursesStudyLeft">
        <el-row class="coursesStudyVideoContent" v-for="(vItem,vIndex) in 2" :key="vIndex">
          <!-- 标题 -->
          <el-col class="coursesStudyTopTitle">
            <el-col :span="12" align="left">
              <h4 class="coursesStudyTopTitleText overflow-txt1">我的必修课</h4>
            </el-col>
            <el-col :span="12" align="right">
              <el-button type="text" @click="show('coursesList')">更多<i class="el-icon-arrow-right el-icon--right"></i></el-button>
            </el-col>
          </el-col>
          <!-- 视频内容 -->
          <el-col>
            <el-col :xs="23" :sm="11" :md="7" :lg="5" class="coursesStudyVideoItem" :offset="1" v-for="(item,index) in 8" :key="index">
              <img :src="'//iph.href.lu/180x180'" class="coursesStudyPhoto">
              <!-- <p class="">视频名称</p> -->
              <div class="coursesStudyVideoInfo">
                <h3 class="overflow-txt1">视频名称</h3>
                <el-row>
                  <el-col :span="12">
                    <span>张老师</span>
                  </el-col>
                  <el-col :span="12" align="right">
                    <span>20课时</span>
                  </el-col>
                </el-row>
              </div>
            </el-col>
          </el-col>
        </el-row>
      </el-col>
      <el-col :span="6" :offset="1">
        <!-- 直播列表 -->
        <el-row class="coursesStudyBorder coursesStudyRightItem">
          <el-col class="coursesStudyTopTitle">
            <h4 class="coursesStudyTopTitleText overflow-txt1">最近直播</h4>
          </el-col>
          <el-col class="coursesStudyPadding">
            <div class="timeBarBox">
              <div class="timeBarItem">
                <div class="day active">
                  2017-12-50（今天）
                </div>
                <div class="time">
                  <span class="timeText">20：23</span>
                  <span class="titleText">直播名称</span>
                </div>
                <div class="time">
                  <span class="timeText">20：23</span>
                  <span class="titleText">直播名称</span>
                </div>
                <div class="time">
                  <span class="timeText">20：23</span>
                  <span class="titleText">直播名称</span>
                </div>
              </div>
              <div class="timeBarItem">
                <div class="day">
                  2017-12-50
                </div>
                <div class="time">
                  <span class="timeText">20：23</span>
                  <span class="titleText">直播名称</span>
                </div>
                <div class="time">
                  <span class="timeText">20：23</span>
                  <span class="titleText">直播名称</span>
                </div>
                <div class="time">
                  <span class="timeText">20：23</span>
                  <span class="titleText">直播名称</span>
                </div>
              </div>
            </div>
          </el-col>
        </el-row>
        <!-- 播放记录 -->
        <el-row class="coursesStudyBorder coursesStudyPaddingBottom20 coursesStudyRightItem">
          <el-col class="coursesStudyTopTitle">
            <el-col :span="12" align="left">
              <h4 class="coursesStudyTopTitleText overflow-txt1">播放记录</h4>
            </el-col>
            <el-col :span="12" align="right">
              <el-button type="text">更多<i class="el-icon-arrow-right el-icon--right"></i></el-button>
            </el-col>
          </el-col>
          <el-col>
            <el-col :xs="23" :sm="23" :md="23" :lg="11" class="coursesStudyVideoItem" :offset="1" v-for="(item,index) in 4" :key="index">
              <img :src="'//iph.href.lu/180x180'" class="coursesStudyPhoto">
              <!-- <p class="">视频名称</p> -->
              <div class="coursesStudyVideoInfo">
                <h3 class="overflow-txt1">视频名称</h3>
              </div>
            </el-col>
          </el-col>
        </el-row>
      </el-col>
    </el-row>
  </div>
</template>
<script>
  /*当前组件必要引入*/
  import classMenu from '../../common/menu';
  //当前组件引入全局的util
  let Util = null;
  export default {
    data() {
      return {
        input5: ''
      }
    },
    methods: {
      //初始化请求列表数据
      init() {

      },
      // 视图切换
      show(viewType) {
        this.$emit('show', viewType)
      },
    },
    created() {
      this.init();
    },
    mounted() {},
    components: {
      classMenu
    }
  }

</script>

<style lang="scss">
  @import"../../../../assets/ambuf/css/coursesStudy_v1.0/index";
  @import"../../../../assets/ambuf/css/coursesStudy_v1.0/timeBar";

</style>
