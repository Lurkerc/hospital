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
      "KAIXI": "凯熙",
      "SPON": "世邦",
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
      // 预约状态
      "UNREPORTED": "待上报",
      "START": "待使用",
      "UNEVALUATED": "待评分",
      //培训标准
      "ENABLE": '启用',
      "DISABLE": '禁用',

      "MAIN_COMPLETED": "主要完成",
      "ASSISTANT": "助手",
      "WATCH": "观摩",

      "SUBMIT": "未审核",

      // 在线学习课程状态
      "TESTRUN": "试运行",
      "EXIT": "退出",

      // 在线学习课程作业类型
      "RADIO": "单选题",
      "CHECKBOX": "多选题",
      "JUDGMENT": "判断题",
      "ANSWER": "问答题",
      //教学计划
      'RELEASE':'发布',
      'NO_RELEASE':'未发布',

    },
    /* 特殊描述文本（与公共部分冲突的可以作为特殊处理） */
    unit: { // 单位
      "m": " m",
      "cm": " cm",
      "kg": " kg"
    },
    auditStatus: {
      NOT_SUBMIT: '草稿',
      NOT_AUDIT: '已上报',
      AUDIT_FAILURE: '驳回',
      AUDIT_SUCCESS: '通过',
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
    rotaryState: { //轮转状态
      "-1": "暂停",
      "9": "已安排未开始轮转",
      "99": "轮转中",
      "999": "轮转完成",
      "9999": "轮转结束",
      "10000": "终止轮转",
      "0": "未安排轮转",
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

    userType: { // 用户类型
      "ALL": "所有人员",
      "ZYY": "住院医",
      "JXS": "进修生",
      "SXS": "实习生",
      "YJS": "研究生",
      "DJLS": "带教老师",
      "SPECIFIC": "特定人员"
    },
    bespeakType: { // 预约审核类型
      "UNREPORTED": "待上报",
      "PENDING": "待审核",
      "REJECT": "驳回",
      "ADOPT": "通过",
      "START": "已开课",
      "UNEVALUATED": "待评价",
      "END": "结束",
    },
    affairsType: { // 事项类型
      "FOCUS": "集中培训",
      "PERSONAL": "零散培训",
      "EXAM": "练习",
      "ORTHER": "其他",
    },
    courseStatus: { // 课程状态(标准|授课)
      "DXD": "待修订",
      "TESTRUN": "试运行",
      "DSH": "待审核",
      "RUN": "在运行",
      "TG": "通过",
      "BH": "驳回",
      "EXIT": "已退出",
    },
    casesStatus: { // 基础教务-资源库管理-病历库
      "NOT_SUBMIT": "未上报",
      "NOT_AUDIT": "待审核",
      "AUDIT_FAILURE": "不通过",
      "AUDIT_SUCCESS": "通过",
      "PUBLISH": "已发布",
      "UNPUBLISH": "未发布",
    },
    //占位符
    placeholder: {
      '': '　',
      'null': '　',
      'undefined': '　'
    },
    // 是否在线
    isOnline: {
      "YES": "在线",
      "NO": "离线",
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
        return '/static/image/physician.png'
      }
    },
    {
      name: 'formatSize',
      call(value) {
        let temp;
        let init;
        let float;
        if (!value) return '0KB';
        if (value < 1024) {
          return value + 'B';
        } else if (value < (1024 * 1024)) {
          temp = value / 1024;
          temp = temp.toFixed(2);
          return temp + 'KB';
        } else if (value < (1024 * 1024 * 1024)) {
          init = (value / (1024 * 1024));
          //float = (value % (1024*1024))/1024;
          return init.toFixed(2) + 'MB ' //+float.toFixed(2)+'KB';
        } else {
          init = (value / (1024 * 1024 * 1024));
          //float = (value % (1024*1024*1024))/(1024*1024);
          return init.toFixed(2) + 'GB ' //+ float.toFixed(2) + 'MB';
        }
        return;
      },
    },
    {
      name: 'formatUploadSize',
      call(value) {
        let temp;
        let init;
        let float;
        if (!value) return '0KB';
        if (value < 1024) {
          return value + 'kB';
        } else if (value < (1024 * 1024)) {
          temp = value / 1024;
          temp = temp.toFixed(2);
          return temp + 'MB';
        } else if (value < (1024 * 1024 * 1024)) {
          init = (value / (1024 * 1024));
          //float = (value % (1024*1024))/1024;
          return init.toFixed(2) + 'GB ' //+float.toFixed(2)+'KB';
        }
        return;
      },
    },
    {
      name: 'formatLength', //格式化时长
      call(value) {
        let temp;
        let init;
        if (!value) return '0秒';
        if (value < 60) {
          return value + '秒';
        } else if (value < (60 * 60)) {
          init = parseInt(value / 60);
          temp = (value % 60);
          return init + '分' + temp + '秒';
        } else  {
          init = parseInt(value/(60*60));
          temp =  parseInt((value %(60*60))/60);
          //float = (value % (1024*1024))/1024;
          return init + '时' + temp + '分';
        }
        return;
      },
    },
    {
      name: 'formatTime',
      call(value,str) {
        return getDateDiff(value,str);
      },
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

  function getDateDiff(dateTimeStamp,str) {
    let minute = 1000 * 60;
    let hour = minute * 60;
    let day = hour * 24;
    let halfamonth = day * 15;
    let month = day * 30;

    let now = new Date().getTime();
    let diffValue = now - dateTimeStamp;

    let result = "";
    if (diffValue < 0) {
      //若日期不符则弹出窗口告之
      //alert("结束日期不能小于开始日期！");
    }
    let monthC = diffValue / month;
    let weekC = diffValue / (7 * day);
    let dayC = diffValue / day;
    let hourC = diffValue / hour;
    let minC = diffValue / minute;
    if (monthC >= 1) {
      result = str + parseInt(monthC) + "个月前";
    } else if (weekC >= 1) {
      result = str + parseInt(weekC) + "周前";
    } else if (dayC >= 1) {
      result = str + parseInt(dayC) + "天前";
    } else if (hourC >= 1) {
      result = str + parseInt(hourC) + "个小时前";
    } else if (minC >= 1) {
      result = str + parseInt(minC) + "分钟前";
    } else
      result = "刚刚";
    return result;
  }

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
