/*----- 实习生__实习大纲 --------------------------------------------------------------------------------*/
const groupFile = 'traineeRotary/userGroup';
/*----- 轮转安排__分组设置 --------------------------------------------------------------------------------*/
const depReFile = 'deprequirement';
/*----- 轮转安排__自动排班 --------------------------------------------------------------------------------*/
const rotateSet ="/traineeRotary/arrangeRotary";
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
  groupEdit: { // 修改实习生分组  {groupId}
    path: groupFile + '/modify',
    method: 'put'
  },
  groupDelete: { // 修改实习生分组  {groupId}
    path: groupFile + '/delete',
    method: 'delete'
  },
  groupShow: { // 查看实习生分组  {groupId}
    path: groupFile + '/get',
    method: 'get'
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
  getBigGroup:{  //根据学校和专业获取小组设置分类信息(自动安排轮转--分组安排轮转)
    path: "/internship/outline/listOutlineDepSet",
    method: 'get'
  },


  /*----- 自动排班 --------------------------------------------------------------------------------*/
  rotaryListInit: { // 轮转人员列表展示
    path: rotateSet + '/userPagelist',
    method: 'get'
  },
  rotaryListByUser: { // 轮转人员列表展示-按人员展示
    path: rotateSet + '/userRotaryPagelist',
    method: 'get'
  },
  rotaryListByDep: { // 轮转人员列表展示-按科室展示
    path: rotateSet + '/userRotaryDepPagelist',
    method: 'get'
  },
  depReList: { // 轮转人员列表展示
    path: rotateSet + '/pagelist',
    method: 'get'
  },
  exportExcelByDep:{  //轮转人员按科室展示导出excel
    path: rotateSet + '/userRotaryDepExportExcel',
    method: 'post'
  },
  exportExcelByUser:{  //人员轮转表导出excel
    path: rotateSet + '/userRotaryExportExcel',
    method: 'get'
  },
  getDepReq:{  //获取系统中所有启用的科室要求集合
    path:"/deprequirement/list",
    method: 'get'
  },
  getGroupPeopleDetails: { // 根据专业或学校获取待安排的分组详情(自动安排轮转时展示小组详情以及人员详情)
    path: '/traineeRotary/userGroup/getDepGroupNoReleaseUser',
    method: 'get'
  },
  rotaryDeptGroup:{  //自动安排-按大组安排轮转  按组排班预览
    path: rotateSet + '/rotaryDeptGroup',
    method: 'get'
  },
  userRotaryExportExcel:{   //人员轮转表导出excel
    path: rotateSet + '/userRotaryExportExcel',
    method: 'get'
  },
  userRotaryDepExportExcel:{  //轮转人员按科室展示导出excel
    path: rotateSet + '/userRotaryDepExportExcel',
    method: 'get'
  },
  regrotaryDept:{  //自动安排-过程中安排轮转(按组或人 预览轮转表后点击确定按钮时调用此接口)
    path: rotateSet + '/regrotaryDept',
    method: 'post'
  },
  getSchoolUserInfo:{  //自动安排-根据学校ID集合获取未安排轮转用户信息  {schoolIds}学校的id
    path: rotateSet + '/getSchoolUserInfo',
    method: 'get'
  },
  rotaryDeptUser:{  //自动安排-按人员安排轮转  按人员排班预览
    path: rotateSet + '/rotaryDeptUser',
    method: 'get'
  },
  userRotaryByUserId:{  //根据人员ID和人员类型查看轮转表(自动排班--查看轮转表)  {userType}-{userId} 例如:SXS-100
    path: rotateSet + '/userRotaryByUserId',
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

