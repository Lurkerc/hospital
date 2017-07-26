/*----- 住院医__轮转安排 --------------------------------------------------------------------------------*/
/*----- 轮转安排__自动排班 --------------------------------------------------------------------------------*/
const rotateSet ="/traineeRotary/arrangeRotary";
/*----- 轮转安排__手工调整 --------------------------------------------------------------------------------*/
const handWork ="/traineeRotary/arrangeRotary";

const api = {
  /*----- 轮转安排 --------------------------------------------------------------------------------*/
  //默认列表展示视图切换、导出
  rotaryListInit: { // 轮转人员列表展示
    path: '/traineeRotary/arrangeRotary/userMonthPagelist_ZYY',
    method: 'get'
  },
  rotaryListByUser: { // 轮转人员列表展示-按人员展示
    path: rotateSet + '/userRotaryPagelist_ZYY',
    method: 'get'
  },
  rotaryListByDep: { // 轮转人员列表展示-按科室展示
    path: rotateSet + '/userRotaryDepPagelist_ZYY',
    method: 'get'
  },

  //第一步选择基地
  getJdList:{  //获取基地列表
    path: '/rotaryBasis/BaseManage/getList',
    method: 'get'
  },

  //第二步选择人员
  getUsersList:{  //根据专业获取所有未安排轮转的住院医
    path: '/traineeRotary/getRotaryUser/ZYY',
    method: 'get'
  },

  //第三步选择培训标准
  getRulesList:{  //细则集合
    path: '/rotaryBasis/rulesTraining/rulesget/list',
    method: 'get'
  },

  //第五步确认预览
  setRotaryViewData:{  //保存轮转数据
    path: '/traineeRotary/arrangeRotary/rotaryDeptMonthUser_ZYY',
    method: 'post'
  },

  //第五步选择基地

  //第六步选择基地

  //第七步选择基地

  //保存轮转表
  regrotaryDept:{  //自动安排-过程中安排轮转(按组或人 预览轮转表后点击确定按钮时调用此接口)
    path: rotateSet + '/regrotaryDept_ZYY',
    method: 'post'
  },
  userRotaryExportExcel:{   //人员轮转表导出excel
    path: rotateSet + '/userRotaryExportExcel_ZYY',
    method: 'get'
  },
  userRotaryDepExportExcel:{  //轮转人员按科室展示导出excel
    path: rotateSet + '/userRotaryDepExportExcel_ZYY',
    method: 'get'
  },

  rotaryDeptUser:{  //自动安排-按人员安排轮转  按人员排班预览
    path: rotateSet + '/rotaryDeptUser',
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
    path: handWork + '/deleteRotary_ZYY',
    method: 'delete'
  },
  getRotaryDepIndo:{  //微调-查看用户轮转表  {userId}
    path: handWork + '/getRotaryDepIndo_ZYY',
    method: 'get'
  },
  regUserMicrCtrol:{  //手工调整--轮转微调  保存微调的数据
    path: handWork + '/regUserMicrCtrol',
    method: 'post'
  },
  rtuserPagelist:{  //手工调整--轮转微调人员列表
    path: handWork + '/rtuserPagelist_ZYY',
    method: 'get'
  },
  getDepPagelist:{  //手工调整--获取微调的科室
    path: '/internship/outline/get',
    method: 'get'
  },
};

export default api

