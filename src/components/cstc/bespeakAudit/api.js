const thisFile = 'reserve/poject/room';
const api = {
  list: { // 获取设备及设备预约设置列表（设备预约设置列表加载时调用）
    path: 'reserve/list',
    method: 'get'
  },
  selectList: { // 预约房间选择设备列表（预约房间选设备时调用）
    path: thisFile + '/select/list',
    method: 'get'
  },
  get: { // 查看设备预约设置详情（查看设备预约设置详情、设置单个设备预约情况加载时调用）
    path: thisFile + '/get/', // { deviceTypeId }
    method: 'get'
  },
  delete: thisFile + '/remove', // 删除
};

export default api
