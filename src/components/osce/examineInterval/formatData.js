/**
 * 数据处理
 */

import _ from 'lodash';
import {
  formatDate
} from '../../../libs/date'; // 时间处理函数

/**
 * 获取保存数据
 * 
 * @export
 * @param {any} args 
 */
function getSaveData(args) {
  let allData = {}; // 所有的提交数据
  // 数据移除绑定
  let info = _.defaultsDeep({}, args.info); // 考次信息
  let roomList = _.defaultsDeep([], args.roomList); // 考站
  let roomData = _.defaultsDeep([], args.roomData); // 考站信息
  let managerList = _.defaultsDeep([], args.managerList); // 场次管理员
  let userList = _.defaultsDeep([], args.userList); // 参考人员
  let spList = _.defaultsDeep([], args.spList); // SP列表
  let spListVal = _.defaultsDeep([], args.spListVal); // SP列表可选择的剧本

  // 数据还原
  let stationList = []; // 站点集合
  let roomTeacherList = []; // 监考老师集合
  // 还原站点信息集合
  _.mapKeys(roomList, (item, index) => {
    let children = item.children; // 考站
    let room = item.room; // 考站房间
    let teacher = item.teacher; // 该房间下的监考老师
    let station = roomData[index]; // 考站对应的考站信息

    let roomIdArr = []; // 缓存使用
    _.mapKeys(teacher, (tItem, tIndex) => { // 考站对应的监考老师
      _.mapKeys(tItem, (tcIntem, tcIndex) => { // 监考老师列表
        tcIntem.roomId = room[tIndex].roomId;
        tcIntem.weight = tcIntem.weight / 100;
        roomTeacherList.push(tcIntem);
      })
    })

    let specialtyList = []; // 考站专业

    _.mapKeys(room, (rItem, rIndex) => {
      roomIdArr.push(rItem.roomId);
      specialtyList.push({
        roomId: rItem.roomId,
        specialty: rItem.specialty === 0 ? '' : rItem.specialty
      })
    });

    roomData[index].roomSpecialtyList = specialtyList; // 当前考站下的房间对应的专业

    station.roomIds = roomIdArr.join(',');
    stationList.push(station);
  })

  // 剧本处理  
  _.mapKeys(spList, (item, index) => {
    let temp = _.difference(item.scriptIds, spListVal); // 取出无效值
    let scriptId = _.difference(item.scriptIds, temp); // 有效值
    spList[index].scriptIds = scriptId.join(',')
  })

  // 数据集组合
  allData = _.assign(info, {
    managerList,
    userList,
    spList,
    stationList,
    roomTeacherList
  });
  // 时间格式化
  allData.startTime = formatDate(allData.startTime, 'yyyy-MM-dd HH:mm:ss') || '';
  allData.endTime = formatDate(allData.endTime, 'yyyy-MM-dd HH:mm:ss') || '';
  allData.examineeNum = userList.length; // 考核人数
  allData.stationNum = roomList.length; // 考站数量

  // 自由考核状态一开始就为“未发布”  
  if (allData.sceneType === 'FREE') {
    allData.status = 'UNPUBLISH'
  }

  return allData
}

/**
 * 获取考站信息修改提交数据
 * 
 * @param {any} args 
 */
function getModifyStationInfoData(args) {
  let roomList = _.defaultsDeep([], args.roomList); // 考站
  let roomData = _.defaultsDeep([], args.roomData); // 考站信息
  let spList = _.defaultsDeep([], args.spList); // SP列表
  let spListVal = _.defaultsDeep([], args.spListVal); // SP列表可选择的剧本

  let allData = {};

  let stationList = [];
  let roomTeacherList = [];

  // 考站遍历  
  // 还原站点信息集合
  _.mapKeys(roomList, (item, index) => {
    let children = item.children; // 考站
    let room = item.room; // 考站房间
    let teacher = item.teacher; // 该房间下的监考老师
    let station = roomData[index]; // 考站对应的考站信息

    let roomIdArr = []; // 缓存使用
    _.mapKeys(teacher, (tItem, tIndex) => { // 考站对应的监考老师
      _.mapKeys(tItem, (tcIntem, tcIndex) => { // 监考老师列表
        tcIntem.roomId = room[tIndex].roomId;
        tcIntem.weight = tcIntem.weight / 100;
        roomTeacherList.push(tcIntem);
      })
    })

    let specialtyList = []; // 考站专业
    _.mapKeys(room, (rItem, rIndex) => {
      roomIdArr.push(rItem.roomId);
      specialtyList.push({
        roomId: rItem.roomId,
        specialty: rItem.specialty === 0 ? '' : rItem.specialty
      })
    });

    roomData[index].roomSpecialtyList = specialtyList; // 当前考站下的房间对应的专业

    station.roomIds = roomIdArr.join(',');
    stationList.push(station);
  })

  // 剧本处理  
  _.mapKeys(spList, (item, index) => {
    let temp = _.difference(item.scriptIds, spListVal); // 取出无效值
    let scriptId = _.difference(item.scriptIds, temp); // 有效值
    spList[index].scriptIds = scriptId.join(',')
  })

  allData = _.assign({
    stationList,
    roomTeacherList,
    spList
  })

  return allData
}

export {
  getSaveData,
  getModifyStationInfoData
};
