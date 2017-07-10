import {
  formatDate,
  parseDate
} from './date';

const getVueObj = function (vue) {
  const typeNames = { // 声明全局类型描述文本
    typeText: { // 公共类型描述文本
      // 是否
      "1": "是",
      "0": "否",
      "Y": "是",
      "N": "否",
      "YES": "是",
      "NO": "否",
      // 用户性别
      "BOY": "男",
      "GIRL": "女",
      // 房间使用类型
      "PRACTISE": "练习",
      "EXAM": "考核",
      "OTHER": "其他",
      // 设备状态
      "NORMAL": "正常",
      "DEFECT": "缺损",
      "DAMAGE": "损坏",
      "SERVICING": "维修中",
      "INUSE": "使用中",
      // 导师类别
      "SD": "硕导",
      "BD": "博导",
      // 考核状态
      "NOARRANGED": "未生成轮转表",
      "UNPUBLISH": "未发布",
      "PUBLISH": "已发布",
      "ONGOING": "考核中",
      "FINISH": "考核结束",
      "SUSPEND": "暂停中",
      // 考核类型
      "STANDARD": "规范考核",
      "FREE": "自由考核",
      // 考生考核状态
      "NOTEXAM": "未考核",
      "DRAW": "待抽签",
      // 设备品牌
      "HIKVISION": "海康威视",
      "DAHUA": "大华",
      // 设备位置
      "ROOM": "房间内",
      // 设备状态
      "OFFLINE": "离线",
      "ONLINE": "在线",
      // 任务执行状态
      "EXECUTING": "执行中",
      "UNEXECUTED": "未执行",
      // 预约开放时间类型
      "ALL": "全天候",
      "SPECIFIC": "特定时间",
      // 评价表设置活动状态
      "NO_PUBLISH": '未发布',
      "PROGRESS": '进行中',
      "END": '结束',
      // 实习生报名审核状态
      "NOT_SUBMIT": "未上报",
      "NOT_AUDIT": "待审核",
      "AUDIT_FAILURE": "未通过",
      "AUDIT_SUCCESS": "审核通过",
      // 是否合格
      "QUALIFIED": "合格",
      "NO_QUALIFIED": "不合格",
      "USER_NOT_REPORT": "未上报",
      "EDU_NOT_REPORT": "单位意见未填写",
      // 病种填写
      'NO_SUBMIT': '未上报',
      'REJECT': '驳回',
      'NO_PASS': '未审核',
      'PASS': '通过',
      // 报到
      "REGISTER": "报到",
      "NO_REGISTER": "未报到",
    },
    /* 特殊描述文本（与公共部分冲突的可以作为特殊处理） */
    unit: { // 单位
      "m": " m",
      "cm": " cm",
      "kg": " kg"
    },
    roomSex: { // 宿舍
      "BOY": '男宿舍',
      "GIRL": '女宿舍',
    },
    qfcLevel: { // 医师执业资格级别
      "0": "职业",
      "1": "助理",
      "2": "无"
    },
    relation: {
      'NO': '无直接关系',
      'LOOP': '轮转关系',
      'DEPT': '本部门或本科室',
    },
    bespeakSetRoomStatus: { // 预约房间设置开放状态
      "NO": "关闭预约",
      "YES": "开放预约"
    },
    synthesizeStatistics: { // 教学评价 - 综合分析统计 - 分析对象
      "ALL": "全部",
      "PART": "部分人",
      "RLOE": "角色",
      "DEPT": "科室",
    },
    print: { // 打印
      "0": '未打印',
      "1": '已打印',
    },
    isPay: { // 缴费
      "0": "未缴费",
      "1": "已缴费",
    },
    isNeed: { // 是否需要
      "0": "不需要",
      "1": "需要"
    },
  };

  const filters = [ // 声明全局过滤器及回调函数
    { // 货币格式化
      name: "money",
      call(value, n, str) { // n 保留小数点位数 | str 货币前缀 | 使用： 10 | money(3,'$') ===> $ 10.000
        // 如果是非Number类型的直接返回源字符串，否则按照过滤器格式处理
        return !isNaN(value) ? (str || '￥') + " " + (+value).toFixed(typeof n === 'number' ? n : 2) : value;
      }
    },
    { // 默认图片
      name: "isDefImg",
      call(value) {
        if (value) return value;
        return '/static/img/physician.ec4c75d.png'
      }
    },
    { // 时间格式化
      name: "formatDate",
      /**
       * @param {any} value 需要处理的时间数据
       * @param {any} format 字符模版 yyyy-MM-dd HH:mm:ss.SSS
       * @returns
       */
      call(value, format) {
        return typeof date == 'string' ? parseDate(value, format) : formatDate(value, format)
      }
    },
  ];

  // 全局注册自定义过滤器
  filters.map(item => vue.filter(item.name, item.call)); // 在应用中直接通过name使用
  Object.keys(typeNames).map(item => vue.filter(item, function (value) { // 在应用中直接通过typeNames中的对象名使用
    if (typeof value === 'number' || typeof value === 'string') {
      // 如果描述文本中没有匹配的则返回原字符
      return typeNames[item][value.toString().toUpperCase()] || value
    }
    return value;
  }))
}

export default getVueObj;
