<template>
  <div id="content"  ref="content"  class="modal">

    <div class="listUpAreaBox">
      <div class="listUpArea-menus">
        <!--表格数据操作按钮-->
        <div class="ivu-row">
          <div class="ivu-col ivu-col-span-24">
            <el-button  @click="remove" type="danger">删除</el-button>
          </div>
        </div>
      </div>
      <div class="listUpArea-search">
        <div class="listUpArea-searchWrapper">
          <!--右侧查询-->
          <el-form ref="formValidate"  :inline="true" :model="formValidate" class="form-inline lose-margin" label-width="60px" >
            <div class="listUpArea-searchLeft">
              <input class="hidden">
              <el-input placeholder="请输入内容" v-model="formValidate.userName">
                <div slot="prepend">姓名</div>
                <el-button slot="append" @click="handleSubmit('formValidate')" icon="search"></el-button>
              </el-input>
            </div>
            <div class="listUpArea-moreSearch">
              <el-button @click="showMoreSearch" type="text">高级查询</el-button>
            </div>
          </el-form>
        </div>
      </div>
    </div>
    <div v-if="isShowMoreSearch" class="listUpArea-moreSearchBox">

    </div>
    <br />
    <!--表格数据操作按钮-->
    <div>
      <div
        id="myTable"
        ref="myTable"
      >
        <el-table
          stripe
          align="center"
          :height="dynamicHt"
          :context="self"
          :data="tableData1"
          tooltip-effect="dark"
          highlight-current-row
          style="width: 100%"
          @selection-change="handleSelectionChange">

          <el-table-column
            label="序号"
            type="index"
            width="75">
            <template scope="scope">
              <span>{{scope.row.index}}</span>
            </template>
          </el-table-column>
          <el-table-column
            type="selection"
            width="55">
          </el-table-column>

          <el-table-column label="操作"  width="200" align="center">
            <template scope="scope">
              <el-button
                v-if="scope.row.rotaryState!=-1"
                size="small"
                @click="edit(scope.$index, scope.row)">微 调</el-button>
              <el-button v-if="scope.row.rotaryState==-1" size="small" class="but-col" @click="recover(scope.$index, scope.row)">恢 复</el-button>
              <el-button v-if="scope.row.rotaryState!=-1" size="small" class="but-col" @click="pause(scope.$index, scope.row)" type="danger">暂 停</el-button>
            </template>
          </el-table-column>
          <el-table-column
            prop="userName"
            label="姓名">
          </el-table-column>
          <el-table-column
            prop="major"
            label="专业"
            width="120">
          </el-table-column>
          <el-table-column
            prop="rotaryBeginTime"
            label="轮转开始时间"
          >
          </el-table-column>
          <el-table-column
            prop="rotaryEndTime"
            label="轮转结束时间"
            width="120">
          </el-table-column>
          <el-table-column
            prop="rotaryState"
            label="轮转状态"
            width="120"
          >
            <template scope="scope">
              {{scope.row.rotaryState | rotaryState}}
            </template>
          </el-table-column>

        </el-table>
      </div>
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
    <!--微调-->
      <Modal
        :mask-closable="false"
        v-model="editModal"
        height="200"
        title="对话框标题"
        class-name="vertical-center-modal"
        :width="960">
        <!--<div slot="header"> -->
        <!--</div>-->
        <modal-header slot="header" :content="editId"></modal-header>
        <trimming v-if="editModal" :userType="userType" @cancel="cancel" @edit="subCallback" :operaility-data="operailityData"></trimming>
        <div slot="footer"></div>
      </Modal>
    <!---->
    <!--删除弹窗-->
    <Modal
      :mask-closable="false"
      height="200"
      v-model="removeModal"
      title="对话框标题"
      class-name="vertical-center-modal"
      :loading="loading"
      :width="500">
      <modal-header slot="header" :content="removeId"></modal-header>
      <remove v-if="removeModal" :deleteUrl="deleteUrl" @remove="subCallback" @cancel="cancel" :operaility-data="operailityData"></remove>
      <div slot="footer"></div>
    </Modal>
    <!---->
    <!--恢复弹窗-->
    <Modal
      :mask-closable="false"
      height="200"
      v-model="recoverModal"
      title="对话框标题"
      class-name="vertical-center-modal"
      :loading="loading"
      :width="500">
      <modal-header slot="header" :content="recoverId"></modal-header>
      <recover v-if="recoverModal" @cancel="cancel" @recover="subCallback" :operaility-data="operailityData"></recover>
      <div slot="footer"></div>
    </Modal>
    <!--暂停弹窗-->
    <Modal
      :mask-closable="false"
      height="200"
      v-model="pauseModal"
      title="对话框标题"
      class-name="vertical-center-modal"
      :loading="loading"
      :width="500">
      <modal-header slot="header" :content="pauseId"></modal-header>
      <pause v-if="pauseModal" @cancel="cancel" @pause="subCallback" :operaility-data="operailityData"></pause>
      <div slot="footer"></div>
    </Modal>
  </div>
</template>

<script >
  /*当前组件必要引入*/
  //引入--微调--组件
  import trimming from "./trimming.vue";
  import recover from "./recoverRotate.vue";
  import pause from "./pauseRotate.vue";

  import api from "../api.js";
  //当前组件引入全局的util
  let Util=null;
  export default{
    props:{
      userType:{
        type: String,
        default: "ZYY",
      }
    },
    data() {
      return {
        //查询表单
        deleteUrl: api.deleteRotary.path+this.userType,
        //form表单bind数据
        formValidate: {
          "userName":"",
          "schoolName":"",
          "mobile":"",
          "major":"",
          "idNumber":"",
          "rotaryBeginTime":"",
          "rotaryEndTime":"",
          "rotaryState":""
        },
        /*--按钮button--*/
        removeId:{
          id:'remove',
          title:'删除'
        },
        editId:{
          id:'edit',
          title:'微调'
        },
        recoverId:{
          id:'forbidden',
          title:'恢复'
        },
        pauseId:{
          id:'startUsing',
          title:'暂停'
        },


        //恢复
        recoverModal:false,

        //暂停
        pauseModal:false,


        operailityData:'',
        multipleSelection: [],
        dynamicHt: 100,
        self: this,
        tableData1: [],
        loading:false,
        listTotal:0,
        listMessTitle:{
          ajaxSuccess:'updateListData',
          ajaxParams:{
            url: api.rtuserPagelist.path+this.userType,
            params:{
              userName:"",
              year:"",
              rtState:"",
              sortby:"",
              order:"",
              schoolName:"",
            }
          }
        },

      }



    },
    methods: {
      //初始化请求列表数据
      init(){
        Util = this.$util;
        //ajax请求参数设置
        this.myPages =  Util.pageInitPrams;

        this.queryQptions = {
          params:{curPage: 1,pageSize: Util.pageInitPrams.pageSize}
        }

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
        let data = responseData.data;
        this.tableData1=[];
        data = this.addIndex(data);
        this.tableData1=data;
        this.listTotal = responseData.totalCount || 0;
      },
      setTableData(){
        this.listMessTitle.ajaxParams.params = Object.assign(this.listMessTitle.ajaxParams.params,this.queryQptions.params,this.formValidate);
        this.ajax(this.listMessTitle);
      },
      /*
       * 列表查询方法
       * @param string 查询from的id
       * */
      handleSubmit(name){
        this.setTableData();
      },

      /*--点击--删除--按钮--*/
      remove(){
        if(!this.isSelected()) return;
        let tempArr = [];
        for(var i=0,item;i<this.multipleSelection.length;i++){
          item = this.multipleSelection[i];
          tempArr.push(item["userId"]);
        }
        let url = this.deleteUrl;
        if(url.indexOf("?")>-1){
          url = url.split("?")[0];
        }
        url += "?"+"userIds"+"="+tempArr.join(",");
        this.deleteUrl = url;
        this.operailityData = [];
        this.openModel('remove') ;
      },


      /*
       * 点击--修改角色--按钮
       * @param index string|number  当前行索引
       * */
      edit(index){
        if(typeof index == 'undefined'){
          if(!this.isSelected(true)) return;
          this.operailityData = {"userId":this.tableData1[index]["userId"]};
          this.openModel('edit')
        }else {
          this.operailityData = {"userId":this.tableData1[index]["userId"]};
          this.openModel('edit')
        }
      },
      /*
       * 点击--恢复--按钮
       * @param index string|number  当前行索引
       * */
      recover(index){
        this.operailityData = this.tableData1[index];
        this.openModel("recover");
      },
      /*
       * 点击--暂停 --按钮
       * @param index string|number  当前行索引
       * */
      pause(index){
        this.operailityData = this.tableData1[index];
        this.openModel("pause");
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
          this.formValidate = this.setObjValEmpty(this.formValidate);
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
      //tree
      treeClick(obj,node,self){
        //出现切换按钮
        this.flag = true;
        this.clickId = obj.id
        this.targetKeys2=[9]
        store = node.store ;
        this.tableData1 = obj.children;

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
      trimming,recover,pause
    }

  }
</script>
