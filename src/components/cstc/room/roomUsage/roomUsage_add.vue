<template>
  <div>
    <el-form :model="formValidate" ref="formValidate" :rules="rules" class="roomUsageFrom" label-width="100px">

      <el-row>
        <el-col :span="8" :offset="2">
          <el-form-item label="房间：" prop="roomId" required>
            <el-select v-model="formValidate.roomId" placeholder="请选择">
              <el-option v-for="item in roomIdOption" :key="item.id" :label="item.roomNum" :value="item.id">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>

        <el-col :span="8" :offset="2">
          <el-form-item label="使用类型：" prop="employType" required>
            <el-select v-model="formValidate.employType" placeholder="请选择">
              <el-option v-for="item in employTypeOption" v-if="item.value!==''" :key="item.value" :label="item.label" :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row>

        <date-group :dateGroup="{text:'',startDate:formValidate.startTime,endDate:formValidate.endTime}">

          <el-col :span="8" :offset="2" name="start">
            <el-form-item label="开始时间：" prop="startTime" required>
              <el-date-picker v-model="formValidate.startTime" :editable="false" type="datetime" placeholder="选择日期" :picker-options="pickerOptions0"
                @change="handleStartTime">
              </el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="8" :offset="2" name="end">
            <el-form-item label="结束时间：" prop="endTime">
              <el-date-picker v-model="formValidate.endTime" :editable="false" type="datetime" placeholder="选择日期" :picker-options="pickerOptions1"
                @change="handleEndTime">
              </el-date-picker>
            </el-form-item>
          </el-col>

        </date-group>

      </el-row>

      <el-row>
        <el-col :span="18" :offset="2">
          <el-form-item label="用途：" prop="purpose">
            <el-input type="textarea" :autosize="{ minRows: 2, maxRows: 6}" placeholder="请输入内容" v-model="formValidate.purpose"></el-input>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="18" :offset="2">
          <el-form-item label="房间图片：">
            <upload-file @upladSuccess="upladSuccess"></upload-file>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>

    <el-row>
      <el-col :span="6" :offset="6" align="center">
        <load-btn @listenSubEvent="listenSubEvent" :btnData="loadBtn"></load-btn>
      </el-col>
      <el-col :span="6" align="center">
        <el-button @click="resetForm('formValidate')">重置</el-button>
      </el-col>
    </el-row>
  </div>
</template>
<script>
  // 当前组件引入全局的util
  let Util = null;
  import {
    roomUsage as rules
  } from '../../rules'; // 表单验证规则

  import selectApi from '../roomManage/api';
  // 使用类型
  import typeOption from './typeOption';
  import uploadFile from '../uploadFile';

  export default {
    props: {
      urlParams: { // api对象
        type: Object,
        required: true
      }
    },
    data() {
      return {
        rules,
        //保存按钮基本信息
        loadBtn: {
          title: '提交',
          callParEvent: 'listenSubEvent'
        },
        countDate: 0,
        //form表单bind数据
        formValidate: {
          roomId: '', // 房间
          employType: '', // 使用类型
          startTime: '', // 开始时间
          endTime: '', // 结束时间
          purpose: '', // 用途
          imageIds: '' // 房间图片 | 多个id以逗号分隔 ---> 1,2          
        },
        // 房间选项
        roomIdOption: [],
        // 使用类型选项
        employTypeOption: typeOption,
        //当前组件提交(add)数据时,ajax处理的 基础信息设置
        addMessTitle: {
          type: 'add',
          successTitle: '添加成功!',
          errorTitle: '添加失败!',
          ajaxSuccess: 'ajaxSuccess',
          ajaxError: 'ajaxError',
          ajaxParams: {
            url: this.urlParams.path,
            method: this.urlParams.method
          }
        },
        // 图片上传
        imgUpload: {
          dialogImageUrl: '',
          dialogVisible: false
        }
      }
    },
    created() {
      //给当前组件注入全局util
      Util = this.$util;
      this.init()
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
          this.addMessTitle.ajaxParams.data = this.getFormData(this.formValidate);
          let data = this.addMessTitle.ajaxParams.data;
          data.startTime = this.conductDate(data.startTime, 'yyyy-MM-dd HH:mm:ss') || '';
          data.endTime = this.conductDate(data.endTime, 'yyyy-MM-dd HH:mm:ss') || '';
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
       * 重置当前表单
       * */
      resetForm(formName) {
        // this.$emit('cancel', this.addMessTitle.type);
        this.$refs[formName].resetFields()
      },
      /*
       * 获取表单数据
       * @return string  格式:id=0&name=aa
       * */
      getFormData(data) {
        let myData = Util._.defaultsDeep({}, data);
        return myData;
      },
      // 获取选择数据
      getSelectData() {
        let opt = {
          errorTitle: '获取房间失败',
          ajaxSuccess: res => this.roomIdOption = res.data,
          ajaxParams: {
            url: selectApi.select.path,
            method: selectApi.select.method,
          }
        };
        this.ajax(opt);
      },
      /*
       * 组件初始化入口
       * */
      init() {
        this.getSelectData()
        //this.ajax(this.listMessTitle)
      },
      // 图片上传
      upladSuccess(ids) {
        this.formValidate.imageIds = ids
      }
    },
    components: {
      uploadFile
    },
  }

</script>
<style lang="scss">
  .date {
    line-height: 25px;
  }

  .date .countDate {
    display: inline-block;
    width: 70px;
    text-align: center;
    border-bottom: 1px solid;
  }

  .roomUsageFrom {
    .el-select {
      display: block;
    }
    .el-date-editor.el-input {
      width: 100%
    }
  }

</style>
