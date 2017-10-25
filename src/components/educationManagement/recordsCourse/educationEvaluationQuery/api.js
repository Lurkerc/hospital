let thisFile = 'inStudy/monthlyReview';
let api = {
  pageList: { // 进修月度考核列表(教学秘书填写)
    path: thisFile + '/list',
    method: 'get'
  },
  get: { // 获取
    path: thisFile + '/get-', // {id}
    method: 'get'
  },

  add: { // 增加
    path: thisFile + '/add',
    method: 'post'
  },
  addSubmit: { // 进修月度考核添加上报
    path: thisFile + '/addSubmit', // {id}
    method: 'post',
  },

  modify: { // 修改
    path: thisFile + '/modify', // {id}
    method: 'put'
  },
  modifySubmit: { // 进修月度考核修改上报
    path: thisFile + '/modifySubmit', // {id}
    method: 'put',
  },

  submit: { // 进修月度考核上报
    path: thisFile + '/submit-', // {id}
    method: 'put'
  },

  delete: thisFile + '/remove', // 删除,

  /******************* 新增的 ***************************/
  getQueryTreeByManager:{ // 获取当前登录人员管理的三级以及三级以下的科室集合
    path: '/hospital/dept/getQueryTreeByManager',
    method:'get'
  },

  /******************* 管理员使用 ****************************/

  pageListManage: { // 进修月度考核列表(管理员查看)
    path: thisFile + '/pageListManage',
    method: 'get'
  },

  review: { // 审核
    path: thisFile + '/review-', // {id}
    method: 'put'
  }
};

export default api;
