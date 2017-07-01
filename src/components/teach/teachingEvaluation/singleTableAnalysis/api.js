const thisFile = '/activity/query';
const api = {
  list: { // 分页查询分析策略 
    path: thisFile + '/analysiTable',
    method: 'get'
  },
  analysiTableReport: { // 单表分析-查看分析-分析报告
    path: thisFile + '/analysiTableReport',
    method: 'get'
  },
  analysiTableDetail: {
    path: thisFile + '/analysiTableDetail/', // {activityId}
    method: 'get'
  },
  /* 删除 */
  delete: thisFile + '/remove', // 删除一条或多条记录
};

export default api
