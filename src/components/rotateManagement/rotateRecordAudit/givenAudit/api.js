const thisFile = '/rotationProcess/outDepAppraise';
const api = {
  managePagelist: { // 非轮转生查看出科鉴定列表
    path: thisFile + '/managePagelist',
    method: 'get'
  },
  depAddComment: { // 添加科室评语
    path: thisFile + '/depAddComment/', // {depExaminationId}
    method: 'put'
  },
  teacherAddComment: { // 添加带教老师评语
    path: thisFile + '/teacherAddComment/', // {depExaminationId}
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
