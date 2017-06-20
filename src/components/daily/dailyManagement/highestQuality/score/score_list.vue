<!--评分-->


<template>
  <div id="nosocomial" ref="nosocomial" class="modal">
    <div class="add-remove">
      <el-row >

        <el-col :span="10" :offset="8">
          <el-form ref="ruleForm" label-width="100px" class="demo-ruleForm">
            <el-form-item  prop="name">
              <el-input placeholder="输入栏目名称搜索">
                <el-button slot="append" icon="search"></el-button>
              </el-input>
            </el-form-item>
          </el-form>
        </el-col>
      </el-row >
    </div>
    <div
      id="nosocomialTable"
      ref="nosocomialTable"
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
          width="200"
          show-overflow-tooltip
        >
          <template scope="scope">
            <el-button
              size="small"
              type="info"
              @click="show(scope.row)">查看
            </el-button>
            <el-button
              size="small"
              type="warning"
              @click="score(scope.row)">评分
            </el-button>
            <el-button
              size="small"
              type="warning"
              @click="write(scope.row)">填写
            </el-button>
            <el-button
              size="small"
              type="warning"
              @click="reported(scope.row)">上报
            </el-button>
          </template>
        </el-table-column>
        <el-table-column
          prop="volunteSubject"
          label="姓名"
          align="center"
          show-overflow-tooltip
        >
        </el-table-column>
        <el-table-column
          prop="rewardDate"
          label="年纪"
          width="100"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          prop="rewardDate"
          label="班级"
          width="100"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          prop="rewardDate"
          label="评优项目"
          width="200"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          prop="rewardDate"
          label="个人预估"
          width="70"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          prop="rewardDate"
          label="得分"
          width="70"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          prop="rewardDate"
          label="状态"
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
      <div>
        <!--修改弹窗-->
        <Modal
          :mask-closable="false"
          v-model="scoreModal"
          height="200"
          title="对话框标题"
          class-name="vertical-center-modal"
          :width="800">
          <!--<div slot="header"> -->
          <!--</div>-->
          <modal-header slot="header" :content="scoreId"></modal-header>
          <score v-if="scoreModal"   @cancel="cancel"  @score="subCallback"  :operaility-data="operailityData"></score>
          <div slot="footer"></div>
        </Modal>

        <!---->
        <!--填写弹窗-->
        <Modal
          :mask-closable="false"
          v-model="writeModal"
          height="200"
          title="对话框标题"
          class-name="vertical-center-modal"
          :width="800">
          <!--<div slot="header"> -->
          <!--</div>-->
          <modal-header slot="header" :content="writeId"></modal-header>
          <write v-if="writeModal"   @cancel="cancel"  @write="subCallback"  :operaility-data="operailityData"></write>
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
          <operate v-if="reportedModal" :type="'reported'" :operateUrl="reportedUrl" @reported="subCallback" @cancel="cancel" :operaility-data="operailityData"></operate>
          <div slot="footer"></div>
        </Modal>
        <!---->
      </div>
    </div>
  </div>
</template>

<script >
  /*当前组审核件必要引入*/
  //引入----组件
  import score from "./score_score.vue";
  //引入--查看--组件
  import show from "./score_view.vue";
  //引入--填写--组件
  import write from "./score_write.vue";

  //当前组件引入全局的util
  let Util=null;
  let store = null;
  export default{

    data() {
      return {
        isRoot:true,
        //查询表单
        reportedUrl:'/role/remove',
        publishUrl:'/role/remove',
        deleteUrl:'/role/remove',
        revocationUrl:'/role/remove',
        formValidate: {
          name: '',
          pickerOptions0: '',
          status: ''
        },

        searchData:{title:'提交',callParEvent:'searchEvent'},
        /*--按钮button--*/
        addId:{
          id:'add',
          title:'添加'},
        removeId:{
          id:'remove',
          title:'删除'
        },
        scoreId:{
          id:'remove',
          title:'评分'
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
        reportedId:{
          id:'reportedId',
          title:'上报'
        },
        writeId:{
          id:'writeId',
          title:'填写'
        },
        publishModal:false,

        scoreModal:false,
        reportedModal:false,
        writeModal:false,
        revocationModal:false,
        operailityData:'',
        multipleSelection: [],
        dynamicHt: 100,
        self: this,
        tableData1: [{j:'1'}],
        loading:false,
        listTotal:0,
        listMessTitle:{
          ajaxSuccess:'listDataSuccess',
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
          url:this.listUrl,
          params:{curPage: 1,pageSize: Util.pageInitPrams.pageSize}
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
      listDataSuccess(res,m,loading){
        let  that = this
        let d = new Date()
        let t2 = d.getTime();
        let responseData = res.data;
        if(Util._.isObject(responseData["status"])&&responseData["status"]["code"]==0){
          let len = responseData.data.length;
          let data = responseData.data.splice(0,150);
          this.tableData1=[];
          data = that.addIndex(data);
          for(var i=0,n=0;i<data.length;i+=100,n++){
            setTimeout(()=>{
              that.tableData1= that.tableData1.concat(data.splice(0,100));
            },n*10)
          }
          that.listTotal = 1;
        }else {
          loading(false)
        }
      },
      setTableData(isLoading){
        this.ajax(this.listMessTitle,isLoading)
      },


      //搜索监听回调
      searchEvent(isLoading){
        isLoading(true);
        this.setTableData()
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


      /*--点击--添加--按钮--
       * 只允许添加二级
       * */
      add(){
        //如果是一级节点则返回，只添加二级节点
        this.openModel('add') ;
      },


      /*
      * 上报
      * */
      reported(){
        this.operailityData = this.multipleSelection;
        this.openModel('reported')
      },


      /*
      * 填写
      * */
      write(){
        this.operailityData = this.multipleSelection;
        this.openModel('write')
      },


      /*--点击--删除--按钮--*/
      remove(index){
        if(typeof index != 'number'){
          if(!this.isSelected(true)) return;
          this.operailityData = this.multipleSelection;
          this.openModel('remove')
        }else {
          this.operailityData = this.tableData1[index];
          this.openModel('remove')
        }
      },


      publish(){
        if(!this.isSelected(true)) return;
        this.operailityData = this.multipleSelection;
        this.openModel('publish')
      },


      /*
       * 点击--查看--按钮
       * @param index string|number  当前行索引
       * */
      show(index){
        this.operailityData = this.tableData1[index].id;
        this.showModal = true;
      },


      /*
       * 点击--修改角色--按钮
       * @param index string|number  当前行索引
       * */
      score(data){
        this.operailityData = data;
        this.openModel('score')
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
      show,score,write
    },
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







