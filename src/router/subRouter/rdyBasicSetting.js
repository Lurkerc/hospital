/**
 * 住院医-基础设置
 * 作者:zyc
 * 日期:2017-7-21
 */
const zyyRouters = {
  path: 'rdyBasicSetting',
  name: 'rdyBasicSetting',
  meta: {
    requireAuth: false,  // 添加该字段，表示进入这个路由是需要登录的
  },
  component:resolve=> {
    require.ensure([], () => {
      resolve(require('@/components/common/rightMain'));
    }, 'rdyBasicSetting');
  },
  redirect: to => {
    return '/manage/rdyBasicSetting/rdyTrainingStandards'
  },
  children:[{
    //培训标准
    path:'rdyTrainingStandards',
    name:'rdyTrainingStandards',
    component:resolve=> {
      require.ensure([], () => {
        resolve(require('../../components/zyy/rdyBasicSetting/rdyTrainingStandards/rdyTrainingStandards_list.vue'));
      }, 'rdyBasicSetting');
    }
  },{
    //科室对照
    path:'rdyDepContrast',
    name:'rdyDepContrast',
    component:resolve=> {
      require.ensure([], () => {
        resolve(require('../../components/zyy/rdyBasicSetting/rdyDepContrast/rdyDepContrast_list.vue'));
      }, 'rdyBasicSetting');
    }
  },{
    //大病历设置
    path:'rdyRecordsSet',
    name:'rdyRecordsSet',
    component:resolve=> {
      require.ensure([], () => {
        resolve(require('../../components/zyy/rdyBasicSetting/rdyRecordsSet/rdyRecordsSet_list.vue'));
      }, 'rdyBasicSetting');
    }
  }


  ]
}

export default zyyRouters;
