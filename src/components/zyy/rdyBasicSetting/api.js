/**
 * Created by Administrator on 2017/7/24.
 */

const api = {
  rulesgetGet: {//细则-查看-第一步 科室周期设置
    path :  '/rotaryBasis/rulesTraining/rulesget/',//{rtId}
    method : 'get'
  },

  rulesDepRequirementAddOrEdit: {//第二步-添加或修改科室指标
    path :  '/rotaryBasis/rulesTraining/rulesDepRequirementAddOrEdit/',//{rtId}-{rdId}
    method : 'post'
  },

  rulesAddOrEdit: {//添加-第一步-设置周期
    path :  '/rotaryBasis/rulesTraining/rulesAddOrEdit',//
    method : 'post'
  },
  rulesgetPageList: {//细则分页列表
    path :  '/rotaryBasis/rulesTraining/rulesget/pageList',//
    method : 'get'
  },
  rulesgetList: {//细则集合
    path :  '/rotaryBasis/rulesTraining/rulesget/list',//
    method : 'get'
  },
  modifyRulesState: {//细则启用禁用
    path :  '/rotaryBasis/rulesTraining/modifyRulesState',//{rtId}
    method : 'put'
  },
  removeRules: {//细则删除
    path :  '/rotaryBasis/rulesTraining/removeRules',//{rtId}
    method : 'delete'
  },
  getRulesDepRequirement: {//第二步-查看科室指标
    path :  '/rotaryBasis/rulesTraining/getRulesDepRequirement/',//{rtId}-{rdId}
    method : 'get'
  },
  getRulesDep: {//第二步-查看科室指标
    path :  '/rotaryBasis/rulesTraining/getRulesDep/',//{rtId}
    method : 'get'
  },
  // searhDepAndSpecialty: { //查询所有启用的科室（查询所有启用的科室，不带分页）
  //   path: "/hospital/dept/queryAll",
  //   method: 'get'
  // },
  searhDepAndSpecialty: { //查询标准科室科室（查询所有启用的科室，不带分页）
    path: "/criterion/dept/list",
    method: 'get'
  },
  disType: { //第二部分类
    path: "/dictionary/getByCode/conf_sx_dep_requires_distype",
    method: 'get'
  },



  BaseManageGetList: { //基地集合
    path: "/rotaryBasis/BaseManage/getList",
    method: 'get'
  },
  //大病历设置
  modifyConfigId: { // 住院医黏贴比例修改  {configId}
    path: '/rotaryConfig/modify/',
    method: 'put'
  },
  bigcaseIscopy: { // 黏贴查询是否黏贴
    path: '/rotaryConfig/getByKey/rotary_bigcase_iscopy-ZYY',
    method: 'get'
  },
  bigcaseCopyscale: { // 黏贴比例查询
    path: '/rotaryConfig/getByKey/rotary_bigcase_copyscale-ZYY',
    method: 'get'
  },

  //科室对照表
  getRulesDepContrastTable: { // 配置-查看标准科室对照关系列表  {rtId}
    path: '/rotaryBasis/rulesTraining/getRulesDepContrastTable/',
    method: 'get'
  },

  getRulesDepHgGroup: { // 配置-查看标准科室对照关系列表  {rtId}_{rdId}
    path: '/rotaryBasis/rulesTraining/getRulesDepHgGroup/',
    method: 'get'
  },
};

export default api

