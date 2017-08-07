/**   --病历库--   **/
const thisFile = 'cases';
const types = "CASES";
const api = {
  tree: { // 左侧树
    path: '/resourceType/tree?types='+types,
    method: 'get'
  },
  jurisdiction:{  //权限设置-提交保存  save/{ids}
    path: thisFile + '/permissions/save',
    method: 'post'
  },
  casesListPage:{  //目录树列表
    path: thisFile + '/listPage',
    method: 'get'
  },
  casesGet:{ //查看  get/{id}
    path: thisFile + '/get',
    method: 'get'
  },
  casesRemove:{  //删除  remove/{ids}
    path: thisFile + '/remove',
    method: 'delete'
  },
  casesModify:{  //修改  modify/{id}
    path: thisFile + '/modify',
    method: 'put'
  },
  casesAdd:{  //添加
    path: thisFile + '/add',
    method: 'post'
  },
  canceled:{  //撤销  canceled/{ids}
    path: thisFile + '/canceled',
    method: 'put'
  },
  published:{  //发布  published/{ids}
    path: thisFile + '/published',
    method: 'put'
  },
  casesAudit:{  //批量审核  audit/{ids}
    path: thisFile + '/audit',
    method: 'post'
  },
  types:types,
};

export default api
