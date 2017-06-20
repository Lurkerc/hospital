<template>

  <div>

    <el-form ref="formValidate"  class="demo-form-inline" label-width="90px">
      <el-row class="lose-margin2" >
        <el-col :span="11" :offset="10">
          评优自荐
        </el-col >
      </el-row >

      <el-row class="lose-margin2">
        <el-col :span="20" :offset="2">
            <quill-editor v-model="data.reason"
                          ref="myQuillEditor"
            >
            </quill-editor>
        </el-col>
      </el-row >

      <el-row >
        <el-col :span="20" :offset="2">
          <el-form-item  label="自荐人:" prop="name" class="feildFontweight">
            {{data.userName}} &nbsp;  &nbsp; <span class="feildFontweight">日期:</span> {{data.declare_date}}
          </el-form-item >

        </el-col >
      </el-row >

      <el-row >
        <el-col :span="20" :offset="2">
          <el-form-item label="相关资料:" prop="name" class="feildFontweight">
            <upload-file :uploadFiles="data.fileList" :show="true"></upload-file>
          </el-form-item >
        </el-col >
      </el-row >


      <el-row >
        <el-col :span="20" :offset="2">
          <el-form-item label="审核结果"  prop="examineStatus">
            <el-radio-group v-model="formValidate.examineStatus" >
              <el-radio label="TG">通过</el-radio>
              <el-radio label="BTG">不通过</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col >
      </el-row >

      <el-row >
        <el-col :span="20" :offset="2">
          <el-form-item label="审批意见" prop="opinion">
            <el-input v-model="formValidate.opinion" type="textarea" :rows="5" resize="none"></el-input>
          </el-form-item>
        </el-col >
      </el-row >
    </el-form>
    <el-row >
      <el-col :span="10" :offset="2">
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
        options: [{
          value: '选项1',
          label: '所有人'
        }, {
          value: '选项2',
          label: '本科教育'
        }, {
          value: '选项3',
          label: '实习生'
        }, {
          value: '选项4',
          label: '研究生'
        }, {
          value: '选项5',
          label: '住院医师'
        }, {
          value: '选项5',
          label: '进修生'
        }],
        //自荐数据
        "data":{
          "id":"",
          "userId":"",
          "userName":"",
          "reason":"",
          "declare_date":"",
          "opinion":"",
          "fileList":[
            {
              "fileId":"",
              "fileName":"",
              "fileType":""
            }
          ]
        },
        //保存按钮基本信息
        loadBtn:{title:'提交',callParEvent:'listenSubEvent'},
        countDate:0,
        //form表单bind数据
        formValidate: {
          examineStatus:'',
          opinion:''
        },
        //当前组件提交(edit)数据时,ajax处理的 基础信息设置
        auditMessTitle:{
            type:'audit',
            successTitle:'修改成功',
            errorTitle:'修改失败',
            ajaxSuccess:'ajaxSuccess',
            ajaxParams:{
              url:'appraising/sellOneself/modifyExamineStatus/approval/'+this.operailityData.id,
              method:'put',
              data:{}
            }
        },
        //当前组件默认请求(list)数据时,ajax处理的 基础信息设置
        listMessTitle:{
          paramsData:'listUrl',
          ajaxSuccess:'SuccessGetCurrData',
          ajaxParams:{
            url:'appraising/sellOneself/get/'+this.operailityData.id,
          }
        }
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
          this.auditMessTitle.ajaxParams.data = this.getFormData(this.formValidate);
          this.ajax(this.auditMessTitle, isLoadingFun)
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
          let data = responseData.data
        this.formValidate = this.getFormValidate(this.formValidate,data);
        this.data = data
      },
      /*
       * 当前组件发送事件给父组件
       * 发送关闭(cancel)模态事件给父组件,请求关闭当前模态窗
       * */
      cancel(){
        this.$emit('cancel','audit');
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

      //从获取的Res中挑选出需要的名值对
      getFormValidate(data,res){
        let length = arguments.length;
        var arr = Array.prototype.slice.call(arguments,2);

        if(length<2) return data
        var obj={}
        this.$util._.forEach(data,function (val,key) {
          obj[key] = res[key]||'';
        })

        if(length>=3)obj = this.getFormValidate.apply(this,[].concat(obj,arr));
        return obj

      }
    }
  }
</script>
