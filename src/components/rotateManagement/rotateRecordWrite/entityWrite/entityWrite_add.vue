<template>

  <div>
    <el-form :model="formValidate" ref="formValidate"  class="demo-form-inline" label-width="90px" >

      <el-row >
        <el-col :span="8" :offset="2">
          <el-form-item label="科室:" prop="name" >
            <el-select @change="podIdChange" v-model="formValidate.podId" placeholder="请选择">
              <el-option
                v-for="item in optionData"
                :key="item.id"
                :label="item.depName"
                :value="item.podId">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8" :offset="2">
          <el-form-item label="病人姓名:" prop="patientName" >
            <el-input v-model="formValidate.patientName" placeholder="请输入"></el-input>
          </el-form-item>
        </el-col >

      </el-row >

      <el-row >
        <el-col :span="8" :offset="2">
          <el-form-item label="病历号:" prop="patienNo" >
            <el-input v-model="formValidate.patienNo"  placeholder="请输入"></el-input>
          </el-form-item>
        </el-col >
        <el-col :span="8" :offset="2">
          <el-form-item label="日期:" prop="fillTime" >
            <el-date-picker
              :editable="false"
              v-model="formValidate.fillTime"
              type="date"
              placeholder="选择日期">
            </el-date-picker>
          </el-form-item>
        </el-col >
      </el-row >

      <el-row >
        <el-col :span="16" :offset="2">
            <el-form-item label="病种名称:" prop="name" >
              <el-select multiple  v-model="disTitle" placeholder="请选择">
                <el-option
                  v-for="item in getMyRotaryRequirements"
                  :key="item.id"
                  :label="item.disTitle"
                  :value="item.outlineRequireId+'-'+item.disTitle">
                </el-option>
              </el-select>
            </el-form-item>
        </el-col >
      </el-row >

      <el-row >
        <el-col :span="16" :offset="2">
            <el-form-item label="主要诊断:" prop="mainDiagnosis" >
              <el-input type="textarea" v-model="formValidate.mainDiagnosis"></el-input>
            </el-form-item>
        </el-col >
      </el-row >

      <el-row >
        <el-col :span="16" :offset="2">
            <el-form-item label="次要诊断:" prop="secondaryDiagnosis" >
              <el-input type="textarea" v-model="formValidate.secondaryDiagnosis"></el-input>
            </el-form-item>
        </el-col>
        </el-col >
      </el-row >

      <el-row >
        <el-col :span="16" :offset="2">
            <el-form-item label="是否主管:" prop="isDirector" >
              <el-radio-group v-model="formValidate.isDirector">
                <el-radio class="radio"  label="Y">是</el-radio>
                <el-radio class="radio"  label="N">否</el-radio>
              </el-radio-group>
            </el-form-item>
        </el-col >
      </el-row >

      <el-row >
        <el-col :span="16" :offset="2">
            <el-form-item label="是否抢救:" prop="isRescue" >
              <el-radio-group v-model="formValidate.isRescue">
                <el-radio class="radio"  label="Y">是</el-radio>
                <el-radio class="radio"  label="N">否</el-radio>
              </el-radio-group>
            </el-form-item>
        </el-col >
      </el-row >

      <el-row >
        <el-col :span="16" :offset="2">
          <el-form-item label="转归情况:" prop="situation" >
            <el-input type="textarea" v-model="formValidate.situation"></el-input>
          </el-form-item>
        </el-col>
        </el-col >
      </el-row >

      <el-row >
        <el-col :span="16" :offset="2">
          <el-form-item label="相关资料:" prop="name" >
            <upload-file   @setUploadFiles="expenseFileEvent"></upload-file>
          </el-form-item>
        </el-col>
        </el-col >
      </el-row >


    </el-form>

    <el-row >
      <el-col :span="16" :offset="2">
        <div style="margin-left: 100px">
          <load-btn @saveSubEvent="saveSubEvent" :btnData="saveBtn"></load-btn>
          <load-btn @appearSubEvent="appearSubEvent" :btnData="appearBtn"></load-btn>
          <load-btn @saveContinueSubEvent="saveContinueSubEvent" :btnData="saveContinueBtn"></load-btn>
          <load-btn @appearContinueSubEvent="appearContinueSubEvent" :btnData="appearContinueBtn"></load-btn>
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
      props:['operailityData','url'],
    data (){
      return{
        disTitle:[],
        getMyRotaryRequirements:[],
        optionData:'',
          depUrl:'',
        //保存按钮基本信息
        saveBtn:{title:'提交',callParEvent:'saveSubEvent'}, //保存
        saveContinueBtn:{title:'提交病继续',callParEvent:'saveContinueSubEvent'}, //保存
        appearBtn:{title:'上报',callParEvent:'appearSubEvent'},//上报
        appearContinueBtn:{title:'上报并继续',callParEvent:'appearContinueSubEvent'},//上报
        isInit:false,
        //form表单bind数据
        formValidate: {
          patientName:'',        //病人姓名·
          patienNo:'',     //病历号
          fillTime:'',       //填写时间(yyy-MM-dd HH:mm:ss)
          poddIds:'',      //病种ID(多个逗号分隔)
          poddNames:'',      //病种名(多个逗号分隔)
          mainDiagnosis:'',      //主要诊断
          secondaryDiagnosis:'',      //次要诊断
          fileIds:'',      //附件IDs(多个逗号分隔)
          podId:'',      //病种名(多个逗号分隔)
          isDirector:'',      //是否主管
          isRescue:'',      //是否抢救
          situation:'',      //转归情况
        },
        //当前组件提交(add)数据时,ajax处理的 基础信息设置
        addMessTitle:{
          type:'add',
          successTitle:'添加成功!',
          errorTitle:'添加失败!',
          ajaxSuccess:'ajaxSuccess',
          ajaxError:'ajaxError',
          ajaxParams:{
            url:this.url.diseaseRecordAdd,
            jsonString:true,
            method:'post',
            data:{},
          }
        },
        listMessTitle:{
          ajaxSuccess:'updateListData',
          ajaxParams:{
            url:'',  //向后台请求数据的地址

          }
        }
      }
    },
    created(){
      //给当前组件注入全局util
      Util = this.$util;
      let userInfo = this.$store.getters.getUserInfo;
      let userType=userInfo.studentTypes;
      this.listMessTitle.ajaxParams.url = this.url.userRotaryDeptlist+userType+'-'+userInfo.id;
      this.ajax(this.listMessTitle)
    },
    mounted(){
      //暂时没有初始化,预留初始化入口
    },
    methods:{

      updateListData(res){
          let data = res.data;
          if(!data)return;
          this.optionData = data;

      },
      /*
       * 点击提交按钮 监听是否提交数据
       * @param isLoadingFun boolean  form表单验证是否通过
       * */
      listenSubEvent(isLoadingFun){
        let isSubmit = this.submitForm("formValidate");
        if(isSubmit){
          if(!isLoadingFun) isLoadingFun=function(){};
          isLoadingFun(true);
          let poddIds = [];
          let poddNames = [];
          for(let i=0;i<this.disTitle.length;i++){
              let disTitle = this.disTitle[i].split('-');
            poddIds.push(disTitle[0]);
            poddNames.push(disTitle[1]);

          }
          this.formValidate.poddIds = poddIds.join(',');
          this.formValidate.poddNames = poddNames.join(',');

          this.addMessTitle.ajaxParams.data=this.formDate(this.getFormData(this.formValidate),['fillTime'],'yyyy-MM-dd');
          this.ajax(this.addMessTitle,isLoadingFun)
        }
      },

      //添加
      saveSubEvent(){
        let addMessTitle={
          type:'add',
            successTitle:'添加成功!',
            errorTitle:'添加失败!',
            ajaxSuccess:'ajaxSuccess',
            ajaxError:'ajaxError',
            ajaxParams:{
            url:this.url.diseaseRecordAdd,
              method:'post',
              data:{},
          }
        }
        this.addMessTitle = addMessTitle;
        this.listenSubEvent()
      },
      //上报
      appearSubEvent(){
        let addMessTitle={
          type:'add',
          successTitle:'上报成功!',
          errorTitle:'上报失败!',
          ajaxSuccess:'ajaxSuccess',
          ajaxError:'ajaxError',
          ajaxParams:{
            url:this.url.diseaseRecordAddRelease,
            method:'post',
            data:{},
          }
        }
        this.addMessTitle = addMessTitle;
          this.listenSubEvent()
      },
      //保存并继续
      saveContinueSubEvent(){
        let addMessTitle={
          type:'add',
          successTitle:'保存成功!',
          errorTitle:'保存失败!',
          ajaxSuccess:'continue',
          ajaxError:'ajaxError',
          ajaxParams:{
            url:this.url.diseaseRecordAdd,
            method:'post',
            data:{},
          }
        }
        this.addMessTitle = addMessTitle;
          this.listenSubEvent()
      },
      //上报并继续
      appearContinueSubEvent(){
        let addMessTitle={
          type:'add',
          successTitle:'上报成功!',
          errorTitle:'上报失败!',
          ajaxSuccess:'continue',
          ajaxError:'ajaxError',
          ajaxParams:{
            url:this.url.diseaseRecordAddRelease,
            method:'post',
            data:{},
          }
        }
        this.addMessTitle = addMessTitle;
          this.listenSubEvent()
      },

      //继续
      continue(responseData, messTitle, isLoadingFun){
          let  formValidate= {
              patientName:'',        //病人姓名·
              patienNo:'',     //病历号
              fillTime:'',       //填写时间(yyy-MM-dd HH:mm:ss)
              poddIds:'',      //病种ID(多个逗号分隔)
              poddNames:'',      //病种名(多个逗号分隔)
              mainDiagnosis:'',      //主要诊断
              secondaryDiagnosis:'',      //次要诊断
              fileIds:'',      //附件IDs(多个逗号分隔)
              podId:'',      //病种名(多个逗号分隔)
              isDirector:'',      //是否主管
              isRescue:'',      //是否抢救
              situation:'',      //转归情况
            }
          this.formValidate = formValidate;
          this.showMess(messTitle.successTitle);
          this.disTitle = [];
          this.isInit = true;
          this.$emit('updata');
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
        this.$emit('cancel',this.addMessTitle.type);
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
        //this.ajax(this.listMessTitle)
      },

      //轮转科室改变重新获取病种名称
      podIdChange(val){
          if(this.isInit){
            this.isInit = false;
              return;
          }
        let listMessTitle={
          ajaxSuccess:'podIdChangeListData',
          ajaxParams:{
            url:this.url.getMyRotaryRequirements+'bz-'+val,
          }
        }
        this.ajax(listMessTitle)

      },

      podIdChangeListData(res){
        let data = res.data;
        if(!data) return;
        this.getMyRotaryRequirements = data

      },

      expenseFileEvent(ids){
          this.formValidate.fileIds = ids;
      },
    }
  }
</script>
