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
          <el-form-item label="老师评价：">{{ viewData.teacherEvaluation }}</el-form-item>
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
                  <div class="cell">{{ viewData.theoryExamScore }}</div>
                </td>
                <td>
                  <div class="cell">{{ viewData.skillExamIsMakeup | isNeed }}</div>
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
                  <div class="cell">{{ viewData.skillExamIsMakeup | isNeed }}</div>
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
          {{ viewData.userSummary }}
        </el-col>
        <el-col :span="20" :offset="2">
          <h4>小结附件：</h4>
          <uploadFile v-if="studentUploadFiles.length" :uploadFiles="studentUploadFiles" :show="true"></uploadFile>
          <span v-else>暂无附件</span>
        </el-col>
        <el-col :span="20" :offset="2">
          <h4>老师评语：</h4>
          {{ viewData.teacherComment }}
        </el-col>
        <el-col :span="20" :offset="2">
          <h4>老师附件：</h4>
          <uploadFile v-if="studentUploadFiles.length" :uploadFiles="teacherUploadFiles" :show="true"></uploadFile>
          <span v-else>暂无附件</span>
        </el-col>

        <el-col :span="20" :offset="2">
          <h4>科室评语：</h4>
          <el-input type="textarea" :autosize="{ minRows: 4, maxRows: 6}" :maxlength="250" placeholder="请输入内容" v-model="summaryFileList.comment"></el-input>
        </el-col>
        <el-col :span="20" :offset="2">
          <h4>科室附件：</h4>
          <uploadFile @setUploadFiles="setUploadFiles" :uploadFiles="depUploadFiles"></uploadFile>
        </el-col>
        <el-col :span="20" :offset="2" style="margin-top:20px;">
          <el-form-item label="是否合格：">
            <el-radio class="radio" v-model="summaryFileList.depQualified" label="QUALIFIED">合格</el-radio>
            <el-radio class="radio" v-model="summaryFileList.depQualified" label="NO_QUALIFIED">不合格</el-radio>
          </el-form-item>
        </el-col>
        <template v-if="summaryFileList.depQualified === 'QUALIFIED'">
          <el-col :span="10" :offset="2">
            <el-form-item label="是否需要补轮转：">
              <el-radio class="radio" v-model="summaryFileList.isMakeupRotary" :label="1">需要</el-radio>
              <el-radio class="radio" v-model="summaryFileList.isMakeupRotary" :label="0">不需要</el-radio>
            </el-form-item>
          </el-col>
          <el-col :span="10" v-if="summaryFileList.isMakeupRotary">
            <el-form-item label="补轮转周期：">
              <el-input v-model="summaryFileList.makeupTs" style="width:200px;"></el-input> 周
            </el-form-item>
          </el-col>
        </template>
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
  import api from '../api';
  import uploadFile from '../../../../../components/common/uploadFile';

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
          isMakeupRotary: 1, // 是否需要补轮转 0不需要|1需要
          makeupTs: 1, // 轮转周期
        },
        studentUploadFiles: [], // 学生附件
        teacherUploadFiles: [], // 老师附件
        depUploadFiles: [], // 科室附件
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
            url: api.get.path + this.operailityData.depExaminationId,
            method: api.get.method
          }
        })
      },

      // 获取数据成功
      getDataSuccess(res) {
        let fileIds = [];
        this.viewData = res.data;
        this.summaryFileList.comment = res.data.depComment;
        this.summaryFileList.depQualified = res.data.depQualified;
        this.summaryFileList.isMakeupRotary = res.data.isMakeupRotary;
        this.summaryFileList.makeupTs = res.data.makeupTs;
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
          this.teacherUploadFiles.push({
            fileId: item.id,
            fileName: item.fileName,
            filePath: '/api/file/download/' + item.id
          })
        });
        // 科室附件
        res.data.depCommentFileList.map(item => {
          fileIds.push(item.id);
          this.depUploadFiles.push({
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

      // 确定
      listenSubEvent(isLoadingFun) {
        if (!isLoadingFun) isLoadingFun = function () {};
        isLoadingFun(true)
        this.ajax({
          ajaxSuccess: () => this.$emit('rotary', 'rotary', '保存成功'),
          ajaxParams: {
            url: api.depAddComment.path + this.operailityData.depExaminationId,
            method: api.depAddComment.method,
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

  .givenTheApplicationView {
    h4 {
      margin: 20px 0;
    }
  }

</style>
