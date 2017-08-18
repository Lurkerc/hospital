<template>
  <div class="editForm">
    <p style="color: #FF0000">注：登录前请您确认是否安装插件。下载：<el-button @click="downLoad" type="text">海康插件下载</el-button>  <el-button type="text">大华插件下载</el-button></p>
    <el-form :model="formValidate" ref="formValidate" :rules="this.$store.state.rules" label-width="90px">

      <el-row>
        <el-col :span="8" :offset="2">
          <el-form-item label="品牌：" prop="brand">
            <el-select v-model="formValidate.brand" placeholder="请选择">
              <el-option v-for="item in brand" v-if="item.value!==''" :key="item.value" :label="item.label" :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>

        <el-col :span="8" :offset="2">
          <el-form-item label="产品型号：" prop="modelNum">
            <el-input v-model="formValidate.modelNum" placeholder="请输入产品型号"></el-input>
          </el-form-item>
        </el-col>

        <el-col :span="8" :offset="2">
          <el-form-item label="设备IP：" prop="ip">
            <el-input v-model="formValidate.ip" placeholder="请输入IP地址"></el-input>
          </el-form-item>
        </el-col>

        <el-col :span="8" :offset="2">
          <el-form-item label=" " prop="isConsole">
            <el-checkbox v-model="formValidate.isConsole" true-label="YES" false-label="NO">是否带有云平台</el-checkbox>
          </el-form-item>
        </el-col>

        <el-col :span="8" :offset="2">
          <el-form-item label="登录名：" prop="loginName">
            <el-input v-model="formValidate.loginName" placeholder="请输入云平台登录名"></el-input>
          </el-form-item>
        </el-col>

        <el-col :span="8" :offset="2">
          <el-form-item label="登录密码：" prop="password">
            <el-input v-model="formValidate.password" placeholder="请输入云平台登录密码"></el-input>
          </el-form-item>
        </el-col>

        <el-col :span="8" :offset="2">
          <el-form-item label="所在NVR：" prop="nvrIp">
            <el-input v-model="formValidate.nvrIp" placeholder="请输入所在NVR"></el-input>
          </el-form-item>
        </el-col>

        <el-col :span="8" :offset="2">
          <el-form-item label="所用通道：" prop="port">
            <el-input v-model="formValidate.port" placeholder="请输入所用通道"></el-input>
          </el-form-item>
        </el-col>

        <el-col :span="3" :offset="1">
          <el-button @click="loginService">登录</el-button>
        </el-col>
      </el-row>
    </el-form>
    <hkVideo v-if="isShowVideo" width="500" height="360" :count="count" :isShowRight="true" :ip="formValidate.ip" :port="formValidate.port" :nvrIp="formValidate.nvrIp" :loginName="formValidate.loginName" :password="formValidate.password"></hkVideo>
    <el-row>
      <el-col :span="4" :offset="8" align="center">
        <load-btn @listenSubEvent="listenSubEvent" :btnData="loadBtn"></load-btn>
      </el-col>
      <el-col :span="4" align="center">
        <el-button @click="cancel">取消</el-button>
      </el-col>
    </el-row>
  </div>
</template>
<script>
  //当前组件引入全局的util
  let Util = null;

  import brand from './brand'; // 品牌
  import api from './api'
  import hkVideo from "./hkVideo.vue"

  export default {
    props: ['id'],
    data() {
      return {
        brand,
        //保存按钮基本信息
        loadBtn: {
          title: '保存',
          callParEvent: 'listenSubEvent'
        },
        //form表单bind数据
        formValidate: {
          brand: 'HIKVISION', // 品牌
          modelNum: 'HIKVISION', // 产品型号
          ip: '192.168.1.2', // 设备ip
          isConsole: 'YES', // 是否有云台
          loginName: 'admin', // 登录名
          password: 'admin12345', // 密码
          nvrIp: '192.168.1.64', // 所在nvrIp
          port: '80', //通道号
        },
        // 房间列表
        roomSelectList: [],
        //当前组件提交(add)数据时,ajax处理的 基础信息设置
        editMessTitle: {
          type: 'debugVideo',
          successTitle: '保存成功!',
          errorTitle: '保存失败!',
          ajaxSuccess: 'ajaxSuccess',
          ajaxError: 'ajaxError',
          ajaxParams: {
            url: api.modify.path + this.id,
            method: api.modify.method
          }
        },
        //当前组件提交(add)数据时,ajax处理的 基础信息设置
        getMessTitle: {
          errorTitle: '获取数据失败!',
          ajaxSuccess: 'getDataForServer',
          ajaxError: 'ajaxError',
          ajaxParams: {
            url: api.get.path + this.id,
            method: api.get.method
          }
        },
        isShowVideo:false,
        count:0,
      }
    },
    methods: {
      /*
       * 点击提交按钮 监听是否提交数据
       * @param isLoadingFun boolean  form表单验证是否通过
       * */
      listenSubEvent(isLoadingFun) {
        let isSubmit = this.submitForm("formValidate");
        if (false) {
          if (!isLoadingFun) isLoadingFun = function () {};
          isLoadingFun(true);
          this.editMessTitle.ajaxParams.data = this.getFormData(this.formValidate);
          this.ajax(this.editMessTitle, isLoadingFun)
        }
        this.showMess("暂不可保存调试信息!");
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
        this.$emit('cancel', this.editMessTitle.type);
      },
      /*
       * 获取表单数据
       * @return string  格式:id=0&name=aa
       * */
      getFormData(data) {
        let myData = Util._.defaultsDeep({}, data);
        return myData;
      },

      downLoad(){
        window.open("/static/video/hikvision/WebComponents.exe");
      },

      /**
       * 获取房间数据
       * */
      getDataForServer(res) {
        this.formValidate = res.data
      },

      /**
       * 连接测试
       */
      loginService() {
        if(this.isShowVideo){
          ++this.count;
        }else{
          this.isShowVideo = true;
        }
      },

      /*
       * 组件初始化入口
       * */
      init() {
        this.ajax(this.getMessTitle);
      },
    },
    created() {
      //给当前组件注入全局util
      Util = this.$util;
      this.init();
    },
    mounted() {
      //暂时没有初始化,预留初始化入口
    },
    components:{
      hkVideo
    }
  }

</script>
<style lang="scss">
  @import'../../../../assets/ambuf/css/manage_v1.0/editForm';
</style>
