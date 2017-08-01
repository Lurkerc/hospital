<template>
<div>
    <el-option
      v-for="item in optionData"
      :key="item.id"
      :label="item[name||'name']"
      :value="item[id||'id']">
    </el-option>
</div>
</template>
<script>
  let Util=null;
  export default {

    props:['type','url',"selectOptions",'unAll',"setSltOptionValue",'currSelectOne','id','isCode','userType','userId','name','role'],
    data() {

        //条件过滤，如果没有url 由type决定url 如果没有type默认科室url
        let url;
        let type;
        let idOptions={
            name:'name',
            id:'id',
        };
        let codOptions={
          name:'name',
          id:'value',
        };
        let Options={};

        if(!this.type){
            type = 'dep';
        }else {
          type = this.type;
        }
        let typeUrl={
          dep:'/hospital/dept/list',
          role:'/role/list?name=&identify=&type=',
          school:'/schools/queryList',
          allBuild:'/dormitory/build/query/allBuild',   //添加-查询所有大楼(用于添加房间时，选择大楼的下拉框)
          teachActivityType:'/dictionary/getByCode/TEACH_ACTIVITY_TYPE',   //获取教学活动类型
          aysUserType:'/dictionary/getByCode/SYS_USER_TYPE',                //生源类型
          userRotaryDeptlist:'/traineeRotary/arrangeRotary/userRotaryDeptlist/'+(this.userType)+'-'+this.userId,      //轮转科室用
          getDepByTeacher:'/rotationProcess/rotaryTable/getDepByTeacher/'+this.userId,      //轮转科室用
          byUserType:'/hospital/dept/query/byUserType/'+this.userId,      //轮转科室用
          //根据不同角色获取科室 (科室主任和带教秘书用) 获取当前角色下的科室
          byNowUser:'/hospital/dept/get/byNowUser/' //uesrId
        };
        url = typeUrl[type];
        if(this.url)url = this.url;


        //通过type定义sltOptions
      if(this.selectOptions){
        Options = this.selectOptions;
      }else if(type =='teachActivityType' || type =='teachActivityType'){
        Options = codOptions;
      }else {
        Options = idOptions;
      }
      let params = {};
      if(this.type=='byUserType'){
         params = {
            userType:this.role,
        }
      }
      return {
        optionData: [],

        //选择框的参数配置
        sltOptions:Options,
        value:"",   //当multiple为true时value为[];

        //当前组件默认请求(list)数据时,ajax处理的 基础信息设置
        listMessTitle:{
          ajaxSuccess:'updateListData',
          ajaxParams:{
            url:url,  //向后台请求数据的地址
            params:params,
          }
        }
      }
    },
    created(){
      Util = this.$util;
      this.init();
    },
    methods:{


      //初始化组件信息
      init(){

        this.ajax(this.listMessTitle);
      },


      //通过get请求列表数据
      updateListData(responseData){
        let data = responseData.data;
        if(this.isCode){
            data = data.child;
        }
        if(!this.unAll){
          data.unshift({
            [this.id||'id']: '',
            [this.name||'name']:'全部'
          },)
        }
        this.optionData = data;
      },



    }
  }
</script>
