import {
  formatDate,
  parseDate
} from './date';

const getVueObj = function (vue) {
  const typeNames = { // 声明全局类型描述文本
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
    //导师类别
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
  };
  const unitText = { // 单位
    "m": "m",
    "cm": "cm",
    "kg": "kg"
  };
  const filters = [ // 声明全局过滤器及回调函数
    { // 货币格式化
      name: "money",
      call(value, n, str) { // n 保留小数点位数 | str 货币前缀 | 使用： 10 | money(3,'$') ===> $ 10.000
        // 如果是非Number类型的直接返回源字符串，否则按照过滤器格式处理
        return !isNaN(value) ? (str || '￥') + " " + (+value).toFixed(typeof n === 'number' ? n : 2) : value;
      }
    },
    { // 通过类型获取对应的描述文本
      name: "typeText",
      call(value) {
        if (value) {
          // 如果描述文本中没有匹配的则返回原字符
          return typeNames[value.toString().toUpperCase()] || value
        }
        return value;
      }
    },
    { // 通过类型获取对应的描述文本
      name: "roomSex",
      call(value) {
        let typeNames = {
          "BOY": '男宿舍',
          "GIRL": '女宿舍',
        };
        if (!value) return value
        let val = value.toUpperCase();
        // 如果描述文本中没有匹配的则返回原字符
        return typeNames[val] || value
      }
    },
    { // 单位
      name: "unit",
      call(value, key) {
        let val = unitText[key];
        return value + " " + val;
      }
    },
    { // 默认图片
      name: "isDefImg",
      call(value) {
        if (value) return value;
        console.log('11', value);
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
    }
  ];

  // 全局注册自定义过滤器，在应用中直接通过name使用
  filters.map(item => {
    vue.filter(item.name, item.call)
  })
}

export default getVueObj;
