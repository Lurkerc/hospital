<template>
  <!-- 教学质量评价表 - 管理 -->
  <div>
    <el-row>
      <el-col>
        <el-tabs v-model="showTypes" @tab-click="initViewData">
          <el-tab-pane label="学生" name="xs"></el-tab-pane>
          <el-tab-pane label="同行" name="th"></el-tab-pane>
          <el-tab-pane label="上级" name="sj"></el-tab-pane>
        </el-tabs>
      </el-col>
      <el-col>
        <el-form :inline="true">
          <el-form-item label="总体得分：">{{ viewData.ztdf }}</el-form-item>
          <el-form-item label="最高得分：">{{ viewData.zgdf }}</el-form-item>
          <el-form-item label="最低得分：">{{ viewData.zddf }}</el-form-item>
        </el-form>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        showTypes: 'xs',
        score: [],
        viewData: {
          "ztdf": "50", // 总体得分
          "zgdf": "100", // 最高得分
          "zddf": "50", // 最低得分
          "xsdf": "10", // 学生打分
          "xsqz": 100, // 学生权重
          "xsdfrs": 20, // 学生打分人数
          "thdf": 10, // 同行打分
          "thqz": 20, // 同行权重
          "thdfrs": 20, // 同行打分人数
          "sjdf": 20, // 上级打分
          "sjqz": 20, // 上级权重
          "sjdfrs": 20, // 上级打分人数
          "xsyjList": [], // 学生的意见或建议
          "thyjList": [], // 同行的意见或建议
          "sjyjList": [], // 上级的意见或建议
          "optionList": [], // optionList
        }
      }
    },
    methods: {
      init() {

      },
      // 初始化查看数据
      initViewData() {

      },

    },
    created() {
      this.init()
    }
  }

</script>

<style>
  /* 教学质量评价表管理 */

</style>
