const thisFile = 'criterionCourseTestingQuestions';
const api = {

  get: { // 课程直播-详情
    path: '/live/info',
    method: 'get'
  },


  historyPlay: { // 课程直播-历史点播
    path: '/live/history-play',
    method: 'get'
  },

  nextPlay: { // 课程直播-最近直播
    path: '/live/next-play',
    method: 'get'
  },

  queryMsg: { // 课程直播-获取最新聊天记录
    path: '/live/queryMsg',
    method: 'get'
  },


  sendMsg: { // 程直播-发消息
    path: '/live/sendMsg',
    method: 'get'
  },


};

export default api
