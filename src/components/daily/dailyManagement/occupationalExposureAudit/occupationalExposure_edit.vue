<template>
  <div>

    <el-row>
      <el-col :span="10" :offset="10">
        {{ hospitalName }}职业暴露登记表
      </el-col>
    </el-row>


    <el-form :model="formValidate" ref="formValidate" class="demo-form-inline" label-width="90px">
      <el-row class="lose-margin2">
        <el-col :span="20" :offset="2">
          <fieldset class="layui-elem-field">
            <el-row>
              <el-col :span="9" :offset="2">
                <el-form-item label="姓名" prop="name" style="width: 283px;">
                  <el-input v-model="formValidate.userName" placeholder="请输入"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="10">
                <el-form-item label="科室" prop="name" style="width: 283px;">
                  <el-select filterable v-model="formValidate.depId" placeholder="请选择">
                    <select-option></select-option>
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="10" :offset="2">
                <el-form-item label="发生时间" prop="name">
                  <el-date-picker v-model="formValidate.occurrenceTime" type="date" :editable="false" placeholder="选择日期时间">
                  </el-date-picker>
                </el-form-item>

              </el-col>
            </el-row>

          </fieldset>
        </el-col>
      </el-row>

      <el-row class="lose-margin2">
        <el-col :span="20" :offset="2">\
          <el-form-item label="暴露级别" prop="exposureLevel">
            <el-radio-group v-model="formValidate.exposureLevel">
              <el-radio :label="1">暴露后感染病毒</el-radio>
              <el-radio :label="0">暴露后未感染病毒</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row class="lose-margin2">
        <el-col :span="20" :offset="2">
          <fieldset class="layui-elem-field">
            <legend>暴露详情</legend>
            <quill-editor v-model="formValidate.exposureDetails" ref="myQuillEditor">
            </quill-editor>
          </fieldset>
        </el-col>
      </el-row>

      <el-row class="lose-margin2">
        <el-col :span="20" :offset="2">
          <p><span class="name">结果: </span><span> {{formValidate.isInfected?'暴露后感染病毒':' 暴露后未感染病毒'}}</span></p>
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="20" :offset="2">
          <el-form-item type="附件" label="相关证明材料:" class="feildFontweight">
            <upload-file :uploadFiles="formValidate.fileList" @setUploadFiles="editFileEvent"></upload-file>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>

    <el-row>
      <el-col :span="16" :offset="2">
        <div style="margin-left: 100px">
          <load-btn @listenSubEvent="listenSubEvent" :btnData="loadBtn"></load-btn>
          <el-button @click="cancel">取消</el-button>
        </div>
      </el-col>
    </el-row>
  </div>
</template>
<script>
  //当前组件引入全局的util
  let Util = null;
  export default {
    //props接收父组件传递过来的数据
    props: ['operailityData'],
    data() {
      return {
        hospitalName: this.$store.state.envPath.hospitalName,
        //保存按钮基本信息
        loadBtn: {
          title: '提交',
          callParEvent: 'listenSubEvent'
        },
        countDate: 0,
        //form表单bind数据
        formValidate: {
          id: '', //职业暴露Id
          userId: '', //人员ID
          userName: '', //人员名称
          depId: '', //科室ID
          depName: '', //科室名称
          occurrenceTime: '', //发生时间（格式yyyy-MM-dd）
          exposureLevel: '', //暴露级别
          exposureDetails: '', //暴露详情
          isInfected: '', //结果
          status: '', //审批状态
          fileIds: '', //附件Id字符串
          fileList: '',
        },
        //当前组件提交(edit)数据时,ajax处理的 基础信息设置
        editMessTitle: {
          type: 'edit',
          successTitle: '修改成功',
          errorTitle: '修改失败',
          ajaxSuccess: 'ajaxSuccess',
          ajaxParams: {
            url: 'occupationalExposureAudit/modify/' + this.operailityData.id,
            method: 'put',
          }
        },
        //当前组件默认请求(list)数据时,ajax处理的 基础信息设置
        listMessTitle: {
          paramsData: 'listUrl',
          ajaxSuccess: 'SuccessGetCurrData',
          ajaxParams: {
            url: '/occupationalExposureAudit/get/' + this.operailityData.id,
          }
        }
      }
    },
    created() {
      //给当前组件注入全局util
      Util = this.$util;
    },
    mounted() {
      //初始化
      this.init();
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
          isLoadingFun(true)
          this.editMessTitle.ajaxParams.data = this.formDate(this.getFormData(this.formValidate), ['occurrenceTime'], this.yearMonthData);
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
       * 默认组件第一次请求数据
       * @param res JSON  数据请求成功后返回的数据
       * */
      SuccessGetCurrData(responseData) {
        this.formValidate = this.getFormValidate(this.formValidate, responseData.data);

      },
      /*
       * 当前组件发送事件给父组件
       * 发送关闭(cancel)模态事件给父组件,请求关闭当前模态窗
       * */
      cancel() {
        this.$emit('cancel', 'edit');
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
        //默认请求加载数据
        this.ajax(this.listMessTitle);
        this.getFormValidate(null, this.formValidate)
      },



      //修改附件id
      editFileEvent(ids) {

        this.formValidate.fileIds = ids;
      },

    }
  }

</script>
