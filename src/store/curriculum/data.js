const state = {
  // course: {}, // 课程基本信息
  // planDtoList: [], // 课程计划
  // evaluate: {}, // 教学质量评价对象
};

const mutations = {
  /**************************** 初始化 *******************************/
  init: state => {
    state.course = {
      typeId: "", //所选的类型ID
      title: "", //课程名称
      tags: "", //标签，多个|分割
      direction: "", //应用方向说明
      logo: "", //缩略图
      remark: "", //课程简介
      outline: "", //教学大纲
      auditStatus: "NOT_SUBMIT", //审核状态：保存草稿用NOT_SUBMIT，提交审核用NOT_AUDIT
      createUser: "", // 创建人
      createTime: "", // 创建时间
    };
    state.evaluate = {
      studentWeight: 1, //权重：学生评价
      peersWeight: 3, //权重：同行评价
      superiorsWeight: 2, //权重：上级评价
      studentEvaluateId: 0, //学生评价表ID，由于选择评价表功能暂不实现。赋值0.
      peersEvaluateId: 0, //同行评价表ID，由于选择评价表功能暂不实现。赋值0.
      superiorsEvaluateId: 0, //上级评价表ID，由于选择评价表功能暂不实现。赋值0.
      studentEvaluate: [], // 学生评价项集合
      peersEvaluate: [], // 同行评价项集合
      superiorsEvaluate: [], // 上级评价项集合
    };
    state.planDtoList = [];
  },
  /**************************** 添加值 *******************************/
  // 添加课程计划
  addPlanDto: state => {
    state.planDtoList.push({
      no: "", // 第几节课 int 数字
      duration: "", // 课时(几小时)   int 数字
      content: "", // 教学内容
      remark: "", // 详细介绍
      realia: "", // 所需教具
      wareDtoList: [], // 课件对象集合
      testingDtoList: [], // 测评对象集合
    })
  },
  /**************************** 更新值 *******************************/
  /**
   * 更新课程基本信息
   * course Object {key:value}
   */
  updateCourse: (state, course) => {
    for (let item in course) {
      state.course[item] = course[item]
    }
  },
  /**
   * 更新课程计划
   * planList Array []
   */
  updatePlanDto: (state, planList = []) => state.planDtoList = planList,
  /**
   * 更新教学质量评价对象
   * course Object {key:value}
   */
  updateEvaluate: (state, course = {}) => {
    for (let item in course) {
      state.evaluate[item] = course[item]
    }
  },
  /**************************** 删除值 *******************************/
  /**
   * 删除课程计划
   * index 删除索引
   */
  removePlanDto: (state, index) => state.planDtoList.splice(index, 1),
  /**************************** 销毁值 *******************************/
  destroy: state => {
    state.course = null;
    state.evaluate = null;
    state.planDtoList = null;
  }
};

export {
  state,
  mutations
}
