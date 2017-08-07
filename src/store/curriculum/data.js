import _ from "lodash";
/**************************************** 变量模版 *****************************/
// 课程计划
const planDtoItem = {
  no: "", // 第几节课 int 数字
  duration: "", // 课时(几小时)   int 数字
  content: "", // 教学内容
  remark: "", // 详细介绍
  realia: "", // 所需教具
  wareDtoList: [], // 课件对象集合
  wareDtoListTemp: { // 课件对象集合（操作使用）
    before: [], // 课前
    in_progress: [], // 课前
    after: [], // 课后
  },
  testingDtoList: [], // 测评对象集合
  testingDtoListTemp: { // 测评对象集合（操作使用）
    before: { // 课前
      score: '100', // 达标分数
      questionsDtoList: [], // 测评试题对象集合
    },
    in_progress: { // 课中
      score: '100', // 达标分数
      questionsDtoList: [], // 测评试题对象集合
    },
    after: { // 课后
      score: '100', // 达标分数
      questionsDtoList: [], // 测评试题对象集合
    },
  },
};
// 试题
const questionsDtoItem = { //测评试题对象集合
  "theId": 0, // 唯一标识
  "types": "", //题型：RADIO单选题、CHECKBOX多选题、JUDGMENT判断题、ANSWER问答题
  "subject": "", //题干
  "options": "", //正确答案（多选题，多个正确答案|隔开。问答题，该项赋值null）
  "answerExplain": "", //正确答案解析
  "optionsDtoList": [{ // 单选、多选、判断题，该项不能为空，必须有值。
    "options": "A", //选项
    "content": "选项的描述情况", //选项描述
  }, {
    "options": "B",
    "content": "选项的描述情况",
  }, {
    "options": "C",
    "content": "选项的描述情况",
  }],
  "keyWords": null //单选、多选、判断题，该项赋值null。问答题该项参见下面格式
};
// 评价项
let evaluateItem = {
  "title": "", //考核项目
  "remark": "", //考核内容
  "great": "", //优 int
  "good": "", //良 int
  "avg": "", //中 int
  "bad": "" //查  int
};


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
      studentWeight: '', //权重：学生评价
      peersWeight: '', //权重：同行评价
      superiorsWeight: '', //权重：上级评价
      studentEvaluateId: 0, //学生评价表ID，由于选择评价表功能暂不实现。赋值0.
      peersEvaluateId: 0, //同行评价表ID，由于选择评价表功能暂不实现。赋值0.
      superiorsEvaluateId: 0, //上级评价表ID，由于选择评价表功能暂不实现。赋值0.
      studentEvaluate: [], // 学生评价项集合
      peersEvaluate: [], // 同行评价项集合
      superiorsEvaluate: [], // 上级评价项集合
    };
    state.planDtoList = [
      _.defaultsDeep({}, planDtoItem)
    ];
  },
  /**************************** 添加值 *******************************/
  // 添加课程计划
  addPlanDto: state => {
    state.planDtoList.push(_.defaultsDeep({}, planDtoItem))
  },
  /**
   * 添加课件
   *                  课前    课中        课后    课索引        追加的附件数组
   * wareObj { type: 'before|in_progress|after', planIndex:0, list:[] }
   */
  addWareDto: (state, wareObj) => state.planDtoList[wareObj.planIndex].wareDtoListTemp[wareObj.type].push(...wareObj.list),
  /**
   * 添加试题
   *                  课前    课中        课后    计划索引
   * testObj { type: 'before|in_progress|after', planIndex:0 }
   */
  addTestingDto: (state, testObj) => {
    let questionsDtoList = state.planDtoList[testObj.planIndex].testingDtoListTemp[testObj.type].questionsDtoList;
    let theId = questionsDtoList.length + 1;
    questionsDtoItem.theId = theId; // 唯一标识
    questionsDtoList.push(_.defaultsDeep({}, questionsDtoItem))
  },
  /**
   * 添加评价项
   * type String student|peers|superiors
   */
  addEvaluate: (state, type) => state.evaluate[type + 'Evaluate'].push(_.defaultsDeep({}, evaluateItem)),
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
  /**
   * 删除课件
   * delWareObj {type:'课件类型',planIndex:'第几节课索引',delIndex:'需要删除的索引'}
   */
  removeWareDtoList: (state, delWareObj) => state.planDtoList[delWareObj.planIndex].wareDtoListTemp[delWareObj.type].splice(delWareObj.delIndex, 1),
  /**
   * 删除试题
   * delTestObj {type:'课件类型',planIndex:'第几节课索引',delTheId:['需要删除的索引']}
   */
  removeQuestionsDtoList: (state, delTestObj) => {
    let optionsDtoListTemp = [];
    state.planDtoList[delTestObj.planIndex].testingDtoListTemp[delTestObj.type].questionsDtoList.map(item => {
      if (delTestObj.delTheId.indexOf(item.theId) < 0) {
        optionsDtoListTemp.push(item)
      }
    })
    state.planDtoList[delTestObj.planIndex].testingDtoListTemp[delTestObj.type].questionsDtoList = optionsDtoListTemp;
  },
  /**
   * 删除评价项
   * delEltObj {type:"student|peers|superiors", delIndex:"删除索引"}
   */
  removeEvaluate: (state, delEltObj) => state.evaluate[delEltObj.type + 'Evaluate'].splice(delEltObj.delIndex, 1),
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
