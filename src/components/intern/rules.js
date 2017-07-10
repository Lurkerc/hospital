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

export {
  internAudit,chargingStandard,
};
