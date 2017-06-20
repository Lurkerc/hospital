import _ from 'lodash';
import baseRules from '../../formRules/base'; // 公共规则

/**
 * 树菜单
 */
let tree = {
  treeName: baseRules.required, // 名称 - 必填
};

/**
 * 考核内容管理 - 评分
 */
let assessmentContentScore = {
  scoreTableName: baseRules.required, // 评分名称 - 必填
  // scope.row.content: baseRules.required, // 评分名称 - 必填
};

/**
 * 考核内容管理 - 病例
 */
let assessmentContentCase = {
  caseName: baseRules.required, // 病例名称 - 必填
  patientName: baseRules.required, // 患者姓名 - 必填
  occupation: baseRules.required, // 患者职业 - 必填
  age: baseRules.required, // 患者年龄 - 必填
  hospitalTime: baseRules.isDate, // 入院时间 - 必须为日期时间
  caseDate: baseRules.isDate, // 病例日期 - 必须为日期时间
  teller: baseRules.required, // 病例提供者 - 必填
};

/**
 * 考核内容管理 - 剧本
 */
let assessmentContentScript = {
  scriptName: baseRules.required, // 剧本名称 - 必填
};

/**
 * 场次管理 - 自由考核
 */
let examineIntervalFREE = {
  sceneName: baseRules.required, // 场次名称 - 必填
  startTime: baseRules.isDate, // 开始时间 - 必须为日期时间
  endTime: baseRules.isDate, // 开始时间 - 必须为日期时间
};

/**
 * 场次管理 - 规范考核
 */
let examineIntervalSTANDARD = {
  sceneName: baseRules.required, // 场次名称 - 必填
  startTime: baseRules.isDate, // 开始时间 - 必须为日期时间
  restNum: baseRules.numberMust, // 休息次数 - 必须为数字
  restTime: baseRules.numberMust, // 休息时间 - 必须为数字
  moveTime: baseRules.numberMust, // 换站时间 - 必须为数字
  basicsTime: baseRules.numberMust, // 考核时间基数 - 必须为数字
};

export {
  tree,
  assessmentContentScore,
  assessmentContentCase,
  assessmentContentScript,
  examineIntervalFREE,
  examineIntervalSTANDARD,
};
