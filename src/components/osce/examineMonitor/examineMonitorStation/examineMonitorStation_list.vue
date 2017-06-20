<template>
  <!-- 考核场次对应的考站列表 -->
  <div id="monitoStation" ref="monitoStation" class="monitoStation">
    <div class="monitoStationList">
      <template v-for="(stationItem,index) in monitorData.stationRoomList">
        <station-room :option="{hasAdd:false,hasRemove:false,type:'monitor',icon:monitorData.status}" :initData="{index:stationItem.stationId,cIndex:index,name:stationItem.stationName,percentage:stationItem.nowExamUser.percentage,roomNum:stationItem.roomNum,roomType:stationItem.stationType !== 'SP'? '' : stationItem.stationType,carousel:stationItem.teacherList,carouselKey:'teacherName'}"
          :key="stationItem.stationId" @click.native="showStationInfo(stationItem,index)" style="width:80px;margin-right:30px;"></station-room>
        <!--<station-room :option="{hasAdd:false,hasRemove:false,type:'monitor'}" :initData="{index:stationItem.stationId,cIndex:index,name:stationItem.stationName,percentage:Math.round(Math.random()*100+1),roomNum:stationItem.roomNum,roomType:stationItem.stationType !== 'SP'? '' : stationItem.stationType,carousel:stationItem.teacherList,carouselKey:'teacherName'}"
          :key="stationItem.stationId" @roomClick="showStationInfo" style="width:80px;margin-right:30px;"></station-room>-->
      </template>
    </div>
    <div class="monitoStationInfo">
      <h4>开始时间：<br/>{{ monitorData.startTime | formatDate('yyyy-MM-dd HH:mm:ss') || '-' }}</h4>
      <h4>结束时间：<br/>{{ monitorData.endTime | formatDate('yyyy-MM-dd HH:mm:ss') || '-' }}</h4>
      <h4>当前时间：{{ nowTime }}</h4>
      <el-collapse-transition>
        <p>
          <el-button v-show="monitorData.status === 'PUBLISH'" type="success" @click="modifyStatus('ONGOING')">开始考核</el-button>
        </p>
      </el-collapse-transition>
      <el-collapse-transition>
        <div v-show="monitorData.status === 'ONGOING' || monitorData.status === 'SUSPEND'">
          <p v-if="monitorData.status === 'ONGOING'">
            <el-button type="warning" @click="modifyStatusSS('SUSPEND')">暂停考核</el-button>
          </p>
          <p v-else>
            <el-button type="info" @click="modifyStatusSS('ONGOING')">恢复考核</el-button>
          </p>
          <p>
            <el-button type="danger" @click="modifyStatus('FINISH')">结束考核</el-button>
          </p>
        </div>
      </el-collapse-transition>
      <el-collapse-transition>
        <p>
          <el-button>语音广播</el-button>
        </p>
      </el-collapse-transition>
      <p class="serverStatus" v-if="serverStatus">服务器正常</p>
      <p class="serverStatus error" v-else>服务器异常</p>
    </div>
  </div>

</template>

<script>
  import api from '../api'; // api
  import stationRoom from '../../examineInterval/examineInterval_room'; // 考站
  export default {
    props: ['sceneId', 'sceneName'],
    data() {
      return {
        nowTime: '-', // 当前时间
        examStatus: '', // 修改的考核状态
        serverStatus: true, // 服务器是否正常
        // 考核场次监控数据
        monitorData: {}
      }
    },
    methods: {
      // 查看详细信息页面
      showStationInfo(res, index) {
        this.$emit('show', {
          view: 'info',
          room: {
            index: res.stationId,
            cIndex: index,
          }
        });
        this.$store.commit('examineMonitor/index/intStationRoom', res);
      },
      // 获取当前场地对应的数据
      getStationData() {
        if (this.sceneId != 0) {
          this.ajax({
            ajaxSuccess: 'updateStationData',
            ajaxParams: {
              url: api.monitorGet.path + this.sceneId,
              method: api.monitorGet.method,
              params: {
                id: this.sceneId,
                sceneName: this.sceneName,
              }
            }
          });
        }
      },
      // 更新考站的数据
      updateStationData(res) {
        this.$store.commit('examineMonitor/index/intData', res.data);
        this.monitorData = this.$store.state.examineMonitor.index.data;
      },
      // 修改此场次考核状态（暂停及恢复）
      modifyStatusSS(status) {
        let now = this.conductDate(new Date(), 'yyyy-MM-dd HH:mm:ss');
        this.examStatus = status;
        this.ajax({
          ajaxSuccess: 'updateStatus',
          ajaxParams: {
            url: api.control.path + this.sceneId,
            method: api.control.method,
            data: {
              id: this.sceneId,
              status: status,
              time: now
            }
          }
        });
        // this.updateStatus(); // 联调后删除
      },
      // 修改此场次考核为结束状态
      modifyStatus(status) {
        this.examStatus = status;
        this.ajax({
          ajaxSuccess: 'updateStatus',
          ajaxParams: {
            url: api.modifyStatus.path + this.sceneId,
            method: api.modifyStatus.method,
            data: {
              id: this.sceneId,
              status: status
            }
          }
        });
        // this.updateStatus(); // 联调后删除
      },
      // 更新状态
      updateStatus(res) {
        this.$store.commit('examineMonitor/index/updateData', {
          status: this.examStatus
        })
      },
      // 当前时间
      getNowTime() {
        let _this = this;
        setInterval(() => {
          _this.nowTime = ((new Date().toLocaleString()).split(' '))[1];
        }, 1000);
      }
    },
    components: {
      stationRoom
    },
    created() {
      this.getStationData();
      this.getNowTime();
    },
    watch: {
      sceneId(val) {
        this.getStationData()
      }
    }
  }

</script>
