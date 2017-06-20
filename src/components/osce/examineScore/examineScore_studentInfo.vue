<template>
  <!-- 考生考核信息 -->
  <div class="exmUserContent" style="min-height:600px;">
    <!-- 考核信息 -->
    <div class="exmContentMain">
      <el-form ref="formValidate" label-width="80px">
        <!--列表数据-->
        <el-table border align="center" max-height="400" show-summary :data="contentDataList.detailsList" tooltip-effect="dark" highlight-current-row
          :summary-method="getSummaries" style="width: 100%;height: 100%" class="add-scope">
          <el-table-column align="center" prop="classify" label="项目" width="150">
          </el-table-column>
          <el-table-column align="center" prop="content" label="评分标准及要求">
          </el-table-column>
          <el-table-column prop="score" label="标准分" align="center" width="80">
          </el-table-column>
          <el-table-column prop="mark" label="得分" align="center" width="100">
            <template scope="scope">
              <el-form :model="scope.row"  :rules="rules.addScore" :ref="'formValidate'+[scope.$index+'scope']" label-width="80px">
                <el-form-item prop="mark" error="cuo" label-width="0px">
                  <el-input  @blur="markChange(scope.row)" type="number" min="0" :max="scope.row.score" v-model.number="scope.row.mark"></el-input>
                </el-form-item>
              </el-form>
            </template>
          </el-table-column>
        </el-table>
        </br>
        <el-form-item label="点评" >
          <el-row>
            <el-col :span="20">
              <el-input type="textarea" resize="none" v-model="contentDataList.evaluate" :rows="3"></el-input>
            </el-col>
          </el-row>
        </el-form-item>
      </el-form>
    </div>
    <!-- 考生信息 -->
    <div class="studentInfo">
      <p class="studentInfoNum">当前考核人员（{{ nowId }}/{{ userSums }}）</p>
      <div class="studentVideoBox">
        <!-- 监控视频 -->
      </div>
      <div class="studentInfoBox">
        <div class="studentPhotoPos">
          <img src="http://iph.href.lu/120x160" alt="">
        </div>
        <!-- 基本信息 -->
        <p class="otherInfo">姓名：{{ studentInfo.userName }}</p>
        <p class="otherInfo">性别：{{ studentInfo.userSex | typeText }}</p>
        <p class="otherInfo">结束倒计时：00：00：00</p>
        <p class="otherInfo">当前考生得分：{{ studentInfo.totalMark || 0 }}</p>
      </div>
      <!-- 操作按钮 -->
      <p align="center" style="margin-top:20px;">
        <el-button v-if="studentInfo.examStatus === 'NOTEXAM'" type="danger" @click="idVerification('ONGOING')">身份确认并开始考核</el-button>
        <el-button v-if="studentInfo.examStatus === 'ONGOING' && !studentInfo.markId" type="danger" @click="idVerification('FINISH')">考核结束提交分数</el-button>
        <el-button v-if="studentInfo.markId && !chgScore" type="danger" @click="changeScore">修改分数</el-button>
        <!--<el-button v-if="chgScore" type="danger" @click="listenSubEvent">提交分数</el-button>-->
        <load-btn @listenSubEvent="listenSubEvent" type="success" v-if="chgScore" :btnData="loadBtn"></load-btn>
        <el-button v-if="!studentInfo.contentId" type="warning" @click="sample">抽题</el-button>
      </p>
      <p class="changeStudent">
        <el-button type="info" @click="changeStudent('p')" v-if="nowId > 1">上一人</el-button>
        <el-button type="success" @click="changeStudent('n')" v-if="nowId < userSums">下一人</el-button>
      </p>
      <!-- 服务器连接状态 -->
      <p class="serverStatus error" v-if="isError">服务器连接异常</p>
      <p class="serverStatus" v-else>服务器连接正常</p>
    </div>
  </div>
</template>

<script>
  import rules from './rules'
  import api from './api';
  export default {
    // props: ['nowIndex', 'index', 'sceneId', 'stationId', 'roomId', 'userSum'],
    props: ['sceneId', 'stationId', 'roomId', 'userSum', "teacherId"],
    data() {
      return {
        rules:rules,
        isError: false,
        dynamicHt: 600,
        chgScore: false,
        userSums: this.userSum || 0,
        self: this,
        nowTime: '-', // 当前时间

        loadBtn: {
          title: '提交分数',
          callParEvent: 'listenSubEvent'
        },

        userId: '',
        teacherUserId: '', // 当前登录老师的用户id

        // 学生信息
        studentInfo: { // 没有头像信息
          userId: "",
          userName: "-",
          userSex: "-",
          userNum: "-",
          timeLength: 0, // 单位是分钟？
          contentId: '-',
          contentName: "-",
          mark: "-",
          nowIndex: "1",
          startTime: "-",
          endTime: "-",
          examStatus: "-",
          arrangementId: "1",
          markId: ""
        },
        //获取的内容列表数据 （会合并成）
        contentDataList: {
          "detailsList": []
        },
        // 其他
        // sceneId: this.sceneId, // 场次id
        // stationId: this.stationId, // 站点id
        arrangementId: 0, // 考核安排id
        nowId: 1, // 考核顺序
        // roomId: 5, // 房间id
        // teacherId: 0, // 监考老师id
        addMessTitle: {
          type: 'add',
          successTitle: '评分成功!',
          errorTitle: '评分失败!',
          ajaxSuccess: 'saveCase',
          ajaxError: 'ajaxError',
          ajaxParams: {
            jsonString: true, //  //使用Content-Type: application/json
            url: api.submit.path,
            method: api.submit.method,
            data: {},
          }
        },
      }
    },
    methods: {
      /*********************** 初始化数据 ****************************/
      // 当前时间
      getNowTime() {
        let _this = this;
        setInterval(() => {
          _this.nowTime = ((new Date().toLocaleString()).split(' '))[1];
        }, 1000);
      },
      // 考生切换
      changeStudent(type) {
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
      // 抽题
      sample() {
        let data = this.$util._.defaultsDeep({}, {
          sceneId: this.sceneId,
          stationId: this.stationId,
          arrangementId: this.arrangementId
        });
        this.ajax({
          ajaxSuccess: (res) => {
            this.successMess('抽题成功');
            // 抽题返回contentId 才能进行获取考核内容
            this.setContentList();
          },
          ajaxError: () => {
            this.isError = true;
            this.errorMess('抽题失败');
          },
          ajaxParams: {
            url: api.random.path,
            method: api.random.method,
            data
          }
        });
      },
      // 身份确认
      idVerification(status) {
        let data = this.$util._.defaultsDeep({}, {
          // examStatus: status,
          id: this.arrangementId,
          userId: this.userId,
          sceneId: this.sceneId,
          stationId: this.stationId,
          roomId: this.roomId
        });
        if(status == 'FINISH'){
          let isSubmit = this.submitForm("formValidate");
          if(!isSubmit){
            return;
          }
        }
        this.ajax({
          ajaxSuccess: (res) => {
            this.successMess('操作成功');
            this.studentInfo.examStatus = 'ONGOING';
            if (status === 'FINISH') {
              this.listenSubEvent(); // 提交评分
            }
          },
          ajaxError: () => {
            this.isError = true;
            this.errorMess('操作失败');
          },
          ajaxParams: {
            url: api.modiryStatus.path,
            method: api.modiryStatus.method,
            data
          }
        });
      },
      // 修改评分
      changeScore() {
        // 改变一个状态让提交评分按钮出现
        this.chgScore = true;
      },
      /************************* 更新数据 *********************************/
      // 保存评分成功
      saveCase(res) {
        if (this.chgScore) { // 恢复显示修改按钮
          this.chgScore = false;
        }
        this.setContentList()
      },
      /*
       * 点击提交按钮 监听是否提交数据 (评分)
       * @param isLoadingFun boolean  form表单验证是否通过
       * */
      listenSubEvent(isLoadingFun) {
        let isSubmit = this.submitForm("formValidate");
        if (isSubmit) {
          if (!isLoadingFun) isLoadingFun = function () {};
          isLoadingFun(true);
          this.addMessTitle.ajaxParams.data = this.contentDataList;
          this.ajax(this.addMessTitle, isLoadingFun)
          // console.log(this.addMessTitle.ajaxParams.data)
        }
      },
      /*
       * 点击提交按钮 监听是否验证通过
       * @param formName string  form表单v-model数据对象名称
       * @return flag boolean   form表单验证是否通过
       * */
      submitForm(formName) {
        let flag = false;
        let isBlack=false;
        for (let key in  this.$refs){
          this.$refs[key].validate((valid) => {
            if (valid) {
              flag = true;
            }else {
              isBlack = true;
        }
        });
          if(isBlack){
            return false;
          }
        }
        return flag;
      },
      //获取内容请求
      setContentList() {
        let opt = {
          ajaxSuccess: 'contentData',
          ajaxParams: {
            url: api.contentGet.path + this.teacherId,
            params: {
              id: this.teacherId,
              sceneId: this.sceneId,
              stationId: this.stationId,
              arrangementId: this.arrangementId
            }
          }
        };
        this.ajax(opt);
      },
      // 更新考核内容数据
      updateExmContent(res) {
        if (res.data) {
          this.exmContent = res.data;
        } else {
          this.exmContent.detailsList = []
        }
      },
      // 更新考生信息
      updateStudentInfo(res) {
        for (let key in  this.$refs){
          this.$refs[key].resetFields();
        }
        this.studentInfo = res.data;
        this.arrangementId = res.data.arrangementId;
        this.userId = res.data.userId;
        this.chgScore = false;
        if (res.data.contentId) {
          this.setContentList();
        }
        if (typeof res.data != 'object') {
          this.isError = true
        } else {
          this.isError = false
        }
      },
      //获取内容列表数据
      contentData(responseData) {
        let data = responseData.data;
        if (!data) return;
        this.studentInfo.markId = data.markId;
        this.contentDataList = this.conductListData(data);
      },

      //处理获取到列表数据，为添加评分服务
      conductListData(data) {
        let teacherId = this.teacherId;
        let scheduleId = data.scheduleId;
        let userId = this.userId;
        let arrangementId = this.arrangementId;
        let scoreTableId = data.scoreTableId;
        let sceneId = data.sceneId;
        let listData = {
          "teacherId": teacherId,
          "scheduleId": scheduleId,
          "markId": data.markId,
          "sceneId": sceneId,
          "arrangementId": arrangementId,
          "scoreTableId": scoreTableId,
          "userId": userId,
          "mark": "",
          "evaluate": data.evaluate,
          "detailsList": []
        };
        //处理列表外层数据
        let detailsList = data.detailsList;
        let length = detailsList.length;
        for (let i = 0; i < length; i++) {
          detailsList[i].sceneId = sceneId;
          detailsList[i].scoreTableId = scoreTableId;
          detailsList[i].scheduleId = scheduleId;
          detailsList[i].detailsId = detailsList[i].detailsId; // 评分表id
          detailsList[i].mark = detailsList[i].mark;
          detailsList[i].teacherId = teacherId;
          detailsList[i].userId = userId;
        }
        listData.detailsList = detailsList;
        return listData;

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
        this.contentDataList.mark = sums[sums.length - 1];
        return sums;
      },


      markChange(row) {
        //mark 得分验证
        if(row.mark > row.score){
          row.mark = row.score
        }else if(row.mark<0||!row.mark){
          row.mark = 0
        }
      },


    },
    created() {
      // this.stationRoom = this.$store.state.examineMonitor.index.stationRoom;
      this.teacherUserId = this.$store.getters.getUserInfo.id;
      // this.getNowTime();
      this.changeStudent();
    }
  }

</script>

<style lang="scss">
  @import'~@/assets/ambuf/css/examineMonitor_v1.0/studentInfo';
  .studentInfo {
    .studentInfoBox {
      position: relative;
      .studentPhotoPos {
        position: absolute;
        right: 10px;
        top: 0;
      }
    }
    .studentVideoBox {
      margin: 10px;
      background: #000;
      min-height: 200px;
    }
  }

</style>
