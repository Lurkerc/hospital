const api = {
  save: { //部门人员-添加/修改 住院医
    path: '/user/saveZYY',
    method: 'post'
  },
  get: { //部门人员-查看住院医
    path: '/user/getZYY/',
    method: 'post'
  },
  import: { //部门人员-导入住院医
    path: '/user/importZYY/', // {deptId}
    method: 'post'
  },
};

export default api
