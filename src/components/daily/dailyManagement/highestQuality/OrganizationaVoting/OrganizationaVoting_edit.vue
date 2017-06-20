<template>

  <div>

    <div v-show="active == 1" >
      <keep-alive>
        <select-project @selProjectCall="selProjectCall" :appraisingId="selectProjectId" v-if="active == 1"></select-project>
      </keep-alive>
    </div>

    <div  v-show="active == 2"  >
      <keep-alive>
        <!--自荐列表依赖评优项目列表的id-->
        <queue :selectProjectId="selectProjectId" :sellOneself="sellOneselfIds" @recommendPerson="recommendPerson" v-if="active == 2"></queue>
      </keep-alive>
    </div>

    <div v-show="active == 3" >
      <keep-alive>
        <!--新建项投票项目依赖自荐选择的人员-->
        <news :recommendPerson="recommendData" @edit="editHandel" :getData="data" :voteId="operailityData.id" :selectProjectId="selectProjectId" v-if="active == 3"></news>
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
  import selectProject from './OrganizationaVoting_edit/OrganizationaVoting_edit_selectProject_list.vue';
  /*引入 -- 列表--*/
  import queue from './OrganizationaVoting_edit/OrganizationaVoting_edit_queue.vue';
  /*引入 -- 新建--*/
  import news from './OrganizationaVoting_edit/OrganizationaVoting_edit_new.vue';

  let Util=null;
  export default {
    //props接收父组件传递过来的数据
    props: ['operailityData'],
    data (){
      return{
        loadBtn:{title:'完成',callParEvent:'searchEvent'},
        active:1,

        selectProjectId:'',   //选择项目id
        recommendData:'',         //自荐人员


        //获取的项目详情数据

        "data":{
          "id":"",                   //投票项目id
          "appraisingId":"",         //评优项目id
          "title":"",           //标题
          "startDate":"",     //开始时间
          "endDate":"",         //结束时间
          "voterScope":"",         //投票人范围
          "grade":"",               //年级
          "voteGroup":"",           //班级
          "depId":"",                 //科室id
          "depName":"",               //科室名称
          "voteRule":"",      //投票规则
          "userList":[            //被投票人列表
            {
              "sellOneselfId":"",   //自荐id
              "voteResultId":"",      //投票结果id
              "userId":"",                //人员id
              "userName":""            //考生姓名
            }
          ]
        },
        sellOneselfIds:'',


        //获取投票项目详情 当前组件默认请求(list)数据时,ajax处理的 基础信息设置
        listMessTitle:{
          ajaxSuccess:'SuccessGetCurrData',
          ajaxParams:{
            url:'appraising/vote/project/get/'+this.operailityData.id,
          }
        }
      }
    },
    created(){
      //给当前组件注入全局util
      Util = this.$util;
    },
    mounted(){
      //暂时没有初始化,预留初始化入口
      this.init();
    },
    methods:{
      /*
       * 点击提交按钮 监听是否提交数据
       * @param isLoadingFun boolean  form表单验证是否通过
       * */
      listenSubEvent(isLoadingFun){
        let isSubmit = this.submitForm("formValidate");
        if(isSubmit) {
          if (!isLoadingFun) isLoadingFun = function () {
          };
          isLoadingFun(true)
          this.editMessTitle.ajaxParams.data = this.getFormData(this.formValidate);
          this.ajax(this.editMessTitle, isLoadingFun)
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
       * */
      SuccessGetCurrData(responseData){
            this.selectProjectId = responseData.data.appraisingId;
            this.sellOneselfIds = responseData.data.userList && this.disposeSellOneselfIds(responseData.data.userList);
          this.recommendData = responseData.data.userList;
            this.data = responseData.data;
      },
      /*
      *  把选中的自荐id挑出来并添加数组里 返回数组
      *
      * */
      disposeSellOneselfIds(userList){
          if(typeof userList !='object' || typeof userList.length == 'undefined' || userList.length == 0) return;
          let arr = []
          for(let i=0;i<userList.length;i++){
            arr.push(+userList[i].userId);
          }
          return arr;
      },


      editHandel(){
          this.$emit('edit','edit','修改成功')
      },

      /*
       * 当前组件发送事件给父组件
       * 发送关闭(cancel)模态事件给父组件,请求关闭当前模态窗
       * */
      cancel(){
        this.$emit('cancel','edit');
      },

      //提取人员id
      /*
       * 获取表单数据
       * @return string  格式:id=0&name=aa
       * */
      getFormData(data){
        let myData = Util._.defaultsDeep({},data);
        return myData;
      },
      /*
       * 组件初始化入口
       * */
      init(){
        //默认请求加载数据
        this.ajax(this.listMessTitle);
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
        this.recommendData = '';
        if(id!=this.selectProjectId){
          this.sellOneselfIds = '';
        }
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

