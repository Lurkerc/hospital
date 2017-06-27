<template>
  <!-- 考生考核信息 -->
  <div class="exmUserContent" style="min-height:500px;">
    <!-- 老师信息 -->
    <div class="teacherInfo">
      <el-row class="border">
        <el-col :span="6" class="teacherInfoItem" v-for="(item,index) in teacherinfo" :key="index" @click.native="selectTeacher(item)">
          <img :src="item.teacherUserPhotoPath || 'http://iph.href.lu/60x60'" class="min-img" />
          <p> {{item.userName}}</p>
        </el-col>
      </el-row>
      <!-- 教师头像 -->
      <div class="phontoContent">
        <img :src="selectTeaData.teacherUserPhotoPath || 'http://iph.href.lu/120x180'" alt="">
      </div>
      <!-- 其他内容 -->
      <p class="otherInfo">考官姓名：{{ selectTeaData.userName || '-' }}</p>
    </div>
    <!-- 考核信息 -->
    <div class="exmContentMain">
      <el-table align="center" :height="dynamicHt" :context="self" :data="scheduleData.detailsList" :summary-method="getSummaries"
        show-summary tooltip-effect="dark" class="tableShowMoreInfo" style="width: 100%;">
        <el-table-column label="项目" prop="classify" show-overflow-tooltip></el-table-column>
        <el-table-column label="评分标准及要求" prop="content" align="left" show-overflow-tooltip></el-table-column>
        <el-table-column label="标准分" width="120" prop="score" show-overflow-tooltip></el-table-column>
        <el-table-column label="得分" prop="mark" show-overflow-tooltip>
          <template scope="scope">
            {{ scope.row.mark || '-' }}
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!-- 考生信息 -->
    <div class="studentInfo">
      <p class="studentInfoNum">考生</p>
      <div class="studentPhoto">
        <img :src="studentInfo.userPhotoPath || 'http://iph.href.lu/120x180'" alt="">
      </div>
      <!-- 基本信息 -->
      <p class="otherInfo">姓名：{{ studentInfo.userName }}</p>
      <p class="otherInfo">性别：{{ studentInfo.userSex | typeText }}</p>
      <p class="otherInfo">老师评价：{{ scheduleData.evaluate || '-' }}</p>
    </div>
  </div>
</template>

<script>
  import api from './api';
  export default {
    props: ['sceneId', 'studentId', 'markId', 'stationId', 'arrangementId'],
    data() {
      return {
        dynamicHt: 600,
        self: this,
        nowTime: '-', // 当前时间
        // 考核内容
        scheduleData: {},
        // 老师信息
        teacherinfo: {},
        // 学生信息
        studentInfo: {},
        // 选中的老师
        selectTeaData: {},
        // 获取老师列表
        teacherList: {
          ajaxSuccess: 'updateListData',
          ajaxParams: {
            url: api.stationGet.path + '/' + this.markId,
            params: {}
          }
        },
        //获取老师获取考站监考老师列表
        scheduleList: {
          ajaxSuccess: 'scheduleListData',
          ajaxParams: {
            url: api.teacherGet.path,
            params: {}
          }
        },
      }
    },
    methods: {
      // 获取考核内容统计
      getSummaries() {
        const sums = ['合计', '', this.scheduleData.totalScore, this.scheduleData.totalMark];
        return sums;
      },

      /*********************** 初始化数据 ****************************/
      //通过get请求列表数据
      updateListData(responseData) {
        let data = responseData.data;
        this.studentInfo = data;
        this.teacherinfo = data.teacherList;
        //初始化选择老师
        this.selectTeacher(data.teacherList[0])
      },
      //选择老师获取列表数据
      scheduleListData(responseData) {
        let data = responseData.data;
        if (data) {
          this.scheduleData = data;
        } else {
          this.scheduleData = {};
        }
      },
      /********************** 获取数据 ********************************/
      // 获取老师列表
      getTeacherList() {
        this.teacherList.ajaxParams.params = Object.assign(this.teacherList.ajaxParams.params, {
          markId: this.markId,
          sceneId: this.sceneId,
          arrangementId: this.arrangementId,
        });
        this.ajax(this.teacherList);
      },
      //获取右侧列表 选择老师的时候调用
      selectTeacher(data) {
        this.selectTeaData = data;
        this.scheduleList.ajaxParams.params = Object.assign(this.scheduleList.ajaxParams.params, {
          teacherId: data.id,
          arrangementId: this.arrangementId
        });
        this.ajax(this.scheduleList);
      },
    },
    created() {
      this.getTeacherList();
    }
  }

</script>

<style lang="scss">
  @import'~@/assets/ambuf/css/examineMonitor_v1.0/studentInfo';

</style>
