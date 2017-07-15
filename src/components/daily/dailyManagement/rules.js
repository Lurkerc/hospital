import _ from 'lodash';
import baseRules from '../../../formRules/base'; // 公共规则

/**
 * 请假管理
 */
let leaveManagementList = {
  userName: [baseRules.inputLen(0,50),baseRules.illegalChar()] // 名称 - 必填
};

let leaveManagement = {
  auditInfo: [baseRules.inputLen(0,500),baseRules.illegalChar()] // 名称 - 必填
};

/**
 * 我的请假
 */
let myLeaveList = {
  userName: [baseRules.inputLen(0,50),baseRules.illegalChar()] // 名称 - 必填
};

let myLeave = {
  beginDate: [{ required: true, message: '此项不能为空'}], // 名称 - 必填
  endDate: [{ required: true, message: '此项不能为空'}],// 名称 - 必填
  explains: [baseRules.inputLen(0,500)] ,// 名称 - 必填
};



export default {
  leaveManagement,
  leaveManagementList,
  myLeaveList,
  myLeave
};
