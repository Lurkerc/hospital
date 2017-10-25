const api = {
  save: { //部门人员-添加/修改 进修生
    path: '/user/saveJXS',
    method: 'post'
  },
  get: { //部门人员-查看进修生
    path: '/user/getJXS/',
    method: 'post'
  },
  import: { //部门人员-导入进修生
    path: '/user/importJXS/', // {deptId}
    method: 'post'
  },
};

export default api
