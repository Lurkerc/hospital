/**
 * Created by Administrator on 2017/9/3.
 */
/**
 * 模块名称:研究生管理-研导双选
 * 作者:gx
 * 日期:2017/9/3
 *
 * @date     2017/9/3
 * @author   gx
 */


const ptResearchSelectionsRouters = {
  path: 'ptResearchSelections',
  name: 'ptResearchSelections',
  component:resolve=> {
    require.ensure([], () => {
      resolve(require('@/components/common/rightMain'));
    }, 'ptResearchSelections');
  },
  redirect: to => {
    return '/manage/ptResearchSelections/openingMentor'
  },
  children:[
    {
      //开放导师
      path:'openingMentor',
      name:'openingMentor',
      component:resolve=> {
        require.ensure([], () => {
          resolve(require('../../components/postgraduate/ptResearchSelections/openingMentor/openingMentor_list.vue'));
        }, 'ptResearchSelections');
      }
    },
    {
      //面试安排
      path:'interviewArrangement',
      name:'interviewArrangement',
      component:resolve=> {
        require.ensure([], () => {
          resolve(require('../../components/postgraduate/ptResearchSelections/interviewArrangement/interviewArrangement_list.vue'));
        }, 'ptResearchSelections');
      }
    },
    {
      //确认招生
      path:'confirmAdmissions',
      name:'confirmAdmissions',
      component:resolve=> {
        require.ensure([], () => {
          resolve(require('../../components/postgraduate/ptResearchSelections/confirmAdmissions/confirmAdmissions_list.vue'));
        }, 'ptResearchSelections');
      }
    },
    {
      //双选查询
      path:'doubleChooseQuery',
      name:'doubleChooseQuery',
      component:resolve=> {
        require.ensure([], () => {
          resolve(require('../../components/postgraduate/ptResearchSelections/doubleChooseQuery/doubleChooseQuery_list.vue'));
        }, 'ptResearchSelections');
      }
    },
    {
      //双选
      path:'doubleSelection',
      name:'doubleSelection',
      component:resolve=> {
        require.ensure([], () => {
          resolve(require('../../components/postgraduate/pttrainingPlan/doubleSelection/doubleSelection_list.vue'));
        }, 'ptResearchSelections');
      }
    },
  ]
}

export default ptResearchSelectionsRouters;
