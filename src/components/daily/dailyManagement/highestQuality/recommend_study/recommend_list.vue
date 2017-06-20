<!--评优项目管理-->

<template>
  <div id="nosocomial" ref="nosocomial" class="modal">
    <div class="add-remove">
      <el-form ref="formValidate" label-width="100px" class="demo-ruleForm">
        <el-row >
          <el-col :span="6" >

          </el-col>
          <el-col :span="10" :offset="2">

              <el-form-item  prop="name">
                <el-input v-model="formValidate.title" placeholder="输入标题搜索">
                  <el-button @click="searchEvent" slot="append"  icon="search"></el-button>
                </el-input>
              </el-form-item>
          </el-col>
        </el-row >
      </el-form>
    </div>
    <div
      id="nosocomialTable"
      ref="nosocomialTable"
    >
      <el-table
        align="center"
        :height="dynamicHt"
        :context="self"
        :data="tableData"
        tooltip-effect="dark"
        highlight-current-row
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
        <template scope="scope">
        <span>{{scope.row.index}}</span>
        </template>
        </el-table-column>
        <el-table-column
          label="操作"
          align="center"
          width="300"
          show-overflow-tooltip
        >
          <template scope="scope">
            <el-button
              size="small"
              type="info"
              v-show="scope.row.sellOneselfId"
              @click="show(scope.row)">查看自荐
            </el-button>
            <el-button
              size="small"
              type="warning"
              v-show="!scope.row.sellOneselfId"
              @click="add(scope.row)">增加自荐
            </el-button>
            <el-button
              size="small"
              type="warning"
              v-show="scope.row.sellOneselfId"
              @click="edit(scope.row)">修改
            </el-button>
            <el-button
              size="small"
              type="warning"
              v-show="scope.row.sellOneselfId && scope.row.examineStatus=='WSB'"
              @click="reported(scope.row)">上报
            </el-button>
          </template>
        </el-table-column>
        <el-table-column
          prop="title"
          label="标题"
          align="center"
          show-overflow-tooltip
        >
          <template scope="scope">
            <el-button
              size="small"
              @click="show(scope.row)">{{scope.row.title}}
            </el-button>
          </template>
        </el-table-column>
        <el-table-column
          prop="roleName"
          label="对象 "
          width="200"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          prop="startDate"
          label="自荐开始时间"
          width="200"

          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          prop="endDate"
          label="自荐结束时间"
          width="200"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          prop="status"
          label="状态"
          show-overflow-tooltip>
          <template scope="scope">
            {{scope.row.status=='ONGOING'? '进行中' : '已结束'}}
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
          :total="totalCount">
        </el-pagination>
      </div>
      <div>
        <!--新建弹窗-->
        <Modal
          :mask-closable="false"
          v-model="addModal"
          height="200"
          title="对话框标题"
          class-name="vertical-center-modal"
          :width="960">
          <modal-header slot="header" :content="addId"></modal-header>
          <add v-if="addModal"   @cancel="cancel"  @add="subCallback"  :operaility-data="operailityData"></add>
          <div slot="footer"></div>
        </Modal>
        <!---->
        <!--修改弹窗-->
        <Modal
          :mask-closable="false"
          v-model="editModal"
          height="200"
          title="对话框标题"
          class-name="vertical-center-modal"
          :width="960">
          <modal-header slot="header" :content="editId"></modal-header>
          <edit v-if="editModal"   @cancel="cancel"  @edit="subCallback"  :operaility-data="operailityData"></edit>
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
          <modal-header slot="header"  :content="showId"></modal-header>
          <show v-if="showModal"  @cancel="cancel"   :operaility-data="operailityData"></show>
          <div slot="footer"></div>
        </Modal>

        <!--上报弹窗-->
        <Modal
          close-on-click-modal="false"
          height="200"
          v-model="reportedModal"
          title="对话框标题"
          class-name="vertical-center-modal"
          :loading="loading"
          :width="500">
          <modal-header slot="header" :content="reportedId"></modal-header>
          <operate v-if="reportedModal" :type="'reported'" :operateUrl="reportedUrl" @operate="subCallback" @cancel="cancel" :operaility-data="reportedData"></operate>
          <div slot="footer"></div>
        </Modal>
        <!---->


      </div>
    </div>
  </div>
</template>

<script >
  /*当前组件必要引入*/
  //引入--修改--组件
  //引入--查看--组件
  import show from "./recommend_view.vue";
  //引入--添加--组件
  import add from "./recommend_add.vue";

  //引入--修改--组件
  import edit from "./recommend_edit.vue";


  //当前组件引入全局的util
  let Util=null;
  let store = null;
  export default{

    data() {
      return {

        //上报
        reportedUrl:'appraising/sellOneself/modifyExamineStatus/',

        reportedData:'',
        formValidate: {
          title: '',          //  标题
          roleId: '',           //对象
          status: '' ,         //项目状态
          startBeginDate: '' ,         //自荐开始时间开始时间
          startEndDate: ''  ,        //自荐开始时间结束时间
        },
        searchData:{title:'提交',callParEvent:'searchEvent'},
        /*--按钮button--*/
        showId:{
          id:'showId',
          title:'查看'
        },
        reportedId:{
          id:'reportedId',
          title:'上报'
        },
        addId:{
          id:'addId',
          title:'增加'
        },
        editId:{
          id:'editId',
          title:'修改'
        },

        addModal:false,
        reportedModal:false,
        recommendModal:false,
        operailityData:'',
        multipleSelection: [],
        //todo 因为设置高度有问题，所以写初始值300
        dynamicHt: 500,
        self: this,
        tableData: [
          {
            "id":"",
            "title":"",
            "roleId":"",
            "roleName":"",
            "startDate":"",
            "endDate":"",
            "status":""
          }
        ],
        loading:false,
        totalCount:0,
        listMessTitle:{
          ajaxSuccess:'updateListData',
          ajaxParams:{
            url:'appraising/project/sellOneself/list',
            params:{}
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
         curPage: 1,pageSize: Util.pageInitPrams.pageSize
        }

        this.setTableData();
      },

      //设置表格及分页的位置
      setTableDynHeight(){
        let nosocomial = this.$refs.nosocomial;
        let parHt = nosocomial.parentNode.offsetHeight;
        let nosocomialTable = this.$refs.nosocomialTable;
        let paginationHt = 50;
        this.dynamicHt = parHt - nosocomialTable.offsetTop - paginationHt;
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
        this.totalCount = responseData.totalCount;
        this.tableData = this.addIndex(responseData.data);
      },

      //请求数据
      setTableData(){
        let formValidate = this.formDate(this.getFormData(this.formValidate),['startEndDate','startBeginDate'],this.yearMonthData);
        this.listMessTitle.ajaxParams.params = Object.assign(this.listMessTitle.ajaxParams.params,this.queryQptions,formValidate);
        this.ajax(this.listMessTitle)
      },


      //搜索监听回调
      searchEvent(isLoading){
        //        isLoading(true);
        let isSubmit = this.handleSubmit('formValidate');
        if(isSubmit){
          this.setTableData()
        }
      },


      /*
       * 列表查询方法
       * @param string 查询from的id
       * */
      handleSubmit(name){
        let flag =false
        this.$refs[name].validate((valid) => {
          if (valid) {
            flag =true;
          } else {
            this.$Message.error('表单验证失败!');
          }
        })
        return flag
      },



      /*--点击--添加--按钮--
       * 只允许添加二级
       *
       * */
      add(data){
        this.operailityData =data;
        //如果是一级节点则返回，只添加二级节点
        this.openModel('add') ;
      },

      /*--点击--添加--按钮--
       * 只允许添加二级
       * */
      edit(data){
        this.operailityData =data;
        //如果是一级节点则返回，只添加二级节点
        this.openModel('edit') ;
      },



      reported(data){

        this.reportedData = data;
        this.reportedData.id = this.reportedData.sellOneselfId;
        this.openModel('reported')
      },


      /*
       * 点击--查看--按钮
       * @param index string|number  当前行索引
       * */
      show(data){
        this.operailityData =data;
        this.showModal = true;
      },


      /*
       * 点击--修改角色--按钮
       * @param index string|number  当前行索引
       * */
      recommend(data){
          this.operailityData = data;
          this.openModel('recommend')

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
      show,add,edit
    },
  }
</script>






