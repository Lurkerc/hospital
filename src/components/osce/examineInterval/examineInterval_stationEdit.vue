<template>
  <!-- 添加考核 -->
  <div id="stationMain" ref="stationMain" style="height:100%;">
    <div class="el-form selectUserBox">
      <fieldset style="max-height:200px;">
        <legend style="font-size:16px">&nbsp;&nbsp;SP设置
          <el-button type="primary" size="mini" :disabled="!canEdit" @click="addSP" icon="plus"></el-button>&nbsp;&nbsp;</legend>
        <div style="height:150px;overflow:auto;" v-if="spList.length">
          <el-collapse accordion>
            <el-collapse-item v-for="(item,index) in spList" :key="item.managerId">
              <template slot="title">
                {{item.userName}}
              </template>
              <el-checkbox-group v-model="item.scriptIds" v-if="!hasScriptList()">
                <el-checkbox v-for="cItem in scriptList" :disabled="!canEdit" :label="cItem.scriptId" :key="cItem.scriptId">{{ cItem.scriptName }}</el-checkbox>
              </el-checkbox-group>
              <p v-else>暂无病例</p>
            </el-collapse-item>
          </el-collapse>
        </div>
        <p v-else>暂无SP人员</p>
      </fieldset>
    </div>

    <!-- 考站相关按钮 -->
    <div style="margin-top:20px;">
      <el-button size="small" type="success" :disabled="!canEdit" @click="addRoom">添加考站</el-button>
      <!-- 规范化考核 -->
      <template v-if="addType === 'STANDARD'">
        <el-button size="small" type="primary" :disabled="!canEdit" @click="openModel('setDraw')">抽签设置</el-button>
        <el-button size="small" type="warning" :disabled="!canEdit" @click="openModel('setQueue')">队列设置</el-button>
      </template>
      <!--<el-button :disabled="!canEdit" size="small" type="success" @click="save" style="float:right;">保存</el-button>-->
      <load-btn v-if="canEdit" size="small" type="success" style="float:right;" @listenSubEvent="listenSubEvent" :btnData="loadBtn"></load-btn>
    </div>
    <!-- 考站 -->
    <div ref="stationRoomBox" id="stationRoomBox" :style="stationRoomStyle">
      <el-row>
        <template v-for="(item,index) in roomList">
          <template v-for="(cItem,cIndex) in item.children">
            <el-tooltip placement="right-start" :open-delay="1500" effect="light">
              <room-info slot="content" :basicsTime="info.basicsTime" :info="roomData[index]" :room="roomList[index].room[cIndex]" :teacher="roomList[index].teacher[cIndex]"
                :key="index+'-'+cIndex" style="max-width:400px;"></room-info>
              <room v-if="canEdit" :option="{hasMore: cIndex > 0,type:'edit'}" :initData="{index: index,cIndex:cIndex,name:roomData[index].stationName,roomNum:item.room[cIndex].roomNum,roomType:roomData[index].stationType === 'SP' ? 'SP' : ''}"
                :key="index+'-'+cIndex" @roomClick="roomClick" @iconAdd="addRoomChildren(index)" @iconRemove="removeRoomChildren(index,cIndex)"
                style="width:80px;margin-left:40px;"></room>

              <room v-else :option="{hasMore: cIndex > 0,hasAdd:false,hasRemove:false,}" :initData="{index: index,cIndex:cIndex,name:roomData[index].stationName,roomNum:item.room[cIndex].roomNum,roomType:roomData[index].stationType === 'SP' ? 'SP' : ''}"
                :key="index+'-'+cIndex" style="width:80px;margin-left:40px;"></room>
            </el-tooltip>
          </template>
        </template>
      </el-row>
    </div>
    <!--设置考站信息-->
    <Modal :mask-closable="false" width="1000" v-model="setInfoModal" title="设置考站信息" class-name="vertical-center-modal">
      <modal-header slot="header" :content="contentHeader.setInfoId"></modal-header>
      <set-info v-if="setInfoModal" @cancel="cancel" @done="updateScripts"></set-info>
      <div slot="footer"></div>
    </Modal>
    <!--设置考站SP信息-->
    <!--<Modal :mask-closable="false" width="890" v-model="setSPModal" title="考站信息SP设置" class-name="vertical-center-modal">
      <modal-header slot="header" :content="contentHeader.setSPId"></modal-header>
      <select-user v-if="setSPModal" @cancel="closeSPUser" :initUser="initUser" @setUsers="setSP"></select-user>
      <div slot="footer"></div>
    </Modal>-->
    <Modal :mask-closable="false" width="890" v-model="setSPModal" title="考站信息SP设置" class-name="vertical-center-modal">
      <modal-header slot="header" :content="contentHeader.setSPId"></modal-header>
      <select-sp-user v-if="setSPModal" @cancel="closeSPUser" @setUsers="setSP" :unSelect="unSelectUser" :initUser="initUser"></select-sp-user>
      <div slot="footer"></div>
    </Modal>
    <!--设置考站抽签信息-->
    <Modal :mask-closable="false" width="890" v-model="setDrawModal" title="考站抽签设置" class-name="vertical-center-modal">
      <modal-header slot="header" :content="contentHeader.setDrawId"></modal-header>
      <set-draw v-if="setDrawModal" @cancel="cancel" @set="setDraw"></set-draw>
      <div slot="footer"></div>
    </Modal>
    <!--设置考站队列信息-->
    <Modal :mask-closable="false" width="890" v-model="setQueueModal" title="考站队列设置" class-name="vertical-center-modal">
      <modal-header slot="header" :content="contentHeader.setQueueId"></modal-header>
      <set-queue v-if="setQueueModal" @cancel="cancel" @set="setQueue"></set-queue>
      <div slot="footer"></div>
    </Modal>
  </div>
</template>

<script>
  let Util = null;

  import {
    mapMutations
  } from 'vuex';

  import api from './api'; // api
  import {
    getModifyStationInfoData
  } from './formatData'; // 获取提交数据

  import room from './examineInterval_room'; // 单个考站
  import roomInfo from './examineIntervalInfo/examineIntervalInfo'; // hover显示考站信息
  import selectSpUser from '../../common/selectUser'; // 选择人员
  import setInfo from './examineIntervalSetInfo/examineIntervalSetInfo'; // 考站设置
  // import setSp from './examineIntervalSP/examineIntervalSP'; // SP设置
  import setDraw from './examineIntervalDraw/examineIntervalDraw'; // 抽签设置
  import setQueue from './examineIntervalQueue/examineIntervalQueue'; // 队列设置

  import * as moreRules from './verification'; // 逻辑验证

  export default {
    props: {
      contenHeight: { // 内容区域高度
        type: Number,
        default: 100
      },
      id: { // 当前操作id
        type: Number,
        required: true
      }
    },
    data() {
      return {
        api,
        self: this,
        addType: '',
        unSelectUser: '',
        info: {}, // 场次信息
        roomList: {}, // 考站
        roomData: {}, // 考站信息
        previewData: {}, // 考核预览数据
        setInfoModal: false,
        setSPModal: false,
        setDrawModal: false,
        setQueueModal: false,

        canEdit: true, // 是否可编辑

        stationRoomStyle: {
          marginTop: '20px',
          height: '100px',
          overflow: 'auto'
        },

        // 模态框信息
        contentHeader: {
          setInfoId: {
            id: 'setInfoId',
            title: '考站信息设置'
          },
          setSPId: {
            id: 'setSPId',
            title: '考站SP设置'
          },
          setDrawId: {
            id: 'setDrawId',
            title: '考站抽签设置'
          },
          setQueueId: {
            id: 'setQueueId',
            title: '考站队列设置'
          }
        },

        // SP人员
        spList: [],
        scriptList: [], // SP人员选择的剧本列表
        initUser: [],

        //保存按钮基本信息
        loadBtn: {
          title: '保存考核',
          callParEvent: 'listenSubEvent'
        },

        //当前组件提交数据时,ajax处理的 基础信息设置
        modifyMessTitle: {
          type: 'edit',
          ajaxSuccess: 'saveSuccess',
          successTitle: '保存成功',
          ajaxParams: {
            jsonString: true,
            url: api.modifyStationInfo.path + this.id,
            method: api.modifyStationInfo.method
          }
        },
      }
    },
    methods: {
      // 从服务器获取最新数据
      getStationData() {
        //当前组件提交(edit)数据时,ajax处理的 基础信息设置
        this.ajax({
          ajaxSuccess: 'initGetStation',
          ajaxParams: {
            url: api.getStationInfo.path + this.id,
            method: api.getStationInfo.method,
          }
        });
      },
      /************************** 初始化页面信息 *********************************/
      initGetStation(res) {
        let data = res.data;
        this.$store.commit('examineInterval/room/setInitData', data);

        this.info = this.$store.state.examineInterval.station.info; // 场次信息
        this.roomList = this.$store.state.examineInterval.room.roomList; // 考站
        this.roomData = this.$store.state.examineInterval.room.roomInfo; // 考站信息
        this.spList = []

        let spList = data.spList || [];
        let scriptList = {};

        if (spList.length) {
          for (var i = 0, item; i < spList.length; i++) {
            item = spList[i];
            let tempArr = []
            if (!item.scriptList) {
              continue
            }
            for (var k = 0; k < item.scriptList.length; k++) {
              tempArr.push(parseInt(item.scriptList[k].scriptId));
              scriptList[item.scriptList[k].scriptId] = item.scriptList[k];
            }
            item.scriptIds = tempArr;
          }
        }

        this.spList = spList;

        // 更新SP人员的可选择剧本
        this.$store.commit('examineInterval/room/initScriptList', scriptList);
        // 初始化临时状态
        this.$store.commit('examineInterval/temp/initData');
        this.updateScripts();
      },
      /************************** ajax回调 *********************************/
      // 保存成功
      saveSuccess() {
        // this.$emit('show', { // 打开默认（index）视图并更新
        //   look: 'index',
        //   update: true
        // })
        this.$message.success('保存成功');
        // 只要保存就更新本地的状态
        this.$store.commit('examineInterval/station/setInfo', {
          status: 'NOARRANGED'
        });
        this.getStationData()
      },
      /************************** 数据处理 ********************************/
      // 格式化提交数据
      getAjaxParamsData() {
        let {
          roomList,
          roomData,
          spList
        } = this;
        let spListVal = [];
        let scriptList = Util._.defaultsDeep({}, this.scriptList);
        // 剧本有效值
        Util._.mapKeys(scriptList, (item, key) => {
          spListVal.push(+key)
        });
        return getModifyStationInfoData({
          roomList,
          roomData,
          spList,
          spListVal
        });
      },
      //************************* 保存 ************************************/
      /*
       * 点击保存考核按钮 监听是否提交数据
       * @param isLoadingFun boolean  form表单验证是否通过
       * */
      listenSubEvent(isLoadingFun) {
        // 检测数据
        if (!this.checkData()) {
          return;
        }
        if (!isLoadingFun) isLoadingFun = function () {};
        isLoadingFun(true)
        this.modifyMessTitle.ajaxParams.data = this.getAjaxParamsData();
        this.ajax(this.modifyMessTitle, isLoadingFun);
      },
      // 检测填写数据
      checkData() {
        // 基本信息校验
        // if (!this.submitForm("info")) {
        //   this.errorMess('基本信息填写不完整！');
        //   return false;
        // }
        // 参考人员
        // if (!moreRules.stationHasUser(this.userList)) {
        //   this.errorMess('请添加参考人员！');
        //   return false;
        // }
        // 是否有考站
        if (!moreRules.hasRoom(this.roomList)) {
          this.errorMess('请添加考站！');
          return false;
        }
        // 考站是否都命名
        let roomHasName = moreRules.roomHasName(this.roomData);
        if (roomHasName !== -1) {
          this.errorMess(`第${roomHasName+1}个考站没有命名！`);
          return false;
        }
        // 有SP考站
        if ((moreRules.hasSPRoom(this.roomData) > -1)) {
          // 是否有SP人员
          let hasSPUser = moreRules.hasSPUser(this.spList);
          if (!hasSPUser) {
            this.errorMess('有SP考站，需要添加SP人员！');
            return false;
          }
          // SP人员是否都有剧本
          let spsIndex = moreRules.spUserHasScript(this.spList);
          if (spsIndex > -1) {
            this.errorMess(`SP人员“${this.spList[spsIndex].userName}”没有剧本，请选择剧本！`);
            return false;
          }
        }

        // 所有考站都有房间（所有考站都有数据）
        let hasRoomId = moreRules.stationHasRoom(this.roomList);
        if (hasRoomId.index > -1) {
          let stationName = this.roomData[hasRoomId.index].stationName; // 考站名称
          let hasMore = hasRoomId.cIndex > 0 ? '平行站的第' + (hasRoomId.cIndex + 1) + '个房间' : '';
          this.errorMess(`“${stationName + hasMore}”没有选择房间！`);
          return false;
        }
        return true
      },
      /*************************** room 组件 *******************************/
      // 添加平行站
      addRoomChildren(index) {
        this.$store.commit('examineInterval/room/addRoomChildren', index)
      },
      // 删除平行站
      removeRoomChildren(index, cIndex) {
        // 删除考站
        this.$store.commit('examineInterval/room/removeRoomChildren', {
          index,
          cIndex
        });
        if (this.roomList[index].children.length < 1) {
          this.$store.commit('examineInterval/room/removeRoom', index); // 删除考站索引
        }
      },
      ...mapMutations({
        addRoom: 'examineInterval/room/addRoom', // 添加考站
      }),
      // 考站点击
      roomClick(data) {
        this.openModel('setInfo');
        this.$store.commit('examineInterval/roomIndex/set', data)
      },
      /*************************** 队列设置 ***********************************/
      setQueue() {
        this.cancel('setQueue');
      },
      /*************************** SP设置 *************************************/
      addSP() {
        let spList = this.spList;
        this.initUser = [];
        if (spList.length > 0) {
          for (var i = 0, item; i < spList.length; i++) {
            item = spList[i];
            this.initUser.push({
              key: item["userId"],
              label: item["userName"],
              description: '人员id---' + item["userId"] + '的描述信息',
              disabled: false
            })
          }
        }
        this.unSelectUser = this.getUnSelectUser('sp');
        this.openModel('setSP');
      },
      // sp设置
      setSP(users) {
        this.spList = [];
        Util._.forEach(users, (val, k) => {
          this.spList.push({
            userId: val["key"],
            userName: val["label"],
            scriptIds: [0, 1]
          })
        })
        this.closeSPUser()
      },
      //关闭选择SP人员弹窗
      closeSPUser() {
        this.cancel('setSP')
      },
      // 是否有病例
      hasScriptList() {
        var t;
        for (t in this.scriptList) {
          return !1;
        }
        return !0;
      },
      // 更新SP可选剧本列表
      updateScripts() {
        this.scriptList = this.$store.state.examineInterval.room.scriptList; // 剧本列表
      },
      /************************** 排除禁选人员 *********************************/
      // 获取禁选人员
      getUnSelectUser(type) {
        let temp = this.$store.state.examineInterval.room.unSelectUser;
        let unSelArr = [];
        Util._.map(temp, (arr, key) => {
          if (key !== type) {
            unSelArr = unSelArr.concat(arr)
          }
        })
        return unSelArr
      },
      /************************** 抽签设置 *************************************/
      // 操作已保存到状态
      setDraw() {
        this.cancel('setDraw');
      },
      /************************** 其他逻辑 *************************************/
      // 点击取消返回列表视图
      back() {
        this.$emit('show', {
          look: 'index'
        })
      },
      /************************** 模态框逻辑 *************************************/
      /*
       * 监听子组件通讯的方法
       * 作用:根据不同的参数关闭对应的模态
       * @param targer string example:"add"、"edit"
       * */
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
      /************************* 底部 *********************************************/
      setRoomListHeight() {
        let contenHeight = this.$refs.stationMain.offsetHeight + 140;
        let roomHeight = this.$refs.stationRoomBox.offsetTop;
        this.stationRoomStyle.height = (contenHeight - roomHeight) + 'px';
      }
    },
    components: {
      room,
      roomInfo,
      selectSpUser,
      setInfo,
      // setSp,
      setDraw,
      setQueue
    },
    created() {
      Util = this.$util;
      let exm = this.$store.state.examineInterval;
      this.addType = exm.station.info.sceneType;
      this.scriptList = exm.room.scriptList;
      this.getStationData();
      this.canEdit = this.$store.getters['examineInterval/station/edit'];
    },
    mounted() {
      //页面dom稳定后调用
      this.$nextTick(function () {
        //初始表格高度及分页位置
        this.setRoomListHeight();
        //为窗体绑定改变大小事件
        let Event = Util.events;
        Event.addHandler(window, "resize", this.setRoomListHeight);
      })
    },
  }

</script>

<style lang="scss">
  @import '../../../assets/ambuf/css/manage_v1.0/editForm';
  #interval {
    height: 100%;
    .itemLayout {
      width: 100%;
    }
  }

  .selectUserBox {
    .el-tag {
      margin: 6px;
    }
  }

</style>
