<template>
  <!-- 考核详情 -->
  <div class="givenTheApplicationView">
    <el-row>
      <el-form>
        <el-col :span="8">
          <el-form-item label="姓名：">{{ viewData.userName }}</el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="入科时间：">{{ viewData.rotaryBeginTime }}</el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="出科时间：">{{ viewData.rotaryEndTime }}</el-form-item>
        </el-col>

        <fieldset>
          <legend style="font-size:16px">&nbsp;&nbsp;{{ viewData.depName }}出科情况汇总&nbsp;&nbsp;</legend>
          <el-col>
            <el-form-item label="考勤：">
              <span>旷工 {{ viewData.minerDays || 0 }} 天，</span>
              <span>病假 {{ viewData.sickDays || 0 }} 天，</span>
              <span>事假 {{ viewData.personalDays || 0 }} 天</span>
            </el-form-item>
          </el-col>

          <el-col>
            <el-form-item label="奖惩情况：">
              <span>奖励 {{ viewData.rewardNum || 0 }} 次，</span>
              <span>惩罚 {{ viewData.penaltyNum || 0 }} 次</span>
            </el-form-item>
          </el-col>
          <el-col>
            <el-form-item label="老师评价：">{{ viewData.teacherEvaluation }}</el-form-item>
          </el-col>
          <el-col>
            <h4>轮转记录填写：</h4>
            <el-table align="center" :context="self" :data="viewData.depRequired" tooltip-effect="dark">
              <el-table-column label="名称" prop="requiredName"></el-table-column>
              <el-table-column label="要求例数" prop="requiredNum" show-overflow-tooltip></el-table-column>
              <el-table-column label="实填例数" prop="userNum" show-overflow-tooltip></el-table-column>
            </el-table>
          </el-col>
          <el-col>
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
        </fieldset>
      </el-form>
      <div align="center" style="margin-top:16px;">
        <h3>出科结果： <b :style="{'color': viewData.depQualified !== 'QUALIFIED' ? 'red' : ''}">{{ viewData.depQualified | typeText }}</b></h3>
      </div>
    </el-row>
  </div>
</template>

<script>
  import api from './api';
  export default {
    props: ['operailityData'],
    data() {
      return {
        self: this,
        viewData: [],
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
      },
    },
    components: {},
    created() {
      this.init()
    },
  }

</script>

<style lang="scss">
  .givenTheApplicationView {
    h4 {
      margin: 20px 0;
    }
  }

</style>
