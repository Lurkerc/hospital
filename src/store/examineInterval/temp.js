/**
 * 考核场次 --- 考站信息缓存（不保存则不做更新原信息）
 */
import _ from "lodash";

let state = {
  info: {}, // 基本共用信息
  room: {}, // 该站房间信息
  teacher: [], // 监考老师信息
  disSelectRoom: [], // 禁选房间id集合
};

let mutations = {
  // 初始化数据
  initData: (state, infoData) => {
    infoData = _.defaultsDeep({}, infoData);
    state.info = infoData.info;
    state.room = infoData.room;
    state.teacher = infoData.teacher;
    state.disSelectRoom = infoData.disSelectRoom;
  },
  // 初始化老师
  initTeacher: (state, teacherArr) => state.teacher = teacherArr || [],
  /**
   * 初始化隐藏考站
   * @param state
   */
  initDisSelectRoom: (state) => state.disSelectRoom = [],
  // 添加老师
  addTeacher: (state, teacherObj) => state.teacher.push(teacherObj),
  /**
   * [添加考站考核内容]
   * @param  {Object} state 无需传参
   */
  addStationContentList: (state) => state.info.stationContentList.push({
    // 站点考核内容列表
    contentName: "",
    scoreTableId: "", // 教师评分表id
    scoreTableName: "", // 教师评分表名称 （del）
    spScoreTableId: "", // SP评分表id
    spScoreTableName: "", // SP评分表名称 （del）
    caseId: "", // 病例id
    caseName: "", // 病例名称 （del）
    scriptId: "", // 剧本id
    scriptName: '', // 剧本名称 （del）
    timeCount: 1 // 考核时间基数倍数
  }),
  /**
   * [不允许选择的房间]
   * @param  {[type]} state  [description]
   * @param  {[type]} roomId [description]
   * @return {[type]}        [description]
   */
  addDisSelectRoom: (state, roomId) => {
    if (!state.disSelectRoom.indexOf(+roomId) > -1) {
      state.disSelectRoom.push(+roomId)
    }
  },
  /**
   * [更新考核指定内容]
   * @param  {[type]} state [description]
   * @param  {[type]} data  [数据对象] { index: '当前更新索引', value: { key:value } }
   */
  updateStationContentList: (state, data) => {
    if (typeof data.index !== 'number') { // 未传索引则不做任何修改操作
      return
    }
    Object.keys(data.value).map(key => {
      state.info.stationContentList[data.index][key] = data.value[key]
    })
  },
  /**
   * [更新监考老师指定内容]
   * @param  {[type]} state [description]
   * @param  {[type]} data  [数据对象] { index: '当前更新索引', key:value }
   */
  updateTeacherData: (state, data) => {
    if (typeof data.index !== 'number') { // 未传索引则不做任何修改操作
      return
    }
    Object.keys(data.value).map(key => {
      state.teacher[data.index][key] = data[key]
    })
  },
  /**
   * 删除考站考核内容
   * @param {any} state 
   * @param {any} index
   */
  removeStationContents: (state, index) => state.info.stationContentList.splice(index, 1),
  /**
   * [删除不允许选择的房间]
   * @param  {[type]} state  [description]
   * @param  {[type]} roomId [description]
   * @return {[type]}        [description]
   */
  removeDisSelectRoom: (state, roomId) => {
    let index = state.disSelectRoom.indexOf(+roomId);
    if (index > -1) {
      state.disSelectRoom.splice(index, 1)
    }
  },
}

let getters = {
  teacher: state => state.teacher
}

export {
  state,
  mutations,
  getters
};
