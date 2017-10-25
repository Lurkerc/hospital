<!--短信通知-->

<template>

  <div>
    <el-form ref="formValidate" v-model="formValidate" class="demo-form-inline" label-width="110px">

      <el-row>
        <el-col :span="22" :offset="1">
          <el-form-item label="通知内容:" prop="content">
            <el-input v-model="formValidate.content" type="textarea" resize="none" :rows="6"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="22" :offset="1">
          <el-form-item label="手机号:">
            <div class="phone-wrap">
              <span class="phone-item" v-for="item in operailityData">{{item.name}}:{{item.mobile}}</span>
            </div>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>

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
  export default {
    //props接收父组件传递过来的数据
    /**
     * operailityData 行数据
     * content 短信内容
     */
    props: ['operailityData','content'],
    data() {
      return {
        //保存按钮基本信息
        loadBtn: {
          title: '提交',
          callParEvent: 'listenSubEvent'
        },
        //form表单bind数据
        formValidate: {
          content: '',
          mobiles: []
        },
        //当前组件提交(edit)数据时,ajax处理的 基础信息设置
        shortNoteMessTitle: {
          type: 'shortNote',
          successTitle: '发送成功',
          errorTitle: '发送失败',
          ajaxSuccess: 'ajaxSuccess',
          ajaxError: 'ajaxError',
          ajaxParams: {
            url: '/sms/send/signContent',
            method: 'post',
          }
        },

      }
    },
    created() {
      //给当前组件注入全局util
      Util = this.$util;
      if (this.operailityData.length == 1) {
        this.formValidate.mobiles = this.operailityData[0].mobile
      } else if (this.operailityData.length > 0) {
        for (let i = 0; i < this.operailityData.length; i++) {
          this.formValidate.mobiles.push(this.operailityData[i].mobile)
        }
        this.formValidate.mobiles = this.formValidate.mobiles.join()
      }

      if(this.content){
        this.formValidate.content = this.content
      }
    },
    mounted() {
      //初始化
    },
    methods: {
      /*
       * 点击提交按钮 监听是否提交数据
       * @param isLoadingFun boolean  form表单验证是否通过
       * */
      listenSubEvent(isLoadingFun) {
//        let isSubmit = this.submitForm("formValidate");
        if (this.formValidate.content == '') {
          this.errorMess('请编辑短信内容！')
          return false
        } else {
          if (!isLoadingFun) isLoadingFun = function () {
          };
          isLoadingFun(true)
          this.shortNoteMessTitle.ajaxParams.data = this.formValidate;
          this.ajax(this.shortNoteMessTitle, isLoadingFun)
        }

      },
//      ajaxSuccess(res) {
//        if (res.status.code == '0') {
//          this.successMess('短信发送成功！');
//          this.$emit('cancel', 'shortNote');
//        }
//      },
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
        this.$emit('cancel', 'shortNote');
      },
    }
  }

</script>
<style>
  .phone-item {
    display: inline-block;
    padding: 0px 11px;
    border: 1px solid rgb(67, 210, 25);
    line-height: 30px;
    margin-top: 0px;
    margin-bottom: 0px;
    margin-left: 8px;
    border-radius: 10px;
  }

</style>
