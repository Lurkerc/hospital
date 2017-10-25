<!----------------------------------
****--@name     答辩申请
****--@role     respondentReply
****--@date     2017/7/10
****--@author   gx
----------------------------------->
<template>
  <div style="width: 100%;height: 100%;overflow: auto;">
    <el-row style="min-width: 800px;">
      <el-col :span="4" :offset="1">
        <div class="cal-schoolTit"><strong>研究生答辩申请</strong></div>
      </el-col>
      <el-col :span="18">
        <el-steps :space="100" :active="active" finish-status="success">
          <el-step title="填写"></el-step>
          <el-step title="上报"></el-step>
          <el-step title="审核"></el-step>
        </el-steps>
      </el-col>
    </el-row>
    <el-form :model="formValidate" v-for="item in 1" :key="item" ref="formValidate" :rules="rules" class="demo-form-inline" label-width="120px">
      <!--不需要申请人的基本信息-->
     <!-- <el-row>
        <el-col :span="11" :offset="1" style="border-left: 1px solid #ececec;border-top: 1px solid #ececec;">
          <el-form-item label="申请人:" style="padding:4px 0;margin: 0;">
            {{formValidate.name}}
          </el-form-item>
        </el-col>
        <el-col :span="11" style="border: 1px solid #ececec;border-bottom: none;">
          <el-form-item label="学号:" style="padding:4px 0;margin: 0;">
            {{formValidate.studentId}}
          </el-form-item>
        </el-col>
        <el-col :span="11" :offset="1" style="border-left: 1px solid #ececec;border-top: 1px solid #ececec;">
          <el-form-item label="年级:" style="padding:4px 0;margin: 0;">
            {{formValidate.boundary}}
          </el-form-item>
        </el-col>
        <el-col :span="11" style="border: 1px solid #ececec;border-bottom: none;">
          <el-form-item label="手机号:" style="padding:4px 0;margin: 0;">
            {{formValidate.phone}}
          </el-form-item>
        </el-col>
        <el-col :span="11" :offset="1" style="border: 1px solid #ececec;border-right: none;">
          <el-form-item label="专业代码:" style="padding:4px 0;margin: 0;">
            {{formValidate.specialtyCode}}
          </el-form-item>
        </el-col>
        <el-col :span="11" style="border: 1px solid #ececec;">
          <el-form-item label="专业名称:" style="padding:4px 0;margin: 0;">
            {{formValidate.specialtyName}}
          </el-form-item>
        </el-col>
      </el-row>
      <br />-->
      <div style="min-width: 800px;" v-if="isWrite">
        <el-row class="table-back-one">
          <el-col :span="12" >
            <el-form-item label="答辩专科:" prop="defenseSpecialist" >
              <el-input  v-model="formValidate.defenseSpecialist" placeholder="请输入"></el-input>
            </el-form-item>
          </el-col>

          <el-col :span="12" >
            <el-form-item label="答辩时间:" prop="defenseTime" >
              <el-date-picker
                :editable="false"
                v-model="formValidate.defenseTime"
                type="date"
                placeholder="选择日期">
              </el-date-picker>
            </el-form-item>
          </el-col >
        </el-row >

        <el-row class="table-back-two">
          <el-col :span="12" >
            <el-form-item  label="答辩地点:"  >
              {{formValidate.defensePlace}}
              <!--<el-input v-model="formValidate.defensePlace" placeholder="请输入"></el-input>-->
            </el-form-item>
          </el-col >
          <el-col :span="12" >
            <el-form-item  label="是否预答辩:" prop="isPreDefense" >
              <el-radio-group v-model="formValidate.isPreDefense">
                <el-radio :label="'1'">是</el-radio>
                <el-radio :label="'2'">否</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
        </el-row >

        <el-row class="table-back-one" style="padding: 0">
          <el-col :span="4" style="text-align: center;">
           <!--<div style="font-size: 14px;color: #48576a;line-height: 96px">拟答辩研究生名单</div>-->
           <div style="font-size: 14px;color: #48576a;line-height: 48px">拟答辩研究生名单</div>
          </el-col>

         <el-col :span="20">
           <el-row class="table-back-two" style="border-top: none;border-right:none;">
              <el-col :span="24">
                <el-form-item  :label="formValidate.applicantName+':'" >
                  <el-radio class="radio" v-model="formValidate.degreeType" label="DOCTOR">博士</el-radio>
                  <el-radio class="radio" v-model="formValidate.degreeType" label="MASTER">硕士</el-radio>
                </el-form-item>
              </el-col>
            </el-row>
           <!-- <el-row class="table-back-two" style="border-top: none;border-right:none;">
              <el-col :span="24">
                <el-form-item  label="博士:" >
                  <el-radio class="radio" v-model="formValidate.degreeType" label="DOCTOR">{{formValidate.applicantName}}</el-radio>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row class="table-back-one" style="border-right:none;">
              <el-col :span="24" >
                <el-form-item  label="硕士:" >
                  <el-radio class="radio" v-model="formValidate.degreeType" label="MASTER">{{formValidate.applicantName}}</el-radio>
                </el-form-item>
              </el-col>
            </el-row>-->
          </el-col >
        </el-row >

        <el-row class="table-back-two-d">
          <el-col :span="24">
            <el-form-item label="导师:" prop="tutorName" >
              <el-input  v-model="formValidate.tutorName" placeholder="请输入"></el-input>
            </el-form-item>
          </el-col>
        </el-row >
        <el-table
          align="center"
          :data="formValidate.memberList"
          tooltip-effect="dark"
          highlight-current-row
          style="width: 100%;height: 100%">
          <el-table-column
            align="center"
            label="序号"
            type="index"
            width="75">
          </el-table-column>
          <el-table-column
            show-overflow-tooltip
            align="center"
            class-name="valiTableStyle"
            prop="name"
            label="姓名">
            <template scope="scope">
              <el-form :model="scope.row" v-for="item in 1" :key="item" ref="formValidate" :rules="rules" class="demo-form-inline" label-width="0">
                <el-form-item  prop="name" >
                    <el-input v-model="scope.row.name" placeholder="请输入"></el-input>
                </el-form-item>
              </el-form>
            </template>
          </el-table-column>
          <el-table-column
            show-overflow-tooltip
            prop="positionalTitle"
            label="职称"
            class-name="valiTableStyle"
            align="center">
            <template scope="scope">
              <el-form :model="scope.row" v-for="item in 1" :key="item" ref="formValidate" :rules="rules" class="demo-form-inline" label-width="0">
                <el-form-item  prop="positionalTitle" >
                  <el-input v-model="scope.row.positionalTitle" placeholder="请输入"></el-input>
                </el-form-item>
              </el-form>
            </template>
          </el-table-column>
          <el-table-column
            show-overflow-tooltip
            prop="company"
            label="单位"
            class-name="valiTableStyle"
            align="center">
            <template scope="scope">
              <el-form :model="scope.row" v-for="item in 1" :key="item" ref="formValidate" :rules="rules" class="demo-form-inline" label-width="0">
                <el-form-item  prop="company" >
                 <el-input v-model="scope.row.company" placeholder="请输入"></el-input>
                </el-form-item>
              </el-form>
            </template>
          </el-table-column>
          <el-table-column
            show-overflow-tooltip
            align="center"
            label="操作"
            width="160">
            <template scope="scope">
              <el-button size="small" type="info" icon="plus" @click="addMemeberList"></el-button>
              <el-button size="small" type="danger" icon="close" @click="removeMemeberList(scope.$index)"></el-button>
            </template>
          </el-table-column>
        </el-table>

        <!--要办理的事项-->
        <el-table
          align="center"
          :data="formValidate.matter"
          tooltip-effect="dark"
          highlight-current-row
          style="width: 100%;height: 100%">
          <el-table-column
            show-overflow-tooltip
            prop="key"
            label="办理事项">
          </el-table-column>
          <el-table-column
            show-overflow-tooltip
            align="center"
            label="状态"
            prop="name"
            width="200">
            <template scope="scope">
             <span v-if="scope.row.name=='未填写'" style="color:#FF4949;">未填写</span>
             <span v-else style="color:#13CE66" >已填写</span>
            </template>
          </el-table-column>
        </el-table>

      </div>
      <show :operailityData="formValidate" :auditStep="auditStep(formValidate.status)" v-else>
        <el-form-item  label="答辩地点:" prop="defensePlace">
        {{formValidate.defensePlace}}
        <!--<el-input v-model="formValidate.defensePlace" style="width:250px" placeholder="请输入"></el-input>-->
      </el-form-item></show>
    </el-form>
    <el-row class="but-space">
      <el-col :span="24" style="text-align: center;">
        <load-btn v-if="!isSave&&formValidate.status==''" @listenSubEvent="listenSubEvent" :btnData="loadBtn"></load-btn>
        <load-btn v-if="isSave&&formValidate.status=='WSB'" @listenSubEvent="listenSubEventEdit" :btnData="loadBtn1"></load-btn>
        <load-btn v-if="formValidate.status=='WSB'||formValidate.status=='BH'" @listenSubEvent="listenSubEventSubmit" :btnData="loadBtn2"></load-btn>
      </el-col>
    </el-row >

  </div>
</template>
<script>
/*当前组件必要引入*/
import {respondentReply as rules} from "../rules.js";
import show from '../common/makeOpenReply_view.vue'
import api from "../api.js";

//当前组件引入全局的util
let Util = null;
export default{
  data() {
    return {
      rules,
      //保存按钮基本信息
      loadBtn:{title:'保存',callParEvent:'listenSubEvent'},
      loadBtn1:{title:'保存',callParEvent:'listenSubEvent'},
      loadBtn2:{title:'上报',callParEvent:'listenSubEvent'},
      isWrite:false,
      active:0,

      formValidate:{
        "id":"",
        defenseSpecialist:'',//defenseSpecialist
        "applicantId":"",
        "name":"",
        "studentId":"",
        "boundary":"",
        "phone":"",
        "specialtyCode":"",
        "specialtyName":"",
        "researchDirection":"",
        "thesisTitle":"",
        "status":"",
        "defenseTime":"",  //答辩时间
        "defensePlace":"",
        "isPreDefense":2,
        "resultStatus":"2",
        "attachmentId":"",
        "fileInfo":{
          "fileId":"",
          "fileName":"",
          "filePath":"",
          "fileType":""
        },
        tutorName:'',//老师名字
        "memberList":[
          {
            "name":"",
            "positionalTitle":"",
            "company":""
          },

        ],
        matter:[]//办理事项
      },

      tableData:[],

      //是否已保存
      isSave:false,

      //获取答辩申请(修改时调用)
      listMessTitle:{
        ajaxSuccess:'updateListData',
        ajaxParams:{
          url:api.defenseAppGet.path,
        }
      },

      //当前组件提交(add)数据时,ajax处理的 基础信息设置
      addMessTitle:{
        type:'add',
        successTitle:'添加成功!',
        errorTitle:'添加失败!',
        ajaxSuccess:'addSuccess',
        ajaxError:'addFail',
        ajaxParams:{
          url:api.defenseAppAdd.path,
          method:api.defenseAppAdd.method,
          jsonString:true,
          params:{
            researchDirection:"",
            thesisTitle:"",
            attachmentId:"",
            status:"",
            defenseTime:"",
            defensePlace:"",
            isPreDefense:"",
          }
        },
        submit:'',
      },


      //当前组件提交(eidt)数据时,ajax处理的 基础信息设置
      editMessTitle:{
        type:'edit',
        successTitle:'修改成功!',
        errorTitle:'修改失败!',
        ajaxSuccess:'editSuccess',
        ajaxError:'editFail',
        ajaxParams:{
          url: api.defenseAppModify.path,
          method: api.defenseAppModify.method,
          jsonString:true,
        }
      },


      //当前组件提交(eidt)数据时,ajax处理的 基础信息设置
      submitMessTitle:{
        type:'submit',
        successTitle:'上报成功!',
        errorTitle:'上报失败!',
        ajaxSuccess:'submitSuccess',
        ajaxError:'submitFail',
        ajaxParams:{
          url: api.defenseAppReport.path,
          method:'put',
          data:{
            status:'DSDSH',
          }
        }
      },
    }
  },
  methods: {
    //初始化请求列表数据
    init(){
      Util = this.$util;
      this.ajax(this.listMessTitle);
    },


    //通过get请求列表数据
    updateListData(responseData){
      let data = responseData.data;
      if(!data.submit){
        this.errorMess('未到答辩时间');
        return;
      }
      if(data){
        if(!data.id){
          this.isWrite = true;
        }else {
          this.isSave = true;
        }

        if(!data.status){
          data.status = ''
          this.active=0;
          data.isPreDefense = '1';
          this.isWrite = true;
        }else
        if(data.status=='WSB'){
          this.isWrite = true;
          this.active=1;
        }else if(['DSDSH','JYSDSH','JYCDSH'].includes(data.status)){
          this.active=2;
        }else {
          this.active=3;
        }
        if(data.fileInfo){
          data.fileList = [data.fileInfo];
          data.attachmentId = data.fileInfo.fileId;
        }else {
          data.fileList = []
        }

        if(!data.degreeType){
          data.degreeType = 'MASTER';
        }

        if(data.memberList==0 ||!data.memberList){
          data.memberList = [
            {
              "name":"",
              "positionalTitle":"",
              "company":""
            },
          ]
        }
        data.matter = [
          {
            key:'培养计划',
            name:data.trainingPlan,
          },
          {
            key:'开题申请',
            name:data.openTopicApplication,
          },
          {
            key:'开题报告',
            name:data.openTopicReport,
          },
        ];

        this.formValidate = data
      }
    },

    /**
     * 提交
     */
    listenSubEvent(isLoadingFun){
      if(!this.formValidate.submit){
        this.errorMess('不在可答辩时间之内');
        return;
      }

      if(this.formValidate.trainingPlan=='未填写' ||!this.formValidate.trainingPlan){
        this.errorMess('培养计划未填写,不能提交');
        return;
      }
      if(this.formValidate.openTopicApplication=='未填写'  ||!this.formValidate.openTopicApplication){
        this.errorMess('开题申请未填写,不能提交');
        return;
      }
      if(this.formValidate.openTopicReport=='未填写'  ||!this.formValidate.openTopicReport){
        this.errorMess('开题报告未填写,不能提交');
        return;
      }
      let isSubmit = this.submitForm("formValidate");
      if(isSubmit){
        if(!isLoadingFun) isLoadingFun=function(){};
        isLoadingFun(true);
        let formValidate = this.getFormData(this.formValidate);
        formValidate.status = 'WSB';
        this.addMessTitle.ajaxParams.data=formValidate;
        this.ajax(this.addMessTitle,isLoadingFun)
      }
    },


    /**
     * 修改
     */

     listenSubEventEdit(isLoadingFun){
      let isSubmit = this.submitForm("formValidate");
      if(isSubmit){
        if(!isLoadingFun) isLoadingFun=function(){};
        isLoadingFun(true);
        let formValidate = this.getFormData(this.formValidate);
        formValidate.status = 'WSB';
        let editMessTitle = Util._.defaultsDeep({},this.editMessTitle)
        editMessTitle.ajaxParams.url+=this.formValidate.id;
        editMessTitle.ajaxParams.data=formValidate;
        this.ajax(editMessTitle,isLoadingFun)
      }
     },


    /**
     * 上报
     */
    listenSubEventSubmit(isLoadingFun){
      let isSubmit = this.submitForm("formValidate");
      if(isSubmit){
        if(!isLoadingFun) isLoadingFun=function(){};
        isLoadingFun(true);
        let formValidate = this.getFormData(this.formValidate);
        let submitMessTitle = Util._.defaultsDeep({},this.submitMessTitle);
        submitMessTitle.ajaxParams.url+=this.formValidate.id;
        this.ajax(submitMessTitle,isLoadingFun)
      }
    },


    //添加回调提示
    addSuccess(){
      this.successMess("添加成功!");
      this.init();
    },

    //修改回调提示
    editSuccess(){
      this.successMess("修改成功!");
      this.init();
    },

    //上报回调提示
    submitSuccess(){
      this.init();
      this.isWrite=false;
      this.successMess("上报成功!");
    },

    /**
     * 附件上传后前台赋值
     */
    expenseFileEvent(ids) {
      this.formValidate.attachmentId = ids;
    },


    /**
     * 点击提交按钮 监听是否验证通过
     * @param  {String} formName   form表单v-model数据对象名称
     * @return {boolean} flag    form表单验证是否通过
     * */
    submitForm(formName){
      let flag = true;
      this.$refs[formName].map(item=>{
        item.validate((valid) => {
          if (!valid) {
            flag= false;
          }
        });
      })

      return flag;
    },


    /**
     * 获取表单数据
     * @return string  格式:id=0&name=aa
     * */
    getFormData(data){
      let myData = Util._.defaultsDeep({},data);
      this.formDate(myData,['defenseTime'],'yyyy-MM-dd');
      return myData;
    },

    //添加人员列表
    addMemeberList(){
      this.formValidate.memberList.push({
        "name":"",
        "positionalTitle":"",
        "company":""
      })
    },

    removeMemeberList(index){
      if(this.formValidate.memberList.length<2){
        this.errorMess('不能移除');
        return;
      }
      this.formValidate.memberList.splice(index,1)
    },

    //审核步骤
    auditStep(status){
      let obj = {
        'WSB':'-1',
        'DSDSH':'0',
        'DSBH':'1',
        'JYSDSH':'2',
        'JYSBH':'3',
        'JYCDSH':'4',
        'JYCBH':'5',
        'TG':'6',
        'MODIFY_END':'-1',
        'AGAIN_END':'-1',
      }
      return obj[status];

    },
  },
  created(){
      this.init();
  },
  mounted(){
  },
  components: {
    show
  }
}
</script>
