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

}
