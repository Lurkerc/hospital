const thisFile = 'room/employ';
const api = {
  list: { // 列表数据
    path: thisFile + '/list',
    method: 'get'
  },
  get: { // 获取
    path: thisFile + '/get/',
    method: 'get'
  },
  modify: { // 修改
    path: thisFile + '/modify',
    method: 'put'
  },
  add: { // 增加
    path: thisFile + '/add',
    method: 'post'
  },
  down: { // 资源下载
    path: '/api/file/download/', // { fileId }
    method: 'get'
  },
  delete: thisFile + '/remove', // 删除
};

export default api
