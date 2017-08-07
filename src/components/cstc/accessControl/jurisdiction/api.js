const thisFile = 'access/door/user/card';
const api = {
  list: { // 列表数据
    path: thisFile + '/list',
    method: 'get'
  },
  selectList: { // 获取人员对应卡号选择列表
    path: thisFile + '/select/list',
    method: 'get'
  },
  modify: { // 修改门禁卡号（修改卡号保存时调用）
    path: thisFile + '/modify/', // {id}
    method: 'put'
  },
  get: { // 获取人员对应门禁卡号详情（修改卡号加载时调用）
    path: thisFile + '/get/', // {id}
    method: 'get'
  },
  add: { // 设置门禁卡号（设置卡号保存时调用）
    path: thisFile + '/add',
    method: 'post'
  },
};

export default api
