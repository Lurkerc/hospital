import _ from 'lodash';
import baseRules from '../../formRules/base'; // 公共规则

// 资金库管理
let capitalLibraryManagement = {
  fundName: [baseRules.requiredNoEvent, baseRules.inputLen(1, 50), baseRules.illegalChar()],
  remarks: [baseRules.inputLen(0, 250), baseRules.illegalChar()]
};

// 出入账管理
let revealingManagement = {
  accountingName: [baseRules.requiredNoEvent, baseRules.inputLen(1, 50)],
  fundName: [baseRules.requiredNoEvent],
  accountingType: [baseRules.selectText],
  userName: baseRules.requiredNoEvent,
  expenseTime: baseRules.isDate,
  explains: baseRules.inputLen(0, 250),
};

export {
  capitalLibraryManagement,
  revealingManagement,
};
