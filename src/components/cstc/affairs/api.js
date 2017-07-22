const thisFile = 'affair';
const api = {
  list: { // 列表
    path: thisFile + '/list',
    method: 'get'
  },
  add: { // 添加
    path: thisFile + '/add',
    method: 'post'
  },
  get: { // 获取
    path: thisFile + '/get/',
    method: 'get'
  },
  edit: { // 修改
    path: thisFile + '/modify/',
    method: 'put'
  },
  delete: thisFile + '/removes', // 删除
};

export default api
