import _ from 'lodash';
import checkCard from './util/checkCard'; // 身份证验证

let defEvent = 'blur'; // 默认触发事件
let changeEvent = 'change';

/**
 * 规则名称       规则描述[触发事件]{后面跟上+号的表示可选规则，使用时在原规则加后缀“Must”}
 * ---------------------- 普通规则 -----------------------------
 * required       非空验证[blur]
 * mustHasOne     至少选择一个[change]
 * idNumber       身份证[default]
 * selectId       下拉框选择[change]
 * selectText     下拉框选择文本[change]
 * ---------------------- 可选规则 ------------------------------
 * mobile         手机号[default]+
 * email          邮箱[blur]+
 * number         数字[change]+
 * ---------------------- 规则函数 -----------------------------
 * sectionVal     字符串区间
 * asyncVal       异步服务器验证
 * isDate         date检测
 * inputLen       字符串区间
 * illegalChar    非法字符串
 */

/************************* 常规规则 ****************************/
let baseRules = {
  // 非空验证
  required: {
    required: true,
    message: '此项不能为空',
    trigger: defEvent
  },
  // 至少选择一个
  mustHasOne: {
    type: 'array',
    required: true,
    message: '请至少选择一个',
    trigger: 'change'
  },

  // 身份证
  //idNumber: checkCard,
  idNumber: {},

  // 下拉框选择id
  selectId: {
    required: true,
    type: 'number',
    message: '该项必须选择',
    trigger: changeEvent
  },

  // 下拉框选择文本
  selectText: {
    required: true,
    type: 'string',
    message: '该项必须选择',
    trigger: changeEvent
  },

  /*
   * 字符串区间值
   * @min number 范围最小值
   * @max number 范围最大值
   * @return {}
   * */
  sectionVal: function (min = 2, max = 20) {
    return {
      min: min,
      max: max,
      message: '长度在 ' + min + ' 到 ' + max + ' 个字符'
    }
  },

  /**
   * 输入字符长度检测
   * @min number 范围最小值
   * @max number 范围最大值
   *
   * 参数：null -> 不做任何检测 inputLen()
   *      min -> 最少输入多少个字符 inputLen(2)
   *      0,max -> 最多输入多少个字符 inputLen(0,5)
   *      min,max -> 只能输入min-max个字符 inputLen(1,10)
   */
  inputLen: (min, max) => {
    // 长度检测
    return (rule, value = '', callback) => {
      let msg;
      if (min === 0 && max && value.length > max) {
        msg = `最多输入${max}个字符`;
      } else {
        if (max && (value.length > max || value.length < min)) {
          msg = `只能输入${min}-${max}个字符`
        }
        if (value.length < min) {
          msg = `最少输入${min}个字符`;
        }
      }
      msg && callback(new Error(msg));
      callback();
    }
  },

  /**
   * 非法字符串检测
   * @reg 非法字符正则表达式 默认只能输入中文、数字、英文（不含标点符号）
   *  /[@#\$%\^&\*]+/ ----> @|#|$|%|^|&|* 都属于非法字符
   */
  illegalChar: (reg = /[^\u4e00-\u9fa5\w\s，。、；‘’“”《》——+-、~·！]/m) => {
    return (rule, value = '', callback) => {
      value && reg.test(value) && callback(new Error('存在非法字符！'))
      callback()
    }
  },

  /*
   * 异步验证数据
   * @optins {} //验证传递的参数
   * example
   * //{validator:baseRules.asyncVal, oldValue:{value:'',val:false}, url:'http://192.168.1.116:8000/role/list?name=&identify=djgs&type=', myMessage:'已存在', trigger: 'blur'}
   * */
  asyncVal: function (rule, value, callback, source, options) {

    let url = rule.url; //服务请求的地址
    let params = {}; //服务请求的必须参数
    let messages = rule.myMessage;
    if (value == "") {
      rule.oldValue["value"] = "";
      return;
    }
    /*if(rule.oldValue["value"]==value){
      switch (rule.oldValue["val"]) {
        case 0:
          //已验证成功
          callback();
          break;
        case 1:
          //验证失败
          callback(new Error(messages));
          break;
        case 2:
          //验证失败
          callback(new Error("服务端数据验证失败!"));
          break;
        case 3:
          //客户端请求异常
          callback(new Error("客户端请求异常!"));
          break;
      }
      return ;
    }*/
    rule.oldValue["value"] = value;
    utils.queryData({
      url: url,
      params: params
    })().then(function (data) {
      let response = data["data"];
      if (data["status"] == 200) {
        if (response["data"].length > 0) {
          //数据库中已存在
          rule.oldValue["val"] = 1;
          callback(new Error(messages));
        } else {
          //数据库中不存在
          rule.oldValue["val"] = 0;
          callback();
        }
      } else {
        //服务端已经响应,2XX错误
        rule.oldValue["val"] = 2;
        callback(new Error("服务端数据验证失败!"));
      }
    }).catch(function (error) {
      //客户端请求失败
      rule.oldValue["val"] = 3;
      callback(new Error(error))
    })
  },
  /**
   * 检测是否为date
   */
  isDate: function (rule, value, callback) {
    //检验位的检测
    if ((value === null || value === undefined) || (isNaN(new Date(value).getTime()))) {
      callback(new Error('格式不正确，请重新选择'));
    }
    callback();
  }
}

/************************* 可选规则 ****************************/
/**
 * 非必填，但如果有值则按规则进行验证
 */
let mustRules = {
  // 邮箱
  email: {
    type: 'email',
    message: '邮箱格式不正确',
    trigger: defEvent,
  },

  // 手机号
  mobile: {
    type: 'string',
    message: '手机号格式不正确',
    pattern: /^1(3|4|5|7|8)\d{9}$/
  },

  // 数字
  number: {
    // type: 'number',
    message: '该项必须为数字',
    pattern: /^\d{1,10}$/,
    trigger: defEvent
  },
};

// 可选规则追加必填属性，规则名称后缀"Must"
_.map(mustRules, (val, key) => {
  mustRules[key + 'Must'] = _.defaultsDeep({}, {
    required: true
  }, val);
});

Object.assign(baseRules, mustRules);

export default baseRules
