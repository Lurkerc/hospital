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
  configValue: [baseRules.required, baseRules.numberMust], // 实习费 - 必填\数字
};

/**
 * 科室要求
 */
let reqDepVal = {
  name: [baseRules.required],
  "depId": baseRules.required,
  "disType": baseRules.required,
  "disTitle": baseRules.required,
  "disNum": baseRules.numberMust,
  specialty: [baseRules.required],
};

/**
 * 手工调整
 */
let handWork = {
  "depId": [baseRules.required],
  "ts": baseRules.numberMust,
};

/**
 * 大纲添加
 */
let internOutline = {
  "ts": [{
    required: true,
    message: '此项不能为空'
  }],
  "greatName": [{
    required: true,
    message: '此项不能为空'
  }],
};


function multiple2(rule, value, callback) {
  //检验位的检测
  let val = (value / 0.5) + '';
  if (val != val || /\./g.test(val)) {
    callback(new Error('该项必须是0.5的倍数'));
  } else {
    callback();
  }
}

/**
 * 细则
 */
let rdyTrainingStandardsFirst = {
  "rtName": [baseRules.requiredNoEvent, baseRules.inputLen(0, 50), baseRules.illegalChar()],
  "jdName": [baseRules.requiredNoEvent],
  "rtIntroduce": [baseRules.inputLen(0, 500), baseRules.illegalChar()],
  "rtTarget": [baseRules.inputLen(0, 500), baseRules.illegalChar()],
  "rtMethod": [baseRules.inputLen(0, 500), baseRules.illegalChar()],
  "rtAdmrank": [baseRules.inputLen(0, 500), baseRules.illegalChar()],
  "ts": [baseRules.requiredNoEvent, baseRules.float, multiple2, baseRules.inputLen(0, 20), baseRules.illegalChar()],
  "optionalNum": [baseRules.requiredNoEvent, baseRules.numbers, baseRules.inputLen(0, 20), baseRules.illegalChar()],
};

let rdyTrainingStandardsSecond = {
  "depsetPurpose": [baseRules.requiredNoEvent, baseRules.inputLen(0, 500), baseRules.illegalChar()],
  "deName": [baseRules.requiredNoEvent, baseRules.inputLen(0, 50), baseRules.illegalChar()],
  "optionalNum": [baseRules.requiredNoEvent, baseRules.numbers, baseRules.inputLen(0, 20), baseRules.illegalChar()],
  "deDetype": [baseRules.requiredNoEvent],
  "deShowtype": [baseRules.requiredNoEvent],
  "deCountBasic": [baseRules.requiredNoEvent, baseRules.numbers, baseRules.inputLen(0, 20), baseRules.illegalChar()],
  "deCountBasicSecond": [baseRules.requiredNoEvent, baseRules.numbers, baseRules.inputLen(0, 20), baseRules.illegalChar()],
  "deCountBasicFirst": [baseRules.requiredNoEvent, baseRules.numbers, baseRules.inputLen(0, 20), baseRules.illegalChar()],
};

/**/


/**
 * 住院医管理
 */
let rdyPersonnelManagement = {
  rotaryProclass: baseRules.requiredNoEvent,
  rotaryYear: baseRules.requiredNoEvent,
  rotaryAdmrank: baseRules.requiredNoEvent,
  rotaryZyytype: baseRules.requiredNoEvent,
};

/**
 * 对照表
 */
let rdyDepContrast = {
  "radomNum": baseRules.numbers,
  "ts": [baseRules.requiredNoEvent, baseRules.float, multiple2, baseRules.inputLen(0, 20), baseRules.illegalChar()],
};

export {
  internAudit,
  chargingStandard,
  reqDepVal,
  internOutline,
  rdyTrainingStandardsFirst,
  rdyTrainingStandardsSecond,
  rdyPersonnelManagement,
  rdyDepContrast,
};
