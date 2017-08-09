const thisFile = 'criterionCourse';
const api = {
  add: { // 创建标准课程
    path: thisFile + '/add',
    method: 'post'
  },
  get: { // 修改-先查
    path: thisFile + '/get/', // {id}
    method: 'get'
  },
  info: { // 查看
    path: thisFile + '/info/', // {id}
    method: 'get'
  },
  modify: { // 修改
    path: thisFile + '/modify/', // {id}
    method: 'put'
  },
  listPage: { // 列表 (点击树，分页查询标准课程列表)
    path: thisFile + '/listPage',
    method: 'get'
  },
  audit: { // 审核标准课程
    path: thisFile + '/audit/', // {ids}
    method: 'put'
  },
  remove: { // 删除标准课程
    path: thisFile + '/remove', // {ids}
    method: 'delete'
  },
  operation: { // 课程试运行
    path: thisFile + '/operation/', // {id}
    method: 'put'
  },
  endOperation: { // 课程退出
    path: thisFile + '/end/operation/', // {id}
    method: 'put'
  },
};

export default api
