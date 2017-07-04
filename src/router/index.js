import Vue from 'vue';
import Router from 'vue-router';
import {utils} from '../libs/util';
import config from '../config/config';
import Index from '../components/Index'

//引入各个业务模块的二级路由

/**
 * 日常管理
 * */
  //评优管理
  import pygl from './subRouter/dailyManagement'
  //津贴管理
  import jtgl from './subRouter/benefitsManagement'
  //志愿者活动
  import zyzhd from './subRouter/voluntaryAction'
  //考勤管理
  import kqgl from './subRouter/attendanceManagement'
  //职业暴露
  import zybl from './subRouter/occupationalExposure'
  //奖惩记录
  import jcjl from './subRouter/practiceRecords'

/**
 *
 * 在线学习
 *
 * */

/**
 *
 * 教学评价
 *
 * */
  //我的评价
  import evaluations from './subRouter/evaluations'

  //评价设置
  import evaluationSetting from './subRouter/evaluationSetting'

  //统计分析
  import jxpjStatistic from './subRouter/jxpjStatistic'

/**
 *
 * 宿舍管理
 *
 * */
  //基础设置
  import dormitory from './subRouter/dormitoryManagement'
  //住宿管理
  import zsgl from './subRouter/stayManagement'
  //查询统计
  import cxtj from './subRouter/dorQueryStatistic'

/**
 *
 * 理论考核
 *
 * */

/**
 * 基础教务
 * */
  //教学活动
  import jxhd from './subRouter/teachingActivities'
  //师资库
  import szk from './subRouter/teacherResources'
  //档案管理
  import dagl from './subRouter/archivesManagement'
  //咨询管理
  import consultive from './subRouter/consultiveManagement'

/**
 *
 * 技能中心
 *
 * */
  //中心管理
  import cstc from './subRouter/cstc'
  //技能考核
  import osce from './subRouter/osce'

/**
 *
 * 轮转管理
 *
 * */
 import rotateRecordWrite from './subRouter/rotateRecordWrite.js'
 import rotateRecordAudit from './subRouter/rotateRecordAudit.js'
 import rotateQuery from './subRouter/rotateQuery.js'
 import appraisalManagement from './subRouter/appraisalManagement.js'
 import reportsManagement from './subRouter/reportsManagement.js'

/**
 *
 * 实习生
 *
 * */
  //本科教育
  import undergraduate from './subRouter/undergraduate'
  //实习生基础数据
  import internBasis from './subRouter/internBasisData'
  //实习生招生
  import recruitStudent from './subRouter/recruitStudent'
  //实习生轮转
  import internRotate from './subRouter/internRotate'
  //轮转管理
  import rotateManagement from './subRouter/rotateManagement'
  //实习手册
  import internHandbook from './subRouter/internHandbook'

/**
 *
 * 研究生
 *
 * */

/**
 *
 * 住院医
 *
 * */

/**
 *
 * 进修管理
 *
 * */

/**
 *
 * 经费管理
 *
 * */

/**
 *
 * 系统管理
 *
 * */
  //系统管理
  import sysManage from './subRouter/sysManage'
  //系统设置
  import systemSettings from './subRouter/systemSettings'


/**
 *
 * 登录
 *
 * */
  import Login from '../components/login'
/*
* 404页面配置
* */
import NotFoundComponent from '../components/common/404'

Vue.use(Router)

/*


//系统左侧主导航
let navs =
  [
  {
    expand:true,
    modName:'jcjwgl',
    title:"基础教务管理",
    children:[
      {
      expand:true,
      title:"日常管理",
      modName:'rcgl',
      children:[
        {
          expand: false,
          title:"评优",
          modName:'highestQuality',
          disabled: true
        },
        //todo 因角色权限未定，先把已有页面展示出来

        {
          expand: false,
          title:"学生评优",
          modName:'highestQualityStudy',
          disabled: true
        },
        {
          expand: false,
          title:"津贴",
          modName:'allowance',
          disabled: true
        },
        {
          expand: false,
          title:"志愿者活动",
          modName:'volunteerActivity',
          disabled: true
        },
        {
          expand: false,
          title:"日常考勤",
          modName:'dailyAttendance',
          disabled: true
        },
        //todo 因角色权限未定，先把已有页面展示出来
        {
          expand: false,
          title:"日常考勤统计",
          modName:'dailyAttendanceStatistics',
          disabled: true
        },
        {
          expand: false,
          title:"请假管理",
          modName:'leaveManagement',
          disabled: true
        },
        {
          expand: false,
          title:"职业暴露",
          modName:'occupationalExposure',
          disabled: true
        },
        {
          expand: false,
          title:"奖惩记录",
          modName:'practiceRecords',
          disabled: true
        }
      ]
    },
      {
        expand:true,
        title:"教学活动",
        modName:'jxhd',
        children:[
          {
          expand: false,
          title:"课程表",
          modName:'syllabus',
          disabled: true
        },
          {
            expand: false,
            title:"教学活动设置",
            modName:'teachingActivitiesSet',
            disabled: true
          },
          {
            expand: false,
            title:"我的活动",
            modName:'myActivities',
            disabled: true
          },
          {
            expand: false,
            title:"教学经历",
            modName:'teachingExperience',
            disabled: true
          },
          {
            expand: false,
            title:"我的评价",
            modName:'myRating',
            disabled: true
          }

        ]
      },
      {
        expand:true,
        title:"宿舍管理",
        modName:'dormitory',
        children:[
          {
            expand: false,
            title:"宿舍管理",
            modName:'dormitoryMess',
            unShow: true
          },
          {
          expand: false,
          title:"楼房信息管理",
          modName:'buildingMess',
          disabled: true
        },
          {
            expand: false,
            title:"房间信息管理",
            modName:'roomMess',
            disabled: true
          },
          {
            expand: false,
            title:"迁入迁出",
            modName:'inAndOut',
            disabled: true
          },
          {
            expand: false,
            title:"房间使用情况",
            modName:'roomUseing',
            disabled: true
          },
          {
            expand: false,
            title:"人员入住情况",
            modName:'occupancy',
            disabled: true
          }
        ]
      },
      {
        expand:true,
        title:"教学评价",
        modName:'jxpj',
        children:[
          {
          expand: false,
          title:"我的评价表",
          modName:'myEvaluation',
          disabled: true
        },
          {
            expand: false,
            title:"单表分析统计",
            modName:'singleTable',
            disabled: true
          },
          {
            expand: false,
            title:"综合分析统计",
            modName:'synthesize',
            disabled: true
          },
          {
            expand: false,
            title:"评价表管理",
            modName:'evaluation',
            disabled: true
          },
          {
            expand: false,
            title:"评价活动设置",
            modName:'evaluationActive',
            disabled: true
          }
        ]
      },
      {
        expand:true,
        title:"咨询管理",
        modName:'consultive',
        children:[
          {
          expand: false,
          title:"栏目管理",
          modName:'columnManagement',
          disabled: true
        },
          {
            expand: false,
            title:"内容管理",
            modName:'contentManagement',
            disabled: true
          },
          {
            expand: false,
            title:"发布管理",
            modName:'releaseManagement',
            disabled: true
          }
        ]
      },
      {
        expand:true,
        title:"档案管理",
        modName:'dagl',
        children:[
          {
          expand: false,
          title:"档案管理",
          modName:'archivesManagement',
          disabled: true
        },
          {
            expand: false,
            title:"档案审核",
            modName:'fileReview',
            disabled: true
          },
          {
            expand: false,
            title:"档案查询",
            modName:'fileQuery',
            disabled: true
          },
          {
            expand: false,
            title:"权限设置",
            modName:'permissionSetting',
            disabled: true
          }
        ]
      },
      {
        expand:true,
        title:"师资库",
        modName:'szk',
        children:[
          {
          expand: false,
          title:"师资管理",
          modName:'teachersManagement',
          disabled: true
        },

          {
            expand: false,
            title:"师资工作量管理",
            modName:'teachersWorkManagement',
            disabled: true
          },
          {
            expand: false,
            title:"师资评估管理",
            modName:'teachersAssessManagement',
            disabled: true
          },
          {
            expand: false,
            title:"课时费管理",
            modName:'classManagement',
            disabled: true
          },
          {
            expand: false,
            title:"课时费设置",
            modName:'classSetting',
            disabled: true
          },
          {
            expand: false,
            title:"劳务费管理",
            modName:'laborManagement',
            disabled: true
          },
          {
            expand: false,
            title:"劳务费设置",
            modName:'laborSetting',
            disabled: true
          }
        ]
      }
    ]
  },
  //实习生
  {
    expand:false,
    title:"实习生管理",
    modName:'sxsgl',
    children:[
      {
      expand:true,
      title:"本科教育",
      modName:'undergraduate',
      children:[{
        expand: true,
        modName:'calendar',
        title:"周历",
        disabled: true
      },
        {
          expand: false,
          modName:'syllabusManagement',
          title:"课程表管理",
          disabled: true
        },
        {
          expand: false,
          modName:'syllabusView',
          title:"课程表预览",
          disabled: true
        },{
          expand: true,
          modName:'specialist',
          title:"专家评老师",
          disabled: true
        },
        {
          expand: false,
          modName:'syllabusData',
          title:"课程资料",
          disabled: true
        },
      ]
    },
      {
        expand:true,
        title:"实习生基础数据",
        modName:'internBasis',
        children:[{
          expand: true,
          modName:'internOutline',
          title:"实习大纲管理",
          disabled: true
        },
          {
            expand: false,
            modName:'deptRequireSet',
            title:"科室要求设置",
            disabled: true
          },
          {
            expand: false,
            modName:'chargingStandard',
            title:"实习收费标准",
            disabled: true
          },
          {
            expand: false,
            modName:'largeMedicalRecordsSet',
            title:"大病历填写设置",
            disabled: true
          },
        ]
      },
      {
        expand:true,
        title:"实习生招生",
        modName:'recruitStudent',
        children:[{
          expand: true,
          modName:'usersManagement',
          title:"人员管理",
          disabled: true
        },
          {
            expand: false,
            modName:'internAudit',
            title:"实习生审核",
            disabled: true
          },
          {
            expand: false,
            modName:'printBillPayment',
            title:"打印交费单",
            disabled: true
          },
          {
            expand: false,
            modName:'paymentRegistration',
            title:"交费登记",
            disabled: true
          },
        ]
      },
      {
        expand:true,
        title:"实习生轮转",
        modName:'internRotate',
        children:[{
          expand: true,
          modName:'groupSet',
          title:"分组设置",
          disabled: true
        },
          {
            expand: false,
            modName:'autoArrange',
            title:"自动排班",
            disabled: true
          },
          {
            expand: false,
            modName:'handworkAdjust',
            title:"手工调整",
            disabled: true
          },
          {
            expand: false,
            modName:'givenAuditBig',
            title:"出科审核(大科)",
            disabled: true
          },
          {
            expand: false,
            modName:'graduationAppraisal',
            title:"结业鉴定",
            disabled: true
          },
          {
            expand: false,
            modName:'rotateHandbook',
            title:"轮转手册",
            disabled: true
          },
          {
            expand: false,
            modName:'repairRotate',
            title:"补轮转",
            disabled: true
          },
        ]
      },
      {
        expand:true,
        title:"轮转管理",
        modName:'rotateManagement',
        children:[{
          expand: true,
          modName:'groupSetIsRotate',
          title:"分组设置",
          disabled: true
        },
          {
            expand: false,
            modName:'autoArrangeIsRotate',
            title:"自动排班",
            disabled: true
          },
          {
            expand: false,
            modName:'handworkAdjustIsRotate',
            title:"手工调整",
            disabled: true
          },
          {
            expand: false,
            modName:'givenAuditBigIsRotate',
            title:"出科审核(大科)",
            disabled: true
          },
          {
            expand: false,
            modName:'graduationAppraisalIsRotate',
            title:"结业鉴定",
            disabled: true
          },
          {
            expand: false,
            modName:'rotateHandbookIsRotate',
            title:"轮转手册",
            disabled: true
          },
          {
            expand: false,
            modName:'repairRotateIsRotate',
            title:"补轮转",
            disabled: true
          },
          {
            expand: false,
            modName:'deptReportIsRotate',
            title:"科室报到",
            disabled: true
          },
        ]
      },
      {
        expand:true,
        title:"实习手册",
        modName:'internHandbook',
        children:[{
          expand: true,
          modName:'chooseLesson',
          title:"选课",
          disabled: true
        },
          {
            expand: false,
            modName:'entityIsIntern',
            title:"病种",
            disabled: true
          },
          {
            expand: false,
            modName:'skillOperation',
            title:"技能操作",
            disabled: true
          },
          {
            expand: false,
            modName:'largeMedicalIsIntern',
            title:"大病历",
            disabled: true
          },
          {
            expand: false,
            modName:'givenApplicationSmall',
            title:"出科申请(小科)",
            disabled: true
          },
          {
            expand: false,
            modName:'givenApplicationBig',
            title:"出科申请(大科)",
            disabled: true
          },
          {
            expand: false,
            modName:'myEvaluationIsIntern',
            title:"我的评价",
            disabled: true
          },
          {
            expand: false,
            modName:'graduationAppraisalIsIntern',
            title:"结业鉴定",
            disabled: true
          },
          {
            expand: false,
            modName:'rotateHandbookIsIntern',
            title:"轮转手册",
            disabled: true
          },
          {
            expand: false,
            modName:'repairRotateIsIntern',
            title:"补轮转",
            disabled: true
          },
        ]
      }
    ]
  },

  //技能中心管理
  {
    expand:false,
    title:"技能中心管理",
    modName:'cstc',
    children:[
      {
      expand:true,
      title:"中心管理",
      modName:'cstc',
      children:[{
        expand: true,
        modName:'device',
        title:"设备管理",
        disabled: true
      },
        {
          expand: false,
          modName:'consumables',
          title:"耗材管理",
          disabled: true
        },
        {
          expand: false,
          modName:'room',
          title:"房间管理",
          disabled: true
        },{
          expand: true,
          modName:'hardware',
          title:"声像控制",
          disabled: true
        },
        {
          expand: false,
          modName:'affairs',
          title:"事务管理",
          disabled: true
        },
        {
          expand: false,
          modName:'bespeak',
          title:"预约管理",
          disabled: true
        }
      ]
    },
      {
        expand:true,
        title:"技能考核",
        modName:'osce',
        children:[{
          expand: true,
          modName:'assessmentContent',
          title:"技能考核内容管理",
          disabled: true
        },
          {
            expand: false,
            modName:'examineInterval',
            title:"考核场次",
            disabled: true
          },
          {
            expand: false,
            modName:'examineMonitor',
            title:"考核监控",
            disabled: true
          },
          {
            expand: false,
            modName:'examinePlan',
            title:"考核安排",
            disabled: true
          },
          {
            expand: false,
            modName:'scoreQuery',
            title:"成绩查询",
            disabled: true
          },
          {
            expand: false,
            modName:'statisticsAnalysis',
            title:"统计分析",
            disabled: true
          },
          {
            expand: false,
            modName:'attendanceMaintenance',
            title:"场次维护",
            disabled: true
          }
        ]
      }
    ]
  },

  //系统设置
  {
    expand:false,
    title:"系统设置",
    modName:'base',
    children:[
      {
      expand:true,
      title:"系统管理",
      modName:'sysManage',
      children:[{
        expand: true,
        modName:'authority',
        title:"权限管理",
        disabled: true
      },
        {
          expand: false,
          modName:'systemLog',
          title:"系统日志",
          disabled: true
        },

        {
          expand: false,
          modName:'bizDict',
          title:"业务字典",
          disabled: true
        },
        {
          expand: false,
          modName:'menuManagement',
          title:"菜单管理",
          disabled: true
        },
        {
          expand: false,
          modName:'departmentsManagement',
          title:"科室管理",
          disabled: true
        },
        {
          expand: false,
          modName:'departmentStaff',
          title:"部门人员管理",
          disabled: true
        },
        {
          expand: false,
          modName:'group',
          title:"分组管理",
          disabled: true
        },
        {
          expand: false,
          modName:'sourceUnit',
          title:"来源单位",
          disabled: true
        },

      ]
    },{
      expand: false,
      modName:'systemSettings',
      title:"系统设置",
      disabled: true,
      children:[{
        expand: true,
        modName:'holidays',
        title:"节假日",
        disabled: true
      }, {
        expand: false,
        modName:'checkLocation',
        title:"考勤位置",
        disabled: true
      }

      ]
    }
    ]
  }
]

/!*
 * 给数据层级设置索引 [{parIdx:0,index:0},……]
 * @param data []  无限极树结构
 *!/
const structureIndex = {}
function setStructureIndex(data,pobj){
  if(data.length == 0){
    return ;
  }
  let deepChildren={"pid":[],"len":[]};
  let tempArr=[];
  let count = 0;
  let count1 = 0 ;
  for(var i=0,parIdx,index;i<data.length;i++){
    if(typeof pobj!="undefined"){
      let len = pobj["len"][count]
      parIdx = (len+count1)-1<=i?(count1+=len)&&count++:count;
    }else {
      parIdx = null
    }
    data[i]["index"] = i;
    structureIndex[data[i]["modName"]] = {'index' :i, parIdx:parIdx};
    if(typeof data[i].children!="undefined"){
      deepChildren["pid"].push(i);
      deepChildren["len"].push(data[i].children.length);
      tempArr = tempArr.concat(data[i].children);
    }
  }

  setStructureIndex(tempArr,deepChildren);
}
setStructureIndex(navs);

/!*
 * 根据modName取出二级菜单展示数据 {"modName":[{……},{……},……]}
 * @param data []
 * *!/
function getSubData(data){
  let tempData = []
  let dataStructure  = {};
  _.forEach(data, function(v, k) {
    tempData.push(v.children)
  })
  tempData = _.flattenDeep(tempData);

  _.forEach(tempData, function(v, k) {
    dataStructure[v.modName] = v;
  })

  return dataStructure;
}
const dataStructure  = getSubData(navs);

//将设置完成的structureIndex赋值给 navs
dataStructure["structureIndex"] = structureIndex;

*/

//配置子路由
const routes = [
  //系统打的默认首页
  { path: '/manage',redirect: '/login' },
  { path: '/manage.html',redirect:'/login' },
  {
    path:'/manage',
    name: 'manage',
    component: Index,
    children:[
      //日常管理
      pygl,jtgl,zyzhd,kqgl,zybl,jcjl,

      //在线学习

      //教学评价
      evaluations,evaluationSetting,jxpjStatistic,

      //宿舍管理
      dormitory,zsgl,cxtj,

      //理论考核


      //基础教务
      jxhd,consultive,szk,dagl,

      //技能中心
      cstc,osce,

      //轮转管理
      rotateRecordWrite,rotateRecordAudit,rotateQuery,appraisalManagement,reportsManagement,
      //实习生
      undergraduate,internBasis,recruitStudent,internRotate,rotateManagement,internHandbook,

      //研究生

      //住院医

      //进修管理

      //经费管理

      //系统设置
      sysManage,systemSettings,
    ]
  },
  {
    path: '/login',
    name: 'login',
    meta: {
      requireAuth: true,  // 添加该字段，表示进入这个路由是需要登录的
    },
    component: Login
  },
  { path: '*', redirect: '/login'}

]
//实例化路由
let router = new Router({
  mode: 'history',
  routes:routes
})


export default router;


