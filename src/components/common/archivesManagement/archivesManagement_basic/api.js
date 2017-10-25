let api = {
  // 其他人员
  otherGet: {
    path: '/archives/get/basic/',
    method: 'get'
  },
  otherSave: {
    path: '/archives/save/basic/',
    method: 'post'
  },

  // 头像上传
  uploadHeaderUrl: '/file/upload/headImg',
  // 获取字典
  getDictionary: '/dictionary/getByCode/',
};

export default api;
