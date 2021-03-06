import _ from 'lodash';
import baseRules from '../../formRules/base'; // 公共规则
//表单验证
let form ={
  schoolName:baseRules.illegalChar(),
  specialty:baseRules.illegalChar(),

};
/**
 * 本科生 - 课程管理 - 课程安排
 */
let setSyllabus = {
  numberMust: [{
    required: true,
    message: '此项不能为空'
  }], // 收费标准 - 必须为数字
};

/**
 * 实习生 - 报名招录 - 人员管理
 */
let usersManagement = {
  name: [baseRules.requiredNoEvent, baseRules.inputLen(1, 50)],
  codeNumber: [baseRules.requiredNoEvent, baseRules.inputLen(1, 50)],
  mobile: [baseRules.requiredNoEvent, baseRules.mobile],
  internshipNum: [baseRules.requiredNoEvent, baseRules.numberSection(0, 100)],
  startDate: baseRules.isDate,
};

/**
 * 实习生 - 报名招录 - 报名审核
 */
let internAudit = {
  // chargeStandard: baseRules.numberMust, // 收费标准 - 必须为数字
  // sxBeginTime: baseRules.isDate, // 实习开始时间 - 必须为日期时间
  // sxEndTime: baseRules.isDate, // 实习结束时间 - 必须为日期时间
  // zsCost:[baseRules.requiredNoEvent,baseRules.greaterThanZero2,],
  // deposit:[baseRules.requiredNoEvent,baseRules.greaterThanZero2,],
};


/**
 * 收费标准
 */
let chargingStandard = {
  configValue: [baseRules.required, baseRules.numberMust,baseRules.inputLen(0, 6)], // 实习费 - 必填\数字
};

/**
 * 出科设置
 */
let givenSet = {
  configValue: [baseRules.required, baseRules.numberMust,baseRules.inputLen(0, 6)], // 实习费 - 必填\数字
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
  "specialty": [baseRules.required],
  "ts": baseRules.numberMust,
  "deMasterDegree": baseRules.required,
};

/**
 * 手工调整
 */
let handWork = {
  "depId": [baseRules.required],
  "ts": baseRules.numberMust,
};

/**
 * 暂停轮转,恢复轮转
 */
let pauseRotate = {
  pauseTime: [{
    required: true,
    message: '此项不能为空'
  }],
  restoreTime: [{
    required: true,
    message: '此项不能为空'
  }],
  stopMess: [baseRules.required],
};

/**
 * 大纲添加
 */
let internOutline = {
  "ts": baseRules.numberMust,
  "greatName": [{
    required: true,
    message: '此项不能为空'
  }],
  "rotaryUserNum": baseRules.greaterThanZero,
};

//发送短信
let shortNote = {
  content:[baseRules.requiredNoEvent,baseRules.inputLen(0,50),baseRules.illegalChar()],  //短信内容
}


export {
  setSyllabus,
  internAudit,
  usersManagement,
  chargingStandard,
  reqDepVal,
  internOutline,
  pauseRotate,
  givenSet,
  form,
  shortNote
};
