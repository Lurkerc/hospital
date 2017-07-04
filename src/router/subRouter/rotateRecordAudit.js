/**
 * 轮转记录审核
 * 作者:gx
 * 日期:2017-7-3
 */
const rotateRouters = {
  path: 'rotateRecordAudit',
  name: 'rotateRecordAudit',
  meta: {
    requireAuth: true,  // 添加该字段，表示进入这个路由是需要登录的
  },
  component:resolve=> {
    require.ensure([], () => {
      resolve(require('@/components/common/rightMain'));
    }, 'rotateRecordAudit');
  },
  redirect: to => {
    return '/manage/rotateRecordAudit/entityAudit'
  },
  children:[{
    //病种审核
    path:'entityAudit',
    name:'entityAudit',
    component:resolve=> {
      require.ensure([], () => {
        resolve(require('../../components/rotateManagement/rotateRecordAudit/entityAudit/entityAudit_list.vue'));
      }, 'rotateRecordAudit');
    }
   },
    {
      //技能操作审核
      path:'skillAudit',
      name:'skillAudit',
      component:resolve=> {
        require.ensure([], () => {
          resolve(require('../../components/rotateManagement/rotateRecordAudit/skillAudit/skillAudit_list.vue'));
        }, 'rotateRecordAudit');
      }
    },
    {
      //大病历审核
      path:'largeCaseAudit',
      name:'largeCaseAudit',
      component:resolve=> {
        require.ensure([], () => {
          resolve(require('../../components/rotateManagement/rotateRecordAudit/largeCaseAudit/largeCaseAudit_list.vue'));
        }, 'rotateRecordAudit');
      }
    },
    {
      //科研日志审核
      path:'scientificResearchLogAudit',
      name:'scientificResearchLogAudit',
      component:resolve=> {
        require.ensure([], () => {
          resolve(require('../../components/rotateManagement/rotateRecordAudit/scientificResearchLogAudit/scientificResearchLogAudit_list.vue'));
        }, 'rotateRecordAudit');
      }
    },
    {
      //出科技能补考审核
      path:'givenSkillMakeUpAudit',
      name:'givenSkillMakeUpAudit',
      component:resolve=> {
        require.ensure([], () => {
          resolve(require('../../components/rotateManagement/rotateRecordAudit/givenSkillMakeUpAudit/givenSkillMakeUpAudit_list.vue'));
        }, 'rotateRecordAudit');
      }
    },
    {
      //出科审核
      path:'givenAudit',
      name:'givenAudit',
      component:resolve=> {
        require.ensure([], () => {
          resolve(require('../../components/rotateManagement/rotateRecordAudit/givenAudit/givenAudit_list.vue'));
        }, 'rotateRecordAudit');
      }
    },
    {
      //出大科审核
      path:'givenAuditOfLarge',
      name:'givenAuditOfLarge',
      component:resolve=> {
        require.ensure([], () => {
          resolve(require('../../components/rotateManagement/rotateRecordAudit/givenAuditOfLarge/givenAuditOfLarge_list.vue'));
        }, 'rotateRecordAudit');
      }
    },
    {
      //结业鉴定
      path:'graduationAppraisal',
      name:'graduationAppraisal',
      component:resolve=> {
        require.ensure([], () => {
          resolve(require('../../components/rotateManagement/rotateRecordAudit/graduationAppraisal/graduationAppraisal_list.vue'));
        }, 'rotateRecordAudit');
      }
    },
  ]
}

export default rotateRouters;
