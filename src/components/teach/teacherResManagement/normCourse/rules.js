import _ from 'lodash';
import baseRules from '../../../../formRules/base'; // 公共规则

/**
 * 基本信息
 */
let basic = {
  title: baseRules.required,
  // direction: baseRules.illegalChar,
};

/**
 * 课程计划
 */
let plan = {
  duration: [baseRules.requiredNoEvent, baseRules.numbers, baseRules.numberSection(1, 24)],
  content: baseRules.requiredNoEvent,
};


export {
  plan,
  basic
};
