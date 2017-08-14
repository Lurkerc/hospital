let data = {
  "typeId": 1, //所属分类ID
  "title": "title测试", //课程名称
  "tags": "tags", //课程标签、关键词
  "direction": "direction", //应用方向说明
  "logo": "logo", //课程图片
  "remark": "这是课程简介，可能是一段html代码，也有可能就是纯文字", //课程简介
  "outline": "教学大纲就厉害了", //教学大纲
  "auditStatus": "NOT_SUBMIT", //课程审核状态
  "planDtoList": [ //教学计划
    {
      "no": 1, //第几节课
      "duration": 1, //课时(几小时)
      "content": "content1", //教学内容
      "remark": "remark1", //详细介绍
      "realia": "realia1", //所需教具
      "wareDtoList": { //课件
        "before": [{ //课前 课件
          "title": "课件1", // 课件显示名称
          "fileId": 2, // 文件ID
          "fileName": "我是文件名称.PDF", //文件名称
          "fileType": "PDF", //文件类型
          "fileSize": 1024 //文件大小
        }, {
          "title": "课件1",
          "fileId": 2,
          "fileName": "我是文件名称.PDF",
          "fileType": "PDF",
          "fileSize": 1024
        }],
        "inProgress": [{ //课中 课件
          "title": "课件1",
          "fileId": 2,
          "fileName": "我是文件名称.PDF",
          "fileType": "PDF",
          "fileSize": 1024
        }, {
          "title": "课件1",
          "fileId": 2,
          "fileName": "我是文件名称.PDF",
          "fileType": "PDF",
          "fileSize": 1024
        }],
        "after": [{ //课后 课件
          "title": "课件1",
          "fileId": 2,
          "fileName": "我是文件名称.PDF",
          "fileType": "PDF",
          "fileSize": 1024
        }, {
          "title": "课件1",
          "fileId": 2,
          "fileName": "我是文件名称.PDF",
          "fileType": "PDF",
          "fileSize": 1024
        }]
      },
      "testingDtoList": { //测评
        "before": { //课前 测评
          "score": 12, //达标分数
          "questionsDtoList": [{ //试题
            "types": "RADIO", // 试题类型
            "subject": "单选题题干", // 题干
            "options": "A", // 正确选项
            "answerExplain": "答案解析", // 答案解析
            "optionsDtoList": [{ // 所有选项
              "options": "A", // 选项
              "content": "选项的描述情况" //选项内容
            }, {
              "options": "B",
              "content": "选项的描述情况"
            }, {
              "options": "C",
              "content": "选项的描述情况"
            }],
            "keyWords": null
          }, {
            "types": "CHECKBOX",
            "subject": "多选题题干",
            "options": "A,C",
            "answerExplain": "答案解析",
            "optionsDtoList": [{
              "options": "A",
              "content": "选项的描述情况"
            }, {
              "options": "B",
              "content": "选项的描述情况"
            }, {
              "options": "C",
              "content": "选项的描述情况"
            }],
            "keyWords": null
          }, {
            "types": "JUDGMENT",
            "subject": "判断题题干",
            "options": "A",
            "answerExplain": "答案解析",
            "optionsDtoList": [{
              "options": "A",
              "content": "正确"
            }, {
              "options": "B",
              "content": "错误"
            }],
            "keyWords": null
          }, {
            "types": "ANSWER",
            "subject": "题干",
            "options": "A",
            "answerExplain": "答案解析",
            "optionsDtoList": null,
            "keyWords": [{
              "tag": "解剖",
              "weight": 5
            }, {
              "tag": "手术刀",
              "weight": 3
            }]
          }]
        },
        "inProgress": {
          "score": 12,
          "questionsDtoList": [{
            "types": "RADIO",
            "subject": "单选题题干",
            "options": "A",
            "answerExplain": "答案解析",
            "optionsDtoList": [{
              "options": "A",
              "content": "选项的描述情况"
            }, {
              "options": "B",
              "content": "选项的描述情况"
            }, {
              "options": "C",
              "content": "选项的描述情况"
            }],
            "keyWords": null
          }, {
            "types": "CHECKBOX",
            "subject": "多选题题干",
            "options": "A,C",
            "answerExplain": "答案解析",
            "optionsDtoList": [{
              "options": "A",
              "content": "选项的描述情况"
            }, {
              "options": "B",
              "content": "选项的描述情况"
            }, {
              "options": "C",
              "content": "选项的描述情况"
            }],
            "keyWords": null
          }, {
            "types": "JUDGMENT",
            "subject": "判断题题干",
            "options": "A",
            "answerExplain": "答案解析",
            "optionsDtoList": [{
              "options": "A",
              "content": "正确"
            }, {
              "options": "B",
              "content": "错误"
            }],
            "keyWords": null
          }, {
            "types": "ANSWER",
            "subject": "题干",
            "options": "A",
            "answerExplain": "答案解析",
            "optionsDtoList": null,
            "keyWords": [{ // 问答题 关键词
              "tag": "解剖", // 关键词
              "weight": 5 // 得分权重
            }, {
              "tag": "手术刀",
              "weight": 3
            }]
          }]
        },
        "after": {
          "score": 12,
          "questionsDtoList": [{
            "types": "RADIO",
            "subject": "单选题题干",
            "options": "A",
            "answerExplain": "答案解析",
            "optionsDtoList": [{
              "options": "A",
              "content": "选项的描述情况"
            }, {
              "options": "B",
              "content": "选项的描述情况"
            }, {
              "options": "C",
              "content": "选项的描述情况"
            }],
            "keyWords": null
          }, {
            "types": "CHECKBOX",
            "subject": "多选题题干",
            "options": "A,C",
            "answerExplain": "答案解析",
            "optionsDtoList": [{
              "options": "A",
              "content": "选项的描述情况"
            }, {
              "options": "B",
              "content": "选项的描述情况"
            }, {
              "options": "C",
              "content": "选项的描述情况"
            }],
            "keyWords": null
          }, {
            "types": "JUDGMENT",
            "subject": "判断题题干",
            "options": "A",
            "answerExplain": "答案解析",
            "optionsDtoList": [{
              "options": "A",
              "content": "正确"
            }, {
              "options": "B",
              "content": "错误"
            }],
            "keyWords": null
          }, {
            "types": "ANSWER",
            "subject": "题干",
            "options": "A",
            "answerExplain": "答案解析",
            "optionsDtoList": null,
            "keyWords": [{
              "tag": "解剖",
              "weight": 5
            }, {
              "tag": "手术刀",
              "weight": 3
            }]
          }]
        }
      }
    }
  ],
  "evaluate": { // 教学质量评价
    "studentWeight": 1, //学生权重
    "peersWeight": 3, // 同级权重
    "superiorsWeight": 2, // 上级权重
    "studentEvaluate": [{ //学生评价表
      "title": "上课活跃度", //考核项目
      "remark": "上课是否活跃", //考核内容
      "great": "8", // 优
      "good": "7", // 良
      "avg": "5", // 中
      "bad": "3" // 差
    }, {
      "title": "上课活跃度",
      "remark": "上课是否活跃",
      "great": "8",
      "good": "7",
      "avg": "5",
      "bad": "3"
    }],
    "peersEvaluate": [{ //同级评价
      "title": "上课活跃度",
      "remark": "上课是否活跃",
      "great": "8",
      "good": "7",
      "avg": "5",
      "bad": "3"
    }],
    "superiorsEvaluate": [{ //上级评价
      "title": "上课活跃度",
      "remark": "上课是否活跃",
      "great": "8",
      "good": "7",
      "avg": "5",
      "bad": "3"
    }]
  }
};

export default data
