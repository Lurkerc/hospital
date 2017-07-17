import _ from 'lodash';
import baseRules from '../../formRules/base'; // 公共规则

/**
 * 教学活动设置
 */
let teachingActivitiesSetList = {
  activityName: [baseRules.inputLen(0,50),baseRules.illegalChar()], //,
};
let teachingActivitiesSet = {
  activityName: [{ required: true, message: '此项不能为空'},baseRules.inputLen(0,50),baseRules.illegalChar()], //, // 场次名称 - 必填
  hostUserName: [{ required: true, message: '此项不能为空'},baseRules.inputLen(0,50),baseRules.illegalChar()], //, // 场次名称 - 必填
  activitySite: [{ required: true, message: '此项不能为空'},baseRules.inputLen(0,50),baseRules.illegalChar()], //, // 场次名称 - 必填
  activityTime: [{ required: true, message: '此项不能为空'}], //, // 场次名称 - 必填
  whetherNeedCases: [baseRules.inputLen(0,50),baseRules.illegalChar()], //, // 场次名称 - 必填
}
/**
 * 教学经历
 */
let teachingExperienceList = {
  activityName: [baseRules.inputLen(0,50),baseRules.illegalChar()], //, // 场次名称 - 必填
}
/**
 * 我的活动
 */
let myActivities = {
  activityTips: [{ required: true, message: '此项不能为空'},baseRules.inputLen(0,500),baseRules.illegalChar()], //, // 场次名称 - 必填
}

export default {
  teachingActivitiesSetList,
  teachingActivitiesSet,
  teachingExperienceList,
  myActivities
};
