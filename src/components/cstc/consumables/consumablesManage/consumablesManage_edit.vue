<template>
  <div class="editForm">
    <el-form :model="formValidate" ref="formValidate" label-width="124px" :rules="rules">
      <el-row>

        <el-col :span="8" :offset="2">
          <el-form-item label="耗材名称：" prop="consumablesName" placeholder="请输入" required>
            <el-input v-model="formValidate.consumablesName"></el-input>
          </el-form-item>
        </el-col>

        <el-col :span="8" :offset="2">
          <el-form-item label="参考单价：" prop="price" placeholder="请输入" required>
            <el-input v-model="formValidate.price"></el-input>
          </el-form-item>
        </el-col>

        <el-col :span="8" :offset="2">
          <el-form-item label="库存：" prop="stock" placeholder="请输入" required>
            <el-input v-model="formValidate.stock"></el-input>
          </el-form-item>
        </el-col>

        <el-col :span="20" :offset="2">
          <el-form-item label="设备图片：">
            <upload-photo-wall type="picture" :actionUrl="'/file/upload/static'" :fileList="fileList" @upladSuccess="upladSuccess"></upload-photo-wall>
          </el-form-item>
        </el-col>

        <el-col :span="18" :offset="2">
          <el-form-item label="物品描述：" prop="describes">
            <el-input type="textarea" :autosize="{ minRows: 4, maxRows: 8}" placeholder="请输入物品描述" v-model="formValidate.describes"></el-input>
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
  //当前组件引入全局的util
  let Util = null;
  import {
    consumablesManage as rules
  } from '../../rules'; // 表单验证规则
  import uploadPhotoWall from '../../../common/uploadPhotoWall';
  export default {
    props: {
      getUrlParams: { // api对象
        type: Object,
        required: true
      },
      urlParams: { // api对象
        type: Object,
        required: true
      },
      id: { // 当前操作
        type: [Number, String],
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

        //form表单bind数据
        formValidate: {
          consumablesName: '', // 耗材名称
          describes: '' // 描述
        },
        staticPath: '',
        //从服务器端获取的已上传的图片存储
        fileList: [ //
          // {
          //   name: "",
          //   url: ""
          // }
        ],
        //当前组件提交(add)数据时,ajax处理的 基础信息设置
        addMessTitle: {
          type: 'edit',
          successTitle: '修改成功!',
          errorTitle: '修改失败!',
          ajaxSuccess: 'ajaxSuccess',
          ajaxError: 'ajaxError',
          ajaxParams: {
            jsonString: true,
            url: this.urlParams.path + '/' + this.id,
            method: this.urlParams.method
          }
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
      /**************************** 从服务器获取编辑的数据 *****************************************/
      getDataForServer() {
        this.ajax({
          ajaxSuccess: 'getDataSuccess',
          ajaxParams: {
            url: `${this.getUrlParams.path}/${this.id}`,
            method: this.getUrlParams.method
          }
        })
      },
      getDataSuccess(res) {
        this.formValidate = res.data // 初始化编辑数据
        if (typeof this.formValidate.imgList != "undefined") {
          this.fileList = [];
          for (var i = 0, item; i < this.formValidate.imgList.length; i++) {
            item = this.formValidate.imgList[i];
            this.fileList.push({
              name: "",
              url: this.staticPath + item.originalPath
            });
          }
        }
      },
      // 图片上传
      upladSuccess(fileList, idx) {
        this.formValidate.imgList = [];
        for (var i = 0; i < fileList.length; i++) {
          let file = (fileList[i].src || '').match(/(static.*)(\..*)/);
          this.formValidate.imgList.push({
            originalPath: file[0],
            thumbnailPath: file[1] + "_MINI" + file[2]
          })
        }
      },
      /*
       * 组件初始化入口
       * */
      init() {
        this.staticPath = this.$store.getters.getEnvPath.http;
        this.getDataForServer()
      }
    },
    components: {
      uploadPhotoWall
    }
  }

</script>

<style lang="scss">
  .editForm {
    .el-date-editor.el-input {
      width: 100%;
    }
    .el-select {
      width: 100%;
    }
  }

</style>
