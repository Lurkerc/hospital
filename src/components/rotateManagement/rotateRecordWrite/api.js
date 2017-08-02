/**
 * Created by Administrator on 2017/7/3.
 */
export default {
  /*病种分页列表*/
  diseaseRecordPagelist:'/rotationProcess/diseaseRecord/pagelist',

  /*添加病种*/
  diseaseRecordAdd:'/rotationProcess/diseaseRecord/add',

  /*修改病种*/
  diseaseRecordModify:'/rotationProcess/diseaseRecord/modify/',//{diseaseId}

  /*修改病种*/
  diseaseRecordModifyRelease:'/rotationProcess/diseaseRecord/modifyRelease/',//{diseaseId}

  /*添加上报病种*/
  diseaseRecordAddRelease:'/rotationProcess/diseaseRecord/addRelease',//

  /*查看病种*/
  diseaseRecordGet:'/rotationProcess/diseaseRecord/get/',//{diseaseId}

  /*上报病种*/
  diseaseModifyRelease:'/rotationProcess/diseaseRecord/modifyRelease',//{diseaseId}

  /*删除病种*/
  diseaseRemove:'/rotationProcess/diseaseRecord/remove',//{diseaseId}

  /*实习生  根据科室要求ID和科室获取需完成数量、已完成数量、未完成数量*/
  getMyRotaryRequirements:'/deprequirement/getMyRotaryRequirements/',//{type}-{podId}


  /* 住院医  根据科室要求ID和科室获取需完成数量、已完成数量、未完成数量*/
  ZYYgetMyRotaryRequirements:'/rotaryBasis/rulesTraining/getMyRotaryRequirements/',//{type}-{podId}



  /*查科室名字  --根据轮转生以及用户类型获取轮转科室以及状态记录*/
  userRotaryDeptlist:'/traineeRotary/arrangeRotary/userRotaryDeptlist/',//{userType}-{userId}

/*技能填写*/
  /*修改上报技能*/
  skillRecordModifyRelease:'/rotationProcess/skillRecord/modifyRelease/',//{skillId}

  /*添加上报技能*/
  skillRecordAddRelease:'/rotationProcess/skillRecord/addRelease',//{skillId}

  /*添加技能*/
  skillRecordAdd:'/rotationProcess/skillRecord/add',//

  /*修改技能*/
  skillRecordModify:'/rotationProcess/skillRecord/modify/',//{skillId}

  /*查看技能*/
  skillRecordGet:'/rotationProcess/skillRecord/get/',//{skillId}

  /*上报技能*/
  // skillRecordModifyRelease:'/rotationProcess/skillRecord/modifyRelease/',//{skillId}

  /*删除技能*/
  skillRecordRemove:'/rotationProcess/skillRecord/remove/',//{diseaseId}

  /*技能分页列表*/
  skillRecordPagelist:'/rotationProcess/skillRecord/pagelist',//{diseaseId}


  /** 大病历*/

  //*麻醉记录模板*/

  /*麻醉记录查看*/
  caseRecordAnesthesiaGet:'/rotationProcess/caseRecord/anesthesiaGet/',//{caseId}

  /*麻醉记录添加*/
  caseRecordAnesthesiaAdd:'/rotationProcess/caseRecord/anesthesiaAdd',//

  /*麻醉记录添加上报*/
  caseRecordAnesthesiaAddRelease:'/rotationProcess/caseRecord/anesthesiaAddRelease',//

  /*麻醉记录修改*/
  caseRecordAnesthesiaModify:'/rotationProcess/caseRecord/anesthesiaModify/',//{caseId}

  /*麻醉记录修改上报*/
  caseRecordAnesthesiaModifyRelease:'/rotationProcess/caseRecord/anesthesiaModifyRelease/',//{caseId}

  //*影像资料模板*/

  /*影像资料查看*/
  caseRecordImageDataGet:'/rotationProcess/caseRecord/imageDataGet/',//{caseId}

  /*影像资料添加*/
  caseRecordImageDataAdd:'/rotationProcess/caseRecord/imageDataAdd',//

  /*影像资料添加上报*/
  caseRecordImageDataAddRelease:'/rotationProcess/caseRecord/imageDataAddRelease',//

  /*影像资料修改*/
  caseRecordImageDataModify:'/rotationProcess/caseRecord/imageDataModify/',//{caseId}

  /*影像资料修改上报*/
  caseRecordImageDataModifyRelease:'/rotationProcess/caseRecord/imageDataModifyRelease/',//{caseId}


  //*大病例模板*/

  /*大病例查看*/
  caseRecordGet:'/rotationProcess/caseRecord/get/',//{caseId}

  /*大病例分页列表*/
  caseRecordPagelist:'/rotationProcess/caseRecord/pagelist',//{caseId}

  /*大病例添加*/
  caseRecordBigCasesAdd:'/rotationProcess/caseRecord/bigCasesAdd',//

  /*大病例添加上报*/
  caseRecordBigCasesAddRelease:'/rotationProcess/caseRecord/bigCasesAddRelease',//

  /*大病例修改*/
  caseRecordBigCasesModify:'/rotationProcess/caseRecord/bigCasesModify/',//{casesId}

  /*大病例修改上报*/
  caseRecordBigCasesModifyRelease:'/rotationProcess/caseRecord/bigCasesModifyRelease/',//{casesId}

  /*导出word大病例*/
  caseRecordExportToWord:'/rotationProcess/caseRecord/exportToWord/',//{casesId}

  /*大病例上报*/
  caseRecordBigCasesRelease:'/rotationProcess/caseRecord/bigCasesRelease',//{casesId}

  /*大病例删除*/
  caseRecordBigCasesDelete:'/rotationProcess/caseRecord/bigCasesDelete',//{casesId}

  // 黏贴查询是否黏贴
  bigcaseIscopy: '/rotaryConfig/getByKey/rotary_bigcase_iscopy-SXS',


  /**
   * 临床技能操作
   * */

  /*临床操作记录添加上报 post*/
  clinicalRecordAddSubmit:'/traineeRotary/clinicalRecord/addSubmit',


  /*临床操作记录添加 post*/
  clinicalRecordAdd:'/traineeRotary/clinicalRecord/add',

  /* 临床操作记录列表(轮转生查看) get*/
  clinicalRecordPageList:'/traineeRotary/clinicalRecord/pageList',

  /* 临床操作记录删除 delete*/
  clinicalRecordDelete:'/traineeRotary/clinicalRecord/delete',//ids

  /*临床操作记录查看 get*/
  clinicalRecordGet:'/traineeRotary/clinicalRecord/get/',//{id}

  /*临床操作记录修改 put*/
  clinicalRecordModify:'/traineeRotary/clinicalRecord/modify/',//{id}

  /*临床操作记录上报 put*/
  clinicalRecordModifySubmit:'/traineeRotary/clinicalRecord/modifySubmit',//{ids}



  /**
   * 临床技能操作
   * */

  /*参加抢救危重病人记录查看 get*/
  rescuePatientRecordGet:'/traineeRotary/rescuePatientRecord/get/',//{id}

  /*参加抢救危重病人记录修改 put*/
  rescuePatientRecordModify:'/traineeRotary/rescuePatientRecord/modify/',//{id}

  /*参加抢救危重病人记录上报 post*/
  rescuePatientRecordAddSubmit:'/traineeRotary/rescuePatientRecord/addSubmit',//

  /*参加抢救危重病人记录添加 post*/
  rescuePatientRecordAdd:'/traineeRotary/rescuePatientRecord/add',//

  /*参加抢救危重病人记录列表(轮转生查看)get*/
  rescuePatientRecordPageList:'/traineeRotary/rescuePatientRecord/pageList',//

  /*参加抢救危重病人记录删除 delete*/
  rescuePatientRecordDelete:'/traineeRotary/rescuePatientRecord/delete/',//{ids}

  /*参加抢救危重病人记录上报 put*/
  rescuePatientRecordModifySubmit:'/traineeRotary/rescuePatientRecord/modifySubmit',//{ids}

  /**
   * 管床记录
   * */

  /*管床记录查看 get*/
  tubeBedRecordingGet:'/traineeRotary/tubeBedRecording/get/',//{id}


  /*管床记录列表(教育处-科室主任-教学秘书-带教老师) get*/
  tubeBedRecordingMangePageList:'/traineeRotary/tubeBedRecording/mangePageList',

  /*管床记录列表(轮转生查看) get*/
  tubeBedRecordingPageList:'/traineeRotary/tubeBedRecording/pageList',

  /*管床批量通过 post*/
  tubeBedRecordingModifySubPass:'/traineeRotary/tubeBedRecording/modifySubPass', //{ids}


  /*管床记录批量驳回 post*/
  tubeBedRecordingModifySubReject:'/traineeRotary/tubeBedRecording/modifySubReject', //{ids}


}
