<template>
  <!-- 预约项目管理 - 增加 -->
  <div>
    <el-form label-width="90px">
      <el-row>
        <el-col>
          <el-form-item label="项目名称：">
            {{ showData.name }}
          </el-form-item>
        </el-col>
        <el-col>
          <el-form-item label="所在房间：">
            <div class="bpProjectSelectRoom" v-for="item in showData.roomList" :key="item.roomId">
              <el-button @click="showRoomInfo(item.roomId)">{{ item.roomNum }}</el-button>
              <span>承载人数：{{ item.bearingCapacity }}</span>
            </div>
          </el-form-item>
        </el-col>
        <el-col>
          <el-form-item label="所需模型：">
            <el-tooltip class="item" effect="light" placement="bottom-start" v-for="item in showData.deviceList" :key="item.deviceTypeId">
              <div slot="content" style="max-width:200px;">
                <p>设备名称：{{ item.deviceTypeName }}</p>
                <p>设备数量：{{ item.deviceNum || 0 }}</p>
                <p>设备简介：{{ item.describes || '暂无简介' }}</p>
              </div>
              <el-button>{{ item.deviceTypeName }}</el-button>
            </el-tooltip>
          </el-form-item>
        </el-col>
        <el-col>
          <el-form-item label="预约简介：">
            {{ showData.summary || '暂无简介' }}
          </el-form-item>
        </el-col>

        <template>
          <el-col :span="12">
            <el-form-item label="开放日期：">
              {{ showData.timeModel | typeText }}
            </el-form-item>
          </el-col>

          <el-col v-if="showData.timeModel === 'SPECIFIC'">
            <el-form-item label="开放时间：">
              {{ oneModTimeSlot.join('，') }}
            </el-form-item>
          </el-col>

          <el-col>
            <el-form-item label="预约对象：">
              {{ showData.userType | userType }}
              <div v-if="showData.userType === 'SPECIFIC'" class="bpUserList">
                <el-tag type="success" v-for="item in showData.userList" :key="item.id">{{ item.name }}</el-tag>
              </div>
            </el-form-item>
          </el-col>

          <div style="clear:both;" class="newCalendar" v-if="showData.timeModel === 'SPECIFIC'">
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
        </template>
      </el-row>

    </el-form>

    <!-- 模态框 查看（view） -->
    <Modal :mask-closable="false" v-model="showModal" class-name="vertical-center-modal" :loading="true" :width="800">
      <modal-header slot="header" :parent="self" :content="contentHeader.showId"></modal-header>
      <room-view v-if="showModal" @cancel="cancel" :operaility-data="operailityData" :id="todoId"></room-view>
      <div slot="footer"></div>
    </Modal>
  </div>
</template>

<script>
  import api from './api';

  import roomView from '../../room/roomManage/roomManage_view'; // 房间查看
  import fullCalendar from 'vue-ambuf-fullcalendar'; // 周历
  //引入日历相关的配置
  import calendarSet from './calendarSet';

  export default {
    props: ['opData'],
    data() {
      return {
        self: this,
        todoId: '', // 查看房间id

        showData: {},

        contentHeader: {
          showId: {
            id: "showId",
            title: "查看房间"
          },
        },

        oneModTimeSlot: [],
        openTimeList: {}, // 开放日期
        allDayTimeSlot: [], // 全天开放时间段(只记录索引)
        timeSlot: [], // 时间段

        // 周历
        calendarSet,
        monthTitle: "",
        //是否显示全日历
        isShowCalendar: false,
        operailityData: {},
      }
    },
    methods: {
      // 初始化
      init() {
        calendarSet.setCalData([]);
        this.getTimeSlotList();
      },
      /*********************************************************** 周历 ***********************************************/
      goPrev() {
        try {
          this.$children[0].$children[0].$children[7].goPrev()
        } catch (error) {
          this.$children[0].$children[0].$children[8].goPrev()
        }
      },
      goNext() {
        try {
          this.$children[0].$children[0].$children[7].goNext()
        } catch (error) {
          this.$children[0].$children[0].$children[8].goNext()
        }
      },
      changeMonth(start, end, current, foramatData) {
        this.monthTitle = foramatData(current, 'MMMM YYYY');
        this.currMonth = this.conductDate(current, "yyyy-MM");
      },
      /**
       * 日期格式化内容被点击时触发
       * @param event      {}  当前被点击内容对象
       * @param jsEvent    {}  被点击的鼠标事件对象
       * @param pos        {}  当前位置对象
       */
      eventClick(event, jsEvent, pos) {

      },
      /**
       * @param day
       * @param jsEvent
       */
      dayClick(day, jsEvent) {

      },
      // 设置日期对应的时间段
      setAllDayTimeSlot() {
        let data = this.openTimeList;
        let showData = [];
        this.$util._.map(data, (item, key) => {
          if (item.timeSlot.length) {
            item.timeSlot.map(tItem => {
              showData.push({
                title: tItem,
                start: item.date,
                end: item.date,
              })
            })
          } else {
            delete data[key]
          }
        })
        calendarSet.setCalData(showData);
      },
      /**
       * @param day
       * @param events
       * @param jsEvent
       */
      moreClick(day, events, jsEvent) {
        //console.log('moreCLick', day, events, jsEvent)
      },

      // 房间查看
      showRoomInfo(id) {
        this.todoId = id;
        this.openModel('show')
      },

      /*
       * 打开指定的模态窗体
       * @param options string 当前指定的模态:"add"、"edit"
       * */
      openModel(options) {
        this[options + 'Modal'] = true;
      },
      // 模态窗关闭
      cancel(options) {
        this[options + 'Modal'] = false;
      },

      // 获取时间段
      getTimeSlotList() {
        this.ajax({
          ajaxSuccess: res => {
            this.timeSlot = res.data || [];
            this.getDataForServer()
          },
          ajaxParams: {
            url: api.teachCourseTime.path,
            method: api.teachCourseTime.method
          }
        })
      },

      // 获取数据
      getDataForServer() {
        this.ajax({
          ajaxSuccess: 'getDataSuccess',
          ajaxParams: {
            url: api.get.path + this.opData.id,
            method: api.get.method
          }
        })
      },

      // 初始化数据
      getDataSuccess(res) {
        let fData = this.formValidate;
        let rData = res.data;
        let timeSlotId = {};
        let openTimeList = {};
        this.showData = res.data;
        this.oneModTimeSlot.length = 0;
        this.timeSlot.map(item => timeSlotId[item.timeId] = item);
        rData.openTimeList.map(item => {
          if (!openTimeList[item.date]) {
            openTimeList[item.date] = {
              date: item.date,
              timeSetIds: [],
              timeSlot: []
            };
          }
          openTimeList[item.date].timeSetIds.push(item.timeSetId);
          openTimeList[item.date].timeSlot.push(timeSlotId[item.timeSetId].courseTime);
          // 所有日期对应的时间段
          if (this.oneModTimeSlot.indexOf(timeSlotId[item.timeSetId].courseTime) < 0) {
            this.oneModTimeSlot.push(timeSlotId[item.timeSetId].courseTime)
          }
        })
        // 通过时间段处理对应的时间段id
        for (let item in openTimeList) {
          openTimeList[item].timeSetIds = openTimeList[item].timeSetIds.join(',')
        }
        this.openTimeList = openTimeList;
        this.setAllDayTimeSlot()
      },
    },
    components: {
      fullCalendar,
      roomView,
    },
    created() {
      this.init()
    }
  }

</script>

<style lang="scss">
  /* 预约项目管理 - 增加 */

  .newCalendar .comp-full-calendar {
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

  .bpProjectBox {
    display: inline-block; // padding-top: 10px;
    .bpProjectItem {
      height: 36px;
      line-height: 36px;
      .el-input {
        width: 250px;
        margin-left: 20px;
        display: inline-block;
      }
      &~.bpProjectItem {
        margin-top: 16px;
      }
    }
    .bpUserItem {
      margin-left: 6px;
      margin-top: -9px;
    }
  }

  .bpProjectSelectRoom {
    margin-bottom: 10px;
    .el-input {
      width: 80px;
    }
  }

  .bpUserList {
    .el-tag {
      margin-right: 10px;
    }
  }

</style>
