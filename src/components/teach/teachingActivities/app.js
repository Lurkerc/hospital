/**
 * Created by Administrator on 2017/5/19.
 */
export default {
      //教学活动安排表
  teachctivityListType: '/teachctivityManagement/list',///{userType}

  //活动时间段获取
  teachCourseTime:'/teachCourseTime/list',

  //查看本人心得体会
  teachActivityTips:'/teachActivityTips/useractivity/get' , //{activityId}

  //学员个人查看教学活动(学员-教学活动-查看)
  useractivity: '/teachctivityManagement/useractivity/get', ///{id}

  ///学员教学活动列表查询(学员-教学活动)
  userList:'/teachctivityManagement/user/list',

  //添加教学活动(教育处或教学秘书-教学活动设置-添加)
  teachctivityAdd:'/teachctivityManagement/add',

  //查看教学活动(带教老师-教学活动-上传课件 或者 学员-教学活动-添加心得体会 或者 教育处-教学互动设置-修改时)
  teachctivityGet:'/teachctivityManagement/get',  ///{id}

  //查看教学活动
  teachctivityGetList:'/teachctivityManagement/getList',//{ids}

  //修改教学活动(教育处或教学秘书-教学活动设置-修改)
  teachctivityModify: '/teachctivityManagement/modify',///{id}

  ///教学活动上传课件(带教老师-教学活动-上传课件)
  teachctivityModifyfile:'/teachctivityManagement/modifyfile', ///{id}

  //发布教学活动(教学秘书或教育处-教学互动设置-发布)
  teachctivityRelase:'/teachctivityManagement/relase', ///{id}

  //删除教学活动(教育处或教学秘书-教学活动设置-删除)
  teachctivityRemove:'/teachctivityManagement/remove' ,///{ids}

  //主持人教学活动列表查询（带教老师-教学活动）
  hostUserList:'/teachctivityManagement/hostUser/list' ,

  //教学活动列表查询(教育处或带教秘书-教学活动-修改)
  teachctivityList:'/teachctivityManagement/list' ,

  //根据教学活动ID查看心得体会
  teachActivity:'/teachActivityTips/activity/get' ,///{activityId}

  //教学活动学员添加心得体会
  teachActivityAdd:'/teachActivityTips/add' ,
  //修改心得体会
  teachActivityModify:'/teachActivityTips/modify' ,///{activityTipsId}







}
