<template>
  <!-- 房间预约管理 - 设置 -->
  <div>
    <el-form>

      <el-row>
        <el-col :span="22" :offset="2">
          <el-form-item label="房间号：">
            <span>{{ 666 }}</span>
          </el-form-item>
        </el-col>
        <el-col :span="10" :offset="2">
          <el-form-item label="是否开放预约：">
            <el-radio v-model="formValidate.isOpen" label="YES">开放</el-radio>
            <el-radio v-model="formValidate.isOpen" label="NO">关闭</el-radio>
          </el-form-item>
        </el-col>
        <el-col :span="10" :offset="2">
          <el-form-item label="选择开放日期：">
            <el-radio v-model="formValidate.timeModel" label="ALL">全天候</el-radio>
            <el-radio v-model="formValidate.timeModel" label="SPECIFIC">特定日期</el-radio>
          </el-form-item>
        </el-col>

        <div style="clear:both;">
          <full-calendar class="test-fc" :tpl="calendarSet.tpl" :itemLimit="calendarSet.itemLimit" :events="calendarSet.fcEvents" first-day='1'
            locale="zh-cn" @changeMonth="changeMonth" @eventClick="eventClick" @dayClick="dayClick" @moreClick="moreClick"
            @goPrev="goPrev" @goNext="goNext">
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
        </div>

        <el-col align="center">
          <load-btn @listenSubEvent="listenSubEvent" :btnData="loadBtn"></load-btn>
        </el-col>
      </el-row>

    </el-form>
  </div>
</template>

<script>
  import api from './api';

  import fullCalendar from 'vue-ambuf-fullcalendar'; // 周历
  //引入日历相关的配置
  import calendarSet from './calendarSet';

  export default {
    props: ['opData'],
    data() {
      return {
        //保存按钮基本信息
        loadBtn: {
          title: '保存设置',
          callParEvent: 'listenSubEvent'
        },
        //form表单bind数据
        formValidate: {
          roomIds: '', // 房间 多个id以逗号分隔 ---> 1,2    
          isOpen: 'YES', // 是否开放预约
          timeModel: 'SPECIFIC', // 选择开放日期
          openTimeList: [ // 开放时间列表
            {
              "reserveSetType": "ROOM", // 预约设置类型
              "date": "2017-01-02", // 日期
              "timeSetIds": "1,2,3" // 时间段id字符串
            },
          ]
        },
        //当前组件提交(add)数据时,ajax处理的 基础信息设置
        addMessTitle: {
          type: 'set',
          successTitle: '保存成功!',
          errorTitle: '保存失败!',
          ajaxSuccess: 'ajaxSuccess',
          ajaxError: 'ajaxError',
          ajaxParams: {
            url: api.set.path,
            method: api.set.method
          }
        },

        // 周历
        calendarSet,
        monthTitle: "",
        //是否显示全日历
        isShowCalendar: false,
        operailityData: {},
      }
    },
    methods: {
      /*
       * 点击提交按钮 监听是否提交数据
       * @param isLoadingFun boolean  form表单验证是否通过
       * */
      listenSubEvent(isLoadingFun) {
        if (!isLoadingFun) isLoadingFun = function () {};
        isLoadingFun(true);
        this.addMessTitle.ajaxParams.data = this.getFormData(this.formValidate);
        let data = this.addMessTitle.ajaxParams.data;
        // data.startTime = this.conductDate(data.startTime, 'yyyy-MM-dd HH:mm:ss');
        this.ajax(this.addMessTitle, isLoadingFun)
      },
      /*
       * 获取表单数据
       * @return string  格式:id=0&name=aa
       * */
      getFormData(data) {
        let myData = Util._.defaultsDeep({}, data);
        return myData;
      },
      /*********************************************************** 周历 ***********************************************/
      goPrev() {
        this.$children[0].$children[0].$children[3].goPrev();
      },
      goNext() {
        this.$children[0].$children[0].$children[3].goNext();
      },
      changeMonth(start, end, current, foramatData) {
        this.monthTitle = foramatData(current, 'MMMM YYYY');
        this.currMonth = this.conductDate(current, "yyyy-MM");
        // this.setCourseTime();
      },
      /**
       * 日期格式化内容被点击时触发
       * @param event      {}  当前被点击内容对象
       * @param jsEvent    {}  被点击的鼠标事件对象
       * @param pos        {}  当前位置对象
       */
      eventClick(event, jsEvent, pos) {
        // let yearMonth = this.conductDate(this.conductDate(event.start, "yyyy-MM-dd"), "yyyy-MM");
        // this.currMonth = yearMonth;
        // this.operailityData = {
        //   weekSetId: this.weekSetId,
        //   date: event.start,
        //   yearMonth: yearMonth
        // };
        // this.openModel("add");
        console.log('event', event, jsEvent, pos)
      },
      /**
       * @param day
       * @param jsEvent
       */
      dayClick(day, jsEvent) {
        // let date = this.conductDate(day, "yyyy-MM-dd");
        // let yearMonth = this.conductDate(day, "yyyy-MM");
        // this.currMonth = yearMonth;
        // this.operailityData = {
        //   weekSetId: this.weekSetId,
        //   date: date,
        //   yearMonth: yearMonth
        // };
        // this.openModel("add");
        console.log(day, jsEvent)
      },
      /**
       * @param day
       * @param events
       * @param jsEvent
       */
      moreClick(day, events, jsEvent) {
        //console.log('moreCLick', day, events, jsEvent)
      },

      /*
       * 打开指定的模态窗体
       * @param options string 当前指定的模态:"add"、"edit"
       * */
      openModel(options) {
        this[options + 'Modal'] = true;
      },
    },
    components: {
      fullCalendar,
    }
  }

</script>

<style>
  /* 房间预约管理 - 设置 */

</style>
