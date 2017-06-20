  <template>
  <div>
    <div class="viewFramework-topbar">
        <div class="ambuf-console-topbar">
            <Headers></Headers>
        </div>
    </div>
    <div class="viewFramework-body" :class="{'viewFramework-sidebar-full':isViewSubNav,'viewFramework-sidebar-mini':!isViewSubNav}">
        <div class="viewFramework-sidebar">
            <div class="sidebar-content">
                <div class="sidebar-inner">
                    <div class="sidebar-fold" @click="handleViewSubNav"></div>
                    <div v-if="!gotoRouter" style="text-align: center;margin-top: 100px;">数据请求失败!</div>
                    <Left v-if="gotoRouter" :leftNavData="Nav" :dataStructure="dataStructures"></Left>
                </div>
            </div>
        </div>
        <div class="viewFramework-main">
            <div v-if="!gotoRouter" style="text-align: center;margin-top: 100px;">数据请求失败!</div>
            <router-view v-if="gotoRouter" :subNavs="subNavs" :dataStructure="dataStructures"></router-view>
        </div>
    </div>
  </div>
</template>
<script>
import headers from './common/header'
    import leftmenus from './common/leftmenus'
/*
 * 给数据层级设置索引 [{parIdx:0,index:0},……]
 * @param data []  无限极树结构
 */
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
    data[i]["expand"] = false;

    structureIndex[data[i]["modName"]] = {'index' :i, parIdx:parIdx};
    if(typeof data[i].children!="undefined"){
      deepChildren["pid"].push(i);
      deepChildren["len"].push(data[i].children.length);
      tempArr = tempArr.concat(data[i].children);
    }
  }


  setStructureIndex(tempArr,deepChildren);
}


/*
 * 根据modName取出二级菜单展示数据 {"modName":[{……},{……},……]}
 * @param data []
 * */
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
let Util = null;
export default {
    props:["navs","dataStructure"],
    data (){
      return {
        gotoRouter:false,
        routerPath:{},
        homeRouterPath:{},
        Nav: [{}],
        subNavs: [{}],
        dataStructures: [{}],
        isViewSubNav: true,
        getMenusData: {
          ajaxSuccess: 'setMeusData',
          ajaxParams: {
            url: '/menu/query-tree-by-user',
            params: {}
          }
        }
      }
    },
    created(){
      Util = this.$util;

      this.ajax(this.getMenusData);
    },
    methods:{
      setMeusData(responseData){
        let data = responseData.data;
        data = data[0].children;
        setStructureIndex(data);
        let dataStructure  = getSubData(data);

        //将设置完成的structureIndex赋值给 navs
        dataStructure["structureIndex"] = structureIndex;
        this.Nav = data;
        this.subNavs = data;
        this.dataStructures = dataStructure;

        let index = "/manage",myData=data[0].children || [];

        this.setRouterPath(data,true);

        let route = this.$route;
        let matched = route.matched;
        let currPath = matched[matched.length-1].path;


        for(var i=0;i<myData.length;){
            if(typeof myData[i].children!="undefined"){
               index+="/"+myData[i]["modName"]
               myData = myData[i].children;
            }else{
              index+="/"+myData[i]["modName"]
                break;
            }
        }
        let allPath = this.routerPath;
        let homePath = index;


        if(typeof allPath[currPath]=="undefined"){
          this.$router.push('/login');
        }

        this.$store.commit('setIndexUrl',index);
        setTimeout(()=>{
          this.gotoRouter = true;
        },10)
      },
      handleViewSubNav(){
        this.isViewSubNav = !this.isViewSubNav;
      },

      /**
       * 获取所有后台配置的路由地址
       * @param data
       * @param first
       * @param parItem
       */
      setRouterPath(data,first,parItem){
        for(var i=0,item;i<data.length;i++){
          item=data[i];
          if(first){
            item["path"]="/manage";
            item["level"] = 1;
          }else{
            if(parItem["path"]==-1){
              item["path"]=parItem["path"]+"/"+item.modName;
            }else {
              item["path"]=parItem["path"]+"/"+item.modName;
            }
            item["level"]=parItem["level"]+1;
          }
          this.routerPath[item["path"]]=item["path"];
          if(typeof item.children!="undefined"&&item.children.length>0){
            this.setRouterPath(item.children,false,item);
          }
        }
      },

    },
    components: {
        'Headers':headers,
        'Left':leftmenus
    }
}
</script>
