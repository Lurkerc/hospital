const thisFile = '/rotationProcess/outBigDepAppraise';
const api = {
  managePagelist: { // 非轮转生查看出科鉴定列表
    path: thisFile + '/managePagelist',
    method: 'get'
  },
  addManageComment: { // 根据大科室出科鉴定ID添加教育处评语
    path: thisFile + '/addManageComment/', // {examinationId}
    method: 'post'
  },
  get: { // 查看出科鉴定
    path: thisFile + '/get/_', // {examinationId}
    method: 'get'
  },
};

export default api
