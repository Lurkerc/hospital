import _ from 'lodash';
import baseRules from '../../../../formRules/base'; // 公共规则

/**
 * 公共规则
 */
let pub = {
  name: [baseRules.requiredNoEvent,baseRules.inputLen(1,20)], // 姓名
  // origin: [baseRules.inputLen(0, 20)], // 籍贯
  // specialty: [baseRules.required], //专业
  codeNumber: [baseRules.required,baseRules.inputLen(1,50)], // 编号
  // school: [baseRules.requiredNoEvent], //学校
  // grade: [baseRules.required], //年级
  // group: [baseRules.required], //班级
  // idNumber: [baseRules.inputLen(15, 18)], //身份证号码
  mobile: [baseRules.mobile], //手机号
  // emgContactMobile: [baseRules.mobile], // 紧急联系人
  postCode: baseRules.postCode, // 邮编
  email: [baseRules.email], //邮箱
};

// 其他
let other = {
  mobile: [baseRules.requiredNoEvent,baseRules.mobile],
  fromHospital: [baseRules.inputLen(0,100)],
};

// 本科生
let bks = {
  school: baseRules.requiredNoEvent, //学校
  grade: baseRules.required, //年级
  length: baseRules.required, // 学制
  classNum: [baseRules.requiredNoEvent,baseRules.greaterThanZero], //班级
};

// 实习生
let sxs = {
  school: baseRules.selectText,
  startDate: baseRules.requiredNoEvent,
  internshipNum: [baseRules.requiredNoEvent,baseRules.greaterThanZero,baseRules.numberSection(0,100)],
  mobile: baseRules.mobile,
};

// 研究生
let yjs = {
  specialty: baseRules.requiredNoEvent,
  school: baseRules.selectText,
  degree: baseRules.inputLen(0,50),
  studentId: baseRules.inputLen(0,50),
};

// 住院医
let zyy = {
  specialty: baseRules.requiredNoEvent,
  rotaryProclass:baseRules.selectText,
};

// 进修生
let jxs = {
  // specialty: baseRules.requiredNoEvent,
};

export {
  pub,
  other,
  bks,
  sxs,
  yjs,
  zyy,
  jxs,
};
