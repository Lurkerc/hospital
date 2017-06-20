/*
 * 模块名称:日常管理
 * 作者:zyc
 * 日期:2017-4-6
 * */
const rcglRouters = {
  path: 'rcgl',
  name: 'rcgl',
  component:resolve=> {
    require.ensure([], () => {
      resolve(require('@/components/common/rightMain'));
    }, 'rcgl');
  },
  redirect: to => {
    return '/manage/rcgl/highestQuality'
  },
  children:[{
    //评优
    path:'highestQuality',
    name:'highestQuality',
    component:resolve=> {
      require.ensure([], () => {
        resolve(require('../../components/daily/dailyManagement/highestQuality/highestQuality_list.vue'));
        // resolve(require('../../components/daily/dailyManagement/highestQuality/highestQuality_study_list.vue'));
      }, 'rcgl');
    }
  },{
    //评优学生
    path:'highestQualityStudy',
    name:'highestQualityStudy',
    component:resolve=> {
      require.ensure([], () => {
        // resolve(require('../../components/daily/dailyManagement/highestQuality/highestQuality_list.vue'));
        resolve(require('../../components/daily/dailyManagement/highestQuality/highestQuality_study_list.vue'));
      }, 'rcgl');
    }
  }
  ,{
    //津贴
    path:'allowance',
    name:'allowance',
    component:resolve=> {
      require.ensure([], () => {
        resolve(require('../../components/daily/dailyManagement/allowance/allowance_list.vue'));
      }, 'rcgl');
    }
  },{
    //志愿者活动
    path:'volunteerActivity',
    name:'volunteerActivity',
    component:resolve=> {
      require.ensure([], () => {
        resolve(require('../../components/daily/dailyManagement/volunteerActivity/volunteerActivity_list.vue'));
      }, 'rcgl');
    }
  },{
      //日常考勤
      path:'dailyAttendance',
      name:'dailyAttendance',
      component:resolve=> {
        require.ensure([], () => {
          resolve(require('../../components/daily/dailyManagement/dailyAttendance/dailyAttendance_list.vue'));
          // resolve(require('../../components/daily/dailyManagement/dailyAttendance/dailyAttendanceStatistics_list.vue'));
        }, 'rcgl');
      }
    },{
  //日常考勤统计
  path:'dailyAttendanceStatistics',
    name:'dailyAttendanceStatistics',
    component:resolve=> {
    require.ensure([], () => {
      // resolve(require('../../components/daily/dailyManagement/dailyAttendance/dailyAttendance_list.vue'));
      resolve(require('../../components/daily/dailyManagement/dailyAttendance/dailyAttendanceStatistics_list.vue'));
    }, 'rcgl');
  }
}
  ,{
    //请假管理
    path:'leaveManagement',
    name:'leaveManagement',
    component:resolve=> {
      require.ensure([], () => {
        resolve(require('../../components/daily/dailyManagement/leaveManagement/leaveManagement_list.vue'));
      }, 'rcgl');
    }
  },{
      //职业暴露
      path:'occupationalExposure',
      name:'occupationalExposure',
      component:resolve=> {
        require.ensure([], () => {
          resolve(require('../../components/daily/dailyManagement/occupationalExposure/occupationalExposure_list.vue'));
        }, 'rcgl');
      }
    },{
      //奖惩记录
      path:'practiceRecords',
      name:'practiceRecords',
      component:resolve=> {
        require.ensure([], () => {
          resolve(require('../../components/daily/dailyManagement/practiceRecords/practiceRecords_list.vue'));
        }, 'rcgl');
      }
    }
  ]
}

export default rcglRouters;
