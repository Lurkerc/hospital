let thisFile = 'fund/accounting';
let api = {
  list: { // 列表
    path: thisFile + '/list',
    method: 'get'
  },
  add: { // 增加
    path: thisFile + '/add',
    method: 'post'
  },
  get: { // 获取
    path: thisFile + '/get/', // {id}
    method: 'get'
  },
  modify: { // 修改
    path: thisFile + '/modify/', // {id}
    method: 'post'
  },
  getAccountingType:{ // 经费记录类型
    path: thisFile + '/getAccountingType',
    method: 'get'
  },
  depTree: "/dept/tree", // 部门树
  delete: thisFile + '/remove', // 删除
};

export default api;
