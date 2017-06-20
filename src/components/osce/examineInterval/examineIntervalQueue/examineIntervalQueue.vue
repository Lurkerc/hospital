<template>
  <!--队列设置-->
  <div class="queue">
    <layout-tree>
      <selectRoom slot="left" style="height:400px;" @add="roomAdd" :disShow="disShowRoom"></selectRoom>
      <div slot="right" style="height:100%;border-left:1px solid #d1dbe5;">
        <el-tabs v-model="editableTabsValue" type="card" closable @tab-remove="removeTab" style="padding-left:10px;">
          <el-tab-pane v-for="(item, index) in editableTabs" :key="item.name" :label="item.title + (index + 1)" :name="item.name">
            <div style="height:342px;overflow:auto;" :key="index">
              <template v-if="item.room.length" v-for="(roomIndex,moveIndex) in item.room">

                <room :option="{hasMore: false, hasAdd:false,type:'view'}" :initData="{index: roomIndex,name:roomInfo[roomIndex].stationName}"
                  :key="moveIndex + '-' + roomIndex" style="width:88px;margin-left:10px;" @iconRemove="roomRemove(index,roomIndex)"></room>

                <template v-if="item.room.length > 1 && moveIndex < item.room.length - 1">
                  <div class="move">
                    <img src="../../../../assets/ambuf/images/left.png" class="moveImg moveLeft" @click="moveLeftOrRight(index,moveIndex)" />
                    <img src="../../../../assets/ambuf/images/right.png" class="moveImg moveRight" @click="moveLeftOrRight(index,moveIndex)"
                    />
                  </div>
                </template>

              </template>
              <template v-else>
                <p style="padding-left:10px;">请添加考站</p>
              </template>
            </div>
          </el-tab-pane>
        </el-tabs>
      </div>
    </layout-tree>
    <el-row style="padding-top:10px;border-top:1px solid #d1dbe5;">
      <el-col :span="4" :offset="7" align="center">
        <el-button type="info" @click="addTab">添加队列组</el-button>
      </el-col>
      <el-col :span="3" align="center">
        <el-button type="success" @click="save">确定</el-button>
      </el-col>
      <el-col :span="3" align="center">
        <el-button type="danger" @click="cancel">取消</el-button>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  import layoutTree from '../../../common/layoutTree'; // 左右结构
  import selectRoom from '../examineIntervalSelectRoom/examineIntervalSelectRoom'; // 选择考站
  import room from '../examineInterval_room'; // 考站

  export default {
    data() {
      return {
        disShowRoom: [], // 不显示在待选框中的考站
        editableTabsValue: '1', // 标签激活
        editableTabs: [{
          name: '1',
          title: '队列组',
          room: [] // undefined 占位，队列内顺序从1开始
        }], // 标签组
        roomInfo: [], // 考站信息
      }
    },
    methods: {
      /***************** 考站 ***************************/
      // 增加
      roomAdd(index) {
        let tabIndex = this.editableTabsValue - 1; // 当前打开的队列组

        let tab = this.editableTabs[tabIndex]; // 标签组
        // 该标签不存在
        if (!tab) {
          this.showMess("请先添加队列组");
          return;
        }

        // 不重复添加
        if (tab.room.indexOf(index) > -1) {
          return;
        }
        // 把点击的考站加入到该标签中
        tab.room.push(index);
        this.disShowRoom.push(index); // 隐藏该考站
      },
      // 移除
      roomRemove(index, roomIndex) {
        let room = this.editableTabs[index].room; // 该考站所在的标签组
        let removeIndex = room.indexOf(roomIndex); // 考站在标签组中的索引
        if (removeIndex > -1) {
          room.splice(removeIndex, 1); // 从标签组中删除该考站
          this.showRoom(roomIndex);
        }
      },
      // 显示考站
      showRoom(roomIndex) {
        let disShowIndex = this.disShowRoom.indexOf(roomIndex);
        disShowIndex > -1 && this.disShowRoom.splice(disShowIndex, 1); // 显示该考站
      },
      /******************  组操作 ************************/
      // 添加
      addTab() {
        let len = this.editableTabs.length;
        let name = (len && (+this.editableTabs[len - 1].name + 1).toString()) || '1'; // 如果存在分组，则下一个分组标识将+1，否则从1开始
        this.editableTabs.push({
          name,
          title: '队列组',
          room: [] // 记录当前组内的考站索引
        });
        this.editableTabsValue = name;
      },
      // 移除
      removeTab(targetName) {
        let tabs = this.editableTabs;
        let activeName = this.editableTabsValue;
        let room = []; // 该标签中的考站
        if (activeName === targetName) {
          tabs.forEach((tab, index) => {
            room = tabs[index].room; // 记录该标签中的考站
            if (tab.name === targetName) {
              // 此处还需要移除此tab中的数据
              let nextTab = tabs[index + 1] || tabs[index - 1];
              if (nextTab) {
                activeName = nextTab.name;
              }
            }
          });
        }
        this.editableTabsValue = activeName;
        this.editableTabs = tabs.filter(tab => tab.name !== targetName);
        room.length && room.map(roomIndex => this.showRoom(roomIndex)); // 显示该标签中的所有考站
      },
      /****************** 初始化数据 ********************************/
      // 初始化标签组
      initEditableTabs() {
        let tabs = {};
        let roomInfo = this.roomInfo;
        for (var i = 0, l = roomInfo.length; i < l; i++) {
          let queueOrder = roomInfo[i].queueOrder; // 队列内顺序
          if (roomInfo[i].isDraw === 'YES') { // 该考站为抽签考站
            this.disShowRoom.push(i); // 在待选框中不显示该考站
            continue;
          }
          // 如果没有队列编号或者不是队列项则跳过
          if (roomInfo[i].isQueue === 'NO' || !roomInfo[i].queueNum) {
            continue;
          }
          let queueNum = (roomInfo[i].queueNum).toString(); // 队列组编号
          if (!tabs[queueNum]) {
            // 根据队列编号初始化队列组
            tabs[queueNum] = {
              name: queueNum,
              title: '队列组',
              room: []
            }
          }
          tabs[queueNum].room[queueOrder - 1] = i;
          this.disShowRoom.push(i); // 在待选框中不显示该考站
        }

        let tabArr = [];
        let noTabs = true; // 记录是否有值初始化
        for (var item in tabs) {
          tabArr.push(tabs[item])
          noTabs = false;
        }

        if (noTabs) { // 如果没有初始化则此处进行默认值初始化
          tabArr[0] = {
            name: '1',
            title: '队列组',
            room: [] // undefined 占位，队列内顺序从1开始
          }
        }

        this.editableTabs = tabArr;
        this.editableTabsValue = tabArr[0].name;
      },
      /****************** 左右移动 **********************************/
      // 左移动、右移动
      moveLeftOrRight(index, moveIndex) {
        let room = this.editableTabs[index].room;
        let moveData = room[moveIndex]; // 记录删除之前的值
        room.splice(moveIndex, 1); // 先删
        room.splice(moveIndex + 1, 0, moveData); // 再加
      },
      /****************** 底部按钮 **********************************/
      // 取消，不保存任何操作并关闭模态窗
      cancel() {
        this.$emit('cancel', 'setQueue')
      },
      // 确定，保存操作数据并关闭模态窗
      save() {
        let tabs = this.editableTabs;
        // 更新已经设置了队列的考站信息
        tabs.map((item, drawIndex) => {
          let room = item.room;
          room.map((index, orderIndex) => {
            this.$store.commit('examineInterval/room/updateRoomInfo', {
              index,
              value: {
                isQueue: 'YES',
                queueNum: drawIndex + 1,
                queueOrder: orderIndex + 1,
              }
            })
          })
        })
        // 更新未设置队列的考站
        let infoLen = this.roomInfo.length; // 考站信息
        let isDraw = this.disShowRoom; // 已经设置为队列考站
        let i = 0;
        while (i < infoLen) {
          if (isDraw.indexOf(i) === -1) { // 更新为未设置队列考站
            this.$store.commit('examineInterval/room/updateRoomInfo', {
              index: i,
              value: {
                isQueue: 'NO',
                queueNum: '',
                queueOrder: '',
              }
            })
          }
          i++;
        }
        this.$emit('set')
      },
    },
    created() {
      this.roomInfo = this.$store.state.examineInterval.room.roomInfo;
      this.initEditableTabs();
    },
    components: {
      layoutTree,
      selectRoom,
      room
    }
  }

</script>
<style lang="scss">
  @import'../../../../assets/ambuf/css/examineInterval_v1.0/queue'

</style>
