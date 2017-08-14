<template>
  <!-- 出科申请 - 实习生 -->
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
            <span>旷工 {{ viewData.minerDays || 0 }} 天，</span>
            <span>病假 {{ viewData.sickDays || 0 }} 天，</span>
            <span>事假 {{ viewData.personalDays || 0 }} 天</span>
          </el-form-item>
        </el-col>

        <el-col :span="20" :offset="2">
          <el-form-item label="奖惩情况：">
            <span>奖励 {{ viewData.rewardNum || 0 }} 次，</span>
            <span>惩罚 {{ viewData.penaltyNum || 0 }} 次</span>
          </el-form-item>
        </el-col>
        <el-col :span="20" :offset="2">
          <el-form-item label="老师评价：">{{ viewData.teacherEvaluation || '-' }}</el-form-item>
        </el-col>
        <el-col :span="20" :offset="2">
          <h4>轮转记录填写：</h4>
          <!-- 实习生 -->
          <!-- <template v-if="studentType">
            <el-table align="center" :context="self" :data="viewData.depRequired" tooltip-effect="dark">
              <el-table-column label="名称" prop="requiredName"></el-table-column>
              <el-table-column label="要求例数" prop="requiredNum" show-overflow-tooltip></el-table-column>
              <el-table-column label="实填例数" prop="userNum" show-overflow-tooltip></el-table-column>
            </el-table>
          </template> -->
          <!-- 非实习生 -->
          <!-- <template v-else>
            <el-table align="center" :context="self" :data="viewData.depRequirement" tooltip-effect="dark">
              <el-table-column label="名称" prop="disTitle"></el-table-column>
              <el-table-column label="要求例数" prop="disNum" show-overflow-tooltip></el-table-column>
              <el-table-column label="实填例数" prop="disTs" show-overflow-tooltip></el-table-column>
            </el-table>
          </template> -->
          <el-table align="center" :context="self" :data="depRequirement" tooltip-effect="dark">
            <el-table-column label="名称" prop="disTitle"></el-table-column>
            <el-table-column label="要求例数" prop="disNum" show-overflow-tooltip></el-table-column>
            <el-table-column label="实填例数" prop="disTs" show-overflow-tooltip></el-table-column>
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
                  <div class="cell">{{ viewData.theoryExamScore }}</div>
                </td>
                <td>
                  <div class="cell">{{ (viewData.theoryExamScore ? viewData.theoryExamIsMakeup : '--') | isNeed }}</div>
                </td>
              </tr>
              <tr class="el-table__row">
                <td>
                  <div class="cell">技能考核</div>
                </td>
                <td>
                  <div class="cell">{{ viewData.skillExamScore }}</div>
                </td>
                <td>
                  <div class="cell">{{ (viewData.skillExamScore ? viewData.skillExamIsMakeup : '--') | isNeed }}</div>
                </td>
              </tr>
              <tr class="el-table__row">
                <td>
                  <div class="cell">日常考核</div>
                </td>
                <td>
                  <div class="cell">{{ viewData.dailyExamScore }}</div>
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
                  <div class="cell">{{ viewData.coligateScore }}</div>
                </td>
                <td>
                  <div class="cell">--</div>
                </td>
              </tr>
            </tbody>
          </table>
        </el-col>
        <el-col :span="20" :offset="2">
          <h4>个人小结：</h4>
          <el-input type="textarea" :autosize="{ minRows: 4, maxRows: 6}" :maxlength="250" placeholder="请输入内容" v-model="summaryFileList.comment"></el-input>
        </el-col>
        <el-col :span="20" :offset="2">
          <h4>小结附件：</h4>
          <upload-file @setUploadFiles="setUploadFiles" :uploadFiles="uploadFiles"></upload-file>
        </el-col>
      </el-form>
      <div style="padding-top:16px;clear:both;">
        <el-col :span="6" :offset="6" align="center">
          <el-button @click="save" type="success">保存</el-button>
        </el-col>
        <el-col :span="6" align="center">
          <load-btn @listenSubEvent="listenSubEvent" :btnData="loadBtn"></load-btn>
        </el-col>
      </div>
    </el-row>
  </div>
</template>

<script>
  import api from './api';
  import uploadFile from '../../../../components/common/uploadFile';

  export default {
    props: ['operailityData', 'userType'],
    data() {
      return {
        self: this,
        depRequirement: [], //轮转记录
        viewData: {
          depExaminationId: '',
          depId: "",
          podId: "",
          depName: "",
          userName: "",
          rotaryBeginTime: "",
          rotaryEndTime: "",
          minerDays: '',
          sickDays: '',
          personalDays: '',
          rewardNum: '',
          penaltyNum: '',
          theoryExamScore: '',
          theoryExamIsMakeup: '',
          skillExamScore: '',
          skillExamIsMakeup: '',
          dailyExamScore: '',
          coligateScore: '',
          userSummary: "",
          teacherEvaluation: "",
          depRequired: [],
          userSummaryCreateTime: '',
          summaryFileList: [],
          teacherComment: "",
          teacherCommentCreateTime: "",
          teacherCommentUserName: "",
          teacherCommentFileList: [],
          depComment: "",
          depCommentCreateTime: "",
          depCommentFileList: [],
          depQualified: "",
          teacherAutograph: "",
          isMakeupRotary: '',
          makeupTs: ''
        },
        summaryFileList: {
          fileIds: '',
          comment: '',
        },
        uploadFiles: [],
        //保存按钮基本信息
        loadBtn: {
          title: '上报',
          callParEvent: 'listenSubEvent'
        },
        // 学生类型
        studentType: 'SXS', // 默认实习生
      }
    },
    methods: {
      // 初始化
      init() {
        // 检测当前登录用户是否是实习生
        let thisUserRoleList = [];
        if (this.userType.indexOf('SXS') > -1) {
          this.studentType = 'SXS'
        }

        if (this.operailityData.depExaminationId) {
          this.getViewData()
        } else {
          this.getViewDataForPodId()
        }
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
        // this.viewDate.depRequirement = []; // 非实习生查看的轮转记录填写
        this.summaryFileList.comment = res.data.userSummary;
        let fileIds = [];
        this.uploadFiles.length = 0;
        res.data.summaryFileList.map(item => {
          fileIds.push(item.id);
          this.uploadFiles.push({
            fileId: item.id,
            fileName: item.fileName,
            filePath: '/api/file/download/' + item.id
          })
        });
        this.summaryFileList.fileIds = fileIds.join(',');
        this.getViewDataForPodId();
      },

      // 通过轮转id获取预览数据
      getViewDataForPodId() {
        this.ajax({
          ajaxSuccess: 'getDataForPodIdSuccess',
          ajaxParams: {
            url: api.getUserRotaryInfo.path + this.operailityData.podId,
            method: api.getUserRotaryInfo.method
          }
        })
      },

      // 获取数据成功
      getDataForPodIdSuccess(res) {
        this.$util._.map(res.data, (val, key) => {
          val && (this.viewData[key] = val)
        })

        if (this.studentType === 'SXS') {
          this.getDepRequirementBySXS()
        } else {
          this.operailityData.rdId = this.viewData.rdId;
          this.operailityData.depId = this.viewData.depId;
          this.getDepRequirement();
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
            url: api.getDepRequirement.path + (this.operailityData.rdId || '') + '-' + (this.operailityData.depId ||
                '') + '-' +
              this.operailityData.podId,
            method: api.getDepRequirement.method
          }
        })
      },

      // 上传附件
      setUploadFiles(ids) {
        this.summaryFileList.fileIds = ids;
      },

      // 保存
      save() {
        this.ajax({
          ajaxSuccess: () => this.$emit('rotary', 'rotary', '保存成功'),
          ajaxParams: {
            url: api.userAddComment.path + this.viewData.podId,
            method: api.userAddComment.method,
            data: this.summaryFileList,
          }
        })
      },

      // 上报
      listenSubEvent() {

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
  }

</style>
