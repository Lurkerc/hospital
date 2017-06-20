<template>

  <div>

    <div v-show="active == 1" >
      <keep-alive>
         <select-project @selProjectCall="selProjectCall" v-if="active == 1"></select-project>
      </keep-alive>
    </div>

    <div  v-show="active == 2" >
      <keep-alive>
        <!--自荐列表依赖评优项目列表的id-->
        <queue :selectProjectId="selectProjectId" @recommendPerson="recommendPerson" v-if="active == 2"></queue>
      </keep-alive>
    </div>

    <div v-show="active == 3"  >
      <keep-alive>
        <!--新建项投票项目依赖自荐选择的人员-->
         <news :recommendPerson="recommendData" :selectProjectId="selectProjectId" @add="addHandel" v-if="active == 3"></news>
      </keep-alive>
    </div>

   <!--上一步-->
    <el-button v-show="active > 1"  @click="loat">上一步</el-button>
    <!--下一步-->
    <el-button v-show="active <3" @click="next">下一步</el-button>
    <!--完成-->

  </div>



</template>
<script>
  /*引入 -- 选择项目列表--*/
  import selectProject from './OrganizationaVoting_add/OrganizationaVoting_add_selectProject_list.vue'
  /*引入 -- 列表--*/
  import queue from './OrganizationaVoting_add/OrganizationaVoting_add_queue.vue'
  /*引入 -- 新建--*/
  import news from './OrganizationaVoting_add/OrganizationaVoting_add_new.vue'

  let Util=null;
  export default {
    data (){
      return{
        loadBtn:{title:'完成',callParEvent:'searchEvent'},
        active:1,

        selectProjectId:'',   //选择项目id
        recommendData:'',         //自荐人员
      }
    },
    created(){
      //给当前组件注入全局util
      Util = this.$util;
    },
    mounted(){
       //暂时没有初始化,预留初始化入口
      //this.init();
    },
    methods:{
      /*
      * 点击提交按钮 监听是否提交数据
      * @param isLoadingFun boolean  form表单验证是否通过
      * */
      listenSubEvent(isLoadingFun){
        let isSubmit = this.submitForm("formValidate");
        if(isSubmit){
          if(!isLoadingFun) isLoadingFun=function(){};
          isLoadingFun(true);
          this.addMessTitle.ajaxParams.data=this.getFormData(this.formValidate);
          this.ajax(this.addMessTitle,isLoadingFun)
        }
      },
      /*
       * 点击提交按钮 监听是否验证通过
       * @param formName string  form表单v-model数据对象名称
       * @return flag boolean   form表单验证是否通过
       * */
      submitForm(formName){
        let flag = false;
        this.$refs[formName].validate((valid) => {
          if (valid) {
            flag= true;
          }
        });
        return flag;
      },
      /*
       * 默认组件第一次请求数据
       * @param res JSON  数据请求成功后返回的数据
       * 注:当前为添加页面暂时未用到,属于预留
       * */
      oneDataSuccess(res){
      },
      /*
       * 当前组件发送事件给父组件
       * 发送关闭(cancel)模态事件给父组件,请求关闭当前模态窗
       * */
      cancel(){
        this.$emit('cancel','add');
      },

      //添加成功的回调，关闭窗口，并刷新列表
      addHandel(){
        this.$emit('add','add','添加成功')
      },
      /*
       * 获取表单数据
       * @return string  格式:id=0&name=aa
       * */
      getFormData(data){
        let myData = Util._.defaultsDeep({},data);
        myData.type = data.type.join(",");
        return myData;
      },
      /*
       * 组件初始化入口
       * */
      init(){
        //this.ajax(this.listMessTitle)
      },


      //上一步
      loat(){
        this.active--
      },

      //下一步
      next(){
          if(!this.isNext(this.active)) return;
        ++this.active
      },



      //选择评优项目类列表调用， 传过来一个id 供自荐列表使用
      selProjectCall(id){
//        this.recommendData = '';
        this.selectProjectId = id;

      }  ,
      //自荐列表调用， 传过来人员数据数组 供自荐列表使用
      recommendPerson(personData){
        this.recommendData = personData;
      },

      //下一步操作 获取子组件的信息并保存id

      isNext(active){
        if(!this.selectProjectId){
            this.errorMess('请选择数据');
            return false
        }  //如果项目id为空则不能进行下一步
        if(active==2 && !this.recommendData){
          this.errorMess('请选择数据');
            return false;

        }
        return true;
      },


      subCancel(){
        this.columnModal=false;
      },

    },
    components:{
      selectProject,queue,news
    }
  }
</script>

