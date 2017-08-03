<template>
  <!-- 考生考核信息 -->
  <div class="exmUserContent">

    <div class="add-score-head"><span class="add-score-l">{{examUserData.sceneName}}</span> <span class="add-score-r">满分({{ examUserData.scoreTable.totalScore }})</span></div>
    <hr>
    <!-- 老师信息 -->
    <div class="teacherInfo " style="top: 31px;padding-top: 0">
      <!-- 教师头像 -->
      <p class="teacher-header">考官</p>
      <div class="phontoContent noBorder">
        <img :src="getPhotoPath(examUserData.teacher.teacherUserPhotoPath)">
      </div>
      <!-- 其他内容 -->
      <p class="otherInfo ">姓名：{{examUserData.teacher.teacherUserName}}</p>
      <p class="otherInfo ">房间号：{{examUserData.roomNum}}</p>
      <p class="otherInfo ">考核内容：{{examUserData.contentName}}</p>
    </div>
    <!-- 考核信息 -->
    <div class="exmContentMain " style="top: 31px;">
      <el-form ref="formValidate" label-width="80px">
        <!--列表数据-->

        <el-table border align="center" max-height="450" show-summary :data="examUserData.scoreTable.detailsList" tooltip-effect="dark"
          highlight-current-row :summary-method="getSummaries" style="width: 100%;height: 100%" class="add-scope">
          <el-table-column align="center" prop="classify" label="项目" width="150">
          </el-table-column>
          <el-table-column align="left" prop="content" label="评分标准及要求">
          </el-table-column>
          <el-table-column prop="score" label="标准分" align="center" width="80">
          </el-table-column>
          <el-table-column prop="mark" label="得分" align="center" width="100">
            <template scope="scope">
              <el-form :model="scope.row" :rules="rules.addScore" :ref="'formValidate'+[scope.$index+'scope']" label-width="80px">
                <el-form-item prop="mark" error="cuo" label-width="0px">
                  <el-input @blur="markChange(scope.row)" type="number" min="0" :max="scope.row.score" v-model.number="scope.row.mark"></el-input>
                </el-form-item>
              </el-form>
            </template>
          </el-table-column>
        </el-table>
        </br>
        <el-form-item label="点评" prop="s">
          <el-row>
            <el-col :span="20">
              <el-input type="textarea" resize="none" v-model="contentDataList.evaluate" :rows="3"></el-input>
            </el-col>
          </el-row>
        </el-form-item>
      </el-form>
      <el-row>
        <el-col :span="10" :offset="10">
          <load-btn @listenSubEvent="listenSubEvent" :btnData="loadBtn"></load-btn>
        </el-col>
      </el-row>
    </div>
    <!-- 考生信息 -->
    <div class="studentInfo" style="top: 31px;">
      <p class="studentInfoNum">考生</p>
      <div class="studentPhoto">
        <img :src="getPhotoPath(examUserData.examUser.userPhotoPath)">
      </div>
      <p class="otherInfo">姓名：{{examUserData.examUser.userName}}</p>
      <p class="otherInfo">性别：{{examUserData.examUser.userSex | typeText}}</p>
      <!-- 基本信息 -->
      <!--<p class="otherInfo">姓名：{{ studentInfo.userName }}</p>-->
      <!-- 操作按钮 -->
    </div>

  </div>
</template>

<script>
  let Util;
  import rules from '../rules'
  export default {
    props: ['url', 'operailityData'],
    data() {
      return {
        //保存按钮基本信息
        rules: rules,
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
          teacher: {},
          examUser: {},
          scoreTable: {
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
        //添加用的form列表
        contentDataList: {
          "detatilsList": []
        },
        //当前组件提交(add)数据时,ajax处理的 基础信息设置
        addMessTitle: {
          type: 'edit',
          successTitle: '修改评分成功!',
          errorTitle: '修改评分失败!',
          ajaxSuccess: 'ajaxSuccess',
          ajaxError: 'ajaxError',
          ajaxParams: {
            url: this.url.teacherSubmit.path,
            jsonString: true, //  //使用Content-Type: application/json
            method: 'post',
            data: {},
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

      /*
       * 点击提交按钮 监听是否提交数据
       * @param isLoadingFun boolean  form表单验证是否通过
       * */
      listenSubEvent(isLoadingFun) {
        let isSubmit = this.submitForm("formValidate");
        if (isSubmit) {
          if (!isLoadingFun) isLoadingFun = function () {};
          isLoadingFun(true);
          this.addMessTitle.ajaxParams.data = this.contentDataList;
          this.ajax(this.addMessTitle, isLoadingFun)
        }
      },

      /*
       * 点击提交按钮 监听是否验证通过
       * @param formName string  form表单v-model数据对象名称
       * @return flag boolean   form表单验证是否通过
       * */
      submitForm(formName) {
        let flag = false;
        let isBlack = false;
        for (let key in this.$refs) {
          this.$refs[key].validate((valid) => {
            if (valid) {
              flag = true;
            } else {
              isBlack = true;
            }
          });
          if (isBlack) {
            return false;
          }
        }
        return flag;
      },


      //通过get请求列表数据
      updateListData(responseData) {
        let data = responseData.data;
        if (!data) return;
        this.examUserData = data;
        this.contentDataList = this.conductListData(data.scoreTable);
      },
      setTableData() {
        this.examUserMessTitle.ajaxParams.params = Object.assign(this.examUserMessTitle.ajaxParams.params, this.examUserForm);
        this.ajax(this.examUserMessTitle);
      },




      //处理获取到列表数据，为添加评分服务
      conductListData(data) {
        let operailityData = this.operailityData;
        let teacherId = operailityData.teacherId;
        let scheduleId = data.scheduleId;
        let userId = operailityData.userId;
        let arrangementId = operailityData.arrangementId;
        // let scoreTableId = data.detatilsList[0].scoreTableId;
        let scoreTableId = data.scoreTableId;
        let sceneId = this.examUserData.sceneId;
        let markId = this.operailityData.markId;
        let listData = {
          teacherId,
          scheduleId,
          markId,
          sceneId: sceneId,
          arrangementId: arrangementId,
          scoreTableId: scoreTableId,
          userId: userId,
          mark: "",
          evaluate: data.evaluate,
          detailsList: []
        };
        //处理列表外层数据
        let detailsList = data.detailsList;
        let length = detailsList.length;
        for (let i = 0; i < length; i++) {
          detailsList[i].sceneId = sceneId;
          detailsList[i].scoreTableId = scoreTableId;
          detailsList[i].teacherId = teacherId;
          detailsList[i].userId = userId;
          detailsList[i].detailsId = detailsList[i].scoreTableDetailId
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
        if (row.mark > row.score) {
          row.mark = row.score;
        } else if (row.mark < 0 || !row.mark) {
          row.mark = 0;
        }
      },

      // 获取头像地址
      getPhotoPath(path) {
        return path && this.$store.getters.getEnvPath.http + path || '/static/image/defAvatar.png'
      },
    },
    created() {
      this.init();
    }
  }

</script>

<style lang="scss">
  @import'~@/assets/ambuf/css/examineMonitor_v1.0/studentInfo';

</style>
