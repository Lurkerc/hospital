const thisFile = 'reserve/project';
const api = {
  dateGet: { // 获取预约项目某一时间的可预约情况（学生预约项目加载项目可预约详情时调用）
    path: thisFile + '/date/get',
    method: 'get'
  },
  list: { // 预约项目列表（加载预约项目列表时调用）
    path: thisFile + '/list',
    method: 'get'
  },
  dateList: { // 获取预约项目开放日期列表（获取预约项目开放日期列表时调用）
    path: thisFile + '/date/list',
    method: 'get'
  },
  myList: { // 获取当前登录能预约的项目列表（加载学生能选择预约项目时调用）
    path: thisFile + '/my/list',
    method: 'get'
  },
  get: { // 查看预约项目详情（查看预约项目详情时、修改预约项目加载时调用）
    path: thisFile + '/get', // { id } 预约项目id
    method: 'get'
  },
  modify: { // 修改预约项目（修改预约项目保存时调用）
    path: thisFile + '/modify',
    method: 'put'
  },
  add: { // 新建预约项目（新建预约项目保存时调用）
    path: thisFile + '/add',
    method: 'post'
  },
  delete: thisFile + '/remove', // 删除
};

export default api
