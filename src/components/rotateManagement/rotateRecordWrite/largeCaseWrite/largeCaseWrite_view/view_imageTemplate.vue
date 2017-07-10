<!----------------------------------
****--影像模板
****--@date     2017/7/4
****--@author   gx
----------------------------------->
<template>
    <div>
      <el-form   class="demo-form-inline" label-width="130px" >
        <el-row class="table-back-one">
          <el-col :span="24" >
            <el-form-item label="编号:" prop="czyNo" >
              {{formValidate.czyNo}}
            </el-form-item>
          </el-col>
        </el-row>
        <el-row class="table-back-two">
          <el-col :span="24" >
            <el-form-item label="科室:" prop="depName" >
             {{operailityData.depName}}
            </el-form-item>
          </el-col>
        </el-row>

        <el-row class="table-back-one">
          <el-col :span="24" >
            <el-form-item label="病人姓名:" prop="cname" >
              {{formValidate.cname}}
            </el-form-item>
          </el-col>
        </el-row>

        <el-row class="table-back-two">
          <el-col :span="24" >
            <el-form-item label="病人性别:" prop="csex" >
              {{formValidate.csex}}
            </el-form-item>
          </el-col>
        </el-row>

        <el-row class="table-back-one">
          <el-col :span="24" >
            <el-form-item label="年龄:" prop="cage" >
              {{formValidate.cage}}
            </el-form-item>
          </el-col>
        </el-row>


        <el-row class="table-back-two">
          <el-col :span="24" >
            <el-form-item label="样本的描述:" prop="cbyVar" >
              <el-input type="textarea" readonly v-model="formValidate.cbyVar"></el-input>
            </el-form-item>
          </el-col>
        </el-row >

        <el-row class="table-back-two">
          <el-col :span="24" >
            <el-form-item label="分析报告:" prop="ctgjcZkqk" >
              <el-input type="textarea" readonly v-model="formValidate.ctgjcZkqk"></el-input>
            </el-form-item>
          </el-col>
        </el-row >

        <el-row class="table-back-two">
          <el-col :span="24" >
            <el-form-item label="创建时间:" prop="csex" >
              {{date}}
            </el-form-item>
          </el-col>
        </el-row>
        <el-row class="table-back-two">
          <el-col :span="24" >
            <el-form-item label="创建人:" prop="createUserNmae" >
              {{formValidate.createUserNmae}}
            </el-form-item>
          </el-col>
        </el-row>

        <el-row class="table-back-one-d">
          <el-col :span="10" >
            <el-form-item label="相关资料:" >
              <upload-file :uploadFiles="formValidate.fileList" :show="true"></upload-file>
            </el-form-item>

          </el-col>
        </el-row>



      </el-form>
    </div>
</template>
<script>
    /*当前组件必要引入*/

    //当前组件引入全局的util
    let Util = null;
    export default{
      props:['operailityData','url'],
        data() {
            return {
              saveBtn: {title: '提交', callParEvent: 'saveSubEvent'},
              loadBtn: {title: '上报', callParEvent: 'appearSubEvent'},
              name:'',
              date:'',
              formValidate:{
               /* "caseId":1111,
                "czyNo":"编号",
                "cname":"姓名",
                "csex":"男",
                "cage":"年龄",
                "cbyVar":"样本的描述",
                "ctgjcZkqk":"分析报告",
                "createUserNmae":"创建人姓名",*/
              },
              listMessTitle:{
                ajaxSuccess:'SuccessGetCurrData',
                ajaxParams:{
                  url:this.url.caseRecordImageDataGet+this.operailityData.cid,
                }
              },
            }
        },
        methods: {
            //初始化请求列表数据
            init(){},
          //上传文件
          expenseFileEvent(ids){
            this.formValidate.fileIds = ids;
          },


          SuccessGetCurrData(res){
            let data = res.data;
            if(!data) return;
            this.formValidate = data;
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
              this.addMessTitle.ajaxParams.data=this.getFormData(this.formValidate);
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
          //保存
          saveSubEvent(isLoadingFun){
            let addMessTitle={
              type:'add',
              successTitle:'添加成功!',
              errorTitle:'添加失败!',
              ajaxSuccess:'ajaxSuccess',
              ajaxError:'ajaxError',
              ajaxParams:{
                jsonString:true,
                url:this.url.caseRecordImageDataAdd,
                method:'post',
                data:{},
              }
            };
            this.addMessTitle = addMessTitle;
            this.listenSubEvent(isLoadingFun)
          },

          //上报
          appearSubEvent(isLoadingFun){
            let addMessTitle={
              type:'add',
              successTitle:'上报成功!',
              errorTitle:'上报失败!',
              ajaxSuccess:'ajaxSuccess',
              ajaxError:'ajaxError',
              ajaxParams:{
                url:this.url.caseRecordImageDataAddRelease,
                method:'post',
                data:{},
              }
            };
            this.addMessTitle = addMessTitle;
            this.listenSubEvent(isLoadingFun)
          },

          //取消
          cancel(){
            this.$emit('cancel',this.addMessTitle.type);
          },

          /*
           * 获取表单数据
           * @return string  格式:id=0&name=aa
           * */
          getFormData(data){
            let myData = this.$util._.defaultsDeep({},data);
            return myData;
          },


          init(){
            //默认请求加载数据
            this.ajax(this.listMessTitle);
          },

        },
        created(){

            this.init();
          //获取当前登录人
          let userInfo = this.$store.getters.getUserInfo;
          this.formValidate.createUserNmae= userInfo.name;
          //获取当前时间
          let  date = new Date();
         this.date =  this.yearMonthData(date)

        },
        mounted(){
        },
        components: {}
    }
</script>
