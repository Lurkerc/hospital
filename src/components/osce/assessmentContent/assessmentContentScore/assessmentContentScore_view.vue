<template>
  <div>
    <el-row>
      <el-form :model="formValidate" ref="formValidate" :inline="true">
        <!-- 指标名称 -->
        <el-col align="center">
          <el-form-item label="评分指标名称：">{{ formValidate.scoreTableName }}</el-form-item>
        </el-col>
        <el-table :data="formValidate.detailsList" align="center" border :context="self" tooltip-effect="dark" class="asmContable"
          style="width: 100%" show-summary :summary-method="getSummaries">
          <el-table-column label="项目" width="200px" prop="classify" show-overflow-tooltip>
            <template scope="scope">
              {{ scope.row.classify }}
            </template>
          </el-table-column>
          <el-table-column label="评分标准及要求" prop="content" show-overflow-tooltip></el-table-column>
          <el-table-column label="描述" prop="remark" show-overflow-tooltip></el-table-column>
          <el-table-column v-if="formValidate.scoreType == 'GRADE'" label="评分标准描述" prop="classifyDescribe" show-overflow-tooltip></el-table-column>
          <el-table-column v-if="formValidate.scoreType == 'GRADE'" label="分值展示" prop="classifyScore" show-overflow-tooltip></el-table-column>
          <el-table-column label="标准分" width="80px" prop="score" show-overflow-tooltip></el-table-column>
        </el-table>
      </el-form>
    </el-row>
  </div>
</template>

<script>
  export default {
    props: {
      id: { // 操作id
        type: Number,
        default: 0
      },
      urlParams: { // 查看
        type: Object,
        required: true
      },
    },
    data() {
      return {
        self: this,
        formValidate: {}
      }
    },
    methods: {
      /**************************** 从服务器获取编辑的数据 *****************************************/
      getDataForServer() {
        // console.log(this.todoId);
        this.ajax({
          ajaxSuccess: 'ajaxSuccess',
          ajaxParams: {
            url: `${this.urlParams.path}/${this.id}`,
            method: this.urlParams.method
          }
        })
      },
      ajaxSuccess(res) {
        this.formValidate = res.data // 初始化编辑数据
      },
      // 统计分数
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
          if (!values.every(value => isNaN(value)) && index === 3) {
            sums[index] = values.reduce((prev, curr) => {
              const value = Number(curr);
              if (!isNaN(value)) {
                return prev + curr;
              } else {
                return prev;
              }
            }, 0);
          }
        });
        for(let a = 0;a < param.data.length; a++){
          if(param.data[a].isPoints == '1'){
            sums[3] = sums[3] - param.data[a].score
          }
        };
        this.formValidate.totalScore = sums[3];
        return sums;
      },
      /*
       * 组件初始化入口
       * */
      init() {
        // 获取编辑数据
        this.getDataForServer();
      },
    },
    created() {
      this.init();
      // console.log(this.id);
    }
  }

</script>
