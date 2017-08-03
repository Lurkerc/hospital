<!----------------------------------
****--修改周历(calendar_add)
****--@date     2014-04-12
****--@author   zyc<332533011@qq.com
----------------------------------->
<template>
  <div>
    <div class="newCalendar" v-if="stepMaker=='first'">
      <el-row :gutter="10" v-if="schoolData.length>0">
        <el-col v-for="(item,index) in schoolData" :key="index" :span="6">
          <div class="cal-schools">
            <el-row>
              <el-col :span="20">
                <el-tooltip :content="item.name" effect="light" placement="top">
                  <el-button class="overflow-txt" :type="item.checked?'success':''" @click="handleCheckSchool(index,item)" style="width: 100%" v-text="item.name"></el-button>
                </el-tooltip>
              </el-col>
              <el-col :span="4">
                <div v-show="item.checked" class="cal-check"><i class="el-icon-check"></i></div>
              </el-col>
            </el-row>
          </div>
        </el-col>
      </el-row>
      <br/>
      <el-row>
        <el-col :span="24" class="textCenter"><el-button @click="gotoNext('next','second')" type="primary">下一步</el-button></el-col>
      </el-row>
    </div>
    <div class="newCalendar" v-show="stepMaker=='second'">
      <el-form ref="formValidate" :rules="this.$store.state.rules.calendar" :model="formValidate" class="demo-form-inline" label-width="120px">
        <br />
        <el-row :gutter="10">
          <el-col :span="3">
            <div class="cal-schoolTit" style="text-align: right;">南京鼓楼医院:</div>
          </el-col>
          <el-col :span="4" v-if="formValidate.weekSetStartTime!=''">
            <div class="cal-schoolTit">
              {{studyYearStart}} ~ {{studyYearEnd}}学年,
            </div>
          </el-col>
          <el-col :span="1">
            <div class="cal-schoolTit"><!--学年,-->&nbsp;&nbsp;&nbsp;&nbsp;第</div>
          </el-col>
          <el-col :span="3">
            <el-select v-model="formValidate.semester" placeholder="请选择">
              <el-option
                v-for="item in semesterOptions"
                :key="item.key"
                :label="item.value"
                :value="item.key">
              </el-option>
            </el-select>
          </el-col>
          <el-col :span="4">
            <div class="cal-schoolTit">学期教学周历</div>
          </el-col>
        </el-row>
        <br />
        <el-row :gutter="10">
          <el-col :span="3">
            <div class="cal-schoolTit" style="text-align: right;">学期起止时间:</div>
          </el-col>
          <el-col :span="8">
            <date-group :index="0" :dateGroup="{'type':'date','text':'至'}" :s-date="formValidate.weekSetStartTime" :e-date="formValidate.weekSetEndTime" @setDateGroupVal="setDateGroupVal"></date-group>
          </el-col>
          <el-col :span="4">
            <el-date-picker
              :editable="false"
              style="width: 100px"
              v-model="formValidate.gradeNum"
              align="right"
              type="year"
              placeholder="选择年">
            </el-date-picker>
            <span class="cal-schoolTit">级</span>
          </el-col>
          <el-col :span="3">
            <el-input v-model="formValidate.classNum"></el-input>
          </el-col>
          <el-col :span="4">
            <span style="float: left" class="cal-schoolTit">班</span>
          </el-col>
        </el-row>
        <br />
        <el-row :gutter="10">
          <el-col :span="3">
            <div class="cal-schoolTit" style="text-align: right;">说明:</div>
          </el-col>
          <el-col :span="20">
            <!--<el-form-item label="说明：" prop="weekSetInstructions" >-->
              <el-input
                type="textarea"
                :rows="4"
                placeholder="请输入内容"
                v-model="formValidate.weekSetInstructions">
              </el-input>
            <!--</el-form-item>-->
          </el-col>
        </el-row>
        <br />
      </el-form>
      <el-row>
        <el-col :span="8" class="textCenter">&nbsp;</el-col>
        <el-col :span="8" class="textCenter"><el-button @click="gotoNext('next','third')" type="primary">下一步</el-button></el-col>
        <el-col :span="8" class="textCenter">&nbsp;</el-col>
      </el-row>
    </div>
    <div class="newCalendar" v-if="stepMaker=='third'">
      <el-row :gutter="10">
        <el-col :span="24" v-if="formValidate.weekSetStartTime!=''">
          <div class="cal-schoolTit">
            南京鼓楼医院：{{studyYearStart}} ~ {{studyYearEnd}}学年，{{formValidate.semester=='ONE'?'第一学期':'第二学期'}}教学周历
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
      <el-row>
        <el-col :span="8" class="textCenter">&nbsp;</el-col>
        <el-col :span="4" class="textCenter"><el-button @click="gotoNext('up','second')" type="primary">上一步</el-button></el-col>
        <el-col :span="4" class="textCenter"><el-button @click="saveMess" type="primary">上报</el-button></el-col>
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
  import calendarSet from './calendarSet.js';

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
        stepMaker:"second",

        //选择的学校
        schoolData:[],
        schoolSaveMess:{},
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

        //学期枚举类型
        semesterType:{

        },

        //周历保存后的id
        weekSetId:"",
        //form表单bind数据
        formValidate: {
          schoolIds:'',
          schoolNames: '',
          weekSetStartTime: '',
          weekSetEndTime: '',
          semester: '',
          gradeNum: '',
          classNum: '',
          weekSetInstructions: "",
        },

        //当前月
        currMonth:"",

        /*--按钮button--*/
        addId:{
          id:'add',
          title:'添加'},

        //当前操作存储的数据
        operailityData:'',

        //请求学校数据
        getSchoolsTitle:{
          ajaxSuccess:'getSchoolsData',
          ajaxParams:{
            url: api.schools.path,
            params:{}
          }
        },

        //获取周历设置主表
        getMainTitle:{
          ajaxSuccess:'getMainData',
          ajaxParams:{
            url: api.get.path,
          }
        },

        //保存周历设置主表
        saveMainTitle:{
          ajaxSuccess:'saveMainData',
          ajaxParams:{
            url: api.add.path,
            method:api.add.method,
            params:{}
          }
        },

        //修改周历设置主表
        editMainTitle:{
          ajaxSuccess:'editMainData',
          ajaxParams:{
            url: api.modify.path,
            method:api.modify.method,
            params:{}
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

        //上报教学周历设置
        submitCalendarTitle:{
          type:'add',
          successTitle:'添加成功!',
          errorTitle:'添加失败!',
          ajaxError:'ajaxError',
          ajaxParams:{
            url: api.modifySubmit.path,
            method:api.modifySubmit.method,
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
        this.weekSetId = this.editOperailityData.weekSetId;

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
        if(!this.valDataType(data,"Array")) return;
        //if(Util.isEmptyObject(data)) return;
        let myData = [];
        if(data.length==0){
          calendarSet.setCalData([]);
          return;
        }
        let currFormate= ["上","下","晚"];
        for(var i=0,item;i<data.length;i++){
          item = data[i];
          Util._.forEach(item,function (v,k) {
            let contentArr = v;
            for(var i=0;i<contentArr.length;i++){
              let num = (i+1);
              myData.unshift({
                title: currFormate[contentArr[i]["timeType"]]+num+":"+contentArr[i]["depName"]+"   "+contentArr[i]["timeStr"],
                start: k,
                end: k,
              })
            }

          })
        }
        calendarSet.setCalData(myData);
      },

      //获取学校list
      getSchoolsData(responseData){
        let data = responseData.data;

        for(var i=0,item;i<data.length;i++){
          item = data[i];
          item.checked = false;
        }
        this.schoolData=data;
      },


      /*
       * 日期组改变值后赋值
       * @param index number   当前数据数组的索引
       * @param key   string   当前数据需要设置的对象的key 例如:startDate
       * @param val   string   当前选中的日期已格式化好的值
       * */
      setDateGroupVal(index,key,val){
        if(key=="startDate"){
          this.formValidate["weekSetStartTime"]=val;
        }
        if(key=="endDate"){
          this.formValidate["weekSetEndTime"]=val;
        }
      },


      /**
       * 选择学校
       * @param {number} idx 当前选择的学校的索引
       */
      handleCheckSchool(idx,item){
        item.checked = !item.checked;
        if(item.checked){
          this.schoolSaveMess[this.schoolData[idx].id] = this.schoolData[idx];
        }else{
          delete this.schoolSaveMess[this.schoolData[idx].id];
        }
      },


      setSchoolMess(obj){
        let schoolIds = [];
        let schoolNames = [];
        Util._.forEach(obj,function (n,k) {
          schoolIds.push(n.id);
          schoolNames.push(n.name);
        })
        this.formValidate.schoolIds=schoolIds.join(",");
        this.formValidate.schoolNames=schoolNames.join(",");
      },

      //上报
      saveMess(){
        let submitCalendarTitle = Util._.defaultsDeep({},this.submitCalendarTitle);
        submitCalendarTitle.ajaxParams.url+= "/"+this.weekSetId;
        this.ajax(submitCalendarTitle);
      },


      /**
       * 去到哪一步
       * @param type {string} 上一步,下一步的类型  next or up
       * @param step {string} 去到哪一步:first second third
       */
      gotoNext(type,step){
        if(this.stepMaker == "first"){
          //隐藏已选择的学校
          this.setSchoolMess(this.schoolSaveMess);
          if(this.formValidate.schoolIds==""){
            this.showMess("请选择学校!");
            return
          }
          this.stepMaker = step;
        }else{
          if(this.stepMaker == "second") {
            if(this.formValidate.semester==""){
              this.showMess("请选第几学期教学周历!");
              return
            }
            if(this.formValidate.weekSetStartTime==""||this.formValidate.weekSetEndTime==""){
              this.showMess("请填写学期起止时间!");
              return
            }
            if(this.formValidate.gradeNum==""){
              this.showMess("请选择级!");
              return
            }
            if(this.formValidate.classNum==""){
              this.showMess("请填写班级!");
              return
            }
            if(this.formValidate.weekSetInstructions==""){
              this.showMess("请填写说明!");
              return
            }
              /*let val = this.submitForm("formValidate");
            if(!val){
              return;
            }*/
            if(this.weekSetId==""){
              this.saveMainTitle.ajaxParams.data = this.getFormData(this.formValidate);
              this.ajax(this.saveMainTitle);
            }else{
              let editMainTitle = Util._.defaultsDeep({},this.editMainTitle);
              editMainTitle.ajaxParams.url+= "/"+this.weekSetId;
              editMainTitle.ajaxParams.data = this.getFormData(this.formValidate);
              this.ajax(editMainTitle);
            }
          }else{
            this.stepMaker =step;
          }

        }
      },


      //周历设置主表信息保存成功回调
      saveMainData(responseData){
        this.stepMaker = "third";
        this.weekSetId = responseData.data;
        this.$emit("add");
      },


      //周历设置主表信息修改成功回调
      editMainData(responseData){
        this.stepMaker = "third";
        this.$emit("add");
      },


      submitForm(formName) {
        let val = false;
        this.$refs[formName].validate((valid) => {
          val = valid;
        });
        return val;
      },


      //获取周历信息成功回调
      getMainData(responseData){
        this.formValidate  = responseData.data;
      },


      goPrev(){
        this.$children[5].goPrev();
      },
      goNext(){
        this.$children[5].goNext();
      },
      changeMonth(start, end, current,foramatData) {
        this.monthTitle = foramatData(current,'MMMM YYYY');
        this.currMonth = this.conductDate(current,"yyyy-MM");
        this.setCourseTime();
      },


      /**
       * 日期格式化内容被点击时触发
       * @param event      {}  当前被点击内容对象
       * @param jsEvent    {}  被点击的鼠标事件对象
       * @param pos        {}  当前位置对象
       */
      eventClick(event, jsEvent, pos) {
        let weekSetStartTime = this.parseTimestamp(this.formValidate.weekSetStartTime);
        let weekSetEndTime = this.parseTimestamp(this.formValidate.weekSetEndTime);
        let currDate = this.parseTimestamp(this.conductDate(event.start,"yyyy-MM-dd"));
        //判断当前选择的时间是否在设定的时间范围内
        if(weekSetStartTime<=currDate && currDate<=weekSetEndTime){
          let yearMonth = this.conductDate(this.conductDate(event.start,"yyyy-MM-dd"),"yyyy-MM");
          this.currMonth = yearMonth;
          this.operailityData = {weekSetId:this.weekSetId,date:event.start,yearMonth:yearMonth};
          this.openModel("add");
        }else{
            this.showMess("您选择的时间不在当前学期设置的时间范围"+this.formValidate.weekSetStartTime+"至"+this.formValidate.weekSetEndTime+"之内!");
        }
      },


      /**
       *
       * @param day
       * @param jsEvent
       */

      dayClick(day, jsEvent) {
        let weekSetStartTime = this.parseTimestamp(this.formValidate.weekSetStartTime);
        let weekSetEndTime = this.parseTimestamp(this.formValidate.weekSetEndTime);
        let currDate = this.parseTimestamp(this.conductDate(day,"yyyy-MM-dd"));
        //判断当前选择的时间是否在设定的时间范围内
        if(weekSetStartTime<=currDate && currDate<=weekSetEndTime) {
          let date = this.conductDate(day, "yyyy-MM-dd");
          let yearMonth = this.conductDate(day, "yyyy-MM");
          this.currMonth = yearMonth;
          this.operailityData = {weekSetId: this.weekSetId, date: date, yearMonth: yearMonth};
          this.openModel("add");
        }else{
          this.showMess("您选择的时间不在当前学期设置的时间范围"+this.formValidate.weekSetStartTime+"至"+this.formValidate.weekSetEndTime+"之内!");
        }
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


      /*
       * 获取表单数据
       * @return string  格式:id=0&name=aa
       * */
      getFormData(data){
        let myData = Util._.defaultsDeep({},data);
        if(typeof myData['gradeNum']!="string"){
          myData = this.formDate(myData,['gradeNum'],'yyyy');
        }
        this.formDate(myData,['weekSetEndTime','weekSetStartTime'],this.yearMonthData);
        return myData;
      },
    },
    computed:{
      //学年起止日
      studyYearStart(){
         return this.conductDate(this.formValidate.weekSetStartTime,"yyyy");
      },
      studyYearEnd(){
        return this.conductDate(this.formValidate.weekSetEndTime,"yyyy");
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
