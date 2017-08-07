/**   --资源分类管理--   **/
const thisFile = 'resourceType';
const api = {
  tree: { // 左侧树
    path: thisFile + '/tree',
    method: 'get'
  },
  treeListPage:{  //目录树列表
    path: thisFile + '/listPage',
    method: 'get'
  },
  treeGet:{ //查看  get/{id}
    path: thisFile + '/get',
    method: 'get'
  },
  treeRemove:{  //删除  remove/{ids}
    path: thisFile + '/remove',
    method: 'delete'
  },
  treeModify:{  //修改  modify/{id}
    path: thisFile + '/modify',
    method: 'put'
  },
  treeAdd:{  //添加
    path: thisFile + '/add',
    method: 'post'
  },
  moveTreeNode:{  //树节点拖动  parentId/{id}
    path: thisFile + '/modify/parentId',
    method: 'put'
  }
};

export default api
