/**
 * 轮转查询
 * 作者:gx
 * 日期:2017-7-3
 */
const rotateRouters = {
  path: 'appraisalManagement',
  name: 'appraisalManagement',
  meta: {
    requireAuth: true,  // 添加该字段，表示进入这个路由是需要登录的
  },
  component:resolve=> {
    require.ensure([], () => {
      resolve(require('@/components/common/rightMain'));
    }, 'appraisalManagement');
  },
  redirect: to => {
    return '/manage/appraisalManagement/entityAudit'
  },
  children:[{
    //日常考核
    path:'dailyAppraisal',
    name:'dailyAppraisal',
    component:resolve=> {
      require.ensure([], () => {
        resolve(require('../../components/rotateManagement/appraisalManagement/dailyAppraisal/dailyAppraisal_list.vue'));
      }, 'appraisalManagement');
    }
   },
    {
      //出科考核
      path:'givenAppraisal',
      name:'givenAppraisal',
      component:resolve=> {
        require.ensure([], () => {
          resolve(require('../../components/rotateManagement/appraisalManagement/givenAppraisal/givenAppraisal_list.vue'));
        }, 'appraisalManagement');
      }
    },
    {
      //年度考核
      path:'yearAppraisal',
      name:'yearAppraisal',
      component:resolve=> {
        require.ensure([], () => {
          resolve(require('../../components/rotateManagement/appraisalManagement/yearAppraisal/yearAppraisal_list.vue'));
        }, 'appraisalManagement');
      }
    },
    {
      //年度评优
      path:'yearAssessment',
      name:'yearAssessment',
      component:resolve=> {
        require.ensure([], () => {
          resolve(require('../../components/rotateManagement/appraisalManagement/yearAssessment/yearAssessment_list.vue'));
        }, 'appraisalManagement');
      }
    },
    {
      //结业考核
      path:'completionOfTheInspection',
      name:'completionOfTheInspection',
      component:resolve=> {
        require.ensure([], () => {
          resolve(require('../../components/rotateManagement/appraisalManagement/completionOfTheInspection/completionOfTheInspection_list.vue'));
        }, 'appraisalManagement');
      }
    },
    {
      //执业医师考试
      path:'occupationalExamination',
      name:'occupationalExamination',
      component:resolve=> {
        require.ensure([], () => {
          resolve(require('../../components/rotateManagement/appraisalManagement/occupationalExamination/occupationalExamination_list.vue'));
        }, 'appraisalManagement');
      }
    },
    {
      //公共课考试
      path:'commonTest',
      name:'commonTest',
      component:resolve=> {
        require.ensure([], () => {
          resolve(require('../../components/rotateManagement/appraisalManagement/commonTest/commonTest_list.vue'));
        }, 'appraisalManagement');
      }
    },
  ]
}

export default rotateRouters;
