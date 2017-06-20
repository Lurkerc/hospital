/**
 * 考核场次 --- 考核基本信息
 */
let state = {
  info: {},
  edit: true, // 是否可编辑
}

const mutations = {
  initInfo: (state) => state.info = { // 考站信息
    sceneName: '', // 考站名称
    sceneType: '', // 考核类型
    startTime: '', // 开始时间
    endTime: '', // 结束时间
    restNum: '', // 中场休息数
    restTime: '', // 中场休息时间
    moveTime: '', // 换站时间
    basicsTime: 1, // 考试时间基数,
    isSpMove: 'NO', // 是否SP轮转
    examineeNum: '', // 考核人数
    stationNum: '', // 考站数量
    status: 'NOARRANGED', // 考核状态
  },
  // 设置考站基本信息
  setInfo: (state, infoData) => {
    Object.keys(infoData).map(key => {
      state.info[key] = infoData[key]
    });
    state.edit = !(infoData.status == 'FINISH' || infoData.status == 'ONGOING');
  },
  // 考站信息是否可编辑
  initEdit: state => state.edit = true,
  // 设置编辑状态
  setEdit: (state, b) => state.edit = b,
}

let getters = {
  // 是否可编辑
  edit: (state) => state.edit,
  // 考站名称
  // sceneName: (state) => state.info.sceneName,
}

export {
  state,
  mutations,
  getters
};
