/**
 * 本科教育
 * 作者:zyc
 * 日期:2017-5-18
 */
const underRouters = {
  path: 'undergraduate',
  name: 'undergraduate',
  meta: {
    requireAuth: true,  // 添加该字段，表示进入这个路由是需要登录的
  },
  component:resolve=> {
    require.ensure([], () => {
      resolve(require('@/components/common/rightMain'));
    }, 'undergraduate');
  },
  redirect: to => {
    return '/manage/undergraduate/calendar'
  },
  children:[{
    //周历
    path:'calendar',
    name:'calendar',
    component:resolve=> {
      require.ensure([], () => {
        resolve(require('../../components/intern/undergraduateEdu/calendar/calendar_list.vue'));
      }, 'undergraduate');
    }
  },
    {
      //课程表管理
      path:'syllabusManagement',
      name:'syllabusManagement',
      component:resolve=> {
        require.ensure([], () => {
          resolve(require('../../components/intern/undergraduateEdu/syllabusManagement/syllabusManagement_list.vue'));
        }, 'undergraduate');
      }
    },
    {
      //我的课程表  学员
      path:'mySyllabus',
      name:'mySyllabus',
      component:resolve=> {
        require.ensure([], () => {
          resolve(require('../../components/intern/undergraduateEdu/mySyllabus/mySyllabus_list.vue'));
        }, 'undergraduate');
      }
    },
    {
      //授课安排 老师
      path:'teachingSchedule',
      name:'teachingSchedule',
      component:resolve=> {
        require.ensure([], () => {
          resolve(require('../../components/intern/undergraduateEdu/teachingSchedule/teachingSchedule_list.vue'));
        }, 'undergraduate');
      }
    },
    {
      //课程安排  教育处
      path:'courseArrangement',
      name:'courseArrangement',
      component:resolve=> {
        require.ensure([], () => {
          resolve(require('../../components/intern/undergraduateEdu/courseArrangement/courseArrangement_list.vue'));
        }, 'undergraduate');
      }
    },
    {
      //专家评老师
      path:'specialist',
      name:'specialist',
      component:resolve=> {
        require.ensure([], () => {
          resolve(require('../../components/intern/undergraduateEdu/specialist/specialist_list.vue'));
        }, 'undergraduate');
      }
    },
    {
      //课程资料
      path:'syllabusData',
      name:'syllabusData',
      component:resolve=> {
        require.ensure([], () => {
          resolve(require('../../components/intern/undergraduateEdu/syllabusData/syllabusData_list.vue'));
        }, 'undergraduate');
      }
    },
    {
      //签到记录
      path:'signInRecord',
      name:'signInRecord',
      component:resolve=> {
        require.ensure([], () => {
          resolve(require('../../components/intern/undergraduateEdu/signInRecord/signInRecord_list.vue'));
        }, 'undergraduate');
      }
    },
  ]
}

export default underRouters;
