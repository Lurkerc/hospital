<template>
  <!-- 调试 -->
  <div class="audioDebug">
    <!-- 左侧房间信息 -->
    <div class="adRoom">
      <p class="adrTitle">房间列表</p>
      <el-checkbox class="adrChkAll" :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">全选</el-checkbox>
      <ul class="adrList">
        <el-checkbox-group v-model="checkedRooms" @change="handleCheckedRoomsChange">
          <li class="adrItem" v-for="room in roomList" :key="room.id">
            <el-checkbox :label="room.id">{{ room.roomNum }}</el-checkbox>
          </li>
        </el-checkbox-group>
      </ul>
    </div>
    <!-- 右侧 -->
    <div class="adContent">
      <el-tabs v-model="audioDebugActive">
        <!-- 房间列表 -->
        <div class="adcBox">
          <!-- 操作按钮 -->
          <div class="adcrButtonList">
            <div class="floatLeft" style="margin-left:12px;">
              <el-button size="small" type="success" @click="handleCheckedBoxChange(true)">全选</el-button>
              <el-button size="small" type="warning" @click="handleCheckedBoxChange(false)">反选</el-button>
            </div>
            <div class="floatRight">
              <el-button size="small" type="info" @click="setBoxVol('add')">增大音量</el-button>
              <el-button size="small" type="info" @click="setBoxVol('red')">减小音量</el-button>
              <el-input placeholder="音量" size="small" :maxlength="3" v-model="boxVol" class="setVolume">
                <el-button slot="append" type="info" @click="setBoxVol(false)">设置音量</el-button>
              </el-input>
            </div>
          </div>
          <!-- 设备列表 -->
          <div class="adcBoxList">
            <el-checkbox-group v-model="checkBoxs">
              <div class="adcrBoxItem" v-for="box in boxList" :key="box.id">
                <el-checkbox :label="box.id"></el-checkbox>
                <img src="../../../../../assets/ambuf/images/audio.png" class="audioImg">
                <p class="audioVolume">{{ box.volume }}</p>
                <p>{{ box.roomNum }}房间</p>
                <p>{{ box.ip }}</p>
              </div>
            </el-checkbox-group>
          </div>
        </div>
        <!-- tab 广播 -->
        <el-tab-pane label="广播" name="task">
          <div class="taskBox" v-if="audioDebugActive == 'task'">
            <div class="taskButton">
              <el-button size="small" type="info" @click="addTask">新建任务</el-button>
              <el-button size="small" type="danger" @click="removeTask">删除任务</el-button>
            </div>
            <el-table align="center" :height="300" :context="self" :data="taskList" tooltip-effect="dark" highlight-current-row style="width: 100%;height: 100%"
              @selection-change="handleSelectionTaskChange">
              <el-table-column type="selection" width="55">
              </el-table-column>
              <el-table-column align="center" label="操作" width="80">
                <template scope="scope">
                  <el-button size="small" type="success" @click="startTask(scope.row.id,scope.row.$index)" v-if="scope.row.status === 'UNEXECUTED'">执行</el-button>
                  <el-button size="small" type="warning" @click="stopTask(scope.row.id,scope.row.$index)" v-else>停止</el-button>
                </template>
              </el-table-column>
              <el-table-column align="center" prop="name" label="任务名称"></el-table-column>
              <el-table-column prop="startTime" label="开始时间">
                <template scope="scope">{{ scope.row.startTime | formatDate('HH:mm:ss') }}</template>
              </el-table-column>
              <el-table-column prop="startDate" label="开始日期" align="center">
                <template scope="scope">{{ scope.row.startDate | formatDate('yyyy-MM-dd') }}</template>
              </el-table-column>
              <el-table-column prop="endDate" label="结束日期">
                <template scope="scope">{{ scope.row.endDate | formatDate('yyyy-MM-dd') }}</template>
              </el-table-column>
              <el-table-column prop="status" label="任务状态">
                <template scope="scope">{{ scope.row.status | typeText }}</template>
              </el-table-column>
              <el-table-column prop="file" label="播放文件">
                <template scope="scope">{{ scope.row.file }}</template>
              </el-table-column>
            </el-table>
          </div>
        </el-tab-pane>
        <!-- tab 直播 -->
        <el-tab-pane label="直播" name="intercom">
          <template v-if="audioDebugActive == 'intercom'">
            <!-- 缺少直播状态 -->
            <el-button type="success" class="intercomBtn" @click="startIntercom">开始直播</el-button>
            <el-button type="warning" class="intercomBtn" @click="stopIntercom">停止直播</el-button>
          </template>
        </el-tab-pane>
      </el-tabs>
    </div>
    <Modal close-on-click-modal="false" width="1000" v-model="addModal" title="对话框标题" class-name="vertical-center-modal" :loading="loading">
      <modal-header slot="header" :content="addId"></modal-header>
      <add v-if="addModal" @cancel="cancel" @add="subCallback"></add>
      <div slot="footer"></div>
    </Modal>
    <!-- 删除广播任务 -->
    <Modal close-on-click-modal="false" height="200" v-model="removeModal" class-name="vertical-center-modal" :loading="loading"
      :width="500">
      <modal-header slot="header" :content="removeId"></modal-header>
      <remove v-if="removeModal" :delete-url="api.delete" @remove="subCallback" @cancel="cancel" :operaility-data="operailityData"></remove>
      <div slot="footer"></div>
    </Modal>
  </div>
</template>

<script>
  import api from '../api';
  import add from './task_add'; // 增加广播任务
  export default {
    data() {
      return {
        api,
        checkAll: true, // 房间全选
        checkedRooms: [], // 已选房间
        roomList: [ // 待选房间列表
          {
            "id": "1",
            "roomNum": "107"
          },
          {
            "id": "2",
            "roomNum": "108"
          },
          {
            "id": "3",
            "roomNum": "109"
          }
        ],
        isIndeterminate: false, // 房间是否已全选
        audioDebugActive: 'task', // 默认显示视图

        boxVol: '', // 设备音量
        boxList: [ // 
          {
            "id": 1,
            "brand": "DAHUA",
            "modelNum": "HK508-5128",
            "ip": "192.168.1.1",
            "locationType": "ROOM",
            "roomId": "1",
            "roomNum": "101",
            "orther": "六层",
            "status": "OFFLINE",
            "volume": "50"
          },
          {
            "id": 2,
            "brand": "DAHUA",
            "modelNum": "HK508-5128",
            "ip": "192.168.1.1",
            "locationType": "ROOM",
            "roomId": "1",
            "roomNum": "101",
            "orther": "六层",
            "status": "OFFLINE",
            "volume": "100"
          },
          {
            "id": 3,
            "brand": "DAHUA",
            "modelNum": "HK508-5128",
            "ip": "192.168.1.1",
            "locationType": "ROOM",
            "roomId": "1",
            "roomNum": "101",
            "orther": "六层",
            "status": "OFFLINE",
            "volume": "1"
          }
        ], // 所选房间对应的音箱设备列表
        boxAllId: [], // 所有设备id
        checkBoxs: [], // 已选择的音响设备

        self: this,
        taskList: [ // 
          {
            "id": "1",
            "name": "测试广播",
            "startTime": "2017-01-01 12:12:20",
            "startDate": "2017-01-01",
            "endDate": "2017-01-05",
            "status": "EXECUTING",
            "file": '', // 缺少字段
          },
          {
            "id": "2",
            "name": "测试广播",
            "startTime": "2017-01-01 12:12:20",
            "startDate": "2017-01-01",
            "endDate": "2017-01-05",
            "status": "UNEXECUTED",
            "file": '', // 缺少字段
          }
        ], // 广播任务列表
        taskSelect: [], // 选择的广播任务

        operailityData: '',

        loading: false,
        // 弹窗
        removeId: {
          id: "removeId",
          title: "删除任务"
        },
        addId: {
          id: "addId",
          title: "新建任务"
        }
      }
    },
    methods: {
      // 全选
      handleCheckAllChange(event) {
        let selectArr = [];
        if (event.target.checked) {
          selectArr = this.getAllRoomId()
        }
        this.checkedRooms = selectArr;
        this.isIndeterminate = false;
        this.getBoxForSelectRoom();
      },
      // 房间选择
      handleCheckedRoomsChange(value) {
        let checkedCount = value.length;
        this.checkAll = checkedCount === this.roomList.length;
        this.isIndeterminate = checkedCount > 0 && checkedCount < this.roomList.length;
        this.getBoxForSelectRoom();
      },
      // 音响设备选择(全选|反选)
      handleCheckedBoxChange(all) {
        this.checkBoxs = all ? this.boxAllId : this.$util._.difference(this.boxAllId, this.checkBoxs)
      },
      // 广播任务选择
      handleSelectionTaskChange(val) {
        this.taskSelect = val;
      },
      // 所有房间id
      getAllRoomId() {
        let roomId = [];
        this.roomList.map(room => roomId.push(room.id));
        return roomId;
      },
      // 获取所有设备id
      getAllBoxId() {
        let boxId = [];
        this.boxList.map(box => boxId.push(box.id));
        this.boxAllId = boxId;
      },
      // 待选房间初始化
      successGetRoomData(res) {
        this.roomList = res.data || [];
        if (res.data.length) {
          this.getAllRoomId();
          this.getBoxForSelectRoom();
        }
      },
      // 待选设备初始化
      successGetBoxData(res) {
        this.roomList = res.data || [];
        res.data.length && this.getAllBoxId();
      },
      // 设备任务列表初始化
      successGetTaskData(res) {
        this.taskList = res.data || [];
      },
      /************************** 任务 ************************************/
      // 执行任务
      startTask(id, index) {
        if (this.checkBoxs.length === 0) {
          this.showMess('执行任务至少需要一个音响设备！');
          return;
        }
        let opt = {
          errorTitle: '任务执行失败!',
          ajaxSuccess: (res) => {
            this.showMess('任务执行成功');
            this.taskList[index].status = 'EXECUTING';
          },
          ajaxParams: {
            url: api.taskExecuting.path + id,
            method: api.taskExecuting.method,
            data: {
              id,
              boxIds: this.checkBoxs.join(',')
            }
          }
        };
        this.ajax(opt);
      },
      // 停止任务
      stopTask(id, index) {
        let opt = {
          errorTitle: '任务停止失败!',
          ajaxSuccess: (res) => {
            this.showMess('任务停止成功');
            this.taskList[index].status = 'EXECUTING';
          },
          ajaxParams: {
            url: api.taskStop.path + id,
            method: api.taskStop.method,
            data: {
              id,
              audiotaskId: 0, // 该参数不存在
            }
          }
        };
        this.ajax(opt);
      },
      /************************** 直播 ************************************/
      // 开始直播
      startIntercom() {
        if (this.checkBoxs.length === 0) {
          this.showMess('执行直播至少需要一个音响设备！');
          return;
        }
        let boxIds = this.checkBoxs.join(',');
        let opt = {
          errorTitle: '直播执行失败!',
          successTitle: '直播执行成功!',
          ajaxParams: {
            url: api.intercomStart.path + boxIds,
            method: api.intercomStart.method,
            params: {
              boxIds
            }
          }
        };
        this.ajax(opt);
      },
      // 停止直播
      stopIntercom() {
        let opt = {
          errorTitle: '停止直播失败!',
          successTitle: '停止直播成功!',
          ajaxParams: {
            url: api.intercomStop.path,
            method: api.intercomStop.method,
            data: {}
          }
        };
        this.ajax(opt);
      },
      /************************** 弹窗 ************************************/
      // 创建任务
      addTask() {
        this.openModel('add')
      },
      // 删除任务
      removeTask() {
        if (!this.isSelected()) return;
        this.operailityData = this.taskSelect;
        this.openModel('remove');
      },
      /*
       * 打开指定的模态窗体
       * @param options string 当前指定的模态:"add"、"edit"
       * */
      openModel(options) {
        this[options + 'Modal'] = true;
      },
      /*
       * 监听子组件通讯的方法
       * 作用:根据不同的参数关闭对应的模态
       * @param targer string example:"add"、"edit"
       * */
      cancel(targer) {
        this[targer + 'Modal'] = false;
      },
      // 弹窗回调
      subCallback(target, title, updata) {
        this.cancel(target);
        if (title) {
          this.successMess(title);
        }
        if (!updata) {
          this.getTaskList();
        }
      },
      /*
       * 列表数据只能选择一个
       * @param isOnly true  是否只选择一个
       */
      isSelected() {
        let len = this.taskSelect.length;
        let flag = true;
        if (len === 0) {
          this.showMess("请选择需要删除的任务!");
          flag = false;
        }
        return flag;
      },
      /************************ 音量设置 **********************************/
      // 音量获取
      setBoxVol(type) {
        let box = this.boxList;
        let checkBox = this.checkBoxs; // 需要设置音量的设备
        if (checkBox.length !== 1) {
          this.errorMess('只能给一个音响设备设置音量');
          return;
        }
        let boxVol; // 音量
        let boxIndex; // 设备索引
        let boxId = checkBox[0]; // 设备id
        box.map((item, index) => {
          if (item.id === boxId) {
            boxIndex = index;
            return;
          }
        })
        if (type) {
          boxVol = Number(box[boxIndex].volume); // 获取原来设备的音量
          if (type === 'add') { // 增加音量
            boxVol += 1
          } else { // 减少音量
            boxVol -= 1
          }
        } else {
          boxVol = this.boxVol; // 获取输入的音量
        }
        if (boxVol < 1 || boxVol > 100) {
          this.errorMess('音量必须在1-100之间');
        } else {
          // 设置音量
          this.setBoxVolume(boxId, boxVol, boxIndex)
        }
      },
      // 音量设置
      setBoxVolume(id, num, index) {
        let opt = {
          errorTitle: '音量设置失败!',
          ajaxSuccess: (res) => {
            successMess('音量设置成功');
            this.boxList[index].volume = num;
          },
          ajaxParams: {
            url: api.remove.path + id,
            method: api.remove.method,
            data: {
              id,
              volume: num
            }
          }
        };
        this.ajax(opt);
      },
      /*********************** 从服务器获取数据 ****************************/
      // 获取房间列表
      getSelectRoom() {
        let opt = {
          errorTitle: '获取房间失败!',
          ajaxSuccess: 'successGetRoomData',
          ajaxParams: {
            url: api.roomList.path,
            method: api.roomList.method,
            params: {}
          }
        };
        this.ajax(opt);
      },
      // 获取所选房间对应的设备
      getBoxForSelectRoom() {
        let opt = {
          errorTitle: '获取音响设备失败!',
          ajaxSuccess: 'successGetBoxData',
          ajaxParams: {
            url: api.debuglist.path,
            method: api.debuglist.method,
            params: {
              roomIds: this.checkedRooms.join(','), // 房间id字符串
              locationType: '', // 音箱所在位置 ROOM|ORTHER
            }
          }
        };
        this.ajax(opt);
      },
      // 获取任务列表
      getTaskList() {
        let opt = {
          errorTitle: '获取调试列表失败!',
          ajaxSuccess: 'successGetTaskData',
          ajaxParams: {
            url: api.taskList.path,
            method: api.taskList.method,
            params: {}
          }
        };
        this.ajax(opt);
      },
      // 初始化
      init() {
        this.getSelectRoom();
        this.getTaskList();
        this.getAllBoxId(); // 调试后删除
      }
    },
    components: {
      add,
    },
    created() {
      this.init();
    }
  }

</script>

<style lang="scss">
  $bodrderColor:#e3e8ee;
  .audioDebug {
    margin: -16px;
    min-height: 350px;
    position: relative;
    .adRoom {
      width: 150px;
      position: absolute;
      left: 0;
      top: 0;
      height: 100%;
      border-right: 1px solid $bodrderColor;
      z-index: 2;
    }
    .adContent {
      width: 100%;
      height: 100%;
      max-height: 600px;
      padding-left: 151px;
      z-index: 1;
    }
  }

  .adRoom {
    .adrTitle {
      width: 100%;
      line-height: 40px;
      text-align: center;
      border-bottom: 1px solid $bodrderColor;
    }
    .adrChkAll {
      padding: 10px 16px;
    }
    .adrList {
      position: absolute;
      top: 80px;
      bottom: 0;
      width: 100%;
      padding-left: 16px;
      overflow: auto;
    }
    .adrItem {
      margin-bottom: 10px;
    }
  }

  .adContent {
    .floatLeft {
      float: left;
    }
    .floatRight {
      float: right;
    }
    .adcrButtonList {
      overflow: hidden; // margin-bottom: 10px;
      .setVolume {
        width: 140px;
        margin: 0 12px;
      }
    }
    .adcBoxList {
      padding: 0 10px;
      margin: 10px 0;
      max-height: 208px;
      overflow: auto;
      border-bottom: 1px solid $bodrderColor;
    }
    .adcrBoxItem {
      width: 80px;
      float: left;
      margin-bottom: 20px;
      position: relative;
      &:not(:nth-child(9n)) {
        margin-right: 20px;
      }
      p {
        text-align: center;
      }
      .el-checkbox {
        position: absolute;
        left: 0;
        top: 0;
      }
      .el-checkbox__label {
        display: none;
      }
    }
    .audioVolume {
      position: absolute;
      right: 24px;
      top: 0;
      color: #fcb433;
    }
    .audioImg {
      width: 60px;
      display: block;
      margin: 0 auto;
    }
    .taskBox {
      .taskButton {
        margin: 10px;
      }
    }
    .intercomBtn {
      margin-left: 10px;
    }
  }

</style>
