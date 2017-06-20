<template>
  <div>
    <el-row>
      <el-form :model="formValidate" ref="formValidate" :rules="rules" :inline="true">
        <!-- 指标名称 -->
        <el-col align="center">
          <el-form-item label="评分指标名称：" prop="scoreTableName">
            <el-input v-model="formValidate.scoreTableName"></el-input>
          </el-form-item>
        </el-col>
        <el-table align="center" border :context="self" :data="formValidate.detailsList" tooltip-effect="dark" show-summary :summary-method="getSummaries"
          class="asmContable" style="width: 100%">
          <el-table-column label="项目" width="200px" prop="classify" show-overflow-tooltip>
            <template scope="scope">
              <el-input v-model="scope.row.classify" placeholder="请填写项目名"></el-input>
            </template>
          </el-table-column>
          <el-table-column label="评分标准及要求" prop="content" show-overflow-tooltip>
            <template scope="scope">
              <el-input type="textarea" :autosize="{maxRows:5}" :maxlength="480" v-model="scope.row.content"></el-input>
            </template>
          </el-table-column>
          <el-table-column label="描述" prop="remark" show-overflow-tooltip>
            <template scope="scope">
              <el-input type="textarea" :autosize="{maxRows:5}" :maxlength="480" v-model="scope.row.remark"></el-input>
            </template>
          </el-table-column>
          <el-table-column label="标准分" width="90px" prop="score" show-overflow-tooltip>
            <template scope="scope">
              <el-input v-model.number="scope.row.score" :maxlength="3"></el-input>
            </template>
          </el-table-column>
          <el-table-column label="操作" width="140px" align="left">
            <template scope="scope">
              <el-button size="small" type="danger" @click="del(scope.$index)" v-if="formValidate.detailsList.length > 1">删除</el-button>
              <el-button size="small" type="success" @click="add(scope.row.detailOrder)" v-if="scope.$index == formValidate.detailsList.length - 1">添加</el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-col align="center" style="margin-top:20px">
          <load-btn @listenSubEvent="listenSubEvent" :btnData="loadBtn"></load-btn>
        </el-col>
      </el-form>
    </el-row>
  </div>
</template>

<script>
  //当前组件引入全局的util
  let Util = null;
  import {
    assessmentContentScore as rules
  } from '../../rules'; // 表单验证
  export default {
    props: {
      urlParams: { // api对象
        type: Object,
        required: true
      },
      todoId: {
        type: Object,
        default: () => ({
          treeId: 0,
          treeRoad: '0'
        })
      }
    },
    data() {
      return {
        rules,
        self: this,
        formValidate: {
          scoreTableName: "",
          totalScore: "",
          detailsList: [{
            classify: "",
            content: "",
            score: "",
            detailOrder: 1,
            remark: ""
          }]
        },
        //保存按钮基本信息
        loadBtn: {
          title: '提交',
          callParEvent: 'listenSubEvent'
        },
        //当前组件提交(add)数据时,ajax处理的 基础信息设置
        addMessTitle: {
          type: 'add',
          successTitle: '添加成功!',
          errorTitle: '添加失败!',
          ajaxSuccess: 'ajaxSuccess',
          ajaxError: 'ajaxError',
          ajaxParams: {
            jsonString: true,
            url: this.urlParams.path,
            method: this.urlParams.method
          }
        }
      }
    },
    methods: {
      // 添加
      add(index) {
        this.formValidate.detailsList.push({
          classify: "",
          content: "",
          score: "",
          detailOrder: ++index,
          remark: ""
        })
      },
      // 删除
      del(index) {
        this.formValidate.detailsList.length && this.formValidate.detailsList.splice(index, 1)
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
        this.formValidate.totalScore = sums[3];
        return sums;
      },
      /*
       * 点击提交按钮 监听是否提交数据
       * @param isLoadingFun boolean  form表单验证是否通过
       * */
      listenSubEvent(isLoadingFun) {
        let isSubmit = this.submitForm("formValidate");
        if (isSubmit && this.checkData()) {
          if (!isLoadingFun) isLoadingFun = function () {};
          isLoadingFun(true);
          this.addMessTitle.ajaxParams.data = Util.getFormData(this.formValidate, this.todoId);
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
        this.$refs[formName].validate((valid) => {
          if (valid) {
            flag = true;
          }
        });
        return flag;
      },
      // 检测评分表数据是否有效
      checkData() {
        let data = this.formValidate.detailsList;
        if (!data.length) {
          this.errorMess('至少要有一个评分项！')
          return false
        }
        if (!data[0].classify) {
          this.errorMess('首行项目名称必须填写！')
          return false
        }
        for (let i = 0, l = data.length; i < l; i++) {
          if (!data[i].content) {
            this.errorMess(`第${i+1}行评分标准必须填写！`)
            return false
          }
          if (!(data[i].score > 0)) {
            this.errorMess(`第${i+1}行标准分必须大于1！`)
            return false
          }
        }
        return true
      },
    },
    created() {
      //给当前组件注入全局util
      Util = this.$util;
    }
  }

</script>
