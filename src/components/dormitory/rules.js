import _ from 'lodash';
import baseRules from '../../formRules/base'; // 公共规则

/**
 * 楼房信息管理
 */
let buildingMessList = {
  name: [baseRules.inputLen(0,50),baseRules.illegalChar()] // 名称 - 必填
};
let buildingMess = {
  name: [{ required: true, message: '此项不能为空'},baseRules.inputLen(0,50),baseRules.illegalChar()], //
  phone: [baseRules.inputLen(0,20),baseRules.illegalChar()], //
  address: [baseRules.inputLen(0,50),baseRules.illegalChar()], //
  remark: [baseRules.inputLen(0,500),baseRules.illegalChar()],//
};


/**
 * 房间信息管理
 */
let roomMessList = {
  buildingName: [baseRules.inputLen(0,50),baseRules.illegalChar()], // 名称 - 必填
};
let roomMess = {
  name: [baseRules.inputLen(0,50),baseRules.illegalChar()], //
  no: [{ required: true, message: '此项不能为空'},baseRules.inputLen(0,20),baseRules.illegalChar()], //
  bedNum: [{ required: true, message: '此项不能为空'},baseRules.inputLen(0,20),baseRules.illegalChar()] ,//
  remark: [baseRules.inputLen(0,500),baseRules.illegalChar()], //
  buildId:[{ required: true, message: '此项不能为空'}] , //大楼名称
  sex:[baseRules.required],  //类别
};

/**
 * 迁入迁出
 */
let inAndOutList = {
  buildingName: [baseRules.inputLen(0,50),baseRules.illegalChar()], // 名称 - 必填
};
let inAndOut = {
  userNames: [baseRules.required,baseRules.illegalChar()], //
  remark: [baseRules.inputLen(0,500),baseRules.illegalChar()],//
  no:[baseRules.required,baseRules.illegalChar()],
  userName:[baseRules.required,baseRules.illegalChar()],
};






export default {
  buildingMessList,
  buildingMess,
  roomMessList,
  roomMess,
  inAndOutList,
  inAndOut
};
