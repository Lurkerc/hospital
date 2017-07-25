const thisFile = 'device/type';
const api = {
  list: { // 列表数据
    path: thisFile + '/list',
    method: 'get'
  },
  get: { // 获取
    path: thisFile + '/get',
    method: 'get'
  },
  modify: { // 修改
    path: thisFile + '/modify',
    method: 'put'
  },
  add: { // 增加
    path: thisFile + '/add',
    method: 'post'
  },
  storage: { // 设备入库
    path: 'device/add',
    method: 'post'
  },
  excelExport: { // 导出设备信息
    path: 'device/excelExport',
    method: 'get'
  },
  excelImportSave: { // 导入设备信息-数据入库
    path: 'device/excelImport/save',
    method: 'post'
  },
  delete: thisFile + '/remove', // 删除
};

export default api
