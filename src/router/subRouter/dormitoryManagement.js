/**
 * 宿舍管理
 * 作者:zyc
 * 日期:2017-5-18
 */
const dormitoryRouters = {
  path: 'dormitory',
  name: 'dormitory',
  meta: {
    requireAuth: true,  // 添加该字段，表示进入这个路由是需要登录的
  },
  component:resolve=> {
    require.ensure([], () => {
      resolve(require('@/components/common/rightMain'));
    }, 'dormitory');
  },
  redirect: to => {
    return '/manage/dormitory/buildingMess'
  },
  children:[{
    //宿舍管理
    path:'dormitoryMess',
    name:'dormitoryMess',
    component:resolve=> {
      require.ensure([], () => {
        resolve(require('../../components/dormitory/dormitoryMess.vue'));
      }, 'dormitory');
    }
  },{
    //楼房信息管理
    path:'buildingMess',
    name:'buildingMess',
    component:resolve=> {
      require.ensure([], () => {
        resolve(require('../../components/dormitory/buildingMess/buildingMess_list.vue'));
      }, 'dormitory');
    }
  },
    {
      //房间信息管理
      path:'roomMess',
      name:'roomMess',
      component:resolve=> {
        require.ensure([], () => {
          resolve(require('../../components/dormitory/roomMess/roomMess_list.vue'));
        }, 'dormitory');
      }
    },
    {
      //迁入迁出
      path:'inAndOut',
      name:'inAndOut',
      component:resolve=> {
        require.ensure([], () => {
          resolve(require('../../components/dormitory/inAndOut/inAndOut_list.vue'));
        }, 'dormitory');
      }
    },
    {
      //房间使用情况
      path:'roomUseing',
      name:'roomUseing',
      component:resolve=> {
        require.ensure([], () => {
          resolve(require('../../components/dormitory/roomUseing/roomUseing_list.vue'));
        }, 'dormitory');
      }
    },
    {
      //人员入住情况
      path:'occupancy',
      name:'occupancy',
      component:resolve=> {
        require.ensure([], () => {
          resolve(require('../../components/dormitory/occupancy/occupancy_list.vue'));
        }, 'dormitory');
      }
    },
  ]
}

export default dormitoryRouters;
