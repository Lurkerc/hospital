<template>

  <div>
    <el-form :model="formValidate" ref="formValidate"  class="demo-form-inline" label-width="90px" >
      <el-row >
        <el-col :span="10" :offset="2">
          <el-form-item label="姓名" prop="type" class="feildFontweight">
            {{data.applicantName}}
          </el-form-item>
        </el-col>
        <el-col :span="10" :offset="2">
          <el-form-item label="科室" prop="type" class="feildFontweight">
            {{data.depName}}
          </el-form-item>
        </el-col >
      </el-row >


      <el-row >
        <el-col :span="20" :offset="2">
          <el-form-item type="附件" label="第一次体检报告:" class="feildFontweight">
            <upload-file :uploadFiles="fileList[0]"  @setUploadFiles="firstFileEvent"></upload-file>
          </el-form-item>
        </el-col >
      </el-row >

      <el-row >
        <el-col :span="20" :offset="2">
          <el-form-item type="附件" label="第二次体检报告:" class="feildFontweight">
            <upload-file :uploadFiles="fileList[1]"  @setUploadFiles="secondFileEvent"></upload-file>
          </el-form-item>
        </el-col >
      </el-row >
    </el-form>

    <el-row >
      <el-col :span="16" :offset="2">
        <div style="margin-left: 100px">
          <load-btn @listenSubEvent="listenSubEvent" :btnData="loadBtn"></load-btn>
          <load-btn @listenSubEvent="reportedEvent" :btnData="upload"></load-btn>
        </div>
      </el-col>
    </el-row >
  </div>
</template>

<script>
  //当前组件引入全局的util
  let Util=null;
  export default {
    props:['operailityData'],
    data (){
      return{
        //保存按钮基本信息
        loadBtn:{title:'提交',callParEvent:'listenSubEvent'},
        upload:{title:'上报',callParEvent:'listenSubEvent'},
        countDate:0,
        //form表单bind数据
        formValidate: {
          name:'',
          identify:null,
          remark:'',
          type:[]
        },
        isAdd:true,
        //初始化获取职业暴露信息
        data:{
          depId : this.operailityData.depId,            //科室id
          applicantId : this.operailityData.applicantId,
          applicantName:this.operailityData.applicantName, //申请人姓名
          depName:this.operailityData.depName,            //科室名称
          occupationalExposureId : this.operailityData.id,            //职业暴露id
          status:'WSB',            //职业暴露化验报告状态
          hyfileIds:'',         //化验报告附件Id字符串
          fcfileIds:'',          //复查报告附件Id字符串
        },
        fileList:[{
          fileId:'',            //附件id
          fileName:'',            //文件名称
          fileType:''            //文件类型
        },{
          fileId:'',            //附件id
          fileName:'',            //文件名称
          fileType:''            //文件类型
        }],
        //当前组件初始获取数据时,ajax处理的 基础信息设置
        getMessTitle:{
          ajaxSuccess:'SuccessGetCurrData',
          ajaxParams:{
            url:'occupationalExposureAudit/report/get/'+this.operailityData.id,
          }
        },
        //当前组件提交(add)数据时,ajax处理的 基础信息设置
        addMessTitle:{
          type:'upload',
          successTitle:'上传成功!',
          errorTitle:'上传失败!',
          ajaxSuccess:'ajaxSuccess',
          ajaxError:'ajaxError',
          ajaxParams:{
            url:'occupationalExposureAudit/report/add',
            method:'post',
          }
        },

      }
    },
    created(){
      //给当前组件注入全局util
      Util = this.$util;
    },
    mounted(){
      //暂时没有初始化,预留初始化入口
      this.init();
    },
    methods:{

        //初始化获取数据 如果获取到数据则分别查分id
      SuccessGetCurrData(res){
        if(this.$util._.isEmpty(res.data))return;
        this.fileList = [];
        this.fileList.push(res.data.occupationalExposureReport[0].fileList);
        this.data.hyfileIds = split(res.data.occupationalExposureReport[0].fileList);
        if(!this.$util._.isEmpty(res.data.occupationalExposureReport[1])){
          this.fileList.push(res.data.occupationalExposureReport[1].fileList);
          this.data.fcfileIds = split(res.data.occupationalExposureReport[1].fileList);
        }

        function split (data) {
            let id =[];
          for(let i=0;i<data.length;i++){
            id.push(data[0].fileId)
          }
          return id.join(',')
        }
      },


      //上报调用修改的接口
      reportedEvent(isLoadingFun){
        let isSubmit = this.submitForm("formValidate");
        if(isSubmit){
          if(!isLoadingFun) isLoadingFun=function(){};
          isLoadingFun(true);
          this.addMessTitle.ajaxParams.data = this.getFormData(this.data);
          this.addMessTitle.ajaxParams.data.status = 'DSH';
          this.ajax(this.addMessTitle,isLoadingFun)
        }
      },


      //第一次上传文件，上传成功触发
      firstFileEvent(ids){
        this.data.hyfileIds = ids;
      },


      //第二次上传文件，上传成功触发
      secondFileEvent(ids){
        this.data.fcfileIds= ids;
      },


      /*
       * 点击提交按钮 监听是否提交数据
       * @param isLoadingFun boolean  form表单验证是否通过
       * */
      listenSubEvent(isLoadingFun){             // todo  待完善 保存可以add edit
        let isSubmit = this.submitForm("formValidate");
        if(isSubmit){
          if(!isLoadingFun) isLoadingFun=function(){};
          isLoadingFun(true);
          this.addMessTitle.ajaxParams.data=this.getFormData(this.data);
          this.addMessTitle.ajaxParams.data.status = 'WSB'; //防止状态出错重新复制为WSB
          this.ajax(this.addMessTitle,isLoadingFun)
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
       * 当前组件发送事件给父组件
       * 发送关闭(cancel)模态事件给父组件,请求关闭当前模态窗
       * */
      cancel(){
        this.$emit('cancel','upload');
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
        this.ajax(this.getMessTitle)
      },
    }
  }
</script>
