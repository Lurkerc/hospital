<template>
  <div>
    <el-form :model="formValidate" ref="formValidate" :rules="rules" class="demo-form-inline" label-width="100px">

      <el-row>
        <el-col :span="8" :offset="2">
          <el-form-item label="房间号：" prop="roomNum" required>
            <el-input v-model="formValidate.roomNum" placeholder="请输入"></el-input>
          </el-form-item>
        </el-col>

        <el-col :span="8" :offset="2">
          <el-form-item label="房间名称：" prop="roomName">
            <el-input v-model="formValidate.roomName" placeholder="请输入"></el-input>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="18" :offset="2">
          <el-form-item label="房间简介：" prop="summary">
            <el-input type="textarea" :autosize="{ minRows: 2, maxRows: 6}" placeholder="请输入内容" v-model="formValidate.summary"></el-input>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="18" :offset="2">
          <el-col :span="11">
            <el-form-item label="所在楼层：" prop="floor" required>
              <el-input v-model.number="formValidate.floor" placeholder="请输入所在楼层：1"></el-input>
            </el-form-item>
          </el-col>
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="18" :offset="2">
          <el-form-item label="房间位置：" prop="address">
            <el-input type="textarea" :autosize="{ minRows: 2, maxRows: 6}" placeholder="请输入内容" v-model="formValidate.address"></el-input>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="18" :offset="2">
          <el-form-item label="房间图片：">
            <upload-file :fileList="fileList" @upladSuccess="upladSuccess"></upload-file>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>

    <el-row>
      <el-col align="center">
        <load-btn @listenSubEvent="listenSubEvent" :btnData="loadBtn"></load-btn>
      </el-col>
    </el-row>
  </div>
</template>
<script>
  //当前组件引入全局的util
  let Util = null;
  import {
    roomManage as rules
  } from '../../rules'; // 表单验证规则
  import uploadFile from '../uploadFile';

  export default {
    props: {
      id: { // 操作房间id
        type: [Number, String],
        required: true
      },
      urlParams: { // 编辑
        type: Object,
        required: true
      },
      getUrlParams: { // 获取房间信息
        type: Object,
        required: true
      },
    },
    data() {
      return {
        rules,
        //保存按钮基本信息
        loadBtn: {
          title: '提交',
          callParEvent: 'listenSubEvent'
        },
        staticPath: '', // 静态资源
        countDate: 0,
        //form表单bind数据
        formValidate: {
          roomNum: '', // 房间号
          roomName: '', // 房间名称
          summary: '', // 简介
          address: '', // 房间位置
          imgIds: '', // 房间图片 | 多个id以逗号分隔 ---> 1,2         
          fileList: []
        },
        //当前组件提交(add)数据时,ajax处理的 基础信息设置
        editMessTitle: {
          type: 'edit',
          successTitle: '修改成功!',
          errorTitle: '修改失败!',
          ajaxSuccess: 'ajaxSuccess',
          ajaxError: 'ajaxError',
          ajaxParams: {
            url: this.urlParams.path + '/' + this.id,
            method: this.urlParams.method
          }
        },
        fileList: [],
      }
    },
    methods: {
      /*
       * 点击提交按钮 监听是否提交数据
       * @param isLoadingFun boolean  form表单验证是否通过
       * */
      listenSubEvent(isLoadingFun) {
        let isSubmit = this.submitForm("formValidate");
        if (isSubmit) {
          if (!isLoadingFun) isLoadingFun = function () {};
          isLoadingFun(true);
          this.editMessTitle.ajaxParams.data = this.getFormData(this.formValidate);
          this.ajax(this.editMessTitle, isLoadingFun)
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
        let myData = Util._.defaultsDeep({}, data);
        return myData;
      },
      /*
       * 组件初始化入口
       * */
      init() {
        //this.ajax(this.listMessTitle)
      },
      // 图片上传
      upladSuccess(ids) {
        this.formValidate.imgIds = ids
      },
      /**************************** 从服务器获取编辑的数据 *****************************************/
      getDataForServer() {
        console.log(this.id);
        let roomId = this.id,
          urlParams = this.getUrlParams; // props
        this.ajax({
          ajaxSuccess: 'getDataSuccess',
          ajaxParams: {
            url: `${urlParams.path}/${roomId}`,
            method: urlParams.method
          }
        })
      },
      getDataSuccess(res) {
        this.formValidate = res.data; // 初始化编辑数据
        this.fileList = [];
        for (let item in res.data.fileList) {
          this.fileList.push({
            name: item.id,
            url: this.staticPath + item.path,
          })
        }
      }
    },
    created() {
      Util = this.$util;
      this.staticPath = this.$store.getters.getEnvPath.http;
      this.getDataForServer();
    },
    components: {
      uploadFile
    },
  }

</script>
<style>
  .date {
    line-height: 25px;
  }

  .date .countDate {
    display: inline-block;
    width: 70px;
    text-align: center;
    border-bottom: 1px solid;
  }

</style>
