import _ from 'lodash';
import baseRules from '../../../../formRules/base'; // 公共规则

/**
 * 基本信息
 */
let basic = {
  title: baseRules.required,
  typeName: baseRules.requiredNoEvent,
  // direction: baseRules.illegalChar,
};
/**
 * 教学计划
 */
let teach = {
  title: baseRules.required,
};

/**
 * 课程计划
 */
let plan = {
  duration: [baseRules.requiredNoEvent, baseRules.numbers, baseRules.numberSection(1, 24)],
  content: baseRules.requiredNoEvent,
};

/**
 * 教学质量评价表
 */
let evaluateRules = {
  studentWeight: baseRules.numbers,
  peersWeight: baseRules.numbers,
  evaluate: baseRules.numbers,
};

export {
  evaluateRules,
  teach,
  plan,
  basic
};
