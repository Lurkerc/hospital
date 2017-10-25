const api = {
  save: { //部门人员-添加/修改 研究生
    path: '/user/saveYJS',
    method: 'post'
  },
  get: { //部门人员-查看研究生
    path: '/user/getYJS/',
    method: 'post'
  },
  import: { //部门人员-导入研究生
    path: '/user/importYJS/', // {deptId}
    method: 'post'
  },
};

export default api
