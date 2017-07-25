const thisFile = 'reserve/poject/room';
const api = {
  list: { // 预约项目列表（加载预约项目列表时调用）
    path: thisFile + '/list',
    method: 'get'
  },
  get: { // 查看预约项目详情（查看预约项目详情时、修改预约项目加载时调用）
    path: thisFile + '/get/', // { id } 预约项目id
    method: 'get'
  },
  modify: { // 修改预约项目（修改预约项目保存时调用）
    path: thisFile + '/modify/', // { id } 预约项目id
    method: 'put'
  },
  add: { // 新建预约项目（新建预约项目保存时调用）
    path: thisFile + '/add',
    method: 'post'
  },
  report: { // 上报预约（上报预约时调用）
    path: thisFile + '/report/',
    method: 'put'
  },
  delete: thisFile + '/remove', // 删除

  /******************************* 基本数据 *************************************/
  dateList: { // 获取房间开放日期列表（获取房间开放日期列表时调用）
    path: 'reserve/room/date/list',
    method: 'get'
  },
  teachCourseTime: { // 时间段获取
    path: 'teachCourseTime/list',
    method: 'get'
  },
  dateGet: { // 房间时间段选择列表（预约房间查询房间预约情况时调用）
    path: 'reserve/room/time/select/list',
    method: 'get'
  },

  /********************************** 设备 ********************************************/
  select: { // 获取选择设备列表 
    path: 'reserve/device/select/list',
    method: 'get'
  }
};

export default api
