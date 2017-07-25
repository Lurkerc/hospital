/**
 * 技能中心
 * 作者:zyc
 * 日期:2017-4-19
 */
const cstcRouters = {
  path: 'cstc',
  name: 'cstc',
  meta: {
    requireAuth: true, // 添加该字段，表示进入这个路由是需要登录的
  },
  component: resolve => {
    require.ensure([], () => {
      resolve(require('@/components/common/rightMain'));
    }, 'cstc');
  },
  redirect: to => {
    return '/manage/cstc/device'
  },
  children: [{
      //设备管理
      path: 'device',
      name: 'device',
      component: resolve => {
        require.ensure([], () => {
          resolve(require('../../components/cstc/device/device_list.vue'));
        }, 'cstc');
      }
    }, {
      //耗材管理
      path: 'consumables',
      name: 'consumables',
      component: resolve => {
        require.ensure([], () => {
          resolve(require('../../components/cstc/consumables/consumables_list.vue'));
        }, 'cstc');
      }
    }, {
      //房间管理
      path: 'room',
      name: 'room',
      component: resolve => {
        require.ensure([], () => {
          resolve(require('../../components/cstc/room/room_list.vue'));
        }, 'cstc');
      }
    }, {
      //声像控制
      path: 'hardware',
      name: 'hardware',
      component: resolve => {
        require.ensure([], () => {
          resolve(require('../../components/cstc/hardware/hardware_list.vue'));
        }, 'cstc');
      }
    }, {
      //事务管理
      path: 'affairs',
      name: 'affairs',
      component: resolve => {
        require.ensure([], () => {
          resolve(require('../../components/cstc/affairs/affairs_list.vue'));
        }, 'cstc');
      }
    }, {
      //预约审核
      path: 'bespeakAudit',
      name: 'bespeakAudit',
      component: resolve => {
        require.ensure([], () => {
          resolve(require('../../components/cstc/bespeakAudit/bespeakAudit_list'));
        }, 'cstc');
      }
    }, {
      //预约设置
      path: 'bespeakSetting',
      name: 'bespeakSetting',
      component: resolve => {
        require.ensure([], () => {
          resolve(require('../../components/cstc/bespeakSetting/bespeakSetting_list'));
        }, 'cstc');
      }
    }, {
      //预约申请
      path: 'bespeakApply',
      name: 'bespeakApply',
      component: resolve => {
        require.ensure([], () => {
          resolve(require('../../components/cstc/bespeakApply/bespeakApply_list'));
        }, 'cstc');
      }
    },
    {
      //预约上课
      path: 'bespeakClass',
      name: 'bespeakClass',
      component: resolve => {
        require.ensure([], () => {
          resolve(require('../../components/cstc/bespeakClass/bespeakClass_list'));
        }, 'cstc');
      }
    },
    {
      //中心日程
      path: 'centerSchedule',
      name: 'centerSchedule',
      component: resolve => {
        require.ensure([], () => {
          resolve(require('../../components/cstc/centerSchedule/centerSchedule_list'));
        }, 'cstc');
      }
    },
    {
      //门禁管理
      path: 'accessControl',
      name: 'accessControl',
      component: resolve => {
        require.ensure([], () => {
          resolve(require('../../components/cstc/accessControl/accessControl_list'));
        }, 'cstc');
      }
    },
  ]
}

export default cstcRouters;
