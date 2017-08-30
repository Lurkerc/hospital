<!-- 实习生 - 报名招录 - 人员管理 - 增加 -->
<template>
  <div class="editForm">
    <el-form ref="formValidate" :rules="rules" :model="formValidate" label-width="130px">
      <el-row>
        <!--内容-->
        <el-col :span="12">
          <el-form-item label="姓名：" prop="name">
            <el-input v-model="formValidate.name"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="编号：" prop="codeNumber">
            <el-input v-model="formValidate.codeNumber"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="手机号：" prop="mobile">
            <el-input v-model="formValidate.mobile"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="实习期：" prop="internshipNum">
            <el-input v-model="formValidate.internshipNum"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="实习开始日期：" prop="startDate" required>
            <el-date-picker v-model="formValidate.startDate" type="date" clearable :editable="false" placeholder="选择日期" @change="selectDate"></el-date-picker>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>

    <br>

    <el-row>
      <el-col :span="10" :offset="10">
        <load-btn @listenSubEvent="listenSubEvent" :btnData="loadBtn"></load-btn>
        <el-button @click="cancel">取消</el-button>
      </el-col>
    </el-row>
  </div>
</template>
<script>
  //当前组件引入全局的util
  let Util = null;
  import api from './api';
  import {
    usersManagement as rules
  } from '../../rules';

  export default {
    //props接收父组件传递过来的数据
    props: ['operailityData'],
    data() {
      return {
        rules,
        //保存按钮基本信息
        loadBtn: {
          title: '提交',
          callParEvent: 'listenSubEvent'
        },
        //form表单bind数据
        formValidate: {
          deptId: '', // 部门id
          name: '', //姓名
          codeNumber: '', // 编号
          mobile: '', // 手机号
          startDate: '', // 实习开始日期(y-m-d)
          internshipNum: '', // 实习期(月为单位)
        },
        //当前组件提交(add)数据时,ajax处理的 基础信息设置
        addMessTitle: {
          type: 'add',
          successTitle: '添加成功!',
          errorTitle: '添加失败!',
          ajaxSuccess: 'ajaxSuccess',
          ajaxError: 'ajaxError',
          ajaxParams: {
            url: api.edit.path,
            method: api.edit.method,
            data: {}
          }
        },
      }
    },
    created() {
      //给当前组件注入全局util
      Util = this.$util;
      //初始化
      this.init();
    },
    methods: {
      /*
       * 组件初始化入口
       * */
      init() {
        //默认请求加载数据
        if (typeof this.operailityData != "undefined") {
          this.formValidate = Object.assign(this.formValidate, this.operailityData);
        }
        console.log(this.operailityData)
      },

      /*
       * 点击提交按钮 监听是否提交数据
       * @param isLoadingFun boolean  form表单验证是否通过
       * */
      listenSubEvent(isLoadingFun) {
        let isSubmit = this.submitForm("formValidate");
        if (isSubmit) {
          if (!isLoadingFun) isLoadingFun = function () {};
          isLoadingFun(true)
          this.addMessTitle.ajaxParams.data = this.getFormData(this.formValidate);
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

      /*
       * 当前组件发送事件给父组件
       * 发送关闭(cancel)模态事件给父组件,请求关闭当前模态窗
       * */
      cancel() {
        this.$emit('cancel', 'add');
      },

      /*
       * 获取表单数据
       * @return string  格式:id=0&name=aa
       * */
      getFormData(data) {
        let myData = Util._.defaultsDeep({}, data);
        return myData;
      },
      // 选择日期
      selectDate(val) {
        this.formValidate.startDate = val
      },
    },
  }

</script>


<style lang="scss">
  @import '../../../../assets/ambuf/css/manage_v1.0/editForm';

</style>
