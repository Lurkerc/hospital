<template>

  <div>
    <el-form :model="formValidate" ref="formValidate"   class="demo-form-inline" label-width="90px" >
      <el-row class="lose-margin2">
        <el-col :span="10" :offset="2">
          <p ><span class="name">姓名：</span><span>{{data.applicantName}}</span></p>
        </el-col >
        <el-col :span="10">
          <p ><span class="name">科室：</span><span>{{data.depName}}</span></p>
        </el-col >
      </el-row >

      <el-row class="lose-margin2">
        <el-col :span="20" :offset="2">
          <p ><span class="name">报销金额：</span> <span>{{data.amountMoney}} </span></p>
        </el-col >
      </el-row >




      <el-row >
        <el-col :span="20" :offset="2">
          <el-form-item type="附件" label="报销资料:" class="feildFontweight">
            <upload-file :uploadFiles="data.fileList" :show="true"></upload-file>
          </el-form-item>
        </el-col >
      </el-row >

      <el-row class="lose-margin2">
        <el-col :span="20" :offset="2">
          <el-form-item label="审核结果" label-width="70px">
            <el-radio-group v-model="formValidate.status">
              <el-radio label="TG">通过</el-radio>
              <el-radio label="BH">驳回</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col>
      </el-row >

      <el-row class="lose-margin2">
        <el-col :span="20" :offset="2">
          <el-form-item label="审核意见" prop="desc" label-width="70px">
            <el-input type="textarea" v-model="formValidate.opinion" :rows="6" resize="none"></el-input>
          </el-form-item>
        </el-col>
      </el-row >

    </el-form>

    <el-row >
      <el-col :span="16" :offset="2">
        <div style="margin-left: 100px">
          <load-btn @listenSubEvent="listenSubEvent" :btnData="loadBtn"></load-btn>
          <el-button  @click="cancel">取消</el-button>
        </div>
      </el-col>
    </el-row >
  </div>
</template>
<script>
  //当前组件引入全局的util
  let Util=null;
  export default {
    //props接收父组件传递过来的数据
    props: ['operailityData'],
    data (){
      return{
        //保存按钮基本信息
        loadBtn:{title:'通过',callParEvent:'listenSubEvent'},
        countDate:0,
        //form表单bind数据
        formValidate: {
          status:'',
          opinion:'',

        },

        "data":{
          "occupationalExposureId":"1",
          "applicantId":"1",
          "applicantName":"张三",
          "depId":"depId",
          "depName":"内科",
          "amountMoney":"500",
          "status":"WSB",
          "opinion":"",
          "fileList":[
            {
              "fileId":"2",
              "fileName":"文件名称",
              "fileType":"txt"
            }
          ]
        },

        tableData1:[],
        //当前组件提交(edit)数据时,ajax处理的 基础信息设置
        editMessTitle:{
          type:'expenseAudit',
          successTitle:'修改成功',
          errorTitle:'修改失败',
          ajaxSuccess:'ajaxSuccess',
          ajaxParams:{
            url:'occupationalExposureAudit/reimbursement/modifyStatus/approval',
            method:'put',
          }
        },
        //当前组件默认请求(list)数据时,ajax处理的 基础信息设置
        listMessTitle:{
          paramsData:'listUrl',
          ajaxSuccess:'SuccessGetCurrData',
          ajaxParams:{
            url:'/occupationalExposureAudit/reimbursement/get/'+this.operailityData.reimbursementId,
          }
        },
      }
    },
    created(){
      //给当前组件注入全局util
      Util = this.$util;
    },
    mounted(){
      //初始化
      this.init();
    },
    methods:{
      /*
       * 点击提交按钮 监听是否提交数据
       * @param isLoadingFun boolean  form表单验证是否通过
       * */
      listenSubEvent(isLoadingFun){
        let isSubmit = this.submitForm("formValidate");
        if(isSubmit) {
          if (!isLoadingFun) isLoadingFun = function () {
          };
          isLoadingFun(true)
          //通过传递回来的当前报销审核的id
          this.editMessTitle.ajaxParams.url = this.editMessTitle.ajaxParams.url+'/'+(this.data.occupationalExposureId||this.operailityData.applicantId);
          this.editMessTitle.ajaxParams.data = this.getFormData(this.formValidate);
          this.ajax(this.editMessTitle, isLoadingFun)
        }
      },
      /*
       * 点击提交按钮 监听是否验证通过
       * @param formName string  form表单v-model数据对象名称
       * @return flag boolean   form表单验证是否通过
       * */
      submitForm(formName){
        let flag = false;
        this.$refs[formName].validate((valid) => {
          if (valid) {
            flag= true;
          }
        });
        return flag;
      },
      /*
       * 默认组件第一次请求数据
       * @param res JSON  数据请求成功后返回的数据
       * */
      SuccessGetCurrData(responseData){
        this.data = responseData.data;
      },
      /*
       * 当前组件发送事件给父组件
       * 发送关闭(cancel)模态事件给父组件,请求关闭当前模态窗
       * */
      cancel(){
        this.$emit('cancel','expenseAudit');
      },
      /*
       * 获取表单数据
       * @return string  格式:id=0&name=aa
       * */
      getFormData(data){
        let myData = Util._.defaultsDeep({},data);
        return myData;
      },
      /*
       * 组件初始化入口
       * */
      init(){
        //默认请求加载数据
        this.ajax(this.listMessTitle);
      },


    }
  }
</script>
