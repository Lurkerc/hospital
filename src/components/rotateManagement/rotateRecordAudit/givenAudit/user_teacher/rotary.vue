<template>
  <!-- 出科申请 - 带教老师 -->
  <div>
    <el-row class="givenTheApplicationView">
      <el-form>
        <el-col :span="10" :offset="2">
          <el-form-item label="姓名：">{{ viewData.userName }}</el-form-item>
        </el-col>
        <el-col :span="10">
          <el-form-item label="科室：">{{ viewData.depName }}</el-form-item>
        </el-col>
        <el-col :span="20" :offset="2">
          <el-form-item label="考勤：">
            <span>旷工 <el-input v-model="numParams.minerDays" class="numInput"></el-input> 天，</span>
            <span>病假 <el-input v-model="numParams.sickDays" class="numInput"></el-input> 天，</span>
            <span>事假 <el-input v-model="numParams.personalDays" class="numInput"></el-input> 天</span>
          </el-form-item>
        </el-col>

        <el-col :span="20" :offset="2">
          <el-form-item label="奖惩情况：">
            <span>奖励 {{ viewData.rewardNum || 0 }} 次，</span>
            <span>惩罚 {{ viewData.penaltyNum || 0 }} 次</span>
          </el-form-item>
        </el-col>
        <el-col :span="20" :offset="2">
          <el-form-item label="老师评价：">{{ viewData.teacherEvaluation || '暂无' }}</el-form-item>
        </el-col>
        <el-col :span="20" :offset="2">
          <h4>轮转记录填写：</h4>
          <el-table align="center" :context="self" :data="viewData.depRequired" tooltip-effect="dark">
            <el-table-column label="名称" prop="requiredName"></el-table-column>
            <el-table-column label="要求例数" prop="requiredNum" show-overflow-tooltip></el-table-column>
            <el-table-column label="实填例数" prop="userNum" show-overflow-tooltip></el-table-column>
          </el-table>
        </el-col>
        <el-col :span="20" :offset="2">
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
                  <div class="cell">
                    <el-input v-model="numParams.theoryExamScore" class="numInput"></el-input>
                  </div>
                </td>
                <td>
                  <!--<div class="cell">{{ viewData.skillExamIsMakeup | isNeed }}</div>-->
                  <div class="cell">--</div>
                </td>
              </tr>
              <tr class="el-table__row">
                <td>
                  <div class="cell">技能考核</div>
                </td>
                <td>
                  <div class="cell">
                    <el-input v-model="numParams.skillExamScore" class="numInput"></el-input>
                  </div>
                </td>
                <td>
                  <!--<div class="cell">{{ viewData.skillExamIsMakeup | isNeed }}</div>-->
                  <div class="cell">--</div>
                </td>
              </tr>
              <tr class="el-table__row">
                <td>
                  <div class="cell">日常考核</div>
                </td>
                <td>
                  <div class="cell">
                    <el-input v-model="numParams.dailyExamScore" class="numInput"></el-input>
                  </div>
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
                  <div class="cell">
                    <el-input v-model="numParams.coligateScore" class="numInput"></el-input>
                  </div>
                </td>
                <td>
                  <div class="cell">--</div>
                </td>
              </tr>
            </tbody>
          </table>
        </el-col>

      </el-form>
      <el-col :span="20" :offset="2">
        <h4>个人小结：</h4>
        {{ viewData.userSummary || '暂无' }}
      </el-col>
      <el-col :span="20" :offset="2">
        <h4>小结附件：</h4>
        <uploadFile :uploadFiles="studentUploadFiles" :show="true"></uploadFile>
      </el-col>
      <el-col :span="20" :offset="2">
        <h4>科室评语：</h4>
        {{ viewData.depComment || '暂无' }}
      </el-col>
      <el-col :span="20" :offset="2">
        <h4>科室附件：</h4>
        <uploadFile :uploadFiles="depUploadFiles" :show="true"></uploadFile>
      </el-col>
      <el-col :span="20" :offset="2">
        <h4>老师评价：
          <el-button>去评价</el-button>
        </h4>
      </el-col>
      <el-col :span="20" :offset="2">
        <h4>老师评语：</h4>
        <el-input type="textarea" :autosize="{ minRows: 4, maxRows: 6}" :maxlength="250" placeholder="请输入内容" v-model="summaryFileList.comment"></el-input>
      </el-col>
      <el-col :span="20" :offset="2">
        <h4>老师附件：</h4>
        <uploadFile @setUploadFiles="setUploadFiles" :uploadFiles="teacherUploadFiles"></uploadFile>
      </el-col>
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
  import api from '../api';
  import uploadFile from '../../../../../components/common/uploadFile';

  export default {
    props: ['operailityData', 'userType'],
    data() {
      return {
        self: this,
        viewData: [],
        summaryFileList: {
          fileIds: '', // 附件IDs
          comment: '', // 老师评语
        },
        numParams: { // 数字类输入，如果为空则为0
          minerDays: '', // 旷工天数
          sickDays: '', // 病假天数
          personalDays: '', // 事假天数
          theoryExamScore: '', // 理论成绩
          skillExamScore: '', // 技能成绩
          dailyExamScore: '', // 日常考核成绩
          coligateScore: '', // 综合成绩
        },
        studentUploadFiles: [], // 学生附件
        teacherUploadFiles: [], // 老师附件
        depUploadFiles: [], // 科室附件
        //保存按钮基本信息
        loadBtn: {
          title: '上报',
          callParEvent: 'listenSubEvent'
        },
        // 学生类型
        studentType: 'SXS', // 默认实习生
        depRequirement: [],
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
            url: api.get.path + this.operailityData.depExaminationId,
            method: api.get.method
          }
        })
      },

      // 获取数据成功
      getDataSuccess(res) {
        this.viewData = res.data;
        this.summaryFileList.comment = res.data.teacherComment;
        let fileIds = [];
        this.studentUploadFiles.length = 0;
        this.teacherUploadFiles.length = 0;
        this.depUploadFiles.length = 0;
        // 学生附件
        res.data.summaryFileList.map(item => {
          this.studentUploadFiles.push({
            fileId: item.id,
            fileName: item.fileName,
            filePath: '/api/file/download/' + item.id
          })
        });
        // 老师附件
        res.data.teacherCommentFileList.map(item => {
          fileIds.push(item.id);
          this.teacherUploadFiles.push({
            fileId: item.id,
            fileName: item.fileName,
            filePath: '/api/file/download/' + item.id
          })
        });
        // 科室附件
        res.data.depCommentFileList.map(item => {
          this.depUploadFiles.push({
            fileId: item.id,
            fileName: item.fileName,
            filePath: '/api/file/download/' + item.id
          })
        });

        this.summaryFileList.fileIds = fileIds.join(',');

        // 获取输入数据
        for (let key in this.numParams) {
          this.numParams[key] = res.data[key]
        }

        if (this.studentType === 'SXS') {
          this.operailityData.podId && this.getDepRequirementBySXS()
        } else {
          this.operailityData.podId && this.getDepRequirement();
        }
      },

      // 获取实习生查看的轮转记录填写
      getDepRequirementBySXS() {
        this.ajax({
          ajaxSuccess: res => this.depRequirement = res.data || [],
          ajaxParams: {
            url: api.getDepRequirementBySXS.path + '--' + this.operailityData.podId,
            method: api.getDepRequirementBySXS.method
          }
        })
      },
      // 获取非实习生查看的轮转记录填写
      getDepRequirement() {
        this.ajax({
          ajaxSuccess: res => this.depRequirement = res.data || [],
          ajaxParams: {
            url: api.getDepRequirement.path + '--' + this.operailityData.podId,
            method: api.getDepRequirement.method
          }
        })
      },

      // 上传附件
      setUploadFiles(ids) {
        this.summaryFileList.fileIds = ids;
      },

      // 保存
      listenSubEvent(isLoadingFun) {
        let tips = {
          minerDays: '旷工天数', // 旷工天数
          sickDays: '病假天数', // 病假天数
          personalDays: '事假天数', // 事假天数
          theoryExamScore: '理论成绩', // 理论成绩
          skillExamScore: '技能成绩', // 技能成绩
          dailyExamScore: '日常考核成绩', // 日常考核成绩
          coligateScore: '综合成绩', // 综合成绩
        }
        // 获取输入数据
        for (let key in this.numParams) {
          if (isNaN(this.numParams[key]) || !(this.numParams[key] > -1 && this.numParams[key] < 1000)) {
            this.errorMess(`${tips[key]}只能为数字并且在0-999之间！`)
            return
          }
          if (!this.numParams[key]) {
            this.numParams[key] = 0
          }
        }
        if (!isLoadingFun) isLoadingFun = function () {};
        isLoadingFun(true);

        let data = this.$util._.defaultsDeep({}, this.summaryFileList, this.numParams);
        this.ajax({
          ajaxSuccess: () => this.$emit('rotary', 'rotary', '上报成功'),
          ajaxParams: {
            url: api.teacherAddComment.path + this.operailityData.depExaminationId,
            method: api.teacherAddComment.method,
            data,
          }
        }, isLoadingFun)
      },

      // 上报
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

  .givenTheApplicationView {
    h4 {
      margin: 20px 0;
    }
    .numInput {
      width: 80px;
    }
  }

</style>
