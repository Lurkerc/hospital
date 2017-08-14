<template>
  <!-- 出科申请 -->
  <div>
    <el-row class="givenTheApplicationOfLarge">
      <el-form :inline="true">
        <el-col :span="12">
          <el-form-item label="姓名：">{{ viewData.userName }}</el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="科室：">{{ viewData.greatName }}</el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="入科时间：">{{ viewData.beginTime }}</el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="出科时间：">{{ viewData.endTime }}</el-form-item>
        </el-col>
        <el-col class="timeInfo">
          <el-form-item label="共缺时间：">
            <span>{{ viewData.minerDays + viewData.sickDays + viewData.personalDays }} 天</span>
          </el-form-item>
          <el-form-item label="其中：">
            <span>旷工 {{ viewData.minerDays || 0 }} 天，</span>
            <span>病假 {{ viewData.sickDays || 0 }} 天，</span>
            <span>事假 {{ viewData.personalDays || 0 }} 天</span>
          </el-form-item>
          <el-form-item label="轮转比例：">
            <span>{{ (viewData.deficitRatio || 0) * 100 }} %</span>
          </el-form-item>
        </el-col>

        <el-col class="subDepAppraise">
          <div class="subDepAppraiseItem" :class="{'marginLeft':index % 2 === 1}" v-for="(item,index) in viewData.subDepAppraise" :key="index">
            <fieldset>
              <legend style="font-size:16px">&nbsp;&nbsp;{{ item.depName }}出科情况汇总&nbsp;&nbsp;</legend>
              <el-form-item label="考勤：">
                <span>旷工 {{ item.minerDays || 0 }} 天，</span>
                <span>病假 {{ item.sickDays || 0 }} 天，</span>
                <span>事假 {{ item.personalDays || 0 }} 天</span>
              </el-form-item>
              <el-form-item label="奖惩情况：">
                <span>奖励 {{ item.rewardNum || 0 }} 次，</span>
                <span>惩罚 {{ item.penaltyNum || 0 }} 次</span>
              </el-form-item>
              <div>
                <el-form-item label="老师评价：">{{ item.teacherEvaluation }}</el-form-item>
              </div>
              <div>
                <el-form-item label="老师评语：">{{ item.teacherComment }}</el-form-item>
              </div>
              <h4>轮转记录填写：</h4>
              <el-table align="center" :context="self" :data="item.depRequired" tooltip-effect="dark">
                <el-table-column label="名称" prop="requiredName"></el-table-column>
                <el-table-column label="要求例数" prop="requiredNum" show-overflow-tooltip></el-table-column>
                <el-table-column label="实填例数" prop="userNum" show-overflow-tooltip></el-table-column>
              </el-table>
              <h4>出科成绩：</h4>
              <table class="el-table">
                <thead>
                  <tr>
                    <th>
                      <div class="cell">名称</div>
                    </th>
                    <th>
                      <div class="cell">成绩</div>
                    </th>
                    <th>
                      <div class="cell">是否补考</div>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr class="el-table__row">
                    <td>
                      <div class="cell">理论考核</div>
                    </td>
                    <td>
                      <div class="cell">{{ item.theoryExamScore }}</div>
                    </td>
                    <td>
                      <div class="cell">{{ (item.theoryExamScore ? item.theoryExamIsMakeup : '--') | isNeed }}</div>
                    </td>
                  </tr>
                  <tr class="el-table__row">
                    <td>
                      <div class="cell">技能考核</div>
                    </td>
                    <td>
                      <div class="cell">{{ item.skillExamScore }}</div>
                    </td>
                    <td>
                      <div class="cell">{{ (item.skillExamScore ? item.skillExamIsMakeup : '--') | isNeed }}</div>
                    </td>
                  </tr>
                  <tr class="el-table__row">
                    <td>
                      <div class="cell">日常考核</div>
                    </td>
                    <td>
                      <div class="cell">{{ item.dailyExamScore }}</div>
                    </td>
                    <td>
                      <div class="cell">--</div>
                    </td>
                  </tr>
                  <tr class="el-table__row">
                    <td>
                      <div class="cell">综合成绩</div>
                    </td>
                    <td>
                      <div class="cell">{{ item.coligateScore }}</div>
                    </td>
                    <td>
                      <div class="cell">--</div>
                    </td>
                  </tr>
                </tbody>
              </table>
              <!--<p class="depQualified">
                <b>出科结果：{{ item.depQualified | typeText }}</b>
              </p>-->
              <h4 class="depQualified">出科结果：
                <b :style="{'color': item.depQualified !== 'QUALIFIED' ? 'red' : 'green'}">{{ item.depQualified | typeText }}</b>
              </h4>
            </fieldset>
          </div>
        </el-col>

        <el-col>
          <h4>个人小结：</h4>
          {{ viewData.userSummary }}
        </el-col>
        <el-col>
          <h4>小结附件：</h4>
          <uploadFile :uploadFiles="studentUploadFiles" :show="true"></uploadFile>
        </el-col>
        <el-col>
          <h4>教育处评语：</h4>
          <el-input type="textarea" :autosize="{ minRows: 4, maxRows: 6}" :maxlength="250" placeholder="请输入内容" v-model="summaryFileList.comment"></el-input>
        </el-col>
        <el-col>
          <h4>资料附件：</h4>
          <uploadFile @setUploadFiles="setUploadFiles" :uploadFiles="teacherUploadFiles"></uploadFile>
        </el-col>
        <el-col style="margin-top:20px;">
          <el-form-item label="出科是否合格：">
            <el-radio class="radio" v-model="summaryFileList.depQualified" label="QUALIFIED">合格</el-radio>
            <el-radio class="radio" v-model="summaryFileList.depQualified" label="NO_QUALIFIED">不合格</el-radio>
          </el-form-item>
        </el-col>
      </el-form>
      <div style="padding-top:16px;clear:both;">
        <el-col :span="6" :offset="6" align="center">
          <load-btn @listenSubEvent="listenSubEvent" :btnData="loadBtn"></load-btn>
        </el-col>
        <el-col :span="6" align="center">
          <el-button @click="cancel">取消</el-button>
        </el-col>
      </div>
    </el-row>
  </div>
</template>

<script>
  import api from './api';
  import uploadFile from '../../../../components/common/uploadFile';

  export default {
    props: ['operailityData'],
    data() {
      return {
        self: this,
        viewData: [],
        summaryFileList: {
          fileIds: '',
          comment: '',
          depQualified: 'QUALIFIED', // 是否合格 QUALIFIED合格|NO_QUALIFIED不合格
        },
        studentUploadFiles: [],
        teacherUploadFiles: [],
        //保存按钮基本信息
        loadBtn: {
          title: '确定',
          callParEvent: 'listenSubEvent'
        },
      }
    },
    methods: {
      // 初始化
      init() {
        this.getViewData()
      },

      // 获取预览数据
      getViewData() {
        this.ajax({
          ajaxSuccess: 'getDataSuccess',
          ajaxParams: {
            url: api.get.path + this.operailityData.examinationId,
            method: api.get.method
          }
        })
      },

      // 获取数据成功
      getDataSuccess(res) {
        this.viewData = res.data;
        this.summaryFileList.comment = res.data.eduComment;
        this.summaryFileList.depQualified = res.data.depQualified || "QUALIFIED";
        let fileIds = [];
        this.studentUploadFiles.length = 0;
        this.teacherUploadFiles.length = 0;
        // 学生附件
        res.data.summaryFileList.map(item => {
          this.studentUploadFiles.push({
            fileId: item.id,
            fileName: item.fileName,
            filePath: '/api/file/download/' + item.id
          })
        });
        console.log(this.studentUploadFiles)
        // 老师附件
        res.data.teacherCommentFileList.map(item => {
          fileIds.push(item.id);
          this.teacherUploadFiles.push({
            fileId: item.id,
            fileName: item.fileName,
            filePath: '/api/file/download/' + item.id
          })
        });

        this.summaryFileList.fileIds = fileIds.join(',');

      },

      // 上传附件
      setUploadFiles(ids) {
        this.summaryFileList.fileIds = ids;
      },

      // 保存
      listenSubEvent(isLoadingFun) {
        if (!isLoadingFun) isLoadingFun = function () {};
        isLoadingFun(true);
        this.ajax({
          ajaxSuccess: () => this.$emit('rotary', 'rotary', '审核成功'),
          ajaxParams: {
            url: api.addManageComment.path + this.operailityData.examinationId,
            method: api.addManageComment.method,
            data: this.summaryFileList,
          }
        }, isLoadingFun)
      },

      // 取消
      cancel() {
        this.$emit('cancel', 'rotary')
      },
    },
    components: {
      uploadFile
    },
    created() {
      this.init()
    },
  }

</script>

<style lang="scss">
  /* 出科申请 */

  .givenTheApplicationOfLarge {
    h4 {
      margin: 20px 0;
    }
    .timeInfo {
      .el-form-item {
        margin-bottom: 0;
        &~.el-form-item {
          margin-left: 30px;
        }
      }
    }
    fieldset {
      h4 {
        margin: 10px 0;
      }
      .el-form-item {
        margin-bottom: 0;
      }
    }
    .depQualified {
      clear: both; // padding-top: 10px;
      margin-bottom: 0;
    }
    .subDepAppraise {
      .el-col {
        margin-top: 20px;
      }
    }
  }

</style>
