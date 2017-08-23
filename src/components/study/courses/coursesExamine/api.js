const api = {
  list: { // 待审核列表
    path: '/course/query-audit',
    method: 'get',
  },
  submitAudit: { // 提交审核
    path: '/course/submitAudit',
    method: 'post',
  },
  dateList: { // 获取房间开放日期列表（获取房间开放日期列表时调用）
    path: 'reserve/room/date/list',
    method: 'get'
  },
  timeList: { // reserve/room/time/select/list
    path: 'reserve/room/time/select/list',
    method: 'get'
  },
};

export default api
