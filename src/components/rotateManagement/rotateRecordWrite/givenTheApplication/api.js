const thisFile = '/rotationProcess/outDepAppraise';
const api = {
  pagelist: { // 轮转生查看出科鉴定列表
    path: thisFile + '/pagelist',
    method: 'get'
  },
  userAddComment: { // 学员添加个人小结
    path: thisFile + '/userAddComment/', // {depExaminationId}
    method: 'put'
  },
  get: { // 查看出科鉴定
    path: thisFile + '/get/', // {depExaminationId}
    method: 'get'
  },
  getDepartment: { // 根据轮转生以及用户类型获取轮转科室以及状态记录
    path: '/traineeRotary/arrangeRotary/userRotaryDeptlist/', // {userType}-{userId}
    method: 'get'
  },
};

export default api
