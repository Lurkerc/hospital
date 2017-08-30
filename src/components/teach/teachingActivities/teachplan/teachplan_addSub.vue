<template>

  <div>
    <el-form  label-width="90px" >
      <el-row>
        <el-col :span="5" :offset="4">
          <el-form-item label="科室:" prop="userType">
            {{formValidate.activityPlanDepName}}
          </el-form-item>
        </el-col>
        <el-col :span="5">
          <el-form-item label="计划年份:" prop="userType">
            {{formValidate.activityPlanYear}}
          </el-form-item>
        </el-col>
        <el-col :span="5">
          <el-form-item label="计划月份:" prop="userType">
            {{formValidate.activityPlanMonth}}
          </el-form-item>
        </el-col>
        <el-col :span="2" :offset="3">
          <el-button @click="add" type="success">增加</el-button>
        </el-col>
      </el-row>
    </el-form>

      <el-table
        v-for="item in 1"
        :key="item"
        align="center"
        :data="formValidate.activityDetails"
        tooltip-effect="dark"
        @row-click="rowclick"
        highlight-current-row
        max-height="500"
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
          prop="planActivityTitle"
          class-name="valiTableStyle"
          label="活动名称">
          <template scope="scope">
            <el-form :model="scope.row" ref="formValidate"  :rules="rules.teachplanAddsuborEdit" class="demo-form-inline my-tooltip-button" label-width="0" >
              <el-form-item  prop="planActivityTitle">
               <el-input  v-model="scope.row.planActivityTitle" ></el-input>
              </el-form-item>
            </el-form>
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          show-overflow-tooltip
          prop="planActivityType"
          class-name="valiTableStyle"
          label="活动类型"
          width="180">
          <template scope="scope">
            <el-form :model="scope.row" ref="formValidate"  :rules="rules.teachplanAddsuborEdit" class="demo-form-inline my-tooltip-button" label-width="0" >
              <el-form-item  prop="planActivityType">
                <el-select  v-model="scope.row.planActivityType"  placeholder="请选择" >
                  <el-option
                    v-for="item in planActivityTypeData"
                    :key="item.id"
                    :label="item.name"
                    :value="item.value">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-form>
          </template>
        </el-table-column>
        <el-table-column
          show-overflow-tooltip
          prop="planActivityHostUserName"
          label="主持人"
          class-name="valiTableStyle"
          align="center"
        width="100">
          <template scope="scope">
            <el-form :model="scope.row" ref="formValidate"  :rules="rules.teachplanAddsuborEdit" class="demo-form-inline my-tooltip-button" label-width="0" >
              <el-form-item  prop="planActivityHostUserName">
                <div v-show="scope.row.planActivityHostUserName" style="cursor: pointer" @click="openHost(scope.row)">{{scope.row.planActivityHostUserName}}</div>
                <!--<el-tooltip  v-show="scope.row.planActivityHostUserName" class="item" effect="dark" :content="scope.row.planActivityHostUserName" placement="bottom">-->
                  <!--<el-button @click="openHost(scope.row)" type="info">选择</el-button>-->
                <!--</el-tooltip>-->
                <el-button v-show="!scope.row.planActivityHostUserName" @click="openHost(scope.row)">选择</el-button>
              </el-form-item>
            </el-form>
          </template>
        </el-table-column>
        <el-table-column
          show-overflow-tooltip
          prop="planActivityTime"
          class-name="valiTableStyle"
          align="center"
          label="活动时间"
           width="180">
          <template scope="scope">
            <el-form :model="scope.row" ref="formValidate"  :rules="rules.teachplanAddsuborEdit"  class="demo-form-inline my-tooltip-button" label-width="0" >
              <el-form-item  prop="planActivityTime">
                <el-date-picker
                  style="width:130px;"
                  v-model="scope.row.planActivityTime"
                  align="right"
                  type="date"
                  :editable="false"
                  placeholder="选择活动时间">
                </el-date-picker>
              </el-form-item>
            </el-form>
          </template>
        </el-table-column>
        <el-table-column
          show-overflow-tooltip
          prop="planActivityTimeids"
          align="center"
          class-name="valiTableStyle"
          label="活动时间段"
        width="180">
          <template scope="scope">
            <el-form :model="scope.row" ref="formValidate"  :rules="rules.teachplanAddsuborEdit"  class="demo-form-inline my-tooltip-button" label-width="0" >
              <el-form-item  prop="planActivityTimeids">
                <el-select  v-model="scope.row.planActivityTimeids" multiple  placeholder="请选择" >
                  <el-option
                    v-for="item in timeIdsData"
                    :key="item.id"
                    :label="item.courseTime"
                    :value="item.timeId">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-form>
          </template>
        </el-table-column>
        <el-table-column
          show-overflow-tooltip
          prop="planActivitySite"
          class-name="valiTableStyle"
          label="活动地点">
          <template scope="scope">
            <el-form :model="scope.row" ref="formValidate"  :rules="rules.teachplanAddsuborEdit"  class="demo-form-inline my-tooltip-button" label-width="0" >
              <el-form-item  prop="planActivitySite">
               <el-input v-model="scope.row.planActivitySite"></el-input>
              </el-form-item>
            </el-form>
          </template>
        </el-table-column>
        <el-table-column
          show-overflow-tooltip
          prop="planActivityContent"
          class-name="valiTableStyle"
          label="活动内容">
          <template scope="scope">
            <el-form :model="scope.row" ref="formValidate"   :rules="rules.teachplanAddsuborEdit" class="demo-form-inline my-tooltip-button" label-width="0" >
              <el-form-item  prop="planActivityContent">
               <el-input v-model="scope.row.planActivityContent"></el-input>
              </el-form-item>
            </el-form>
          </template>
        </el-table-column>
        <el-table-column
          label="操作"
          width="200"
          >
          <template scope="scope" >
            <el-tooltip  v-show="scope.row.planActivityFileName!=0" class="item" effect="dark"  placement="bottom">
              <div slot="content"><div v-for="(item,index) in scope.row.planActivityFileName" :key="index">{{item}}</div></div>
              <el-button size="small" @click="files(scope.row)" type="info">附件管理</el-button>
            </el-tooltip>
            <el-button style="margin-left: 0" v-show="scope.row.planActivityFileName==0" size="small" @click="files(scope.row)" >附件管理</el-button>
            <el-button size="small" @click="remove(scope.$index)" type="danger">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </br>
    <el-row >
      <el-col :span="10" :offset="10">
          <load-btn @listenSubEvent="noreleaseEvent" :btnData="loadBtn"></load-btn>
          <load-btn @listenSubEvent="releaseEvent" :btnData="releaseBtn"></load-btn>
          <el-button  @click="cancel">取消</el-button>
      </el-col>
    </el-row >
    <!--选择人员-->
    <Modal
      :mask-closable="false"
      width="890"
      v-model="hostModal"
      title="新建教学活动"
      class-name="vertical-center-modal"
     >
      <modal-header slot="header" :content="hostId"></modal-header>
      <select-user v-if="hostModal" @cancel="hostModal=false" :isOnlyOne="true" @setUsers="selectHostCallback" :initUser="selectUser"></select-user>
      <div slot="footer"></div>
    </Modal>
    <!--附件-->
    <Modal
      :mask-closable="false"
      width="890"
      v-model="uploadModal"
      title="新建教学活动"
      class-name="vertical-center-modal">
      <modal-header slot="header" :content="uploadId"></modal-header>
      <upload v-if="uploadModal" :fileList="fileList" @cancel="uploadModal=false" @upLoad="uploadCallback" :initUser="selectUser"></upload>
      <div slot="footer"></div>
    </Modal>
    <!--选择主持人-->
  </div>
</template>
<script>
  import rules from '../../rules';
  import selectUser from "../../../common/selectUser.vue"  //选择主持人
  import upload from './teachplan_uploadFile.vue' // 上传附件
  //当前组件引入全局的util
  let Util=null;
  export default {
      props:['operailityData','url'],
    data (){
      return{
        rules,
        //保存按钮基本信息
        loadBtn:{title:'提交',callParEvent:'listenSubEvent'},
        releaseBtn:{title:'提交并发布',callParEvent:'listenSubEvent'},
        //form表单bind数据
        formValidate: {
          "state":"NO_RELEASE",                      //RELEASE 或者 NO_RELEASE
          "activityPlanYear":this.operailityData.activityPlanYear,            //计划对应年份
          "activityPlanMonth":this.operailityData.activityPlanMonth,           //计划对应月份
          "activityPlanDepId":this.operailityData.activityPlanDepId,           //计划科室ID
          "activityPlanDepName":this.operailityData.activityPlanDepName,        //计划科室名称
          "activityDetails":[
            {
              "planActivityTitle":"",      //活动名称
              "planActivityType":"",       //活动类型
              "planActivityHostUserId":"", //主持人ID
               planActivityHost:[],
              "planActivityHostUserName":"",//主持人姓名
              "planActivityTime":"",        //活动时间(yyyy-MM-dd)
              "planActivityTimeids":[],     //活动时间段id(多个逗号分隔)
              "planActivitySite":"",        //活动地点
              "planActivityContent":"",     //活动内容
              "planActivityFileId":""  ,      //附件IDs
              "planActivityFileName":[] ,    //附件名字
              "planActivityFileList":[] ,     //附件列表
            }
          ]
        },
        fileList:[], //当前选中附件的数据
        selectUser:[],//当前选中选择人员的数据
        planActivityTypeData:[],  //获取的活动类型数据
        tableData:[],
        rowData :{},  //当前选择的是第几行
        hostModal:false,
        uploadModal:false,
        uploadId:{
          id:"uploadId",
          title:"附件管理",
        },
        hostId:{
          id:"hostId",
          title:"选择主持人",
        },
        //当前组件提交(add)数据时,ajax处理的 基础信息设置
        addMessTitle:{
          type:'add',
          successTitle:'添加成功!',
          errorTitle:'添加失败!',
          ajaxSuccess:'ajaxSuccess',
          ajaxError:'ajaxError',
          ajaxParams:{
            url:this.url.teachActivityPlanAdd,
            jsonString:true,
            method:'post',
            data:{},
          }
        },
        planActivityTypeMessTitle:{
          ajaxSuccess:'planActivityTypeSuccess',
          ajaxParams:{
            url:'/dictionary/getByCode/TEACH_ACTIVITY_TYPE',
            method:'get',
          }
        },

        timeIdsData:[],
        //获取活动时间段
        timeIdsMessTitle: {
          ajaxSuccess: 'timeIdsList',
          ajaxParams: {
            url: this.url.teachCourseTime,
            params: {},
          }
        },
      }
    },
    created(){
      //给当前组件注入全局util
      Util = this.$util;
      //请求教学活动类型数据
      this.ajax(this.planActivityTypeMessTitle)
      this.ajax(this.timeIdsMessTitle)
    },
    mounted(){
      //暂时没有初始化,预留初始化入口
    },
    methods:{

      //提交不发布
      noreleaseEvent(isLoadingFun){
      this.formValidate.state = 'NO_RELEASE';

        this.listenSubEvent(isLoadingFun);
      },

      //提交并发布
      releaseEvent(isLoadingFun){
        this.formValidate.state = 'RELEASE';
        this.listenSubEvent(isLoadingFun);
      },

      /*
       * 点击提交按钮 监听是否提交数据
       * @param isLoadingFun boolean  form表单验证是否通过
       * */
      listenSubEvent(isLoadingFun){
        let isSubmit = this.submitForm("formValidate");
        if(isSubmit){
          if(!isLoadingFun) isLoadingFun=function(){};
          if(this.formValidate.activityDetails==0){
              this.errorMess('计划列表不能为空');
              return;
          }
          let formValidate = this.getFormData(this.formValidate);
          this.addMessTitle.ajaxParams.data=this.conductListenData(formValidate);
          isLoadingFun(true);
          this.ajax(this.addMessTitle,isLoadingFun)
        }
      },

      //处理提交的数据
      conductListenData(data){
        let activityDetails = data.activityDetails;

        for(let i=0 ;i<activityDetails.length;i++){
            let item = activityDetails[i];
            item.planActivityTimeids = item.planActivityTimeids.join(',')  //处理时间段
            item.planActivityTime = this.yearMonthData(item.planActivityTime)  //处理时间段

        }
        return data;

      },

      /*
       * 点击提交按钮 监听是否验证通过
       * @param formName string  form表单v-model数据对象名称
       * @return flag boolean   form表单验证是否通过
       * */
      submitForm(formName){
        let flag = true;
        if(this.$refs[formName]){
          for(let i =0;i< this.$refs[formName].length; i++){
            this.$refs[formName][i].validate((valid) => {
              if(!valid) {
                flag= false;
              }
            });
          }
        }
        return flag;
      },


      //获取到的教学活动类型数据
      planActivityTypeSuccess(res){
        let data = res.data;
        if(!data) return;
        this.planActivityTypeData = data.child;

      },

      //获取活动时间段
      timeIdsList(res){
        let data = res.data;
        if(!data) return;
        this.timeIdsData = data;
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


      //某一行单元格被点击的时候
      rowclick(row,i,l){
        this.rowData = row;

      },

      //选择人员的回调函数
      selectHostCallback(data){
        this.rowData.planActivityHost = data
        let ids=[] ;
        let names=[];
        for(let i=0;i<data.length;i++){
          let item = data[i];
          ids.push(item.key);
          names.push(item.label);
        }
        this.rowData.planActivityHostUserName = names.join(',');
        this.rowData.planActivityHostUserId = ids.join(',');
        this.hostModal = false;
      },

      //附件回调
      uploadCallback(ids,names,file){
        this.rowData.planActivityFileId= ids;
        this.rowData.planActivityFileName= names;
        this.rowData.planActivityFileList= file;
      },


      openHost(item){
        this.selectUser = item.planActivityHost;
          //因为点击主持人的时候不赋值，所以重新赋值
          this.hostModal = true;
      },

      //点击文件管理按钮
      files(item){
        this.fileList = item.planActivityFileList;
        this.uploadModal = true
      },


      //点击删除
      remove(index){
        this.formValidate.activityDetails.splice(index,1)
      },

      //增加一行
      add(){

        this.formValidate.activityDetails.push({
          "planActivityTitle":"",      //活动名称
          "planActivityType":"",       //活动类型
          "planActivityHostUserId":"", //主持人ID
           planActivityHost:[],
          "planActivityHostUserName":"",//主持人姓名
          "planActivityTime":"",        //活动时间(yyyy-MM-dd)
          "planActivityTimeids":[],     //活动时间段id(多个逗号分隔)
          "planActivitySite":"",        //活动地点
          "planActivityContent":"",     //活动内容
          "planActivityFileId":""  ,      //附件IDs
          "planActivityFileName":[] ,    //附件名字
          "planActivityFileList":[] ,     //附件列表
        })
      },
    },

    components:{
      selectUser,upload
    }
  }
</script>

