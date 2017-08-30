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
  depId: [{ required: true, message: '此项不能为空'}], //, // 场次名称 - 必填
  planDetailId: [{ required: true, message: '此项不能为空'}], //, // 场次名称 - 必填
  activityType: [{ required: true, message: '此项不能为空'}], //, // 场次名称 - 必填
  recordTimes: [{ required: true, message: '此项不能为空'}], //, // 场次名称 - 必填
  whetherNeedCases: [{ required: true, message: '此项不能为空'},baseRules.inputLen(0,50),baseRules.illegalChar()], //, // 场次名称 - 必填
  casesName: [{ required: true, message: '此项不能为空'},baseRules.inputLen(0,50),baseRules.illegalChar()], //, // 场次名称 - 必填
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

//
/**
 * 教学计划
 */
let teachplanAdd = {
  activityPlanYear: [{ required: true, message: '此项不能为空'}], //, // 场次名称 - 必填
  activityPlanMonth: [{ required: true, message: '此项不能为空'}], //, // 场次名称 - 必填
  activityPlanDep: [{ required: true, message: '此项不能为空'}], //, // 场次名称 - 必填
}
let teachplanAddsuborEdit = {
  planActivityTitle: [{ required: true, message: '此项不能为空'},baseRules.inputLen(0,50),baseRules.illegalChar()], //, //活动名称
  planActivityType: [{ required: true, message: '此项不能为空'}], //, // 活动类型
  planActivityHostUserName: [{ required: true, message: '此项不能为空'}], //, /主持人姓名
  planActivityTime: [{ required: true, message: '此项不能为空'}], //, /活动时间
  planActivityTimeids: [{ required: true, message: '此项不能为空'}], //, /活动时间段iD
  planActivitySite: [{ required: true, message: '此项不能为空'},baseRules.inputLen(0,50),baseRules.illegalChar()], //, /活动地点
  planActivityContent: [{ required: true, message: '此项不能为空'},baseRules.inputLen(0,50),baseRules.illegalChar()], //, 活动内容
}

export default {
  teachingActivitiesSetList,
  teachingActivitiesSet,
  teachingExperienceList,
  myActivities,
  teachplanAdd,
  teachplanAddsuborEdit
};
