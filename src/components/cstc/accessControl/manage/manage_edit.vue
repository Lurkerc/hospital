<template>
  <!-- 修改门禁卡 -->
  <div>
    <el-row>
      <el-col :span="6" :offset="1"><img :src="operailityData.userPhoto || '//iph.href.lu/100x100'"></el-col>
      <el-col :span="15" :offset="1">
        <el-form label-width="68px" :model="formValidate" ref="formValidate" :rules="rules">
          <el-form-item label="姓名：">{{ formValidate.userName }}</el-form-item>
          <el-form-item label="卡号：" prop="cardNum">
            <el-input v-model="formValidate.cardNum"></el-input>
          </el-form-item>
        </el-form>
      </el-col>
      <el-col align="center">
        <el-button type="success" @click="readCard">读卡</el-button>
        <!-- <el-button type="primary">保存</el-button> -->
        <load-btn @listenSubEvent="listenSubEvent" :btnData="loadBtn"></load-btn>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  import api from './api';
  import {
    accessControlManage as rules
  } from '../../rules'; // 表单验证规则
  export default {
    props: ['operailityData'],
    data() {
      return {
        rules,
        loadBtn: {
          title: '保存',
          callParEvent: 'listenSubEvent'
        },
        formValidate: {
          userId: this.operailityData.userId,
          userName: this.operailityData.userName,
          cardNum: '',
        },
        addMessTitle: {
          type: 'edit',
          successTitle: '保存成功!',
          errorTitle: '保存失败!',
          ajaxSuccess: 'ajaxSuccess',
          ajaxError: 'ajaxError',
          ajaxParams: {
            url: api.modify.path + this.operailityData.id,
            method: api.modify.method
          }
        },
      }
    },
    methods: {
      // 读卡
      readCard() {
        this.ajax({
          ajaxSuccess: res => {
            if (res.data) {
              this.successMess('读卡成功');
              this.formValidate.cardNum = res.data;
            }
          },
          ajaxError: res => this.errorMess('读卡失败'),
          ajaxParams: {
            url: api.readCard.path,
            method: api.readCard.method
          }
        })
      },
      /*
       * 点击保存按钮 监听是否提交数据
       * @param isLoadingFun boolean  form表单验证是否通过
       * */
      listenSubEvent(isLoadingFun) {
        let isSubmit = this.submitForm("formValidate");
        if (isSubmit) {
          if (!isLoadingFun) isLoadingFun = function () {};
          isLoadingFun(true);
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
       * 获取表单数据
       * @return string  格式:id=0&name=aa
       * */
      getFormData(data) {
        let myData = this.$util._.defaultsDeep({}, data);
        return myData;
      },
      // 获取原门禁卡信息
      getCardInfo() {
        this.ajax({
          ajaxSuccess: res => this.formValidate.cardNum = res.data.cardNum,
          ajaxError: res => this.errorMess('数据加载失败，请重试！'),
          ajaxParams: {
            url: api.get.path + this.operailityData.id,
            method: api.get.method,
            params: {
              id: this.operailityData.id
            }
          }
        })
      },
    },
    created() {
      this.getCardInfo()
    },
  }

</script>
