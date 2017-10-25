const api = {
  pageList: { //进修生回执管理列表
    path: '/inStudy/returnReceipt/pageList',
    method: 'get'
  },
  get: { //进修回执查看 -{userId}
    path: '/inStudy/returnReceipt/get-',
    method: 'get'
  },
  add: { //进修回执填写
    path: '/inStudy/returnReceipt/add',
    method: 'post'
  },
};

export default api
