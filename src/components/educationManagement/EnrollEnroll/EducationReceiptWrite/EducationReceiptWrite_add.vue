<!----------------------------------
****--进修回执填写(EducationReceiptWrite_add)
****--@date     2017/9/14
****--@author   zyc<332533011@qq.com
----------------------------------->
<template>
  <div style="width: 100%;height: 100%;">
    <h2 class="engageNotice-title">来院进修回执单</h2>
    <div class="engageNotice-content" style="height: 90%">
      <el-row>
        <el-col :span="22" :offset="2">
          <div class="cal-schoolTit">进修人：
            <div class="myBtLine">{{showData.userName}}</div>
          </div>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="22" :offset="2" style="text-indent: 2em">
          <div class="cal-schoolTit">进修单位：
            <div class="myBtLine">{{showData.workName}}</div>
            ，进修时间：
            <div class="myBtLine">{{showData.studyTime == 'HALFTYEAR' ? '半年' : '一年'}}</div>
            ，报到时间：
            <div class="myBtLine">{{showData.checkInTime}}</div>
            需要交款
            <div class="myBtLine">{{showData.paymentAmount}}</div>
            元。
          </div>
        </el-col>
      </el-row>
      <br/>
      <el-row>
        <el-col :span="22" :offset="2">
          <div class="cal-schoolTit">汇款账号：1236464643123113</div>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="22" :offset="2">
          <div class="cal-schoolTit">开户行：1236464643123113</div>
        </el-col>
      </el-row>
      <br/>
      <template v-if="showData.hasCompletedReceipt == 'N'">
        <el-row>
          <el-col :span="22" :offset="2">
            <el-checkbox v-model="checked" :disabled="true">在线支付进修费用</el-checkbox>
            <p style="margin-top: 10px;">
              <el-checkbox v-model="formValidate.type" true-label="-1" false-label="0">放弃进修</el-checkbox>
            </p>
            <el-form :model="formValidate" ref="formValidate" :rules="rules">
              <el-form-item label="放弃说明：" v-if="formValidate.type == '-1'">
                <el-input
                  type="textarea"
                  :autosize="{ minRows: 4, maxRows: 6}"
                  placeholder="请输入内容"
                  v-model="formValidate.receiptContent"></el-input>
              </el-form-item>
            </el-form>
          </el-col>
        </el-row>
        <br/>
        <el-row>
          <el-col :span="24" style="text-align: center;">
            <load-btn v-if="showData.paymentReceipt==1" @listenSubEvent="listenSubEvent" :btnData="loadBtn"></load-btn>
          </el-col>
        </el-row>
      </template>
      <template v-else>
        <el-form v-if="showData.paymentReceipt == '-1'">
          <el-form-item>已放弃进修</el-form-item>
          <el-form-item label="放弃说明：">{{ showData.receiptContent || '未填写' }}</el-form-item>
        </el-form>
      </template>
    </div>
  </div>
</template>
<style lang="scss">
  .engageNotice-title {
    color: #000000;
    text-align: center;
    padding: 20px;
  }

  .engageNotice-content {
    width: 90%;
    margin: 0 auto;
    border: 1px solid rgb(224, 230, 237);
    padding: 20px;
    background: #F9FAFC;
    overflow: auto;
    .cal-schoolTit {
      line-height: 36px;
    }
  }

  .myBtLine {
    border-bottom: 1px solid #000000;
    padding: 0 60px;
    min-width: 100px;
    display: inline;
    vertical-align: middle;
  }
</style>
<script>
  /*当前组件必要引入*/
  import api from "./api.js";
  import {EducationReceiptWrite as rules} from '../../rules';
  //当前组件引入全局的util
  let Util = null;
  export default {
    props: ['operailityData', 'userId'],
    data() {
      return {
        rules,
        //保存按钮基本信息
        loadBtn: {title: '提交', callParEvent: 'listenSubEvent'},
        checked: false,
        formValidate: {
          type: '0', // 0 已填写 | -1放弃
          receiptContent: '', // 放弃说明
        },
        showData: {
//          /*"subjectsId":"进修申请ID",
//           "userId":"用户ID",
//           "userName":"人员姓名",
//           "workName":"进修单位",
//           "studyTime":"进修时间(HALFTYEAR 半年 AYEAR一年)",
//           "checkInTime":"报到时间",
//           "paymentAmount":"缴费金额",
//           "paymentTime":"缴费时间",
//           "paymentReceipt":"进修回执状态", 1已填回执  0未填回执
//           "hasCompletedReceipt":"缴费方式('CASH' 现金,'TRANSFER'转账)"*/
        },
        listMessTitle: {
          ajaxSuccess: 'updateListData',
          ajaxParams: {
            url: api.get.path + this.userId,
            params: {}
          }
        },

        //当前组件提交(add)数据时,ajax处理的 基础信息设置
        addMessTitle: {
          type: 'add',
          successTitle: '保存成功!',
          errorTitle: '保存失败!',
          ajaxSuccess: 'ajaxSuccessFun',
          ajaxError: 'ajaxError',
          ajaxParams: {
            url: api.add.path,
            method: api.add.method,
          }
        },
      }
    },
    methods: {
      //初始化请求列表数据
      init() {
//        this.ajax(this.listMessTitle);
        if (this.operailityData) {
          this.showData = this.operailityData
        }
      },
//
      updateListData(responseData) {
        let data = responseData.data;
        this.showData = data;
      },

      /*
       * 点击提交按钮 监听是否提交数据
       * @param isLoadingFun boolean  form表单验证是否通过
       * */
      listenSubEvent(isLoadingFun) {
        let isSubmit = this.submitForm("formValidate");
        if (isSubmit) {
          if (!isLoadingFun) isLoadingFun = function () {
          };
          isLoadingFun(true);
          this.addMessTitle.ajaxParams.data = this.getFormData(this.formValidate);
          this.ajax(this.addMessTitle, isLoadingFun);
        }
      },

      ajaxSuccessFun() {
        this.ajax(this.listMessTitle);
        this.showMess("回执单提交成功!");
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
        let myData = Util._.defaultsDeep({}, data);
        return myData;
      },
    },
    created() {
      Util = this.$util;
      this.init();
    },
    components: {}
  }
</script>
