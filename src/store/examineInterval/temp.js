/**
 * 考核场次 --- 考站信息缓存（不保存则不做更新原信息）
 */
import _ from "lodash";

let state = {
  info: {}, // 基本共用信息
  room: {}, // 该站房间信息
  teacher: [], // 监考老师信息
  unSelectRoom: [], // 禁选房间id集合
  unSelectUser: {}, // 不允许选择的人员
};

let mutations = {
  // 初始化数据
  initData: (state, infoData) => {
    infoData = _.defaultsDeep({}, infoData);
    state.info = infoData.info;
    state.room = infoData.room;
    state.teacher = infoData.teacher;
    state.unSelectRoom = infoData.unSelectRoom;
    state.unSelectUser = infoData.unSelectUser;
  },
  // 初始化老师
  initTeacher: (state, teacherArr) => state.teacher = teacherArr || [],
  /**
   * 初始化隐藏考站
   * @param state
   */
  initUnSelectRoom: (state) => state.unSelectRoom = [],
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
  addUnSelectRoom: (state, roomId) => {
    if (!state.unSelectRoom.indexOf(+roomId) > -1) {
      state.unSelectRoom.push(+roomId)
    }
  },
  /**
   * 增加不可选择人员
   * userArrObj { manager:[] } || { sp: 1,user: [1,2] }
   */
  addUnSelectUser: (state, userArrObj) => {
    Object.keys(userArrObj).map(key => {
      if (state.unSelectUser[key] instanceof Array) {
        state.unSelectUser[key] = state.unSelectUser[key].concat(userArrObj[key])
      } else {
        state.unSelectUser[key].push(userArrObj[key]);
      }
    })
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
   * 更新不可选择人员
   * userArrObj { manager:[] }
   */
  updateUnSelectUser: (state, userArrObj) => {
    Object.keys(userArrObj).map(key => {
      state.unSelectUser[key] = userArrObj[key]
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
  removeUnSelectRoom: (state, roomId) => {
    let index = state.unSelectRoom.indexOf(+roomId);
    if (index > -1) {
      state.unSelectRoom.splice(index, 1)
    }
  },
  /**
   * 删除不可选择人员 
   * userObj { type:sp, index:1 } 从sp人员中删除第2个
   */
  removeUnSelectUser: (state, userObj) => {
    state.unSelectUser[userObj.type].splice(userObj.index, 1)
  },
  /**
   * 删除不可选择人员 
   * userObj { type:sp, id:1 } 从sp人员中删除指定id
   */
  removeUnSelectUserById: (state, userObj) => {
    let theUserIdArr = state.unSelectUser[userObj.type];
    let index = theUserIdArr.indexOf(userObj.id);
    theUserIdArr.splice(index, 1);
  },
  // 值销毁
  destroy: state => {
    state.info = null; // 基本共用信息
    state.room = null; // 该站房间信息
    state.teacher = null; // 监考老师信息
    state.unSelectRoom = null; // 禁选房间id集合
    state.unSelectUser = null; // 不允许选择的人员
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
