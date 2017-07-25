import _ from 'lodash';
import baseRules from '../../formRules/base'; // 公共规则

/*
 * 实习生 - 报名招录 - 报名审核
 */
let internAudit = {
  chargeStandard: baseRules.numberMust, // 收费标准 - 必须为数字
  sxBeginTime: baseRules.isDate, // 实习开始时间 - 必须为日期时间
  sxEndTime: baseRules.isDate, // 实习结束时间 - 必须为日期时间
};


/**
 * 收费标准
 */
let chargingStandard = {
  configValue: [baseRules.required,baseRules.numberMust], // 实习费 - 必填\数字
};

/**
 * 科室要求
 */
let reqDepVal = {
  name:[baseRules.required],
  "depId":baseRules.required,
  "disType":baseRules.required,
  "disTitle":baseRules.required,
  "disNum":baseRules.numberMust,
  specialty:[baseRules.required],
};

/**
 * 手工调整
 */
let handWork = {
  "depId":[baseRules.required],
  "ts":baseRules.numberMust,
};

/**
 * 大纲添加
 */
let internOutline = {
  "ts":[{ required: true, message: '此项不能为空'}],
  "greatName":[{ required: true, message: '此项不能为空'}],
};



export {
  internAudit,chargingStandard,reqDepVal,internOutline
};
