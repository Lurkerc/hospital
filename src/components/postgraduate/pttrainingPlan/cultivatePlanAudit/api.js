/**
 * Created by Administrator on 2017/9/3.
 */


export default {
  /**-------开题审核-----*/

  //培养计划审核列表
  list:{
    path:'training/plan/splist',
    method: 'get'
  },
  //导师审核
  tutorAudit:{
    path:'training/plan/examine/',//{id}
    method: 'put'
  },

  getPlan:{ //查看培养计划
    path: "/training/plan/get/",
    method: "get",
  },




}
