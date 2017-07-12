const thisFile = '/rotationProcess/graduationAppraise';
const api = {
  list: { // 管理员查看结业鉴定列表
    path: thisFile + '/pagelist',
    method: 'get'
  },
  get: { // 管理员查看个人结业鉴定
    path: thisFile + '/get/', // {appraisalId}
    method: 'get'
  },
  manageAdd: { // 实习单位添加意见 
    path: thisFile + '/manageAdd/', // {appraisalId}
    method: 'post'
  },
};

export default api
