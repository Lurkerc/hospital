<!--菜单管理-->
<!--业务字典-->


<template>
  <div id="content" ref="content" class="modal">
    <!--左侧树-->
      <my-tree
        :treeData="treeData"
        @tree-click="treeClick"
      >

        <!--右侧查询-->
        <div style="padding-top: 36px;"></div>
        <div class="add-remove">
          <el-button  class="but-col"  @click="add"  type="primary">添加</el-button>
          <el-button class="but-col" @click="remove" type="danger">删除</el-button>
        </div>
        <div
          id="myTable"
          ref="myTable"

        >
          <el-table
            align="center"
            :height="dynamicHt"
            :context="self"
            :data="tableData1"
            tooltip-effect="dark"
            style="width: 100%"
            @selection-change="handleSelectionChange">
            <el-table-column
              type="selection"
              width="55">
            </el-table-column>
            <el-table-column
              label="序号"
              prop="index"
              width="70">
              <!--<template scope="scope">-->
              <!--<span>{{scope.row.index}}</span>-->
              <!--</template>-->
            </el-table-column>
            <el-table-column
              label="操作"
              align="center"
            >
              <template scope="scope">
                <el-button
                  size="small"
                  type="info"
                  @click="show(scope.$index,scope.row)">查看
                </el-button>
                <el-button
                  size="small"
                  type="warning"
                  @click="edit(scope.$index, scope.row)">修改
                </el-button>
              </template>
            </el-table-column>
            <el-table-column
              prop="volunteSubject"
              label="菜单名称"
              align="center"
              width="200">
            </el-table-column>
            <el-table-column
              prop="rewardDate"
              label="菜单代码"
              show-overflow-tooltip>
            </el-table-column>
            <el-table-column
              prop="rewardDate"
              label="叶子菜单"
              show-overflow-tooltip>
            </el-table-column>
            <el-table-column
              prop="rewardDate"
              label="显示顺序"
              show-overflow-tooltip>
            </el-table-column>
            <el-table-column
              prop="rewardDate"
              label="菜单层次"
              show-overflow-tooltip>
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
              :total="myPages.listTotal">
            </el-pagination>
          </div>
          <!--修改弹窗-->
          <Modal
            :mask-closable="false"
            v-model="editModal"
            height="200"
            title="对话框标题"
            class-name="vertical-center-modal"
            :width="1100">
            <!--<div slot="header"> -->
            <!--</div>-->
            <modal-header slot="header" :content="editId"></modal-header>
            <edit v-if="editModal"   @cancel="cancel"  @edit="subCallback"  :operaility-data="operailityData"></edit>
            <div slot="footer"></div>
          </Modal>
          <!---->
          <!--增加弹窗-->
          <Modal
            :mask-closable="false"
            v-model="addModal"
            height="200"
            title="对话框标题"
            class-name="vertical-center-modal"
            :width="960">
            <!--<div slot="header"> -->
            <!--</div>-->
            <modal-header slot="header" :content="addId"></modal-header>
            <add v-if="addModal"  @cancel="cancel" @add="subCallback" ></add>
            <div slot="footer"></div>
          </Modal>
          <!---->
          <!--查看弹窗-->
          <Modal
            :mask-closable="false"
            v-model="showModal"
            height="200"
            title="对话框标题"
            class-name="vertical-center-modal"
            :loading="true"
            :width="800"
          >
            <modal-header slot="header" :parent="self" :content="showId"></modal-header>
            <show v-if="showModal"  @cancel="cancel"   :operaility-data="operailityData"></show>
            <div slot="footer"></div>
          </Modal>
          <!---->

          <!--删除弹窗-->
          <Modal
            close-on-click-modal="false"
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
          </div>
        <!---->
      </my-tree>
  </div>
</template>
<script >
  /*当前组件必要引入*/
  //引入--修改--组件
  import edit from "./menuManagement_edit.vue";
  //引入--查看--组件
  import show from "./menuManagement_view.vue";
  //引入--添加--组件
  import add from "./menuManagement_add.vue";
  //当前组件引入全局的util
  let Util=null;
  let store = null;
  export default{
    data() {
      return {
        //查询表单
        deleteUrl:'/role/remove',
        formValidate: {
          name: '',
          pickerOptions0: '',
          status: ''
        },
        /*--按钮button--*/
        addId:{
          id:'add',
          title:'添加'},
        removeId:{
          id:'remove',
          title:'删除'
        },
        editId:{
          id:'edit',
          title:'修改'
        },
        auditId:{
          id:'auditId',
          title:'审核'
        },
        showId:{
          id:'auditId',
          title:'查看'
        },
        treeData: [{
          id: 1,
          label: '账户管理',
          children: [{
            id: 4,
            label: '住院医',
            children: [{
              id: 9,
              label: '招录人员'
            }, {
              id: 10,
              label: '管理人员'
            },
              {
                id: 30,
                label: '基地'
              }]
          }]
        }, {
          id: 2,
          label: '一级 2',
          children: [{
            id: 5,
            label: '二级 2-1'
          }, {
            id: 6,
            label: '二级 2-2'
          }]
        }, {
          id: 3,
          label: '一级 3',
          children: [{
            id: 7,
            label: '二级 3-1'
          }, {
            id: 8,
            label: '二级 3-2'
          }]
        }],
        operailityData:'',
        multipleSelection: [],
        dynamicHt: 100,
        self: this,
        tableData1: [{j:'1'}],
        loading:false,
        listTotal:0,
        listMessTitle:{
          ajaxSuccess:'updateListData',
          ajaxParams:{
            url:'/role/list?name=&identify=&type=',
            params:this.queryQptions
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
          //url:this.listUrl,
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
        let len = responseData.data.length;
        let data = responseData.data.splice(0,150);
        let that = this;
        that.tableData1=[];
        data = that.addIndex(data);
        for(var i=0,n=0;i<data.length;i+=100,n++){
          setTimeout(()=>{
            that.tableData1= that.tableData1.concat(data.splice(0,100));
        },n*10)
        }
        that.listTotal = 1;
      },
      setTableData(){
        this.listMessTitle.ajaxParams = Object.assign(this.listMessTitle.ajaxParams,this.queryQptions);
        this.ajax(this.listMessTitle);
      },
      /*
       * 列表查询方法
       * @param string 查询from的id
       * */
      handleSubmit(name){
        this.$refs[name].validate((valid) => {
          if (valid) {
            this.$Message.success('提交成功!');
          } else {
            this.$Message.error('表单验证失败!');
          }
        })
      },
      /*--点击--添加--按钮--*/
      add(){
        this.openModel('add');
      },
      /*--点击--删除--按钮--*/
      remove(){
        if(!this.isSelected()) return;
        this.operailityData = this.multipleSelection;
        this.openModel('remove') ;
      },
      /*
       * 点击--查看--按钮
       * @param index string|number  当前行索引
       * */
      show(index){
        this.operailityData = this.tableData1[index-1];
        this.showModal = true;
      },
      /*
       * 点击--修改角色--按钮
       * @param index string|number  当前行索引
       * */
      edit(index){
        if(typeof index == 'undefined'){
          if(!this.isSelected(true)) return;
          this.operailityData = this.multipleSelection[0];
          this.openModel('edit')
        }else {
          this.operailityData = this.tableData1[index-1];
          this.openModel('edit')
        }
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
      edit,add,show
    }

  }
</script>
<style>

  .add-remove{
    margin-bottom: 20px;
  }
  .header{
    height: 30px;
    font-size: 18px;
    color: #ffffff;

  }


</style>

