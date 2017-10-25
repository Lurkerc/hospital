<!---实习收费标准--->
<template>
  <div>
    <el-form :model="formValidate" ref="formValidate" label-width="0" :rules="rules">
    <el-row :gutter="10">
      <el-col style="width:120px;">
        <div class="cal-schoolTit" style="text-align: right;">{{userType=='SXS'?'实习':'进修'}}费：</div>
      </el-col>
      <el-col :span="4">
        <el-form-item prop="configValue" required>
          <el-input style="width: 95%" v-model.trim="formValidate.configValue" placeholder="必填项-只能填写数字"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="2">
        <div class="cal-schoolTit" style="text-align: left;">元/月</div>
      </el-col>
    </el-row>
    <el-row :gutter="10">
      <el-col style="width:120px;">
        <div class="cal-schoolTit" style="text-align: right;">住宿费：</div>
      </el-col>
      <el-col :span="4">
        <el-form-item prop="configValue" required>
          <el-input style="width: 95%" v-model.trim="accommodationData.configValue" placeholder="必填项-只能填写数字"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="2">
        <div class="cal-schoolTit" style="text-align: left;">元/月</div>
      </el-col>
    </el-row>
    <el-row :gutter="10">
      <el-col style="width:120px;">
        <div class="cal-schoolTit" style="text-align: right;">住宿押金：</div>
      </el-col>
      <el-col :span="4">
        <el-form-item prop="configValue" required>
          <el-input style="width: 95%" v-model.trim="depositData.configValue" placeholder="必填项-只能填写数字"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="2">
        <div class="cal-schoolTit" style="text-align: left;">元</div>
      </el-col>
    </el-row>
    <el-row :gutter="10">
      <el-col style="width:120px;">
        <div class="cal-schoolTit" style="text-align: right;">&nbsp;</div>
      </el-col>
      <el-col :span="4">
        <load-btn @listenSubEvent="listenSubEvent" :btnData="loadBtn"></load-btn>
      </el-col>
    </el-row>
    <el-row :gutter="10">
      <el-col :span="22" :push="1">
        <div class="cal-schoolTit" style="text-align: left;color: #FF0000;">说明：{{userType=='SXS'?'实习':'进修'}}费默认为100元/月，可更改</div>
      </el-col>
    </el-row>
    </el-form>
  </div>
</template>
<script>
  /*当前组件必要引入*/
  import api from "../api.js";

  import {
    chargingStandard as rules
  } from '../../rules'; // 表单验证
  //当前组件引入全局的util
  let Util = null;
  export default{
    props:{
      userType:{
        type: String,
        default: 'SXS',
      }
    },
    data() {
      return {
        //bind表单数据
        rules,
        formValidate:{
          configValue:""
        },
        //押金数据存储
        depositData:{
          configValue:""
        },

        //获取实习生住宿费
        accommodationData:{
          configValue:""
        },

        //保存按钮基本信息
        loadBtn:{title:'提交',callParEvent:'listenSubEvent'},


        //获取设置信息
        getChargingStandard:{
          ajaxSuccess:'getChargingStandardData',
          ajaxParams:{
            url: api.chargingStandard.path+this.userType,
          }
        },

        //获取住宿费
        getAccommodation:{
          ajaxSuccess:'getAccommodationData',
          ajaxParams:{
            url: api.accommodation.path+this.userType,
          }
        },

        //获取住宿押金
        getDeposit:{
          ajaxSuccess:'getDepositData',
          ajaxParams:{
            url: api.deposit.path+this.userType,
          }
        },

        //修改实习费收费标准
        saveHargingStandard:{
          type:'add',
          successTitle:'添加成功!',
          errorTitle:'添加失败!',
          ajaxSuccess:'saveSuccess',
          ajaxError:'ajaxError',
          ajaxParams:{
            url: api.modifyConfigId.path,
            method: api.modifyConfigId.method,
          },
        },
      }
    },
    methods: {
      //初始化请求列表数据
      init(){
        this.ajax(this.getChargingStandard);
        this.ajax(this.getAccommodation);
        this.ajax(this.getDeposit);
      },


      //通过get请求列表数据
      getChargingStandardData(responseData){
        let data = responseData.data;
        this.formValidate=data
      },


      //获取住宿费
      getAccommodationData(responseData){
        let data = responseData.data;
        this.accommodationData = data;
      },


      //获取住宿押金
      getDepositData(responseData){
        let data = responseData.data;
        this.depositData = data;
      },


      /*
       * 点击提交按钮 监听是否提交数据
       * @param isLoadingFun boolean  form表单验证是否通过
       * */
      listenSubEvent(isLoadingFun){
        let isSubmit = this.submitForm("formValidate");
        if(isSubmit) {
          if (!isLoadingFun) isLoadingFun = function () {};
          isLoadingFun(true);
          let saveHargingStandard = Util._.defaultsDeep({},this.saveHargingStandard)
          saveHargingStandard.ajaxParams.url += this.formValidate.configId;
          saveHargingStandard.ajaxParams.data = this.getFormData(this.formValidate);
          this.ajax(saveHargingStandard, isLoadingFun);

          let saveAccommodation = Util._.defaultsDeep({},this.saveHargingStandard)
          saveAccommodation.ajaxParams.url += this.accommodationData.configId;
          saveAccommodation.ajaxParams.data = this.getFormData(this.accommodationData);
          this.ajax(saveAccommodation, isLoadingFun);


          let saveDeposit = Util._.defaultsDeep({},this.saveHargingStandard)
          saveDeposit.ajaxParams.url += this.depositData.configId;
          saveDeposit.ajaxParams.data = this.getFormData(this.depositData);
          this.ajax(saveDeposit, isLoadingFun);

        }
      },


      //保存成功
      saveSuccess(){
        this.successMess("保存成功!");
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
      getFormData(data){
        let myData = Util._.defaultsDeep({},data);
        return myData;
      },
    },
    created(){
      Util = this.$util;
      this.init();
    },
    mounted(){
    },
    components: {}
  }
</script>
