<!----------------------------------
****--课程设置(setCurriculum)
****--@date     2017/6/17
****--@author   zyc<332533011@qq.com
----------------------------------->
<template>
  <div>
    <h2 style="text-align: center;padding: 10px 0;">{{operailityData.date}}课程安排</h2>
    <br />
    <el-table
      v-for="item in 1"
      :key="item"
      align="center"
      :data="course"
      tooltip-effect="dark"
      style="width: 100%">
      <el-table-column
        prop="timeStr"
        label="课时"
        width="120">
      </el-table-column>
      <el-table-column
        label="课程内容"
        align="center"
        width="160"
        class-name="valiTableStyle"
        show-overflow-tooltip>
        <template scope="scope">
          <el-form :model="{numberMust:scope.row.courseContent}" ref="f" :rules="setSyllabus"  label-width="0" style="display: inline-block">
            <el-form-item  prop="numberMust">
          <el-input v-model="scope.row.courseContent"></el-input>
            </el-form-item>
          </el-form>
        </template>
      </el-table-column>
      <el-table-column
        prop="classNum"
        label="课程类型"
        align="center"
        class-name="valiTableStyle"
        width="160">
        <template scope="scope">
          <el-form :model="{numberMust:scope.row.courseType}" ref="f" :rules="setSyllabus"  label-width="0" style="display: inline-block">
            <el-form-item  prop="numberMust">
          <el-select
            v-if="optionData.length>0"
            v-model="scope.row.courseType"
            :filterable="true"
            placeholder="选择科室"
            @change="change">
            <el-option
              v-for="item in optionData"
              :key="item.name"
              :label="item.name"
              :value="item.name">
            </el-option>
          </el-select>
            </el-form-item>
          </el-form>
        </template>
      </el-table-column>
      <el-table-column
        label="授课老师"
        align="center"
        class-name="valiTableStyle"
        show-overflow-tooltip>
        <template scope="scope">
          <el-form :model="{numberMust:scope.row.teachUserNames}" ref="f" :rules="setSyllabus"  label-width="0" style="display: inline-block">
            <el-form-item  prop="numberMust">
          <el-input readonly v-model="scope.row.teachUserNames" @focus="addUser(scope.$index)"></el-input>
            </el-form-item>
          </el-form>
        </template>
      </el-table-column>
      <el-table-column
        label="授课地点"
        align="center"
        class-name="valiTableStyle"
        width="160">
        <template scope="scope">
          <el-form :model="{numberMust:scope.row.courseAddress}" ref="f" :rules="setSyllabus"  label-width="0" style="display: inline-block">
            <el-form-item  prop="numberMust">
          <el-input v-model="scope.row.courseAddress"></el-input>
            </el-form-item>
          </el-form>
        </template>
      </el-table-column>

    </el-table>
    <br />
    <el-row >
      <el-col :span="24" style="text-align: center;">
        <load-btn @listenSubEvent="listenSubEvent" :btnData="loadBtn"></load-btn>
        <el-button  @click="cancel">取消</el-button>
      </el-col>
    </el-row >
    <!--选择人员-->
    <Modal
      width="890"
      v-model="selectUserModal"
      title="新建教学活动"
      class-name="vertical-center-modal">
      <modal-header slot="header" :content="selectUserId"></modal-header>
      <select-user v-if="selectUserModal" @cancel="closeUserModal" @setUsers="setUsers" :initUser="initUser"></select-user>
      <div slot="footer"></div>
    </Modal>
  </div>
</template>
<script>
  /*当前组件必要引入*/
  //引入当前组件字典api
  import api from "../api.js";
  //引入--验证--组件
  import {setSyllabus} from "../../rules";
  //当前组件引入全局的util
  let Util = null;
  export default{
    props:["operailityData"],
    data() {
      return {
        setSyllabus,
        //保存按钮基本信息
        loadBtn:{title:'提交',callParEvent:'listenSubEvent'},
        optionData:[{}],
        currSltUserName:"",
        course:[
          {
            /*"courseArrangeId":1,
            "room":"内科",
            "timeStr":"08:00-09:00",
            "courseContent":"课程内容",
            "courseType":"内二科",
            "teachUserIds":"",
            "teachUserNames":"",
            "courseAddress":"三楼会议室",
            "timeType":0,
            "timeRecordId":1,
            "timeId":2,
            "whetherArrangedCourse":1,
            "weekSetId":this.operailityData.weekSetId,
            "recordId":1*/
          }
        ],

        //请求科室列表
        getDepTitle:{
          ajaxSuccess:'CourseType',
          ajaxParams:{
            url: api.getCourseTypeByCode.path,
            params:{}
          }
        },
        //教研室设置时间添加
        saveCoursetimeTitle:{
          type:'add',
          successTitle:'添加成功!',
          errorTitle:'添加失败!',
          ajaxError:'ajaxError',
          ajaxParams:{
            url: api.courseTime.path,
            method:api.courseTime.method,
          }
        },


        //选择人员
        selectUserId:{
          id:"selectUserId",
          title:"选择人员",
          usersData:''
        },

        //给选择人员框传递的已选人员信息
        initUser:[],


        //获取课程
        getMyTeachRoomCourseTitle:{
          ajaxSuccess:'getMyTeachRoomCourse',
          ajaxParams:{
            url: api.getMyTeachRoomCourse.path,
            method:api.getMyTeachRoomCourse.method,
            params:{
              courseTime:this.operailityData.date,
              weekSetId:this.operailityData.weekSetId,
            }
          }
        },

        //教研室设置时间添加
        saveRoomCourseTitle:{
          type:'add',
          successTitle:'添加成功!',
          errorTitle:'添加失败!',
          ajaxError:'ajaxError',
          ajaxParams:{
            url: api.weekCourseModify.path,
            method:api.weekCourseModify.method,
            jsonString:true,
          }
        },

      }
    },
    methods: {
      //初始化请求列表数据
      init(){
        Util = this.$util;
        //获取科室option数据
        this.ajax(this.getDepTitle);
      },


      //获取server端课程信息
      getMyTeachRoomCourse(responseData){
        let data = responseData.data;
        for(var i=0,item;i<data.length;i++){
          item = data[i];
          item["weekSetId"] = this.operailityData.weekSetId;
          item["recordId"] =  item["timeRecordId"];
        }
        this.course = data;

      },


      //获取server端返回的科室
      CourseType(responseData){
        let data = responseData.data;
        if(!Util.isEmptyObject(data)){
          this.optionData = data.child;
        }
        this.ajax(this.getMyTeachRoomCourseTitle);
      },


      //添加人员
      addUser(itmeName){
        this.currSltUserName = itmeName;
        this.initUser=[];

        if(this.course[this.currSltUserName]!="") {

          let teachUserNames = this.course[this.currSltUserName]["teachUserNames"]+"";
          let teachUserIds = this.course[this.currSltUserName]["teachUserIds"];
          if(teachUserNames.indexOf(",")>-1){
            let names = teachUserNames.split(",");
            let ids = teachUserIds.split(",");

            for(var i=0;i<names.length;i++){
              if(names[i]!=""){
                this.initUser.push({
                  key:ids[i],
                  label:names[i],
                  description: '人员id---' + ids[i] + '的描述信息',
                  disabled: false
                })
              }
            }
          }else{
            this.initUser.push({
              key:teachUserIds,
              label:teachUserNames,
              description: '人员id---' + teachUserIds + '的描述信息',
              disabled: false
            })
          }
          if(!this.course[this.currSltUserName]["teachUserNames"]) {
            this.initUser = [];
          };
        }
        this.openModel('selectUser');
      },


      //关闭选择人员弹窗
      closeUserModal(){
        this.selectUserModal = false;
      },


      /*
       * 获取选择人员的人员信息并赋值
       * @param users [{id:'',name:''},{}]  已选人员信息
       * */
      setUsers(users){
        let namesArr = [];
        let idsArr = [];
        for(var i=0;i<users.length;i++){
          namesArr.push(users[i].label);
          idsArr.push(users[i].key);
        }
        this.course[this.currSltUserName]["teachUserIds"] = idsArr.join(",");
        this.course[this.currSltUserName]["teachUserNames"] = namesArr.join(",");
        this.closeUserModal();
      },


      /*
       * 点击提交按钮 监听是否提交数据
       * @param isLoadingFun boolean  form表单验证是否通过
       * */
      listenSubEvent(isLoadingFun){
        let isSubmit = this.submitForm();
        if (!isLoadingFun) isLoadingFun = function () {};
        if(isSubmit) {
          isLoadingFun(true);
          this.saveRoomCourseTitle.ajaxParams.data = this.getFormData(this.course);
          this.ajax(this.saveRoomCourseTitle, isLoadingFun);
        }
      },


      /*
       * 点击提交按钮 监听是否验证通过
       * @param formName string  form表单v-model数据对象名称
       * @return flag boolean   form表单验证是否通过
       * */
      submitForm(formName){
        let flag = true;
        for(let i =0;i< this.$refs.f.length; i++){
          this.$refs.f[i].validate((valid) => {
            if(!valid) {
              flag= false;
            }
          });
        }
        return flag;
      },


      //选中值发生变化时触发
      change(val){

      },


      /*
       * 当前组件发送事件给父组件
       * 发送关闭(cancel)模态事件给父组件,请求关闭当前模态窗
       * */
      cancel(){
        this.$emit('cancel','add');
      },


      /*
       * 打开指定的模态窗体
       * @param options string 当前指定的模态:"add"、"edit"
       * */
      openModel(options){
        this[options+'Modal'] = true;
      },


      /*
       * 获取表单数据
       * @return string  格式:id=0&name=aa
       * */
      getFormData(data){
        let myData = Util._.defaultsDeep([],data);
        return myData;
      },
    },
    created(){
      this.init();
    },
    mounted(){
    },
    components: {}
  }
</script>

