import _ from 'lodash';
import baseRules from '../../formRules/base'; // 公共规则

// 事务管理
let capitalLibraryManagement = {
  fundName: [baseRules.requiredNoEvent, baseRules.inputLen(1, 50), baseRules.illegalChar()],
  remarks: [baseRules.inputLen(0, 250), baseRules.illegalChar()]
};

export {
  capitalLibraryManagement,
};
