import _ from 'lodash';
import baseRules from '../../formRules/base'; // 公共规则

// 事务管理
let affairs = {
  registerDate: [baseRules.isDate], // 开始时间 必填且为时间类型
  timeInterval: baseRules.required, // 结束时间 必填
  affairType: baseRules.selectText, // 类型 必选
  classhour: baseRules.numberMust, // 课时 必须为数字
  peopleNum: baseRules.numberMust, // 人数 必须为数字
};

/**
 * 树菜单
 */
let tree = {
  name: baseRules.required, // 名称 - 必填
};

/**
 * 房间管理
 */
let roomManage = {
  roomNum: baseRules.required, // 房间号 - 必填
  roomName: baseRules.required, // 房间名称 - 必填
  floor: baseRules.numberMust, // 所在楼层 - 必须为数字
};

/**
 * 房间使用情况
 */
let roomUsage = {
  roomId: baseRules.selectId, // 房间 - 必选
  employType: baseRules.selectText, // 使用类型 - 必选
  startTime: baseRules.isDate, // 开始时间 - 必须为日期时间
  endTime: baseRules.isDate, // 结束时间 - 必须为日期时间
};

/**
 * 设备管理 - 设备入库
 */
let deviceStorage = {
  deviceTypeName: baseRules.required, // 借用人 - 必填
};

/**
 * 设备管理 - 设备入库 - 设备详情
 */
let deviceStorageMoreInfo = {
  purchaseTime: baseRules.isDate, // 购买时间 - 必须为日期时间
  price: baseRules.numberMust, // 单价 - 必须为数字
  deviceIdentifier: baseRules.required, // 设备编号 - 必填
  manufactureDate: baseRules.isDate, // 生产日期 - 必须为日期时间
  guaranteeDate: baseRules.isDate, // 保修截止日期 - 必须为日期时间
  status: baseRules.selectText, // 使用类型 - 必选
};

/**
 * 设备管理 - 借用记录
 */
let deviceLoan = {
  borrower: baseRules.required, // 借用人 - 必填
  borrowTime: baseRules.isDate, // 借用时间 - 必须为日期时间
  purpose: baseRules.required, // 用途 - 必填
  deviceId: baseRules.selectId, // 设备名称 - 必选
  deviceTypeId: baseRules.selectId, // 设备编号 - 必选
};

/**
 * 设备管理 - 维修记录
 */
let deviceServicing = {
  deviceId: baseRules.selectId, // 设备名称 - 必选
  deviceTypeId: baseRules.selectId, // 设备编号 - 必选
  cost: baseRules.numberMust, // 费用 - 必填
  startTime: baseRules.isDate, // 维修开始时间 - 必须为日期时间
};

/**
 * 设备管理- 报废记录
 */
let deviceScrap = {
  deviceId: baseRules.selectId, // 设备名称 - 必选
  deviceTypeId: baseRules.selectId, // 设备编号 - 必选
  scrapTime: baseRules.isDate, // 报废时间 - 必须为日期时间
  scrapReason: baseRules.required, // 报废原因 - 必填
};

/**
 * 耗材管理 - 消耗品管理
 */
let consumablesManage = {
  consumablesName: baseRules.required, // 名称 - 必填
  price: baseRules.numberMust, // 价格 - 必填
  stock: baseRules.numberMust, // 库存 - 必填
};

/**
 * 耗材管理 - 消耗品管理 - 耗材入库
 */
let consumablesManageInfo = {
  buyDate: baseRules.isDate, // 购买时间 - 必须为日期时间
  buyNum: baseRules.numberMust, // 购买数量 - 必填
  price: baseRules.numberMust, // 单价 - 必填
};

/**
 * 耗材管理 - 使用记录
 */
let consumablesUse = {
  consumablesId: baseRules.selectId, // 设备名称 - 必选
  borrowerNum: baseRules.numberMust, // 数量 - 必须为数字
  borrower: baseRules.required, // 借用人 - 必填
  borrowerTime: baseRules.isDate, // 借用时间 - 必须为日期时间
  purpose: baseRules.required, // 用途 - 必填
};

/**
 * 耗材管理 - 盘点记录
 */
let consumablesCount = {
  consumablesId: baseRules.selectId, // 设备名称 - 必选
  expectNum: baseRules.numberMust, // 预期数量 - 必须为数字
  actualNum: baseRules.numberMust, // 实际数量 - 必须为数字
  // inventoryMan: baseRules.required, // 盘点人 - 必填
  inventoryTime: baseRules.isDate, // 盘点时间 - 必须为日期时间
};

export {
  affairs,
  tree,
  roomManage,
  roomUsage,
  deviceStorage,
  deviceStorageMoreInfo,
  deviceLoan,
  deviceServicing,
  deviceScrap,
  consumablesManage,
  consumablesManageInfo,
  consumablesUse,
  consumablesCount,
};
