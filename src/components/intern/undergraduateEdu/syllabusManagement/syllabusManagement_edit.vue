<!----------------------------------
****--课程表管理-修改(syllabusManagement_edit)
****--@date     2017/6/17
****--@author   zyc<332533011@qq.com
----------------------------------->
<template>
  <div>

    <div class="newCalendar" v-if="stepMaker=='third'">
      <el-row :gutter="10">
        <el-col :span="3"><div class="cal-schoolTit" style="text-align: right;">学校名称:</div></el-col>
        <el-col :span="20">
          <div class="cal-schoolTit">{{formValidate.schoolName}}</div>
        </el-col>
      </el-row>
      <el-row :gutter="10">
        <el-col :span="3">&nbsp;</el-col>
        <el-col :span="20" v-if="formValidate.weekSetStartTime!=''">
          <div class="cal-schoolTit">
            {{formValidate.weekSetStartTime.split('-')[0]}} ~ {{formValidate.weekSetEndTime.split('-')[0]}}学年，{{formValidate.semester=='ONE'?'第一学期':'第二学期'}}教学周历
          </div>
        </el-col>
      </el-row>
      <el-row :gutter="10">
        <el-col :span="3">
          <div class="cal-schoolTit" style="text-align: right;">学期起止时间：</div>
        </el-col>
        <el-col :span="20">
          <div class="cal-schoolTit">
            {{formValidate.weekSetStartTime}} 至 {{formValidate.weekSetEndTime}}
            ，{{formValidate.gradeNum}}级，{{formValidate.classNum}}班
          </div>
        </el-col>
      </el-row>
      <full-calendar class="test-fc" :tpl="calendarSet.tpl" :itemLimit="calendarSet.itemLimit" :events="calendarSet.fcEvents"
                     first-day='1' locale="zh-cn"
                     @changeMonth="changeMonth"
                     @eventClick="eventClick"
                     @dayClick="dayClick"
                     @moreClick="moreClick"
                     @goPrev="goPrev"
                     @goNext="goNext">
        <template slot="fc-header-left" scope="p">
          <span style="font-size: 16px;">{{monthTitle}}</span>
        </template>
        <template slot="fc-header-center" scope="p">
          <span v-if="false">周-历</span>
        </template>
        <template slot="fc-header-right" scope="p">
          <div style="float: right">
            <el-button-group>
              <el-button type="primary" icon="arrow-left" @click="goPrev"></el-button>
              <el-button type="primary" icon="arrow-right" @click="goNext"></el-button>
            </el-button-group>
          </div>
        </template>
        <template slot="fc-event-card" scope="p">
          <p>{{ p.event.title }}</p>
        </template>
      </full-calendar>
      <el-row :gutter="10">
        <el-col :span="2">
          <div class="cal-schoolTit">说明：</div>
        </el-col>

        <el-col :span="22">
          <el-input
            readonly
            type="textarea"
            :rows="4"
            placeholder="请输入内容"
            v-model="formValidate.weekSetInstructions">
          </el-input>
        </el-col>
      </el-row>
      <br />
      <el-row>
        <el-col :span="8" class="textCenter">&nbsp;</el-col>
        <el-col :span="8" class="textCenter"><el-button @click="cancelMyWin">关闭</el-button></el-col>
        <el-col :span="8" class="textCenter">&nbsp;</el-col>
      </el-row>
    </div>
    <Modal
      :mask-closable="false"
      v-model="addModal"
      height="200"
      title="对话框标题"
      class-name="vertical-center-modal"
      :width="900">
      <modal-header slot="header" :content="addId"></modal-header>
      <set-curriculum v-if="addModal"  @cancel="cancel" @add="subCallback" :operailityData="operailityData" ></set-curriculum>
      <div slot="footer"></div>
    </Modal>
  </div>
</template>
<style>
  .newCalendar .comp-full-calendar{
    max-width: 1280px;
    padding: 10px 0;
  }
  .newCalendar .full-calendar-body .dates .dates-events .events-week .events-day {
    min-height: 90px;
  }
  .newCalendar .full-calendar-body .dates .dates-events .events-week .events-day .event-box {
    overflow: hidden;
    width: 95%;
    position: relative;
    top: -18px;
  }
</style>
<script>
  /*当前组件必要引入*/
  import fullCalendar from 'vue-ambuf-fullcalendar';
  import setCurriculum from './setCurriculum.vue';

  //引入日历相关的配置
  import calendarSet from '../calendar/calendarSet.js';

  //引入当前组件字典api
  import api from "../api.js";
  //当前组件引入全局的util
  let Util=null;
  export default{
    props:["editOperailityData"],
    data() {
      return {
        //是否显示全日历
        isShowCalendar:false,
        stepMaker:"third",

        //全日历
        calendarSet,
        //学期
        semesterOptions:[
          {
            key:'ONE',
            value:"一"
          },{
            key:'TWO',
            value:"二"
          }],
        semesterVal:"",
        monthTitle:"",


        /*--按钮button--*/
        addId:{
          id:'add',
          title:'添加'},


        //周历保存后的id
        weekSetId:"",
        //form表单bind数据
        formValidate: {
          schoolIds:'',
          schoolNames: '',
          weekSetStartTime: '2017-01-02',
          weekSetEndTime: '2017-01-05',
          semester: '',
          gradeNum: '',
          classNum: '',
          weekSetInstructions: "",
        },

        //当前月
        currMonth:"",


        //获取周历设置主表
        getMainTitle:{
          ajaxSuccess:'getMainData',
          ajaxParams:{
            url: api.get.path,
          }
        },


        //获取时间段设置的课程
        courseTimeData:{},
        getCourseTimeTitle:{
          ajaxSuccess:'getCourseTimeData',
          ajaxParams:{
            url: api.teachCourseTime.path,
          }
        },


        //根据教学周历ID获取每个月课程设置
        getMonthCourseSet:{
          ajaxSuccess:'getMonthCourseData',
          ajaxParams:{
            url: api.monthCourseSetResearchRoom.path+"/"+this.editOperailityData.weekSetId,
            method:api.monthCourseSetResearchRoom.method,
            params:{}
          }
        },


      }
    },
    methods: {
      //初始化请求列表数据
      init(){
        Util = this.$util;
        calendarSet.setCalData([]);
        this.ajax(this.getCourseTimeTitle);
        this.weekSetId = this.editOperailityData.weekSetId;
      },


      //根据教学周历ID获取每个月课程设置
      setCourseTime(){
        this.getMonthCourseSet.ajaxParams.params={
          weekSetTime:this.currMonth,
        }
        this.ajax(this.getMonthCourseSet);
      },


      //活动时间段获取
      getCourseTimeData(responseData){
        let data = responseData.data;
        for(var i=0,item;i<data.length;i++){
          item = data[i];
          this.courseTimeData[item["timeId"]] = item;
        }
      },


      //根据教学周历ID获取每个月课程设置--server回调
      getMonthCourseData(responseData){
        let data = responseData.data;
        if(!this.valDataType(data,"Array")) return;
        //if(Util.isEmptyObject(data)) return;
        let myData = [];
        if(data.length==0){
          calendarSet.setCalData([]);
          return;
        }
        //console.log(this.courseTimeData,data);
        let currFormate= ["上","下","晚"];
        for(var i=0,item;i<data.length;i++){
          item = data[i];
          Util._.forEach(item, (v,k)=> {
            let contentArr = v;
            for(var i=0;i<contentArr.length;i++){
              let num = this.courseTimeData[contentArr[i]["timeId"]].courseIndex;//(i+1);
              myData.unshift({
                title: currFormate[contentArr[i]["timeType"]]+num+":"+contentArr[i]["depName"]+"   "+contentArr[i]["timeStr"],
                start: k,
                end: k,
              })
            }

          })
        }
        /*if(Util.isEmptyObject(data)){
          calendarSet.setCalData([]);
          return;
        }
        let currFormate= ["上","下","晚"];
        Util._.forEach(data,function (v,k) {
          let contentArr = v;
          console.log("contentArr",contentArr);
          for(var i=0;i<contentArr.length;i++){
            let num = (i+1);
            myData.unshift({
              title: currFormate[contentArr[i]["timeType"]]+num+":"+contentArr[i]["depName"]+"   "+contentArr[i]["timeStr"],
              start: k,
              end: k,
            })
            console.log("myData",myData);
          }

        })*/

        calendarSet.setCalData(myData);
      },


      //获取周历信息成功回调
      getMainData(responseData){
        this.formValidate  = responseData.data;
      },


      goPrev(){
        this.$children[3].goPrev();
      },
      goNext(){
        this.$children[3].goNext();
      },
      changeMonth(start, end, current,foramatData) {
        this.monthTitle = foramatData(current,'MMMM YYYY');
        this.currMonth = this.conductDate(current,"yyyy-MM");
        this.setCourseTime();
      },

      //关闭当前组件
      cancelMyWin(){
        this.$emit("cancel","edit");
      },


      /*
       * 打开指定的模态窗体
       * @param options string 当前指定的模态:"add"、"edit"
       * */
      openModel(options){
        this[options+'Modal'] = true;
      },


      /*
       * 监听子组件通讯的方法
       * 作用:根据不同的参数关闭对应的模态
       * @param targer string example:"add"、"edit"
       * */
      cancel(targer){
        this[targer+'Modal'] = false;
      },


      /**
       * 日期格式化内容被点击时触发
       * @param event      {}  当前被点击内容对象
       * @param jsEvent    {}  被点击的鼠标事件对象
       * @param pos        {}  当前位置对象
       */
      eventClick(event, jsEvent, pos) {
        if(jsEvent,jsEvent.srcElement.innerText.length<4){
          this.errorMess("没有课程课时设置!")
          return;
        }

        let yearMonth = this.conductDate(this.conductDate(event.start,"yyyy-MM-dd"),"yyyy-MM");
        this.currMonth = yearMonth;
        this.operailityData = {weekSetId:this.weekSetId,date:event.start,yearMonth:yearMonth};
        this.openModel("add");
      },


      /**
       *
       * @param day
       * @param jsEvent
       */

      dayClick(day, jsEvent) {
        if(jsEvent,jsEvent.srcElement.innerText.length<4){
          this.errorMess("没有课程课时设置!")
          return;
        }
        let date = this.conductDate(day,"yyyy-MM-dd");
        let yearMonth = this.conductDate(day,"yyyy-MM");
        this.currMonth = yearMonth;
        this.operailityData = {weekSetId:this.weekSetId,date:date,yearMonth:yearMonth};
        this.openModel("add");
      },
      /**
       *
       * @param day
       * @param events
       * @param jsEvent
       */
      moreClick(day, events, jsEvent) {
        //console.log('moreCLick', day, events, jsEvent)
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
        this.cancel(target);
        if(title){
          this.successMess(title);
        }
        if(!updata){
          this.setCourseTime();
        }
      },

    },
    created(){
      this.init();
    },
    watch:{
      weekSetId(val){
        if(val!=""){
          let getMainTitle = Util._.defaultsDeep({},this.getMainTitle);
          getMainTitle.ajaxParams.url+= "/"+val;
          this.ajax(getMainTitle)
        }
      }
    },
    mounted(){

    },
    components:{
      fullCalendar,
      setCurriculum
    }
  }
</script>
