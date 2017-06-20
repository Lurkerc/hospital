<!----------------------------------
****--查看周历(calendar_add)
****--@date     2014-04-12
****--@author   zyc<332533011@qq.com
----------------------------------->
<template>
  <div>

    <div class="newCalendar" v-if="stepMaker=='third'">
      <el-row :gutter="10">
        <el-col :span="24" v-if="formValidate.weekSetStartTime!=''">
          <div class="cal-schoolTit">
            南京鼓楼医院：{{formValidate.weekSetStartTime.split('-')[0]}} ~ {{formValidate.weekSetEndTime.split('-')[0]}}学年，{{formValidate.semester=='ONE'?'第一学期':'第二学期'}}教学周历
          </div>
        </el-col>
      </el-row>
      <el-row :gutter="10">
        <el-col :span="24">
          <div class="cal-schoolTit">
            学期起止时间：{{formValidate.weekSetStartTime}} 至 {{formValidate.weekSetEndTime}}
            ，{{formValidate.gradeNum}}级，{{formValidate.classNum}}班
          </div>
        </el-col>
      </el-row>
      <full-calendar class="test-fc" :tpl="calendarSet.tpl" :itemLimit="calendarSet.itemLimit" :events="calendarSet.fcEvents"
                     first-day='1' locale="zh-cn"
                     @changeMonth="changeMonth"
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
        <el-col :span="8" class="textCenter"><el-button @click="cancel('next','third')">关闭</el-button></el-col>
        <el-col :span="8" class="textCenter">&nbsp;</el-col>
      </el-row>
    </div>

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
</style>
<script>
  /*当前组件必要引入*/
  import fullCalendar from 'vue-ambuf-fullcalendar';
  import setCurriculum from './setCurriculum.vue';

  //引入日历相关的配置
  import calendarSet from './calendarSet.js';

  //引入当前组件字典api
  import api from "../api.js";
  //当前组件引入全局的util
  let Util=null;
  export default{
    props:["operailityData"],
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


        //根据教学周历ID获取每个月课程设置
        getMonthCourseSet:{
          ajaxSuccess:'getMonthCourseData',
          ajaxParams:{
            url: api.monthCourseSet.path,
            method:api.monthCourseSet.method,
            params:{}
          }
        },


      }
    },
    methods: {
      //初始化请求列表数据
      init(){
        Util = this.$util;
        //this.ajax(this.getSchoolsTitle);
        this.weekSetId = this.operailityData.weekSetId;
      },


      //根据教学周历ID获取每个月课程设置
      setCourseTime(){
        this.getMonthCourseSet.ajaxParams.params={
          weekSetId:this.weekSetId,
          weekSetTime:this.currMonth,
        }
        this.ajax(this.getMonthCourseSet);
      },


      //根据教学周历ID获取每个月课程设置--server回调
      getMonthCourseData(responseData){
        let data = responseData.data;
        if(Util.isEmptyObject(data)) return;
        let myData = [];
        if(Util.isEmptyObject(data)){
          calendarSet.setCalData([]);
          return;
        }
        let currFormate= ["上","下","晚"];
        Util._.forEach(data,function (v,k) {
          let contentArr = v;
          for(var i=0;i<contentArr.length;i++){
            myData.unshift({
              title: currFormate[contentArr[i]["timeType"]]+":"+contentArr[i]["depName"]+"   "+contentArr[i]["timeStr"],
              start: k,
              end: k,
            })
          }
        })
        calendarSet.setCalData(myData);
      },


      //获取周历信息成功回调
      getMainData(responseData){
        this.formValidate  = responseData.data;
      },


      goPrev(){
        this.$children[2].goPrev();
      },
      goNext(){
        this.$children[2].goNext();
      },
      changeMonth(start, end, current,foramatData) {
        this.monthTitle = foramatData(current,'MMMM YYYY');
        this.currMonth = this.conductDate(current,"yyyy-MM");
        this.setCourseTime();
      },

      //关闭当前组件
      cancel(){
        this.$emit("cancel","show");
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
