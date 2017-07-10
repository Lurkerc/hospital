<template>
  <!-- 查看 -->
  <div>
    <print>
      <el-row class="givenTheApplicationView">
        <el-form>
          <el-col :span="8" :offset="2">
            <el-form-item label="姓名：">{{ viewData.userName }}</el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="科室：">{{ viewData.depName }}</el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="出科结果："><b :style="{'color': viewData.depQualified !== 'QUALIFIED' ? 'red' : 'green'}">{{ viewData.depQualified | typeText }}</b></el-form-item>
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
            <h4>带教老师评语：</h4>
            {{ viewData.teacherComment }}
          </el-col>
          <el-col :span="20" :offset="2">
            <h4>带教老师附件：</h4>
            <uploadFile v-if="teacherUploadFiles.length" :uploadFiles="teacherUploadFiles" :show="true"></uploadFile>
            <span v-else>暂无附件</span>
          </el-col>
          <el-col :span="20" :offset="2">
            <h4>科室评语：</h4>
            {{ viewData.depComment }}
          </el-col>
          <el-col :span="20" :offset="2">
            <h4>科室附件：</h4>
            <uploadFile v-if="depUploadFiles.length" :uploadFiles="depUploadFiles" :show="true"></uploadFile>
            <span v-else>暂无附件</span>
          </el-col>

          <el-col :span="20" :offset="2">
            <h4>老师签名：</h4>
            <img :src="viewData.teacherAutograph">
          </el-col>
        </el-form>
      </el-row>
    </print>
  </div>
</template>

<script>
  import api from './api';
  import uploadFile from '../../../../components/common/uploadFile';
  import print from '../../../../components/common/print';
  export default {
    props: ['operailityData'],
    data() {
      return {
        self: this,
        viewData: [],
        studentUploadFiles: [],
        teacherUploadFiles: [],
        depUploadFiles: [],
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
          this.depUploadFiles.push({
            fileId: item.id,
            fileName: item.fileName,
            filePath: '/api/file/download/' + item.id
          })
        });
      },

    },
    components: {
      uploadFile,
      print
    },
    created() {
      this.init()
    },
  }

</script>

<style lang="scss">
  /* 查看 */

  .givenTheApplicationView {
    h4 {
      margin: 20px 0;
    }
  }

</style>
