const thisFile = '/signupRecruit';
const api = {
  list: { // 列表数据
    path: thisFile + '/trialSxUser/reviewList',
    method: 'get'
  },
  getConfigByKey: { // 根据key和生源类型查看单个配置
    path: '/rotaryConfig/getByKey/', // {configKey}-{userType}
    method: 'get'
  },
  files: { // 获取附件
    path: '/archives/list/files/', // {userId}
    method: 'get'
  },
  trialSxUser: { // 根据学员ID审核学员
    path: thisFile + '/trialSxUser/', // {userId}
    method: 'post'
  },

  /************************ 选择宿舍 *********************************/
  allBuild: { // 获取所有宿舍大楼
    path: '/dormitory/build/query/allBuild',
    method: 'get'
  },
  roomList: { // 宿舍大楼对应的宿舍
    path: '/dormitory/room/query/changeRoom',
    method: 'get'
  }
};

export default api
