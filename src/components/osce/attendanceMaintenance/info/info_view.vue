<template>
  <!-- 考生考核信息 -->
  <div class="exmUserContent">

    <div class="add-score-head"><span class="add-score-l">{{examUserData.sceneName}}</span> <span class="add-score-r">满分({{ examUserData.scoreTable.totalScore }})</span></div>
    <hr>
    <!-- 老师信息 -->
    <div class="teacherInfo " style="top: 31px;padding-top: 0">
      <!-- 教师头像 -->
      <p class="teacher-header">考官</p>
      <div class="phontoContent">
        <img :src="examUserData.teacher.teacherUserPhotoPath" alt="" class="user-img">
      </div>
      <!-- 其他内容 -->
      <p class="otherInfo "> 考核内容 : {{examUserData.contentName}}</p>
      <p class="otherInfo "> &nbsp;&nbsp; 姓名 : {{examUserData.teacher.teacherUserName}}</p>
      <p class="otherInfo ">房间号 : {{examUserData.roomNum}}</p>
    </div>
    <!-- 考核信息 -->
    <div class="exmContentMain " style="top: 31px;">
      <el-form ref="formValidate" label-width="80px">
        <!--列表数据-->

        <el-table border align="center" max-height="450" show-summary :data="examUserData.scoreTable.detailsList" tooltip-effect="dark"
          highlight-current-row :summary-method="getSummaries" style="width: 100%;height: 100%" class="add-scope">
          <el-table-column align="center" prop="classify" label="项目" width="150">
          </el-table-column>
          <el-table-column align="center" prop="content" label="评分标准及要求">
          </el-table-column>
          <el-table-column prop="score" label="标准分" align="center" width="80">
          </el-table-column>
          <el-table-column prop="mark" label="得分" align="center" width="100">
          </el-table-column>
        </el-table>
        </br>
      </el-form>
    </div>
    <!-- 考生信息 -->
    <div class="studentInfo" style="top: 31px;">
      <p class="studentInfoNum">考生</p>
      <div class="studentPhoto">
        <img :src="examUserData.examUser.userPhotoPath" alt="" class="user-img">
      </div>
      <p class="otherInfo ">姓名 : {{examUserData.examUser.userName}}</p>
      <p class="otherInfo">性别 : {{examUserData.examUser.userSex | typeText}}</p>
      <el-row>
        <el-col :span="4">&nbsp; &nbsp; 点评 : </el-col>
        <el-col :span="19">
          <el-input type="textarea" readonly resize="none" v-model="examUserData.scoreTable.evaluate" :rows="3"></el-input>
        </el-col>
      </el-row>
      <!-- 基本信息 -->
      <!--<p class="otherInfo">姓名：{{ studentInfo.userName }}</p>-->
      <!-- 操作按钮 -->
    </div>

  </div>
</template>

<script>
  let Util;
  export default {
    props: ['url', 'operailityData'],
    data() {
      return {
        //保存按钮基本信息

        loadBtn: {
          title: '提交',
          callParEvent: 'listenSubEvent'
        },
        //选择内容id
        selectContentId: '',
        //获取考站监考老师评分详情form
        examUserForm: {
          scheduleId: this.operailityData.scheduleId, //教师评分id
          teacherId: this.operailityData.teacherId, //教师id
          arrangementId: this.operailityData.arrangementId, //考核安排id
        },
        //获取的考生详情数据
        examUserData: {
          "teacher": {},
          "examUser": {},
          "scoreTable": {
            detailsList: []
          }
        },
        //当前组件默认请求 学生数据,ajax处理的 基础信息设置
        examUserMessTitle: {
          ajaxSuccess: 'updateListData',
          ajaxParams: {
            url: this.url.scheduleGet.path,
            params: {}
          }
        },

      }

    },
    methods: {
      //初始化请求列表数据
      init() {
        Util = this.$util;
        //ajax请求参数设置
        this.setTableData();
      },



      //通过get请求列表数据
      updateListData(responseData) {
        let data = responseData.data;
        if (!data) return;
        this.examUserData = data;
      },
      setTableData() {
        this.examUserMessTitle.ajaxParams.params = Object.assign(this.examUserMessTitle.ajaxParams.params, this.examUserForm);
        this.ajax(this.examUserMessTitle);
      },
      //最后一行总计
      getSummaries(param) {
        const {
          columns,
          data
        } = param;
        const sums = [];
        columns.forEach((column, index) => {
          if (index === 0) {
            sums[index] = '总分';
            return;
          }
          const values = data.map(item => Number(item[column.property]));
          if (!values.every(value => isNaN(value))) {
            sums[index] = values.reduce((prev, curr) => {
              const value = Number(curr);
              if (!isNaN(value)) {
                return prev + curr;
              } else {
                return prev;
              }
            }, 0);
            sums[index] += '';
          } else {
            sums[index] = ' ';
          }
        });
        return sums;
      }
    },
    created() {
      this.init();
    }
  }

</script>

<style lang="scss">
  @import'~@/assets/ambuf/css/examineMonitor_v1.0/studentInfo';

</style>
