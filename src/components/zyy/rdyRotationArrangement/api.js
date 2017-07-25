/*----- 住院医__轮转安排 --------------------------------------------------------------------------------*/
/*----- 轮转安排__自动排班 --------------------------------------------------------------------------------*/
const rotateSet ="/traineeRotary/arrangeRotary";
/*----- 轮转安排__手工调整 --------------------------------------------------------------------------------*/
const handWork ="/traineeRotary/arrangeRotary";

const api = {
  /*----- 轮转安排 --------------------------------------------------------------------------------*/
  rotaryListInit: { // 轮转人员列表展示
    path: rotateSet + '/userPagelist',
    method: 'get'
  },
  rotaryListByUser: { // 轮转人员列表展示-按人员展示
    path: rotateSet + '/userRotaryPagelist_SXS',
    method: 'get'
  },
  rotaryListByDep: { // 轮转人员列表展示-按科室展示
    path: rotateSet + '/userRotaryDepPagelist_SXS',
    method: 'get'
  },
  depReList: { // 轮转人员列表展示
    path: rotateSet + '/pagelist',
    method: 'get'
  },
  /*exportExcelByDep:{  //轮转人员按科室展示导出excel
   path: rotateSet + '/userRotaryDepExportExcel_SXS',
   method: 'post'
   },*/
  /*exportExcelByUser:{  //人员轮转表导出excel
   path: rotateSet + '/userRotaryExportExcel_SXS',
   method: 'get'
   },*/
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
    path: rotateSet + '/userRotaryExportExcel_SXS',
    method: 'get'
  },
  userRotaryDepExportExcel:{  //轮转人员按科室展示导出excel
    path: rotateSet + '/userRotaryDepExportExcel_SXS',
    method: 'get'
  },
  regrotaryDept:{  //自动安排-过程中安排轮转(按组或人 预览轮转表后点击确定按钮时调用此接口)
    path: rotateSet + '/regrotaryDept_SXS',
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

