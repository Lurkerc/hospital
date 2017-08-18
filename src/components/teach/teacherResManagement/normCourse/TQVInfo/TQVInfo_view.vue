<template>
  <!-- 教学质量评价表 - 查看 -->
  <div>

    <el-row>
      <el-form>
        <el-col>
          <el-form-item label="总体得分：">5分</el-form-item>
        </el-col>
        <el-col>
          <el-form-item label="总体印象：">
            <el-radio-group v-model="formValidate.allYX">
              <el-radio v-for="(item,index) in tqvAllData" :key="index" :label="item.label">{{ item.text }}</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col>
      </el-form>
      <h3>评分项目</h3>
      <el-table ref="singleTable" :data="evaluate.studentEvaluate" style="width: 100%">
        <el-table-column type="index" label="编号" width="70">
        </el-table-column>
        <el-table-column property="title" label="项目" oshow-overflow-tooltip>
        </el-table-column>
        <el-table-column property="remark" label="内容" width="120">
        </el-table-column>
        <el-table-column property="great" label="优">
          <template scope="scope">
            <el-radio>{{ scope.row.great }}</el-radio>
          </template>
        </el-table-column>
        <el-table-column property="good" label="良">
          <template scope="scope">
            <el-radio>{{ scope.row.good }}</el-radio>
          </template>
        </el-table-column>
        <el-table-column property="avg" label="中">
          <template scope="scope">
            <el-radio>{{ scope.row.avg }}</el-radio>
          </template>
        </el-table-column>
        <el-table-column property="bad" label="差">
          <template scope="scope">
            <el-radio>{{ scope.row.bad }}</el-radio>
          </template>
        </el-table-column>
      </el-table>
      <h3 class="marginTop20">课堂教学评价</h3>
      <el-input type="textarea" :autosize="{ minRows:4, maxRows: 6}" placeholder="请输入内容" v-model="formValidate.evaluate">
      </el-input>
      <el-col align="center" class="marginTop20">
        <el-button type="info">提交</el-button>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        evaluate: {},
        tqvAllData: [{
          label: '5',
          text: '优秀'
        }, {
          label: '4',
          text: '良好'
        }, {
          label: '3',
          text: '中等'
        }, {
          label: '2',
          text: '差劲'
        }],
        formValidate: {
          allYX: '', // 总体印象
          evaluate: ''
        },
      }
    },
    methods: {
      init() {
        this.evaluate = this.$store.state.curriculum.look.evaluate;
      }
    },
    created() {
      this.init()
    },
  }

</script>

<style>
  /* 教学质量评价表 - 查看 */

  .marginTop20 {
    margin-top: 20px;
  }

</style>
