<!---实习收费标准--->
<template>
  <div>
    <el-form :model="formValidate" ref="formValidate" label-width="0" :rules="rules">
    <el-row :gutter="10">
      <el-col style="width:120px;">
        <div class="cal-schoolTit" style="text-align: right;">实习费：</div>
      </el-col>
      <el-col :span="4">
        <el-form-item prop="configValue" required>
          <el-input style="width: 95%" v-model.trim="formValidate.configValue" placeholder="必填项-只能填写数字"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="2">
        <div class="cal-schoolTit" style="text-align: left;">/月</div>
      </el-col>
      <el-col :span="3">
        <load-btn @listenSubEvent="listenSubEvent" :btnData="loadBtn"></load-btn>
      </el-col>
    </el-row>
    <el-row :gutter="10">
      <el-col :span="22" :push="1">
        <div class="cal-schoolTit" style="text-align: left;color: #FF0000;">说明：实习费默认为100元/月，可更改</div>
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
    data() {
      return {
        //bind表单数据
        rules,
        formValidate:{
          configValue:""
        },
        //保存按钮基本信息
        loadBtn:{title:'提交',callParEvent:'listenSubEvent'},


        //获取设置信息
        getChargingStandard:{
          ajaxSuccess:'getChargingStandardData',
          ajaxParams:{
            url: api.chargingStandard.path,
          }
        },

        //修改实习费收费标准
        saveHargingStandard:{
          type:'add',
          successTitle:'添加成功!',
          errorTitle:'添加失败!',
          ajaxSuccess:'ajaxSuccess',
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
      },


      //通过get请求列表数据
      getChargingStandardData(responseData){
        let data = responseData.data;
        this.formValidate=data
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
          this.saveHargingStandard.ajaxParams.url += this.formValidate.configId;
          this.saveHargingStandard.ajaxParams.data = this.getFormData(this.formValidate);
          this.ajax(this.saveHargingStandard, isLoadingFun);
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
