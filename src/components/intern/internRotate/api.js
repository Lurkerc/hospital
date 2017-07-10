/*----- 实习生__实习大纲 --------------------------------------------------------------------------------*/
const groupFile = 'traineeRotary/userGroup';
/*----- 轮转安排__分组设置 --------------------------------------------------------------------------------*/
const depReFile = 'deprequirement';
const api = {
  /*----- 分组设置 --------------------------------------------------------------------------------*/

  groupList: { // 实习生分组列表
    path: groupFile + '/pagelist',
    method: 'get'
  },
  groupAdd: { // 添加实习生分组
    path: groupFile + '/add',
    method: 'post'
  },
  groupAdd: { // 修改实习生分组  {groupId}
    path: groupFile + '/modify',
    method: 'put'
  },
  groupShow: { // 修改实习生分组  {groupId}
    path: groupFile + '/get',
    method: 'put'
  },
  getGroupDetails: { // 根据专业或学校获取待安排的分组详情(自动安排轮转时展示小组详情以及人员详情)
    path: groupFile + '/getDepGroupNoReleaseUser',
    method: 'get'
  },
  noReleaseList: { // 添加组-第三步（添加分组） 查找还未安排轮转的组
    path: groupFile + '/noReleaselist',
    method: 'get'
  },
  schools:{ //查询学校
    path: "/schools/queryList",
    method: 'get'
  },
  specialty:{ //查询专业
    path: "/dictionary/getByCode/TRAINING_DIRECTION_SX",
    method: 'get'
  },
  schoolGetDg:{ //学校专业对应大纲-根据学校ID获取实习大纲集合
    path: "/internship/outline/list",
    method: 'get'
  },


  /*----- 自动安排 --------------------------------------------------------------------------------*/
  depReList: { // 实习医院各个专业下科室轮转要求列表
    path: depReFile + '/pagelist',
    method: 'get'
  },

  /*----- 手工调整 --------------------------------------------------------------------------------*/
  // 实习费收费标准、大病历填写设置
  modifyConfigId:{ // 实习费收费标准  黏贴比例修改  {configId}
    path: '/rotaryConfig/modify/',
    method: 'put'
  },

  /*----- 自选科室 --------------------------------------------------------------------------------*/
  depReList: { // 实习医院各个专业下科室轮转要求列表
    path: depReFile + '/pagelist',
    method: 'get'
  },
};

export default api

