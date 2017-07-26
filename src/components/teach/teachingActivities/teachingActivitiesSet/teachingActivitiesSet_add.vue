<template>
  <div>
    <!--:rules="rules.teachingActivitiesSet"-->
  <el-form :model="formValidate" ref="formValidate" :rules="rules.teachingActivitiesSet"  label-width="100px">
    <el-row>
      <el-col :span="12">
          <el-form-item label="活动名称" prop="activityName">
            <el-input v-model="formValidate.activityName"></el-input>
          </el-form-item>
          <el-form-item label="主持人" prop="hostUserName">
            <el-input @focus="openAndColseHost('host')" v-model="formValidate.hostUserName" ></el-input>
          </el-form-item>
          <el-form-item label="活动时间" prop="activityTime">
            <el-date-picker type="date"  :editable="false" placeholder="选择日期"  v-model="formValidate.activityTime" style="width: 100%;"></el-date-picker>
          </el-form-item>
      </el-col>
      <el-col :span="12">
          <el-form-item label="类型" prop="activityType">
            <el-select v-model="formValidate.activityType"  placeholder="请选择" >
              <select-option :unAll="true" :id="'value'" :isCode="true" :type="'teachActivityType'"></select-option>
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="科室" prop="depId">
            <el-select  v-model="formValidate.depId" placeholder="请选择">
              <select-option :unAll="true"></select-option>
            </el-select>
          </el-form-item>

          <el-form-item label="活动地点" prop="activitySite">
            <el-input v-model="formValidate.activitySite"></el-input>
          </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24">
        <el-form-item label="时间段" prop="recordTimes">
            <el-checkbox-group v-model="formValidate.recordTimes">
              <el-checkbox v-for="(item,index) in getRecordTimes" :key="index" :label="item.courseTime+'/'+item.timeId" >{{item.courseTime}}</el-checkbox>
            </el-checkbox-group>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="12">
        <el-form-item label="病例" prop="whetherNeedCases">
          <el-radio-group v-model="formValidate.whetherNeedCases">
            <el-radio :label="'YES'">需要</el-radio>
            <el-radio :label="'NO'">不需要</el-radio>
          </el-radio-group>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="病例名称" prop="name7" v-show="formValidate.whetherNeedCases=='YES'">
          <el-input v-model="formValidate.casesName" ></el-input>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24">
        <el-form-item label="活动内容" prop="name8">
          <div class="grid-content">
            <el-input type="textarea" :rows="6" resize="none" v-model="formValidate.activityContent"></el-input>
          </div>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24">
        <el-form-item label="参加人" prop="name9">
          <el-radio-group v-model="formValidate.activityUserType" >
            <el-row>
              <el-col :span="24">
                <div class="grid-content-ptop">
                  <el-radio :label="'ROTARYDEP'">轮转科室</el-radio>
                  <el-select v-show="formValidate.activityUserType=='ROTARYDEP'" v-model="rotarydep.activityUserTypeValue" multiple placeholder="请选择" >
                    <select-option :unAll="true"></select-option>
                  </el-select>
                <div v-show="formValidate.activityUserType=='ROTARYDEP'" style="display:inline-block;width: 100px;font-size:14px;text-align: right">人员类型:</div>
                  <el-select v-show="formValidate.activityUserType=='ROTARYDEP'" v-model="formValidate.activityDepUserType" clearable placeholder="请选择">
                    <el-option label="实习生" value="SXS"></el-option>
                    <el-option label="进修生" value="JXS"></el-option>
                    <el-option label="住院医" value="ZYY"></el-option>
                    <el-option label="研究生" value="YJS"></el-option>
                  </el-select>
                </div>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="24">
                <div class="grid-content-ptop">
                  <el-radio :label="'PARTUSER'">部分人员</el-radio>
                    <el-select style="margin-left: 10px" v-show="formValidate.activityUserType == 'PARTUSER'" placeholder multiple v-model="partuser.activityUserTypeValue" filterable placeholder="请选择">
                      <el-option
                        v-for="item in options"
                        :key="item.id"
                        :label="item.label"
                        :value="item.value">
                      </el-option>
                    </el-select>
                    <el-button v-show="formValidate.activityUserType=='PARTUSER'" @click="openAndColseUser('selectUser')">选择人员</el-button>
                </div>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="24">
                <div class="grid-content-ptop">
                  <el-radio :label="'PARTROLE'">指定角色</el-radio>
                  <template>
                    <el-select style="margin-left: 10px" v-show="formValidate.activityUserType=='PARTROLE'" v-model="partrole.activityUserTypeValue" multiple filterable placeholder="请选择">
                      <select-option :type="'role'" :unAll="true"></select-option>
                    </el-select>
                  </template>
                </div>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="24">
                <div class="grid-content-ptop"><el-radio :label="'ALLUSER'">所有人</el-radio></div>
              </el-col>
            </el-row>
          </el-radio-group>
        </el-form-item>
      </el-col>
    </el-row>
    <el-form-item>
      <load-btn @listenSubEvent="listenSubEvent" :btnData="loadBtn"></load-btn>
      <el-button  @click="cancel">取消</el-button>
    </el-form-item>
  </el-form>
    <!--选择人员-->
    <Modal
      width="890"
      v-model="selectUserModal"
      title="新建教学活动"
      class-name="vertical-center-modal"
      :loading="loading">
      <modal-header slot="header" :content="selectUserId"></modal-header>
      <select-user v-if="selectUserModal" @cancel="openAndColseHost('selectUser',false)" @setUsers="selectUserCallback" :initUser="selectUser"></select-user>
      <div slot="footer"></div>
    </Modal>
    <!--选择主持人-->
    <Modal
      width="890"
      v-model="hostModal"
      title="新建教学活动"
      class-name="vertical-center-modal"
      :loading="loading">
      <modal-header slot="header" :content="hostId"></modal-header>
      <select-user v-if="hostModal" @cancel="openAndColseHost('host',false)"  @setUsers="selectHostCallback" :isOnlyOne="true" :initUser="selectHost"></select-user>
      <div slot="footer"></div>
    </Modal>
  </div>
</template>
<style>

</style>
<script>
  import selectUser from "../../../common/selectUser.vue"
  //当前组件引入全局的util
  let Util=null;
  export default {
      props:['url','rules'],
    data() {
      return {
        selectHost:[],
        selectUser:[],
        //保存按钮基本信息
        loadBtn:{title:'提交',callParEvent:'listenSubEvent'},
        operailityData:'',
        countDate:0,
        options: [],

        "formValidate":{
          "depId":'',
          "activityName":"",
          "activityType":"",
          "hostUserId":'',
          "hostUserName":"",
          "activityTime":"",
          "activitySite":"",
          "activityUser":"",
          "whetherNeedCases":"YES",
          "casesName":"",
          "activityContent":"",
          "activityUserType":"ALLUSER",
          "activityUserTypeValue":",",
          "activityDepUserType":"",
          "shouldUserCount":'',
          "actuallyUserCount":'',
          "timeIds":"",
          "recordTimes":[],
          "activityState":"",
        },
        getRecordTimes:'', //获取到的时间段
        //轮转科室
        rotarydep:{
          activityUserTypeValue:'',
        },
        //部分人员
        partuser:{
          activityUserTypeValue:[],
          activityUserTypeValueId:[]
        },
        //部分角色
        partrole:{
          activityUserTypeValue:'',
        },
        radio2:3,
        loading:true,

        //查看
        addmodal: false,
        hostModal:false,
        //轮转科室
        lzDep:true,
        //部分人员控制
        partPer:true,
        //指定人员控制
        designatedPer:false,
        //当前组件提交(add)数据时,ajax处理的 基础信息设置
        addMessTitle:{
          type:'add',
          successTitle:'添加成功!',
          errorTitle:'添加失败!',
          ajaxSuccess:'ajaxSuccess',
          ajaxError:'ajaxError',
          ajaxParams:{
            url:this.url.teachctivityAdd,
            method:'post'
          }
        },
        //选择人员
        selectUserModal:false,
        selectUserId:{
            id:"selectUserId",
            title:"选择人员",
            usersData:''
        },
        hostId:{
            id:"hostId",
            title:"选择主持人",
            usersData:''
        },

        //当前组件默认请求(头部)数据时,ajax处理的 基础信息设置
       timeListMessTitle: {
          ajaxSuccess: 'updateHeaderList',
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
    },
    mounted(){
      //暂时没有初始化,预留初始化入口
      //this.init();
      this.ajax(this.timeListMessTitle)
    },
    methods: {
      //点击选择人员按钮触发
      openAndColseUser(targer,flag){
        if(typeof flag == "undefined") flag = true;
        this[targer+'Modal'] = flag;
      },

      //获取时间段
      updateHeaderList(res){
          let data = res.data;
          if(!data)return;
         this.getRecordTimes = data

      },
      //点击选择人员按钮触发
      openAndColseHost(targer,flag){
        if(typeof flag == "undefined") flag = true;
        this[targer+'Modal'] = flag;
      },
      //轮转科室
      lzksSlt1(){
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
          this.addMessTitle.ajaxParams.data=this.disposeData(this.getFormData(this.formValidate));
          this.ajax(this.addMessTitle,isLoadingFun);
        }
      },


      //处理提交的数据
      disposeData(data){
        //activityUserType
        let activityUserType = data.activityUserType.toLowerCase();
        if(activityUserType=='alluser'){
          data.activityUserTypeValue = '';
          data.activityDepUserType =''
        }else if(activityUserType == 'partuser'){
          let Value;
            Value = this[activityUserType].activityUserTypeValueId.join(',');
          data.activityUserTypeValue =Value|| this[activityUserType].activityUserTypeValueId;
        }else{
          if(activityUserType!='rotarydep') data.activityDepUserType ='';
          let Value;
          if(typeof this[activityUserType].activityUserTypeValue=='object'){
            Value =this[activityUserType].activityUserTypeValue.join(',');
          }
          data.activityUserTypeValue =Value|| this[activityUserType].activityUserTypeValue;
        }
        //处理whetherNeedCases
        if(data.whetherNeedCases=='NO'){
          data.casesName='';
        }

        //处理recordTimes，timeIds
        let times=[];
        let ids = [];
        for (let i=0;i<data.recordTimes.length;i++){
          let val = data.recordTimes[i].split('/');
          ids.push(val[1]);
          times.push(val[0]);
        }
        data.recordTimes = times.join(',');
        data.timeIds = ids.join(',');
        this.formDate(data,['activityTime']);
          return data
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
      //添加
      setParticipant(v){
        this.lzDep = false;
        this.partPer=false;
        this.designatedPer=false;
        if(v=='rotarydep'){
          this.lzDep=true;
        }
        if(v=='partuser'){
          this.partPer=true;
        }
        if(v=='partrole'){
          this.designatedPer=true;
        }
      },
      /*
       * 默认组件第一次请求数据
       * @param res JSON  数据请求成功后返回的数据
       * 注:当前为添加页面暂时未用到,属于预留
       * */
      oneDataSuccess(res){
        /*let responseData = res.data;
         if(this.$util._.isObject(responseData["status"])&&responseData["status"]["code"]==0) {
         let type = [];
         let data = responseData.data;
         type.push(data.type+"");
         this.formValidate = data;
         this.formValidate.type = type;
         }*/
      },
      /*
       * 当前组件发送事件给父组件
       * 发送关闭(cancel)模态事件给父组件,请求关闭当前模态窗
       * */
      cancel(){
        this.$emit('cancel','add');
      },
      selectUserCallback(data){
        this.selectUser = data;
        let users=[];
        let userIds=[];
        for(let i=0;i<data.length;i++){
          userIds.push(data[i].key) ;
          users.push(data[i].label) ;
        }
        this.formValidate.activityUserTypeValue = userIds;
        this.partuser.activityUserTypeValue =users;
        this.partuser.activityUserTypeValueId =userIds;
        this.openAndColseHost('selectUser',false)


      },
      selectHostCallback(data){
        this.selectHost = data;
        this.formValidate.hostUserId = data[0].key;
        this.formValidate.hostUserName = data[0].label;
        this.openAndColseHost('host',false)

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

      //选择科室
      selectDpeID(val){
          this.formValidate.depId= val;
      }
    },
    components:{
      selectUser
    }
  }
</script>
