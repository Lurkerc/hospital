const thisFile = 'scene/examUser';
const api = {
  list: { // 获取考生列表（成绩查询查看场次详情时调用）
    path: thisFile + '/List',
    method: 'get'
  },
  examUserGet: { // 获取考生分站SP评分详情（查看分站详情加载SP评分详情时调用）
    path: thisFile + '/get',
    method: 'get'
  },
  spGet: { // 获取考生分站成绩教师列表及SP列表（查看分站评分详情加载考生信息，监考老师列表以及SP列表时调用）
    path: thisFile + '/station/sp/get',
    method: 'get'
  },
  stationGet: { // 获取考生分站成绩教师列表及SP列表（查看分站评分详情加载考生信息，监考老师列表以及SP列表时调用）
    path: thisFile + '/station/get',
    method: 'get'
  },
  teacherGet: { // 获取考生分站教师评分详情（查看分站详情加载监考老师评分详情时调用）
    path: thisFile + '/station/teacher/get',
    method: 'get'
  },
};

export default api
