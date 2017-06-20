<!--档案审核-->
<template>
  <div id="content" ref="content" class="modal">
    <el-form ref="formValidate" :inline="true" :model="formValidate" class="form-inline lose-margin" label-width="90px" >
      <el-form-item label="姓名">
        <el-input v-model="formValidate.name" placeholder="姓名"></el-input>
      </el-form-item>
      <el-form-item label="性别">
        <el-select v-model="formValidate.sex" placeholder="性别">
          <el-option label="全部" value="all"></el-option>
          <el-option label="男" value="men"></el-option>
          <el-option label="女" value="women"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="手机号">
        <el-input v-model="formValidate.phone" placeholder="手机号"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="handleSubmit('formValidate')">查询</el-button>
      </el-form-item>
    </el-form>
    <!--列表数据-->
    <div>
      <!--表格数据-->
      <div
        id="myTable"
        ref="myTable"
      >
        <el-table
          align="center"
          :height="dynamicHt"
          :context="self"
          :data="tableData"
          tooltip-effect="dark"
          highlight-current-row
          style="width: 100%;height: 100%"
          @selection-change="handleSelectionChange">
          <el-table-column
            align="center"
            label="序号"
            prop="index"
            width="100">
            <template scope="scope">
              <span>{{scope.row.index}}</span>
            </template>
          </el-table-column>
          <el-table-column
            label="操作"
            width="260">
            <template scope="scope">
              <el-button size="small" @click="xdth(scope.row)">心得体会</el-button>
              <!--todo  查看-->
              <el-button size="small" @click="evaluate(scope.row)">评价</el-button>
              <el-button size="small" @click="show(scope.row)">查看</el-button>
            </template>
          </el-table-column>
          <el-table-column
            prop="activityName"
            label="课程名称"
            width="120">
          </el-table-column>
          <el-table-column
            prop="activityType"
            label="课程类型"
            width="120">
          </el-table-column>
          <el-table-column
            prop="activitySite"
            label="授课地点"
            align="center"
            width="200"
          >
          </el-table-column>
          <el-table-column
            prop="hostUserName"
            label="授课老师"
            width="120"
          >
          </el-table-column>
          <el-table-column
            prop="activityTime"
            label="日期"
            width="120"
          >
          </el-table-column>
          <el-table-column
            prop="recordTimes"
            label="时间"
          >
          </el-table-column>

        </el-table>
      </div>
      <!--分页-->
      <div style="margin: 10px;">
        <div style="float: right;">
          <el-pagination
            @size-change="changePageSize"
            @current-change="changePage"
            :current-page="myPages.currentPage"
            :page-sizes="myPages.pageSizes"
            :page-size="myPages.pageSize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="listTotal">
          </el-pagination>
        </div>
      </div>
    </div>
    <!--心得体会-->
    <Modal
      close-on-click-modal="false"
      width="1000"
      v-model="xdthModal"
      title="对话框标题"
      class-name="vertical-center-modal"
      :loading="loading">
      <modal-header slot="header" :content="xdthId"></modal-header>
      <xdth v-if="xdthModal" @cancel="cancel" @xdth="subCallback" :operaility-data="operailityData" :url="url"></xdth>
      <div slot="footer"></div>
    </Modal>
    <!--查看弹窗-->
    <Modal
      width="800"
      v-model="showModal"
      title="查看档案管理弹窗"
      class-name="vertical-center-modal"
      :loading="loading">
      <modal-header slot="header" :content="viewId"></modal-header>
      <show v-if="showModal" @cancel="cancel" @show="subCallback" :operaility-data="operailityData" :url="url"></show>
      <div slot="footer"></div>
    </Modal>
    <!--评价弹窗-->
    <Modal
      width="800"
      v-model="evaluateModal"
      title="查看档案管理弹窗"
      class-name="vertical-center-modal"
      :loading="loading">
      <modal-header slot="header" :content="evaluateId"></modal-header>
      <evaluate v-if="evaluateModal" @cancel="cancel" @evaluate="subCallback" :operaility-data="operailityData" :url="url"></evaluate>
      <div slot="footer"></div>
    </Modal>
  </div>
</template>
<script>
  /*当前组件必要引入*/
  import url from '../app'
  //引入--新建--组件
  import show from "./myActivities_view.vue";
  //引入--心得体会--组件
  import xdth from "./myActivities_xdth.vue";
  //引入--评价--组件
  import evaluate from "./myActivities_evaluate.vue";
  //当前组件引入全局的util
  let Util=null;
  export default{
    data() {
      return {
        url:url,
        //查询表单
        formValidate: {
          userId:'',       //当前登录人
          activityName: '',  //活动名称
          activityType: '',    //活动类型
          activityBeginTime:'',    //活动时间(开始)
          activityEndTime: '',    //活动时间(结束)
          activityState: '',    //活动状态
          depids: '',    //科室ID
        },


        "tableData":[
          {
            "id":1,
            "activityName":"教学查房",
            "activityType":"理论",
            "hostUserName":"张三",
            "activityTime":"2017-03-31",
            "activitySite":"教学楼三楼301室",
            "activityUser":"呼吸科-住院医师",
            "shouldUserCount":30,
            "actuallyUserCount":30,
            "recordTimes":"9:00-10:00,10:10-11:00",
            "activityState":"nosubmit"
          }
        ],
        operailityData:'',
        multipleSelection: [],
        dynamicHt: 100,
        self: this,
        loading:false,
        listTotal:0,
        //当前组件默认请求(list)数据时,ajax处理的 基础信息设置
        listMessTitle:{
          ajaxSuccess:'updateListData',
          ajaxParams:{
            url:url.userList,
            params:{}
          }
        },
        xdthModal:false,
        evaluateModal:false, //评价
        /*--按钮button--*/
        viewId:{id:'view',title:'查看'},
        xdthId:{id:'xdthId',title:'心得体会'},
        evaluateId:{id:'evaluateId',title:'评价'},
      }
    },
    methods: {
      //初始化请求列表数据
      init(){

        let userInfo = this.$store.getters.getUserInfo;
        this.formValidate.userId = userInfo.id;
        Util = this.$util;
        //ajax请求参数设置
        this.myPages =  Util.pageInitPrams;

        this.queryQptions = {
          curPage: 1,
          pageSize: Util.pageInitPrams.pageSize
        },

        this.setTableData();
      },
      //设置表格及分页的位置
      setTableDynHeight(){
        let content = this.$refs.content;
        let parHt = content.parentNode.offsetHeight;
        let myTable = this.$refs.myTable;
        let paginationHt = 50;
        this.dynamicHt = parHt - myTable.offsetTop - paginationHt;
      },
      /*
       * checkbox 选择后触发事件
       * @param val Array 存在所有的选择每一个行数据
       */
      handleSelectionChange(val) {
        this.multipleSelection = val;
      },
      /*
       * 列表数据只能选择一个
       * @param isOnly true  是否只选择一个
       */
      isSelected(isOnly){
        let len = this.multipleSelection.length;
        let flag = true;
        if(len==0){
          this.showMess("请选择数据!");
          flag = false;
        }
        if(len>1 && isOnly){
          this.showMess("只能修改一条数据!")
          flag = false;
        }
        return flag;
      },

      //通过get请求列表数据
      updateListData(responseData){
        this.tableData = this.addIndex(responseData.data);
      },
      setTableData(){
        let formSearch;
        formSearch = this.formDate(this.getFormData(this.formValidate),['activityBeginTime','activityEndTime'],this.yearMonthData);
        this.listMessTitle.ajaxParams.params = Object.assign(this.listMessTitle.ajaxParams.params,this.queryQptions,formSearch);
        this.ajax(this.listMessTitle);
      },
      /*
       * 列表查询方法
       * @param string 查询from的id
       * */
      handleSubmit(name){
        let formData = Util._.defaultsDeep({},this.formValidate);
      },
      /*--点击--心得体会--按钮--*/
      xdth(data){
        this.operailityData = data;
        this.openModel("xdth");
      },
      /*
       * 点击--查看--按钮
       * @param index string|number  当前行索引
       * */
      show(data){

        this.operailityData =data;
        this.openModel("show");
      },
      /*
       * 点击--评价--按钮
       * @param data obj  当前行数据
       * */
      evaluate(data){

        this.operailityData =data;
        this.openModel("evaluate");
      },
      /*
       * 监听子组件通讯的方法
       * 作用:根据不同的参数关闭对应的模态
       * @param targer string example:"add"、"edit"
       * */
      cancel(targer){
        this[targer+'Modal'] = false;
      },
      /*
       * 监听子组件通讯的方法
       * 作用:ajax请求成功回调,该监听方法在libs/util 中的混合模式下定义回调
       * @param targer string example:"add"、"edit"
       * @param targer string 提示返回的ajax回调返回的信息改信息在对应的子组件中定义
       * 例如:errorTitle、errorTitle
       *addMessTitle:{
       *    type:'add',
       *    successTitle:'添加成功!',
       *    errorTitle:'添加失败!',
       *    ajaxSuccess:'ajaxSuccess',
       *    ajaxError:'ajaxError',
       *    ajaxParams:{
       *      url:'/role/add',
       *      method:'post'constructor
       *    }
       *    }
       * @param udata boolean 默认false  是否不需要刷新当前表格数据
       * */
      subCallback(target,title,updata){
        this.cancel(target);
        if(title){
          this.successMess(title);
        }
        if(!updata){
          this.setTableData();
        }
      },
      /*
       * 打开指定的模态窗体
       * @param options string 当前指定的模态:"add"、"edit"
       * */
      openModel(options){
        this[options+'Modal'] = true;
      },

      /*
       * 获取表单数据
       * @return string  格式:id=0&name=aa
       * */
      getFormData(data){
        let myData = Util._.defaultsDeep({},data);
        return myData;
      },
    },
    created(){
      this.init();
    },
    mounted(){
      //页面dom稳定后调用
      this.$nextTick(function () {
        //初始表格高度及分页位置
        this.setTableDynHeight();
        //为窗体绑定改变大小事件
        let Event = Util.events;
        Event.addHandler(window, "resize", this.setTableDynHeight);
      })
    },
    components:{
      //当前组件引入的子组件
      show,xdth,evaluate
    }
  }
</script>
