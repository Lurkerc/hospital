<template>
  <!-- 课程列表页 -->
  <div class="coursesListBox">
    <el-row>
      <el-col :span="12">
        <el-breadcrumb separator="/" class="coursesListNavInfo">
          <el-breadcrumb-item @click.native="show('index')">首页</el-breadcrumb-item>
          <el-breadcrumb-item>全部课程</el-breadcrumb-item>
          <el-breadcrumb-item>{{navData.pName}}</el-breadcrumb-item>
        </el-breadcrumb>
      </el-col>
      <el-col :span="12" align="right">
        <el-input placeholder="请输入关键词" style="max-width:300px;">
          <el-button slot="append" icon="search"></el-button>
        </el-input>
      </el-col>
    </el-row>
    <!-- 导航 -->
    <courses-nav class="coursesListNav" @navChange="navChange" :operaility-data="operailityData" :navUrl="'criterionCourseType/tree'"></courses-nav>
    <!-- 条件 -->
    <el-row class="coursesListCondition">
      <el-col :span="18">
        <el-button type="text">全部（84）</el-button>
        <el-button type="text">正在进行</el-button>
        <span class="coursesListDelimiter">|</span>
        <el-button type="text">即将开始</el-button>
        <span class="coursesListDelimiter">|</span>
        <el-button type="text">已结束</el-button>
      </el-col>
      <el-col :span="6" align="right">
        <el-button type="text">热门</el-button>
        <span class="coursesListDelimiter">|</span>
        <el-button type="text">最新</el-button>
      </el-col>
    </el-row>
    <!-- 列表项 -->
    <div class="coursesListMain">
      <div class="coursesListItem" v-for="(item,index) in 5" :key="index">
        <img src="//iph.href.lu/270x160" class="coursesListItemPic">
        <div class="coursesListInfo">
          <h3 class="overflow-txt1">课程标题</h3>
          <p class="coursesListInfoItem overflow-txt1">张老师</p>
          <p class="coursesListInfoItem overflow-txt1">课程简介：</p>
          <div class="coursesListInfoItemIntro coursesListInfoItem">
            这是课程简介的内容部分，超过的不显示，内容限制高度 这是课程简介的内容部分，超过的不显示，内容限制高度 这是课程简介的内容部分，超过的不显示，内容限制高度 这是课程简介的内容部分，超过的不显示，内容限制高度 这是课程简介的内容部分，超过的不显示，内容限制高度 这是课程简介的内容部分，超过的不显示，内容限制高度 这是课程简介的内容部分
          </div>
          <p class="coursesListInfoItem overflow-txt1">授课对象：全部人员</p>
          <el-row class="coursesListInfoItem">
            <el-col :span="8" class="overflow-txt1">播放人数：12348</el-col>
            <el-col :span="8" class="overflow-txt1">授予学分：3分</el-col>
            <el-col :span="8" class="overflow-txt1">有效时间：2017-10-02至2018-03-12</el-col>
          </el-row>
        </div>
      </div>
    </div>
    <!-- 分页按钮 -->
    <div style="float: right;margin-top:10px;">
      <el-pagination @size-change="changePageSize" @current-change="changePage" :current-page="myPages.currentPage" :page-sizes="myPages.pageSizes" :page-size="myPages.pageSize" layout="total, sizes, prev, pager, next, jumper" :total="totalCount"></el-pagination>
    </div>
  </div>
</template>

<script>
  let Util;
  import coursesNav from '../../common/nav';
  export default {
    props: ['operailityData'],
    data() {
      return {
        totalCount: 0,
        navData:this.operailityData,
      }
    },
    methods: {
      init(){
        Util = this.$util;
        //ajax请求参数设置
        this.myPages = Util.pageInitPrams;
      },

      //切换选项卡
      navChange(data){
        this.navData = data;
      },

      // 视图切换
      show(viewType, data) {
        this.$emit('show', viewType, data)
      },
    },
    components: {
      coursesNav
    },
    created() {
      this.init()
    },
  }

</script>

<style lang="scss">
  @import"../../../../assets/ambuf/css/coursesStudy_v1.0/list";

</style>
