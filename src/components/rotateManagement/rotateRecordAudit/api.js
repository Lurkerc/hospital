/**
 * Created by Administrator on 2017/7/3.
 */
export default {

  /*根据科室要求ID和科室获取需完成数量、已完成数量、未完成数量*/
  getMyRotaryRequirements:'/deprequirement/getMyRotaryRequirements/',//{type}-{podId}



  /*查科室名字  --根据轮转生以及用户类型获取轮转科室以及状态记录*/
  userRotaryDeptlist:'/traineeRotary/arrangeRotary/userRotaryDeptlist/',//{userType}-{userId}

  /**
   * 病种审核
   * */
  /*审核病种分页列表*/
  diseaseRecordManagePagelist:'/rotationProcess/diseaseRecordManage/pagelist',

  /*批量驳回*/
  diseaseRecordManageModifySubReject:'/rotationProcess/diseaseRecordManage/modifySubReject',

  /*单个病种审核*/
  diseaseRecordManageModifyState:'/rotationProcess/diseaseRecordManage/modifyState/',//{diseaseId}

  /*批量审核通过*/
  diseaseRecordManageModifySubPass:'/rotationProcess/diseaseRecordManage/modifySubPass',//{diseaseId}

  /*查看病种*/
  diseaseRecordGet:'/rotationProcess/diseaseRecord/get/',//{diseaseId}

  /**
   * 技能审核
   * */


  /*批量审核通过*/
  skillRecordManageModifySubPass:'/rotationProcess/skillRecordManage/modifySubPass',//skillIds

  /*单个技能审核*/
  skillRecordManageModifyState:'/rotationProcess/skillRecordManage/modifyState/',//{skillId}

  /*批量驳回*/
  skillRecordManageModifySubReject:'/rotationProcess/skillRecordManage/modifySubReject',//{skillIds}

  /*审核技能分页列表*/
  skillRecordManagePagelist:'/rotationProcess/skillRecordManage/pagelist',

  /*查看技能*/
  skillRecordGet:'/rotationProcess/skillRecord/get/',//{skillId}

  /**
   * 技能审核
   * */


  /*大病例批注*/
  caseRecordManageBigCasesModifyComment:'/rotationProcess/caseRecord/bigCasesModifyComment/',//json

  /*大病例批量审核*/
  caseRecordManageBigCasesReviews:'/rotationProcess/caseRecord/bigCasesReviews',//{{caseIds}}

  /*大病例审核*/
  caseRecordManageBigCasesReview:'/rotationProcess/caseRecord/bigCasesReview/',//{{{caseId}}}

  /*大病例批量驳回*/
  caseRecordManageBigCasesRejects:'/rotationProcess/caseRecord/bigCasesRejects',//{caseIds}

  /*管理员大病例分页列表*/
  caseRecordManagePagelist:'/rotationProcess/caseRecord/managePagelist',

  /*麻醉记录查看*/
  caseRecordAnesthesiaGet:'/rotationProcess/caseRecord/anesthesiaGet/',//{caseId}

  /*影像资料查看*/
  caseRecordImageDataGet:'/rotationProcess/caseRecord/imageDataGet/',//{caseId}

  /*大病例查看*/
  caseRecordGet:'/rotationProcess/caseRecord/get/',//{caseId}


  /*导出word大病例*/
  caseRecordExportToWord:'/rotationProcess/caseRecord/exportToWord/',//{casesId}


/**
 * 临床操作记录列表
 *
 * */

  /* 临床操作记录列表(教育处-带教秘书-科室主任-带教老) get*/
  clinicalRecordMangePageList:'/traineeRotary/clinicalRecord/mangePageList',


  /*临床操作记录查看 get*/
  clinicalRecordGet:'/traineeRotary/clinicalRecord/get/',//{id}

  /* 临床操作记录批量通过 post*/
  clinicalRecordModifySubPass:'/traineeRotary/clinicalRecord/modifySubPass',//ids

  /* 临床操作记录批量驳回 post*/
  clinicalRecordModifySubReject:'/traineeRotary/clinicalRecord/modifySubReject',//ids

  /* 临床操作记录审核 post*/
  clinicalRecordReview:'/traineeRotary/clinicalRecord/review/',//id


  /**
   * 抢救记录
   *
   * */


  /*抢救记录批量通过 post*/
  rescuePatientRecordModifySubPass:'/traineeRotary/rescuePatientRecord/modifySubPass',//{ids}

  /*批量驳回 post*/
  rescuePatientRecordModifySubReject:'/traineeRotary/rescuePatientRecord/modifySubReject',//{ids}

  /*抢救记录审核 post*/
  rescuePatientRecordReview:'/traineeRotary/rescuePatientRecord/review/',//{ids}

  /*参加抢救危重病人记录列表(教育处-科室主任-教学秘书-带教老师) get*/
  rescuePatientRecordMangePageList:'/traineeRotary/rescuePatientRecord/mangePageList',//

  /*参加抢救危重病人记录查看 get*/
  rescuePatientRecordGet:'/traineeRotary/rescuePatientRecord/get/',//{id}

  /**
   * 管床记录
   *
   * */

  /*管床记录查看 get*/
  tubeBedRecordingGet:'/traineeRotary/tubeBedRecording/get/',//{id}

  /*管床记录列表(教育处-科室主任-教学秘书-带教老师) get*/
  tubeBedRecordingMangePageList:'/traineeRotary/tubeBedRecording/mangePageList',

  /*管床批量通过 post*/
  tubeBedRecordingModifySubPass:'/traineeRotary/tubeBedRecording/modifySubPass', //{ids}

  /*管床记录批量驳回 post*/
  tubeBedRecordingModifySubReject:'/traineeRotary/tubeBedRecording/modifySubReject', //{ids}

  /*管床记录审核 post*/
  tubeBedRecordingReview:'/traineeRotary/tubeBedRecording/review/', //{ids}


  /**
   * 专题概述
   * */


  /*专题概述查看(教育处人员查看) get*/
  thematicReviewGetId:'/traineeRotary/thematicReview/get/',//{id}

  /*专题综述审核 post*/
  thematicReviewReview:'/traineeRotary/thematicReview/review/',//{id}

  /*专题概述查看(教育处人员查看列表) get*/
  thematicReviewPageList:'/traineeRotary/thematicReview/pageList',

  /*批量通过 post*/
  thematicReviewModifySubPass:'/traineeRotary/thematicReview/modifySubPass',//{ids}

  /*批量驳回 post*/
  thematicReviewModifySubReject:'/traineeRotary/thematicReview/modifySubReject',//{ids}

  /**
   * 调查报告
   * */

  /*调查报告或经验总结查看(教育处人员查看) post*/
  medicalEthicsGetId:'/traineeRotary/medicalEthics/get/',//{id}

  /*调查报告或经验总结审核 post*/
  medicalEthicsReview:'/traineeRotary/medicalEthics/review/',//{id}

  /*调查报告或经验总结查看(教育处人员查看列表) post*/
  medicalEthicsPageList:'/traineeRotary/medicalEthics/pageList',


}
