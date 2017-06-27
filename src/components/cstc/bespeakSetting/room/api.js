const thisFile = 'reserve/room';
const api = {
  set: { // 房间预约设置（保存房间预约情况时调用）
    path: thisFile + '/set',
    method: 'post'
  },
  timeSelect: { // 房间时间段选择列表（预约房间查询房间预约情况时调用）
    path: thisFile + '/time/select/list',
    method: 'get'
  },
  setList: { // 获取房间以及房间预约设置情况列表（加载房间预约设置情况列表时调用）
    path: thisFile + '/set/list',
    method: 'get'
  },
  dateList: { // 获取房间开放日期列表（获取房间开放日期列表时调用）
    path: thisFile + '/date/list',
    method: 'get'
  },
  get: { // 查看房间预约设置情况（查看房间预约设置情况详情时、设置一个房间的预约情况加载时调用）
    path: thisFile + '/set/get/', // { roomId }
    method: 'get'
  },
  delete: thisFile + '/remove', // 删除
};

export default api
