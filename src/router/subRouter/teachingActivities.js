/*
* 模块名称:教学活动
* 作者:zyc
* 日期:2017-3-31
* */

//课程表
const syllabus = '@/components/teach/teachingActivities/syllabus';
//教学活动设置
const activitiesSet = '@/components/teach/teachingActivities/teachingActivitiesSet/teachingActivitiesSet_list.vue';
//我的活动 教学经历  活动设置
const jxhdRouters = {
  path: 'jxhd',
  name: 'jxhd',
  meta: {
    requireAuth: true,  // 添加该字段，表示进入这个路由是需要登录的
  },
  component:resolve=> {
    require.ensure([], () => {
      resolve(require('@/components/common/rightMain'));
    }, 'jxhd');
  },
  redirect: to => {
    return '/manage/jxhd/kcb'
  },
  children:[{
    //课程表
    path:'syllabus',
    name:'syllabus',
    component:resolve=> {
      require.ensure([], () => {
        resolve(require('../../components/teach/teachingActivities/syllabus/syllabus_list.vue'));
      }, 'jxhd');
    }
  },{
    //教学活动设置
    path:'teachingActivitiesSet',
    name:'teachingActivitiesSet',
    component:resolve=> {
      require.ensure([], () => {
        resolve(require('../../components/teach/teachingActivities/teachingActivitiesSet/teachingActivitiesSet_list.vue'));
      }, 'jxhd');
    }
  },{
      //科内教学
      path:'conezTeaching',
      name:'conezTeaching',
      component:resolve=> {
        require.ensure([], () => {
          resolve(require('../../components/teach/teachingActivities/teachingActivitiesSet/teachingActivitiesSet_list.vue'));
        }, 'jxhd');
      }
    },
    {
    //我的活动
    path:'myActivities',
    name:'myActivities',
    component:resolve=> {
      require.ensure([], () => {
        resolve(require('../../components/teach/teachingActivities/myActivities/myActivities_list.vue'));
      }, 'jxhd');
    }
  },{
    //教学经历
    path:'teachingExperience',
    name:'teachingExperience',
    component:resolve=> {
      require.ensure([], () => {
        resolve(require('../../components/teach/teachingActivities/teachingExperience/teachingExperience_list.vue'));
      }, 'jxhd');
    }
  },{
    //活动设置
    path:'myRating',
    name:'myRating',
    component:resolve=> {
      require.ensure([], () => {
        resolve(require('../../components/teach/teachingActivities/myRating/myRating_list.vue'));
      }, 'jxhd');
    }
  }
  ]
}

export default jxhdRouters;
