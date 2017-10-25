let thisFile = 'graduation/application/'
const api = {
  /** -----------------毕业申请填写-----------------------*/
  //研究生毕业申请修改
  edit:{
    path: thisFile+"modify/",  //{id}
    method: "put",
  },
  //新增毕业申请
  add:{
    path:  thisFile+"add",  //{id}
    method: "post",
  },
  //获取毕业申请(审批时调用)(修改时调用不带get)
  get:{
    path:  thisFile+"get",  //{id}
    method: "get",
  },

  //毕业申请上报
  report:{
    path:  thisFile+"report/",  //{id}
    method: "put",
  },

  /** -----------------毕业申请审核-----------------------*/
  //毕业申请列表
  list:{
    path:  thisFile+"list",  //{id}
    method: "get",
  },
  //教育处审核
  jycAudit:{
    path:  thisFile+"jycAudit/",  //{id}
    method: "put",
  },
  //毕业申请导师审核
  tutorAudit:{
    path:  thisFile+"tutorAudit/",  //{id}
    method: "put",
  },
  //毕业申请教研室审核
    jysAudit:{
    path:  thisFile+"jysAudit/",  //{id}
    method: "put",
  },

  //获取开题申请(审核，查看时调用时调用 )
  auditGet:{
    path:'graduation/application/get/',//{id}
    method: 'get'
  },

}
export default api
