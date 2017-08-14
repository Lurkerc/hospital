<!----------------------------------
****--课程设置(setCurriculum)
****--@date     2017/6/14
****--@author   zyc<332533011@qq.com
----------------------------------->
<template>
  <div>
    <h2 style="text-align: center;padding: 10px 0;">{{operailityData.date}}课程设置</h2>
    <br />
    <el-row>
      <el-col :span="12" :push="index%2==0?3:0" v-if="course.length>0" v-for="(item,index) in course" :key="index" style="padding: 10px 0;">
        {{item.courseTime}}
        <el-select
          v-if="optionData.length>0"
          v-model="item.sltTimeId"
          :filterable="true"
          placeholder="选择科室"
          @change="change">
          <el-option
            v-for="item in optionData"
            :key="item.id"
            :label="item.name"
            :value="item.id">
          </el-option>
        </el-select>
      </el-col>
    </el-row >
    <br />
    <el-row >
      <el-col :span="24" style="text-align: center;">
        <load-btn @listenSubEvent="listenSubEvent" :btnData="loadBtn"></load-btn>
        <el-button  @click="cancel">取消</el-button>
      </el-col>
    </el-row >
  </div>
</template>
<script>
  /*当前组件必要引入*/
  //引入当前组件字典api
  import api from "../api.js";
  //当前组件引入全局的util
  let Util = null;
  export default{
    props:["operailityData"],
    data() {
      return {
        //保存按钮基本信息
        loadBtn:{title:'提交',callParEvent:'listenSubEvent'},
        optionData:[{}],
        formValidate:{
          weekSetId:this.operailityData.weekSetId, //周历ID
          courseTime:this.operailityData.date,   //课程时间(yyyy-MM-dd)
          timeRecords:"",  //课程时间段(逗号分隔)  时间段ID
          teachRoomDepId:"",  //大科室ID(逗号分隔)
        },
        times:[
          /*{
            "timeId":"1",
            "courseTime":"08:00-08:50",
            "courseIndex":"1",
            "courseType":"0"
          }*/
        ],
        saveMess:{

        },
        //课程教研室设置ID
        dayCourse:[],
        course:[
          /*{
            "timeId":"1",
            "courseTime":"08:00-08:50",
            "courseIndex":"1",
            "courseType":"0"
          }*/
        ],
        //获取时间段设置
        getTimesTitle:{
          ajaxSuccess:'getTimeData',
          ajaxParams:{
            url: api.teachCourseTime.path,
            params:{}
          }
        },
        //请求科室列表
        getDepTitle:{
          ajaxSuccess:'getDepData',
          ajaxParams:{
            url: api.depOption.path,
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

        //根据教学周历ID和时间获取一天的教学安排
        getDayCourseSetTitle:{
          ajaxSuccess:'getDayCourseData',
          ajaxParams:{
            url: api.dayCourseSet.path+"/"+this.operailityData.weekSetId,
            params:{
              dateTime:this.operailityData.date
            }
          }
        },

        //教研室设置时间修改
        courseTimeModifyTitle:{
          type:'add',
          successTitle:'修改成功!',
          errorTitle:'修改失败!',
          ajaxError:'ajaxError',
          ajaxParams:{
            url: api.courseTimeModify.path,
            method:api.courseTimeModify.method,
            data:{
              recordIds:"",
              timeRecords:"",
              teachRoomDepId:""
            }
          }
        }
      }
    },
    methods: {
      //初始化请求列表数据
      init(){
        Util = this.$util;
        //获取科室option数据
        setTimeout(()=>{
          this.ajax(this.getDepTitle);
        },1)
        //获取时间课程设置时间
        setTimeout(()=>{
          this.ajax(this.getTimesTitle);
        },10)

      },


      //从server端获取当天是否已有课程设置
      getDayCourseData(responseData){
        let data = responseData.data;
        if(data.length>0){
          this.dayCourse = data;
          let tempArr = [];
          let recordIds = [];
          for(var i=0,item;i<data.length;i++){
            item = data[i];
            tempArr.push(item.timeId);
          }


          for(var k=0,item;k<this.course.length;k++){
            item = this.course[k];
            let recordId = "";
            for(var i=0;i<data.length;i++){
              if(item["timeId"] == data[i]["timeId"]){
                item.sltTimeId = parseInt(data[i]["courseTeachingResearchRoom"]);
                recordId = parseInt(data[i]["id"]);
                break;
              }
            }
            if(recordId!=""){
              recordIds.push(recordId);
            }else{
              recordIds.push(null);
            }
          }
          this.formValidate.timeRecords = tempArr.join(",");
          this.formValidate.recordIds = recordIds.join(",");

        }
      },


      /*
       * 点击提交按钮 监听是否提交数据
       * @param isLoadingFun boolean  form表单验证是否通过
       * */
      listenSubEvent(isLoadingFun){
        let tempArr = [];
        for(var i=0,item;i<this.course.length;i++){
          item = this.course[i];
          if(item.sltTimeId!=""){
            tempArr.push(item.sltTimeId)
          }
        }
        if(tempArr.length==0){
          this.showMess("至少要选择一个科室!");
          return;
        }
        if (!isLoadingFun) isLoadingFun = function () {};
        isLoadingFun(true);
        if(this.dayCourse.length==0){
          this.saveCoursetimeTitle.ajaxParams.data = this.getFormData(this.formValidate);
          this.ajax(this.saveCoursetimeTitle,isLoadingFun);
        }else{
          this.courseTimeModifyTitle.ajaxParams.data = this.getFormData(this.formValidate);
          this.ajax(this.courseTimeModifyTitle,isLoadingFun);
        }
      },


      getTimeData(responseData){
        let data =  responseData.data
        let tempArr = [];
        for(var i=0,item;i<data.length;i++){
          item = data[i];
          item.sltTimeId = "";
          tempArr.push(item.timeId);
        }
        this.formValidate.timeRecords = tempArr.join(",");
        this.course = data;
        //获取选中的天是否已有课程设置(修改用)根据  data 中[dayCourse]长度在判断是否为修改
        setTimeout(()=>{
          this.ajax(this.getDayCourseSetTitle);
        },20)
      },


      //获取server端返回的科室
      getDepData(responseData){
        let data = responseData.data;
        this.optionData = data;
      },


      /*
       * 获取表单数据
       * @return string  格式:id=0&name=aa
       * */
      getFormData(data){
        let myData = Util._.defaultsDeep({},data);
        let tempArr = [];
        let timeRecords = [];
        for(var i=0,item;i<this.course.length;i++){
           item = this.course[i];
          tempArr.push(item.sltTimeId);
          if(item.sltTimeId!=""){
            timeRecords.push(i+1);
          }else{
            timeRecords.push(null);
          }
        }
        myData.timeRecords = timeRecords.join(",");
        myData.teachRoomDepId = tempArr.join(",");
        return myData;
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
    },
    created(){
      this.init();
    },
    mounted(){
    },
    components: {}
  }
</script>

