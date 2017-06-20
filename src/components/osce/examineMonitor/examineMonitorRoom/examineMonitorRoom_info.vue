<template>
  <!-- 考站详情 -->
  <div>
    <!-- 操作按钮 -->
    <p>
      <el-button size="small" type="info" @click="show">返回列表</el-button>
      <el-button size="small" type="success" @click="changeInfoView" style="float:right;">切换视图</el-button>
    </p>
    <!-- 视频及数据列表 -->
    <div class="monitoStationInfoMain">
      <div class="monitoStationInfoVideo">
        <div class="videBox" id="videoBox">
          <!-- 视频区域 -->
        </div>
        <p class="videoBtn">
          <el-button>语言广播</el-button>
        </p>
      </div>
      <div class="monitoStationInfoList">
        <keep-alive>
          <room-tab v-if="EMR_tab" :list="stationStudentList" @lookStudent="lookStudent"></room-tab>
          <room-list v-if="!EMR_tab" :list="stationStudentList" @lookStudent="lookStudent"></room-list>
        </keep-alive>
      </div>
    </div>
    <!-- 考生信息 -->
    <!-- 模态框 查看（view） -->
    <Modal :mask-closable="false" v-model="studentInfoModal" height="200" title="对话框标题" class-name="vertical-center-modal" :loading="true"
      :width="1200">
      <modal-header slot="header" :parent="self" :content="contentHeader.studentInfoId"></modal-header>
      <student-info v-if="studentInfoModal" @cancel="cancel" :nowIndex="nowIndex" :stationId="stationId" :roomId="roomId" :sceneId="sceneId"
        :index="index" :userSum="userSum"></student-info>
      <div slot="footer"></div>
    </Modal>
  </div>
</template>

<script>
  import api from '../api'; // api
  import roomList from './examineMonitorRoom_list'; // 列表
  import roomTab from './examineMonitorRoom_tab'; // 表格
  import studentInfo from '../examineMonitorStudent/examineMonitorStudent'; // 考生信息
  export default {
    props: ['sceneId', 'stationId', 'roomId', 'index'],
    data() {
      return {
        EMR_tab: true,
        userSum: 0, // 考生总人数
        nowIndex: 0, // 考生当前索引
        stationStudentList: [], // 考生
        self: this,
        studentInfoModal: false,
        contentHeader: {
          studentInfoId: {
            id: 'studentInfoId',
            title: '查看考生信息'
          }
        }
      }
    },
    methods: {
      // 切换视图
      changeInfoView() {
        this.EMR_tab = !this.EMR_tab
      },
      // 返回列表
      show() {
        this.$emit('show', {
          view: 'list'
        })
      },
      // 查看考生的考试详情
      lookStudent(index) {
        this.nowIndex = index;
        // console.log(index);
        this.openModel('studentInfo')
      },
      // 获取考生列表
      getStudentList() {
        let {
          roomId,
          sceneId,
          stationId
        } = this;
        this.ajax({
          ajaxSuccess: 'updateStudentListData',
          ajaxParams: {
            url: api.examUserList.path,
            method: api.examUserList.method,
            params: {
              roomId,
              sceneId,
              stationId
            }
          }
        });
      },
      // 更新考生列表
      updateStudentListData(res) {
        if (!res.data) return;
        this.stationStudentList = res.data;
        this.userSum = res.data.length;
      },
      /******************** 模态框 *******************/
      // 取消
      cancel(targer) {
        this[targer + 'Modal'] = false;
      },
      /*
       * 打开指定的模态窗体
       * @param options string 当前指定的模态:"add"、"edit"
       * */
      openModel(options) {
        this[options + 'Modal'] = true;
      },
    },
    created() {
      this.getStudentList()
      // 场次id，考站id，房间id，监控数据中的考站列表索引
      // console.log(this.sceneId, this.stationId, this.roomId, this.index);
    },
    components: {
      roomList,
      roomTab,
      studentInfo
    }
  }

</script>

<style>


</style>
