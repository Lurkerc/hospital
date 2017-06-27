<template>
  <!--抽签设置-->
  <div>
    <layout-tree>
      <selectRoom slot="left" style="height:400px;" @add="roomAdd" :disShow="disShowRoom"></selectRoom>
      <div slot="right" style="height:100%;border-left:1px solid #d1dbe5;">
        <el-tabs v-model="editableTabsValue" type="card" closable @tab-remove="removeTab" style="padding-left:10px;">
          <el-tab-pane v-for="(item, index) in editableTabs" :key="item.name" :label="item.title + (index + 1)" :name="item.name">
            <div style="height:342px;overflow:auto;">
              <template v-if="item.room.length">

                <room v-for="roomIndex in item.room" :option="{hasMore: false, hasAdd:false,type:'view'}" :initData="{index: roomIndex,name:roomInfo[roomIndex].stationName}"
                  :key="roomIndex" style="width:88px;margin-left:10px;" @iconRemove="roomRemove(index,roomIndex)"></room>

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
        <el-button type="info" @click="addTab">添加抽签组</el-button>
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
        editableTabs: [], // 标签组
        roomInfo: [], // 考站信息
        roomList: [], // 考站
      }
    },
    methods: {

      /***************** 考站 ***************************/
      // 增加
      roomAdd(index) {
        let tabIndex = this.editableTabsValue - 1; // 当前打开的抽签组
        let tab = this.editableTabs[tabIndex]; // 标签组
        // console.log(tabIndex, tab)
        // 该标签不存在
        if (!tab) {
          this.showMess("请先添加抽签组");
          return;
        }

        let time = this.roomInfo[(tab.room[0] || 0)].timeCount; // 当前标签组中的第一个考站的时间信息
        let addRoomTime = this.roomInfo[index].timeCount; // 加入的考站时间
        if (tab.room.length && (+addRoomTime !== +time)) { // 如果该抽签组已有考站则进行时间比较
          this.showMess("该考站的考试时间与当前抽签组中的考站的考试时间不一致，请重新选择！");
          return;
        }

        let addSpecialty = this.roomList[index].room[0].specialty; // 增加的考站的专业
        for (let i = 0, list = tab.room, len = list.length, item; i < len; i++) {
          item = this.roomList[list[i]].room[0].specialty;
          // 全部可加入任何专业的考站
          // if (addSpecialty !== 0 && (item !== 0 && item != addSpecialty)) { // 如果该抽签组已有考站则进行专业比较，只有同一专业的才能加入同一个抽签组
          if (item != addSpecialty) { // 如果该抽签组已有考站则进行专业比较，只有同一专业的才能加入同一个抽签组
            this.showMess("该考站的专业与当前抽签组中的考站的专业不一致，请重新选择！");
            return;
          }
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
          title: '抽签组',
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
          if (roomInfo[i].isQueue === 'YES') { // 该考站为抽签考站
            this.disShowRoom.push(i); // 在待选框中不显示该考站
            continue;
          }
          // 如果没有抽签编号或者不是抽签项则跳过
          if (roomInfo[i].isDraw === 'NO' || !roomInfo[i].drawNum) {
            continue;
          }
          let drawNum = (roomInfo[i].drawNum).toString(); // 抽签组编号
          if (tabs[drawNum]) {
            // 根据抽签编号进行考站初始化
            tabs[drawNum].room.push(i);
          } else {
            // 根据抽签编号初始化抽签组
            tabs[drawNum] = {
              name: drawNum,
              title: '抽签组',
              room: [i]
            }
          }
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
            title: '抽签组',
            room: []
          }
        }

        this.editableTabs = tabArr;
        this.editableTabsValue = tabArr[0].name;
      },
      /****************** 底部按钮 **********************************/
      // 取消，不保存任何操作并关闭模态窗
      cancel() {
        this.$emit('cancel', 'setDraw')
      },
      // 确定，保存操作数据并关闭模态窗
      save() {
        let tabs = this.editableTabs;
        // 更新已经设置了抽签的考站信息
        tabs.map((item, drawIndex) => {
          let room = item.room;
          room.map(index => {
            this.$store.commit('examineInterval/room/updateRoomInfo', {
              index,
              value: {
                isDraw: 'YES',
                drawNum: drawIndex + 1
              }
            })
          })
        })
        // 更新未设置抽签的考站
        let infoLen = this.roomInfo.length; // 考站信息
        let isDraw = this.disShowRoom; // 已经设置为抽签考站
        let i = 0;
        while (i < infoLen) {
          if (isDraw.indexOf(i) === -1) { // 更新为未设置抽签考站
            this.$store.commit('examineInterval/room/updateRoomInfo', {
              index: i,
              value: {
                isDraw: 'NO',
                drawNum: ''
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
      this.roomList = this.$store.state.examineInterval.room.roomList;
      this.initEditableTabs();
    },
    components: {
      layoutTree,
      selectRoom,
      room
    }
  }

</script>
