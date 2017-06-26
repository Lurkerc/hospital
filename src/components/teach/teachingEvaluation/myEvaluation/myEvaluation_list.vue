
<!--我的评价-->
<!--教育处---教学秘书-->

<template>
  <div id="content"  ref="content">
    <!--表格数据-->
    <div
      id="myTable"
      ref="myTable">
      <el-table
        :data="tableData"
        border
        tooltip-effect="dark"
        style="width: 100%"
        @selection-change="handleSelectionChange">
        <el-table-column
          label="序号"
          type="index"
          align="center"
          width="65">
        </el-table-column>
        <el-table-column
          label="操作"
          width="160">
          <template scope="scope">
            <el-button
              size="small"
              @click="show(scope.row)">详-情</el-button>
          </template>
        </el-table-column>
        <el-table-column
          label="名称"
          prop="name">
        </el-table-column>
        <el-table-column
          prop="activitySite"
          label="评价时间 "
          show-overflow-tooltip>
          <template scope="scope">
            {{conductDateType(scope.row)}}
          </template>
        </el-table-column>
        <el-table-column
          prop="evaluated"
          label="评价对象"
          width="120">
        </el-table-column>
        <el-table-column
          prop="activityName"
          label="未评数量"
          width="120">
          <template scope="scope">
            {{scope.row.evaluatedCount-scope.row.counts}}
          </template>
        </el-table-column>

      </el-table>
    </div>

    <!--查看教学活动-->
    <Modal
      height="200"
      v-model="showModal"
      title="查看教学活动"
      class-name="vertical-center-modal"
      :width="960"
      :loading="loading">
      <modal-header slot="header" :content="viewId"></modal-header>
      <show v-if="showModal" :url="url" :operaility-data="operailityData"></show>
      <div slot="footer"></div>
    </Modal>

  </div>
</template>
<style>
</style>
<script>
  /*当前组件必要引入*/

  import url from '../app'
  //引入--新建教学活动--组件
  import show from './myEvaluation_view';
  let Util=null;
  export default {
    data() {
      return {
        //查询项
        url:url,

        publishModal:false, //评价
        /*--按钮button--*/
        publishId:{id:'publishId',title:'发布'},
        //表格数据
        loading:false,
        tableData: [],

        operailityData:'',
        multipleSelection: [],
        /*--按钮button--*/
        addId:{id:'add',title:'添加'},
        editId:{id:'edit',title:'修改'},
        viewId:{id:'view',title:'查看'},
        removeId:{id:'remove',title:'删除'},


        //当前组件默认请求(list)数据时,ajax处理的 基础信息设置
        listMessTitle: {
          ajaxSuccess: 'updateList',
          ajaxParams: {
            url: url.queryBySelf,
            params: {},
          }
        },


      }
    },
    created(){
      this.init()
    },
    components:{
      show
    },
    methods:{
      //初始化请求列表数据
      init(){
        Util = this.$util;
        //ajax请求参数设置
        this.myPages =  Util.pageInitPrams;

        this.queryQptions = {
          curPage: 1,pageSize: Util.pageInitPrams.pageSize
        }

        this.setTableData();
        this.updateList({data:[]}) //todo 模拟请求成功
      },
      //查询
      deformatterDate(d){
        return new Date(d).getTime()-1000*60*60*24;
      },
      handleStartTime(d){
        this.starTimes = this.deformatterDate(d);
      },
      handleEndTime(d){
        this.endTimes = this.deformatterDate(d);
      },
      //点击查询按钮调用
      onSubmitSearch() {
//        console.log(this.getFormData(this.formSearch))
        //查询成功后 this.setTableData()
      },
      //表格数据
      //设置表格及分页的位置
      setTableDynHeight(){
        let content = this.$refs.content;
        let parHt = content.parentNode.offsetHeight;
        let myTable = this.$refs.myTable;
        let paginationHt = 100;
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
      /*
       * 更新列表数据
       * @param JSON 后台返回的data
       */
      updateList(responseData){
        let data = responseData.data;
        if(!data) return;
        data =[
          {
            "id":10,
            "type":"教评学",
            "name":"我是一个活动",
            "relationship":"",
            "loopType":"",
            "appraiserType":"",
            "appraiser":"",
            "appraiserCount":"",
            "evaluatedType":"",
            "evaluated":"zhangs",
            "evaluatedCount":"23",
            "counts":"10",
            "dateType":2,
            "startDay":1,
            "endDay":3,
            "startDate":4,
            "endDate":5,
            "publishStatus":"",
            "createTime":"",
            "updateTime":""
          },
        ]
        this.tableData = data;
      },
      setTableData(){
        this.listMessTitle.ajaxParams.params = Object.assign(this.listMessTitle.ajaxParams.params,this.queryQptions);
        this.ajax(this.listMessTitle);
      },


      /*
       * 改变每页显示条数调用
       * @param n number  当前要设置的显示条数
       * */
      changePageSize (n){
        alert(n)
        this.queryQptions.params.pageSize = n;
        this.setTableData();
      },
      /*
       * 改变页码调用
       * @param n number  当前要设置的页码
       * */
      changePage (n) {
        // 这里直接更改了模拟的数据，真实使用场景应该从服务端获取数据
        this.queryQptions.params.curPage = n;
        this.setTableData();
      },

      /*--点击--添加--按钮--*/
      add(){
        this.openModel('add');
      },
      /*
       * 点击--修改角色--按钮
       * @param index string|number  当前行索引
       * */
      edit(data){
        this.operailityData = data;
        this.openModel('edit')
      },
      /*--点击--查看--按钮--*/
      show(data){
        this.operailityData = data;
        this.openModel('show');

      },
      /*--点击--发布--按钮--*/
      publish(data){
        this.operailityData = data;
        this.openModel('publish');

      },
      /*--点击--删除--按钮--*/
      remove(){
        if(!this.isSelected()) return;
        this.operailityData = this.multipleSelection;
        this.openModel('remove') ;
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
       *      method:'post'
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

      //列表的评价时间处理
      conductDateType({dateType,startDay,endDay,startDate,endDate}){
        let date='' ;
        switch (dateType){
          case 1:date = `出科前${startDay}天——后${endDay}天评价一次`;
            break;
          case 2:date = `每周${startDay}——周${endDay}评价一次`;
            break;
          case 3:date = `每月${startDay}日——${endDay}日评价一次`;
            break;
          case 4:date = `startDate~endDate`;
            break;
          case 5:date = `每天评价一次`;
            break;
          case 6:date = `每季度评价一次`;
            break;
          case 7:date = `每半年评价一次`;
            break;
          case 8:date = `每年评价一次`;
            break;
        }
        return date;
      },

      //dateType 1-3
      dateTypeOS(){

      }
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
  };
</script>

