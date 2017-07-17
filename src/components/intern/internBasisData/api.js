/*----- 实习生__实习大纲 --------------------------------------------------------------------------------*/
const dgFile = 'internship/outline';
/*----- 实习生__科室要求 --------------------------------------------------------------------------------*/
const depReFile = 'deprequirement';
const api = {
  /*----- 实习大纲 --------------------------------------------------------------------------------*/

  dgList: { // 实习大纲分页列表
    path: dgFile + '/pagelist',
    method: 'get'
  },
  dgAdd: { // 添加实习大纲
    path: dgFile + '/add',
    method: 'post'
  },
  dgEdit: { // 修改实习大纲 {outlineId}
    path: dgFile + '/modify',
    method: 'post'
  },
  dgDelete: { // 删除大纲 {outlineId}
    path: dgFile + '/delete',
    method: 'delete'
  },
  dgEnable: { // 启用大纲
    path: dgFile + '/modifyEnable',
    method: 'put'
  },
  dgDisable: { // 禁用大纲
    path: dgFile + '/modifyDisable',
    method: 'put'
  },
  dgGet: { // 查看单个实习大纲详情 {depOutlineId}
    path: dgFile + '/get',
    method: 'get'
  },
  dgDepSet: { // 根据学校和专业获取小组设置分类信息(自动安排轮转--分组安排轮转)
    path: dgFile + '/listOutlineDepSet',
    method: 'get'
  },
  dgToChannel: { // 大纲导入excel
    path: dgFile + '/upload',
    method: 'get'
  },
  schools: { //查询学校
    path: "/schools/queryList",
    method: 'get'
  },
  specialty: { //查询专业
    path: "/dictionary/getByCode/TRAINING_DIRECTION_SX",
    method: 'get'
  },
  searhDepAndSpecialty: { //查询所有启用的科室（查询所有启用的科室，不带分页）
    path: "/hospital/dept/queryAll",
    method: 'get'
  },

  /*----- 科室要求 --------------------------------------------------------------------------------*/
  depReList: { // 实习医院各个专业下科室轮转要求列表
    path: depReFile + '/pagelist',
    method: 'get'
  },
  depReAdd: { // 添加或修改科室要求
    path: depReFile + '/addOrModify',
    method: 'post'
  },
  depReDelete: { // 删除大纲 {depOutlineId}
    path: depReFile + '/delete',
    method: 'delete'
  },
  depReEnable: { // 启用科室要求 {depOutlineId}
    path: depReFile + '/modifyEnable',
    method: 'put'
  },
  depReDisable: { // 禁用科室要求 {depOutlineId}
    path: depReFile + '/modifyDisable',
    method: 'put'
  },
  depReGet: { // 根据科室要求主表ID获取所有科室要求 {depOutlineId}
    path: depReFile + '/get',
    method: 'get'
  },
  depReDistype: { // 根据父CODE获取父项，以及子项。(通用)
    path: '/dictionary/getByCode/conf_sx_dep_requires_distype',
    method: 'get'
  },

  /*----- 科室要求 --------------------------------------------------------------------------------*/
  // 实习费收费标准、大病历填写设置
  modifyConfigId: { // 实习费收费标准  黏贴比例修改  {configId}
    path: '/rotaryConfig/modify/',
    method: 'put'
  },
  chargingStandard: { // 获取实习费收费标准
    path: '/rotaryConfig/getByKey/rotary_charging_standard-SXS',
    method: 'get'
  },
  bigcaseIscopy: { // 黏贴查询是否黏贴
    path: '/rotaryConfig/getByKey/rotary_bigcase_iscopy-SXS',
    method: 'get'
  },
  bigcaseCopyscale: { // 黏贴比例查询
    path: '/rotaryConfig/getByKey/rotary_bigcase_copyscale-SXS',
    method: 'get'
  },
  getDepRequirement: { // 根据科室要求ID和科室ID 获取科室下的要求数据
    path: '/deprequirement/getDepRequirement/', // {depOutlineId}-{depId}-{podId}
    method: 'get'
  },
};

export default api
