import _ from 'lodash';
import baseRules from '../../../formRules/base'; // 公共规则

/**
 * 系统设置--节假日设置
 **/
let holidays = {
  holidayName: baseRules.requiredNoEvent,
  startDate: baseRules.requiredNoEvent,
  endDate: baseRules.requiredNoEvent,
};

// 科室报到扫描二维码时效设置
let rotaryBasisSet_qr = {
  configValue: [baseRules.requiredNoEvent, baseRules.numbers, baseRules.inputLen(1, 10)]
};
// 补轮转比例
let rotaryBasisSet_blz = {
  configValue: [baseRules.requiredNoEvent, baseRules.numbers, baseRules.numberSection(0, 100)]
};

let noteTemplate_time = {
  configValue: [baseRules.requiredNoEvent, baseRules.isDate]
};

let noteTemplate_str = {
  configValue: [baseRules.requiredNoEvent, baseRules.inputLen(1, 250)]
};


export {
  holidays,
  rotaryBasisSet_qr,
  rotaryBasisSet_blz,
  noteTemplate_time,
  noteTemplate_str,
};
