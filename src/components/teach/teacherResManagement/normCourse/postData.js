let a = {
  "typeId": 1, //所选的类型ID
  "title": "title测试", //课程名称
  "tags": "tags", //标签，多个|分割
  "direction": "direction", //应用方向说明
  "logo": "logo", //缩略图
  "remark": "remark", //课程简介
  "outline": "outline", //教学大纲
  "auditStatus": "NOT_SUBMIT", //审核状态：保存草稿用NOT_SUBMIT，提交审核用NOT_AUDIT
  "planDtoList": [{ //教学计划对象集合
    "no": 1, //第几节课 int 数字
    "duration": 1, //课时(几小时)   int 数字
    "content": "content1", //教学内容
    "remark": "remark1", //详细介绍
    "realia": "realia1", //所需教具
    "wareDtoList": [{ //课件对象集合
      "fileId": 2, //文件ID
      "title": "课件1", //显示名称
      "type": "BEFORE" //课前BEFORE、课中IN_PROGRESS、课后AFTER
    }, {
      "fileId": 2,
      "title": "课件2",
      "type": "BEFORE"
    }],
    "testingDtoList": [ //测评对象集合
      {
        "type": "BEFORE", //课前BEFORE、课中IN_PROGRESS、课后AFTER
        "score": 12, //达标分数
        "questionsDtoList": [{ //测评试题对象集合
          "types": "RADIO", //题型：RADIO单选题、CHECKBOX多选题、JUDGMENT判断题、ANSWER问答题
          "subject": "单选题题干", //题干
          "options": "A", //正确答案（多选题，多个正确答案|隔开。问答题，该项赋值null）
          "answerExplain": "答案解析", //正确答案解析
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
        }, {
          "types": "CHECKBOX",
          "subject": "多选题题干",
          "options": "A|C", //多个选项 | 隔开
          "answerExplain": "答案解析",
          "optionsDtoList": [{
            "options": "A",
            "content": "选项的描述情况",
          }, {
            "options": "B",
            "content": "选项的描述情况",
          }, {
            "options": "C",
            "content": "选项的描述情况",
          }],
          "keyWords": null
        }, {
          "types": "JUDGMENT",
          "subject": "判断题题干",
          "options": "A",
          "answerExplain": "答案解析",
          "optionsDtoList": [{
            "options": "A",
            "content": "正确",
          }, {
            "options": "B",
            "content": "错误",
          }],
          "keyWords": null
        }, {
          "types": "ANSWER",
          "subject": "题干",
          "options": "A",
          "answerExplain": "答案解析",
          "optionsDtoList": null, //问答题，该项赋值null
          "keyWords": [{ //问答题，该项不能为空
            "tag": "解剖", //得分关键词
            "weight": 5 //得分权重、比重
          }, {
            "tag": "手术刀",
            "weight": 3
          }]
        }]
      }
    ]
  }],
  "evaluate": { //教学质量评价对象
    "studentWeight": 1, //权重：学生评价
    "peersWeight": 3, //权重：同行评价
    "superiorsWeight": 2, //权重：上级评价
    "studentEvaluateId": 0, //学生评价表ID，由于选择评价表功能暂不实现。赋值0.
    "peersEvaluateId": 0, //同行评价表ID，由于选择评价表功能暂不实现。赋值0.
    "superiorsEvaluateId": 0, //上级评价表ID，由于选择评价表功能暂不实现。赋值0.
    "studentEvaluate": [{ //学生评价项集合
      "title": "上课活跃度", //考核项目
      "remark": "上课是否活跃", //考核内容
      "great": "8", //优 int
      "good": "7", //良 int
      "avg": "5", //中 int
      "bad": "3" //查  int
    }, {
      "title": "上课活跃度",
      "remark": "上课是否活跃",
      "great": "8",
      "good": "7",
      "avg": "5",
      "bad": "3"
    }],
    "peersEvaluate": [{ //同行评价项集合
      "title": "上课活跃度",
      "remark": "上课是否活跃",
      "great": "8",
      "good": "7",
      "avg": "5",
      "bad": "3"
    }],
    "superiorsEvaluate": [{
      上级评价项集合 "title": "上课活跃度",
      "remark": "上课是否活跃",
      "great": "8",
      "good": "7",
      "avg": "5",
      "bad": "3"
    }]
  }
}
