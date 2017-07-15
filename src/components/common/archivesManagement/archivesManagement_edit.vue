<!--修改-->
<!--档案查看-->
<template>
  <div>
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="基本情况" name="first">
        <!-- 基本情况-->
        <keep-alive>
        <basic @edit="subCallback" @setSaveData="setSaveData" :operailityData="operailityData" :initData="archivesMess.archivesBasicInfoDto" :fromWhere="'archives'" v-if="currentView==0"></basic>
        </keep-alive>
      </el-tab-pane>
      <el-tab-pane label="学历信息" name="second">
        <keep-alive>
        <education @edit="subCallback" @setSaveData="setSaveData" :data-id="operailityData.id" :initData="archivesMess.archivesEduInfoDtoList" v-if="currentView==1"></education>
        </keep-alive>
      </el-tab-pane>
      <el-tab-pane label="工作经历" name="third">
        <!--   工作经历-->
        <keep-alive>
        <work-experience @edit="subCallback" @setSaveData="setSaveData" :data-id="operailityData.id" :initData="archivesMess.archivesWorkRecordInfoDtoList" v-if="currentView==2"></work-experience>
        </keep-alive>
      </el-tab-pane>
      <el-tab-pane label="专业技术职称晋升情况" name="fourth">
        <!-- 专业技术职称晋升情况-->
        <keep-alive>
        <professional-skill @edit="subCallback" @setSaveData="setSaveData" :data-id="operailityData.id" :initData="archivesMess.archivesPromotionInfoDtoList" v-if="currentView==3"></professional-skill>
        </keep-alive>
      </el-tab-pane>
      <el-tab-pane label="资格证书取得情况" name="five">
        <!-- 资格证书取得情况-->
        <keep-alive>
        <credentials @edit="subCallback" @setSaveData="setSaveData" :data-id="operailityData.id" :initData="archivesMess.archivesQualifiedInfoDtoList" v-if="currentView==4"></credentials>
        </keep-alive>
      </el-tab-pane>
      <el-tab-pane label="教学经历" name="six">
        <!--教学经历-->
        <keep-alive>
        <teaching-experience @edit="subCallback" @setSaveData="setSaveData" :data-id="operailityData.id" :initData="archivesMess.archivesTeachRecordDto" v-if="currentView==5"></teaching-experience>
        </keep-alive>
      </el-tab-pane>
      <el-tab-pane label="学习培训情况" name="seven">
        <!--学习培训情况-->
        <keep-alive>
        <study @edit="subCallback" @setSaveData="setSaveData" :data-id="operailityData.id" :initData="archivesMess.archivesTrainInfoDtoList" v-if="currentView==6"></study>
        </keep-alive>
      </el-tab-pane>
      <el-tab-pane label="培训考试、考核情况" name="eight">
        <!--培训考试、考核情况-->
        <keep-alive>
        <train @edit="subCallback" @setSaveData="setSaveData" :data-id="operailityData.id" :initData="archivesMess.archivesTrainExamInfoDtoList" v-if="currentView==7"></train>
        </keep-alive>
      </el-tab-pane>
      <el-tab-pane label="获奖情况" name="nine">
        <!--获奖情况-->
        <keep-alive>
        <awards @edit="subCallback" @setSaveData="setSaveData" :data-id="operailityData.id" :initData="archivesMess.archivesPrizeInfoDtoList" v-if="currentView==8"></awards>
        </keep-alive>
      </el-tab-pane>
      <el-tab-pane label="科研信息" name="ten">
        <!--科研信息-->
        <keep-alive>
        <scientific @edit="subCallback" @setSaveData="setSaveData" :data-id="operailityData.id" :initData="archivesMess.archivesScientificDto" v-if="currentView==9"></scientific>
        </keep-alive>
      </el-tab-pane>
      <el-tab-pane label="证件复印件" name="eleven">
        <!--证件复印件-->
        <keep-alive>
        <papers @edit="subCallback" @setSaveData="setSaveData" :data-id="operailityData.id" :initData="archivesMess.archivesFilesDtoList" v-if="currentView==10"></papers>
        </keep-alive>
      </el-tab-pane>
    </el-tabs>
    <div style="font-size: 1px;overflow: hidden;line-height: 1;border-top:1px solid #e3e8ee;margin: 12px 0;"></div>
    <el-row>
      <el-col :span="9" :offset="10">
        <load-btn @listenSubEvent="listenSubEvent" :btnData="loadBtn"></load-btn>
        <el-button  @click="cancel">取消</el-button>
      </el-col>
    </el-row >
  </div>
</template>
<script>
  /*引入查看的子组件*/
  //  引入--基本情况--组件
  import basic from './archivesManagement_edit/archivesManagement_edit_basic.vue';
  //  引入--学历信息--组件
  import education from './archivesManagement_edit/archivesManagement_edit_education.vue';
  //  引入--工作经历--组件
  import workExperience from './archivesManagement_edit/archivesManagement_edit_workExperience.vue';
  //  引入--专业技术职称晋升情况--组件
  import professionalSkill from './archivesManagement_edit/archivesManagement_edit_professionalSkill.vue';
  //  引入--资格证书取得情况--组件
  import credentials from './archivesManagement_edit/archivesManagement_edit_credentials.vue';
  //  引入--教学经历--组件
  import teachingExperience from './archivesManagement_edit/archivesManagement_edit_teachingExperience.vue';
  //  引入--学习培训情况--组件
  import study from './archivesManagement_edit/archivesManagement_edit_study.vue';
  //  引入--培训考试、考核情况--组件
  import train from './archivesManagement_edit/archivesManagement_edit_train.vue';
  //  引入--获奖情况--组件
  import awards from './archivesManagement_edit/archivesManagement_edit_awards.vue';
  //  引入--科研信息--组件
  import scientific from './archivesManagement_edit/archivesManagement_edit_scientific.vue';
  //  引入--证件复印件--组件
  import papers from './archivesManagement_edit/archivesManagement_edit_papers.vue';
  let Util = null;
  export default {
    props:['operailityData'],
    data() {
      return {
        currentView: 0,
        activeName: 'first',
        //保存按钮基本信息
        loadBtn:{title:'上报审核',callParEvent:'listenSubEvent'},

        //临时存储当前标签的保存的数据
        tempData:{},

        //当前标签保存key值存储
        labSaveDataKey:["archivesBasicInfoDto","archivesEduInfoDtoList",
          "archivesWorkRecordInfoDtoList","archivesPromotionInfoDtoList",
          "archivesQualifiedInfoDtoList","archivesTeachRecordDto",
          "archivesTrainInfoDtoList","archivesTrainExamInfoDtoList",
          "archivesPrizeInfoDtoList","archivesScientificDto",
          "archivesFilesDtoList",
        ],

        //所有档案信息存储
        archivesMess:{
          //archivesBasicInfoDto:{"id":12557,"deptId":64,"name":"张永超","sex":"boy","nation":"汉族","birth":null,"origin":null,"political":null,"highestEdu":null,"specialty":"12","schoolId":null,"school":null,"jobTime":201707,"grade":"321","classNum":"32","length":"23","duties":"32","doctor":"1","doctorLevel":null,"idNumber":"130434198410127014","mobile":"13266666666","emgContact":null,"emgContactMobile":null,"qq":null,"email":"44@qq.com","telephone":null,"address":null,"postCode":null,"headPhoto":"static/img/2017/07/12/20170712210024794.JPG","createTime":1499864426903,"updateTime":1499864426903,"auditStatus":"AUDIT_SUCCESS","enable":1,"archivesAuditStatus":"NOT_AUDIT","studentTypes":"PTYH"},           //基本信息
          archivesBasicInfoDto:"",           //基本信息
          archivesEduInfoDtoList:"",         //学历信息
          archivesWorkRecordInfoDtoList:"",  //工作经历
          archivesPromotionInfoDtoList:"",   //专业技术职称晋升情况
          archivesQualifiedInfoDtoList:"",   //资格证书取得情况(如医师资格证书、医师执业证书等)
          archivesTeachRecordDto:"",         //教学经历
          archivesTrainInfoDtoList:"",       //学习培训过情况
          archivesTrainExamInfoDtoList:"",   //培训考试，考核情况
          archivesPrizeInfoDtoList:"",       //获奖情况
          archivesScientificDto:"",          //科研信息
          archivesFilesDtoList:"",           //证件复印件
        },

        getAllArchivesMessTitle:{
          ajaxSuccess:'updateListData',
          ajaxParams:{
            url:'/archives/get/all-by-self',
          }
        },


        //当前组件提交(eidt)数据时,ajax处理的 基础信息设置
        subAllArchivesMessTitle:{
          type:'edit',
          successTitle:'修改成功!',
          errorTitle:'修改失败!',
          ajaxSuccess:'ajaxSuccess',
          ajaxError:'ajaxError',
          ajaxParams:{
            url:'/archives/save/all-by-self',
            method:'post',
            jsonString:true
          }
        },
      };
    },
    methods: {
      /*
       * 组件初始化入口
       * */
      init(){
        //默认请求加载数据
        this.ajax(this.getAllArchivesMessTitle);
      },


      //通过get请求列表数据
      updateListData(responseData){
        let data = responseData.data;
        if(!Util.isEmptyObject(data)){
          this.archivesMess=data;
        }
      },


      /*
       * 点击提交按钮 监听是否提交数据
       * @param isLoadingFun boolean  form表单验证是否通过
       * */
      listenSubEvent(isLoadingFun){
        if (!isLoadingFun) isLoadingFun = function () {};
        isLoadingFun(true);
        this.editMessTitle.ajaxParams.data = this.getFormData(this.archivesMess);
        this.ajax(this.editMessTitle, isLoadingFun);
      },


      handleClick(tab, event) {
          this.currentView = tab["index"];
      },


      /*
       * 获取表单数据
       * @return string  格式:id=0&name=aa
       * */
      getFormData(data){
        let myData = Util._.defaultsDeep({},data);
        return myData;
      },


      /**
       * 保存从单个标签中需要审核的内容
       * @param type {string}  保存的为当前哪个标签
       * @param val {Object}   保存的数据对象
       *
       * */
      setSaveData(val){
        this.tempData = val;
      },


      /*
       * 监听子组件通讯的方法
       * 作用:ajax请求成功回调,该监听方法在libs/util 中的混合模式下定义回调
       * @param targer string example:"add"、"edit"
       * @param targer string 提示返回的ajax回调返回的信息改信息在对应的子组件中定义
       * 例如:errorTitle、errorTitle
       *addMessTitle:{
       *    type:'add',
       *    successTitle:'添加成功!',
       *    errorTitle:'添加失败!',
       *    ajaxSuccess:'ajaxSuccess',
       *    ajaxError:'ajaxError',
       *    ajaxParams:{
       *      url:'/role/add',
       *      method:'post'
       *    }
       *    }
       * @param udata boolean 默认false  是否不需要刷新当前表格数据
       * */
      subCallback(target,title,updata){
        // let key = this.labSaveDataKey[this.currentView];
        // this.archivesMess[key] = this.tempData;
        //
      },


      /*
       * 当前组件发送事件给父组件
       * 发送关闭(cancel)模态事件给父组件,请求关闭当前模态窗
       * */
      cancel(){
        this.$emit('cancel','edit');
      },

    },
    created(){
      //给当前组件注入全局util
      Util = this.$util;
      this.init();
    },
    components:{
      basic,
      education,
      workExperience,
      professionalSkill,
      credentials,
      teachingExperience,
      study,
      train,
      awards,
      scientific,
      papers
    }
  };
</script>

