<template>
  <!-- 考生考核信息 -->
  <div class="exmUserContent">
    <!-- 老师信息 -->
    <div class="teacherInfo">
      <el-row class="border">
        <el-col :span="6" class="teacherInfoItem" v-for="(item,tIndex) in stationRoom.teacherList" :key="tIndex" @click.native="selectTeacher(item.userId)">
          <img src="http://iph.href.lu/60x60">
          <p>{{ item.teacherName }}</p>
        </el-col>
      </el-row>
      <!-- 教师头像 -->
      <div class="phontoContent">
        <img :src="getPhotoPath(teacherInfo.userPhotoPath) || 'http://iph.href.lu/120x160'" alt="">
        <p class="teacherName">{{ teacherInfo.userName }}</p>
      </div>
      <!-- 当前时间 -->
      <div class="timeInfo">
        <p>当前时间</p>
        <p>{{ nowTime }}</p>
      </div>
      <!-- 其他内容 -->
      <p class="otherInfo">考核内容：{{ studentInfo.contentName }}</p>
      <p class="otherInfo">分站时间：{{ teacherInfo.timeLength }}分钟</p>
      <p class="otherInfo">房间号：{{ exmContent.roomNum || '-'}}</p>
    </div>
    <!-- 考核信息 -->
    <div class="exmContentMain">
      <el-table align="center" :height="dynamicHt" :context="self" :data="exmContent.detailsList" :summary-method="getSummaries"
        show-summary tooltip-effect="dark" class="tableShowMoreInfo" style="width: 100%;">
        <el-table-column label="项目" prop="classify" show-overflow-tooltip></el-table-column>
        <el-table-column label="评分标准及要求" prop="content" show-overflow-tooltip></el-table-column>
        <el-table-column label="标准分" width="120" prop="score" show-overflow-tooltip></el-table-column>
        <el-table-column label="得分" prop="mark" show-overflow-tooltip>
          <template scope="scope">
            {{ scope.row.mark || 0 }}
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!-- 考生信息 -->
    <div class="studentInfo">
      <p class="studentInfoNum">当前考核人员（{{ nowId }}/{{ userSums }}）</p>
      <div class="studentPhoto">
        <img :src="getPhotoPath(studentInfo.userPhotoPath) || 'http://iph.href.lu/120x160'" alt="">
      </div>
      <!-- 基本信息 -->
      <p class="otherInfo">姓名：{{ studentInfo.userName }}</p>
      <p class="otherInfo">性别：{{ studentInfo.userSex | typeText }}</p>
      <p class="otherInfo">结束倒计时：{{ countDown }}</p>
      <p class="otherInfo">当前考生得分：{{ exmContent.totalMark || 0 }}</p>
      <!-- 操作按钮 -->
      <p class="changeStudent">
        <el-button type="info" @click="changeStudent('p')" v-if="nowId > 1">上一人</el-button>
        <el-button type="success" @click="changeStudent('n')" v-if="nowId < userSums">下一人</el-button>
      </p>
      <!-- 服务器连接状态 -->
      <p class="serverStatus error" v-if="isError">服务器连接异常</p>
    </div>
  </div>
</template>

<script>
  let sd = null; // 倒计时
  let studentTime = null;
  import api from '../api';
  export default {
    props: ['nowIndex', 'index', 'sceneId', 'stationId', 'roomId', 'userSum'],
    data() {
      return {
        isError: false,
        dynamicHt: 600,
        userSums: this.userSum || 0,
        self: this,
        nowTime: '-', // 当前时间
        countDown: '00：00：00', // 倒计时
        // http://218.241.184.2:9014/#!/project/api/detail?projectID=15&apiID=512
        // 考核内容
        exmContent: {
          scoreTableId: "0",
          scheduleId: "0",
          markId: "-",
          caseName: "-",
          totalScore: "-",
          totalMark: "-",
          evaluate: "-",
          detailsList: [ //
            // {
            //   "tableDetailsId": "1",
            //   "classify": "分类",
            //   "content": "考核内容",
            //   "score": "5",
            //   "detailOrder": "1",
            //   "scheduleDetailsId": "1",
            //   "mark": "2.5"
            // }
          ]
        },
        // 学生信息
        studentInfo: { // 没有头像信息
          userId: "1",
          userName: "-",
          userSex: "-",
          userNum: "-",
          timeLength: 0, // 单位是分钟？
          contentName: "-",
          mark: "-",
          nowIndex: "1",
          startTime: "-",
          endTime: "-",
          examStatus: "NOTEXAM",
          arrangementId: "1",
          markId: "-"
        },
        // 考站信息
        stationRoom: {},
        // 当前选中老师信息
        teacherInfo: {},
        // 其他
        // sceneId: this.sceneId, // 场次id
        // stationId: this.stationId, // 站点id
        arrangementId: 0, // 考核安排id
        nowId: this.nowIndex, // 考核顺序
        // roomId: 5, // 房间id
        teacherId: 0, // 监考老师id
        teacherUserId: 0, // 监考老师用户id
      }
    },
    methods: {
      // 获取考核内容统计
      getSummaries() {
        const sums = ['评价意见', this.exmContent.evaluate, this.exmContent.totalScore, this.exmContent.totalMark];
        return sums;
      },
      // 选择老师
      selectTeacher(id) {
        this.teacherUserId = id;
        this.getTeacherInfo();
      },
      /*********************** 初始化数据 ****************************/
      // 结束倒计时
      getCountDown() {
        clearInterval(sd);
        let endTime = new Date(this.studentInfo.endTime || new Date()).getTime();
        let _this = this;
        sd = setInterval(() => {
          let nowTime = new Date().getTime();
          let t = endTime - nowTime;
          let h = 0;
          let m = 0;
          let s = 0;
          if (t >= 0) {
            h = Math.floor(t / 1000 / 60 / 60 % 24);
            m = Math.floor(t / 1000 / 60 % 60);
            s = Math.floor(t / 1000 % 60);
            h = _this.getCpl(h);
            m = _this.getCpl(m);
            s = _this.getCpl(s);
            _this.countDown = h + '：' + m + '：' + s;
          } else {
            clearInterval(sd);
            _this.countDown = "00：00：00"
          }
        }, 1000)
      },
      // 补全时间
      getCpl(s) {
        return s < 10 ? '0' + s : s
      },
      // 当前时间
      getNowTime() {
        let _this = this;
        setInterval(() => {
          _this.nowTime = ((new Date().toLocaleString()).split(' '))[1];
        }, 1000);
      },
      // 点击老师获取学生的考核内容
      getContentByTeacher() {
        let params = this.$util._.defaultsDeep({}, {
          id: this.teacherId,
          sceneId: this.sceneId,
          stationId: this.stationId,
          arrangementId: this.arrangementId,
          reqTime: new Date().getTime(),
        });
        this.ajax({
          ajaxSuccess: 'updateExmContent',
          ajaxParams: {
            url: api.teacherGet.path + this.teacherId,
            method: api.teacherGet.method,
            params
          }
        });
      },
      // 考生切换
      changeStudent(type) {
        clearTimeout(studentTime);
        if (type) {
          type === 'n' ? ++this.nowId : --this.nowId;
        }
        let params = this.$util._.defaultsDeep({}, {
          nowIndex: this.nowId,
          sceneId: this.sceneId,
          stationId: this.stationId,
          roomId: this.roomId
        });
        this.ajax({
          ajaxSuccess: 'updateStudentInfo',
          ajaxError: () => this.isError = true,
          ajaxParams: {
            url: api.examUserGet.path,
            method: api.examUserGet.method,
            params
          }
        });
      },
      // 获取老师信息
      getTeacherInfo() {
        let params = this.$util._.defaultsDeep({}, {
          sceneId: this.sceneId,
          teacherId: this.teacherUserId
        });
        this.ajax({
          ajaxSuccess: 'getTeacherInfoData',
          ajaxParams: {
            url: api.stationGet.path,
            method: api.stationGet.method,
            params
          }
        });
      },
      /************************* 更新数据 *********************************/
      // 获取老师数据
      getTeacherInfoData(res) {
        this.teacherInfo = res.data;
        this.teacherId = res.data.id;
        this.getContentByTeacher();
      },
      // 更新考核内容数据
      updateExmContent(res) {
        studentTime = setTimeout(() => this.getContentByTeacher(), 30000)
        if (res.data) {
          this.exmContent = res.data;
        } else {
          this.exmContent.detailsList = []
        }
      },
      // 更新考生信息
      updateStudentInfo(res) {
        this.studentInfo = res.data;
        this.arrangementId = res.data.arrangementId;
        // clearInterval(sd);
        this.getCountDown();
        this.getTeacherInfo();
        if (typeof res.data != 'object') {
          this.isError = true
        } else {
          this.isError = false
        }
      },
      // 获取头像地址
      getPhotoPath(path) {
        return path && this.$store.getters.getEnvPath.http + path || ''
      },
    },
    created() {
      this.stationRoom = this.$store.state.examineMonitor.index.stationRoom;
      this.teacherUserId = this.stationRoom.teacherList[0].userId;
      this.getNowTime();
      this.changeStudent()
    },
    destroyed() {
      clearTimeout(studentTime);
    }
  }

</script>

<style lang="scss">
  @import'~@/assets/ambuf/css/examineMonitor_v1.0/studentInfo';

</style>
