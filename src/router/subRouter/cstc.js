/**
 * 技能中心
 * 作者:zyc
 * 日期:2017-4-19
 */
const cstcRouters = {
  path: 'cstc',
  name: 'cstc',
  meta: {
    requireAuth: true,  // 添加该字段，表示进入这个路由是需要登录的
  },
  component:resolve=> {
    require.ensure([], () => {
      resolve(require('@/components/common/rightMain'));
    }, 'cstc');
  },
  redirect: to => {
    return '/manage/cstc/device'
  },
  children:[{
    //设备管理
    path:'device',
    name:'device',
    component:resolve=> {
      require.ensure([], () => {
        resolve(require('../../components/cstc/device/device_list.vue'));
      }, 'cstc');
    }
  },{
    //耗材管理
    path:'consumables',
    name:'consumables',
    component:resolve=> {
      require.ensure([], () => {
        resolve(require('../../components/cstc/consumables/consumables_list.vue'));
      }, 'cstc');
    }
  },{
    //房间管理
    path:'room',
    name:'room',
    component:resolve=> {
      require.ensure([], () => {
        resolve(require('../../components/cstc/room/room_list.vue'));
      }, 'cstc');
    }
  },{
    //声像控制
    path:'hardware',
    name:'hardware',
    component:resolve=> {
      require.ensure([], () => {
        resolve(require('../../components/cstc/hardware/hardware_list.vue'));
      }, 'cstc');
    }
  },{
    //事务管理
    path:'affairs',
    name:'affairs',
    component:resolve=> {
      require.ensure([], () => {
        resolve(require('../../components/cstc/affairs/affairs_list.vue'));
      }, 'cstc');
    }
  },{
    //预约管理
    path:'bespeakAudit',
    name:'bespeakAudit',
    component:resolve=> {
      require.ensure([], () => {
        resolve(require('../../components/cstc/bespeak/bespeak_list.vue'));
      }, 'cstc');
    }
  }]
}

export default cstcRouters;
