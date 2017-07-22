/*----- 住院医__轮转安排 --------------------------------------------------------------------------------*/
const groupFile = 'traineeRotary/userGroup';
/*----- 轮转安排__手工调整 --------------------------------------------------------------------------------*/
const handWork ="/traineeRotary/arrangeRotary";

const api = {
  /*----- 轮转安排 --------------------------------------------------------------------------------*/
  selectCourseGet: { // 选课页面展示-根据当前登陆人对应的学校,获取所有任选轮转科室设置
    path :  '/rotationProcess/selectCourse/get',
    method : 'get'
  },

  /*----- 手工调整 --------------------------------------------------------------------------------*/

  restoreRotary:{ // 恢复轮转  {userId}
    path: handWork + '/restoreRotary',
    method: 'post'
  },
  pauseRotary:{ // 暂停轮转  {userId}
    path: handWork + '/pauseRotary',
    method: 'post'
  },
  deleteRotary:{ // 删除轮转
    path: handWork + '/deleteRotary_SXS',
    method: 'delete'
  },
  getRotaryDepIndo:{  //微调-查看用户轮转表  {userId}
    path: handWork + '/getRotaryDepIndo_SXS',
    method: 'get'
  },
  regUserMicrCtrol:{  //手工调整--轮转微调  保存微调的数据
    path: handWork + '/regUserMicrCtrol',
    method: 'post'
  },
  rtuserPagelist:{  //手工调整--轮转微调人员列表
    path: handWork + '/rtuserPagelist_SXS',
    method: 'get'
  },
  getDepPagelist:{  //手工调整--获取微调的科室
    path: '/internship/outline/get',
    method: 'get'
  },
};

export default api

