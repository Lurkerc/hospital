<template>
  <div ref="content">
    <el-row >
      <el-col :span="20"  :offset="1">
        <el-form  ref="formValidate" inline label-width="100px" class="demo-ruleForm">
          <el-form-item  prop="title">
            <el-input   v-model="formValidate.name" placeholder="输入姓名搜索">
            </el-input>
          </el-form-item>
          <el-form-item  prop="title">
            <el-input   v-model="formValidate.appraiser" placeholder="输入被评名称搜索">
            </el-input>
          </el-form-item>
          <!--<el-form-item  prop="title">-->
          <!--<el-input   v-model="formValidate.userName" placeholder="输入类型搜索">-->

          <!--</el-input>-->
          <!--</el-form-item>-->
          <el-button @click="searchEvent"   icon="search"></el-button>
        </el-form>
      </el-col>

    </el-row>
    <div class="add-remove">
      <el-button  class="but-col" @click="add" type="primary">新建评价</el-button>&nbsp;
      <el-button   type="primary" @click="publish">发布</el-button>
      <el-button  class="but-col" @click="remove" type="primary">删除</el-button>
      <el-button   type="primary">导出word</el-button>

    </div>
    <div
      id="myTable"
      ref="myTable">
      <el-table
        :data="tableData"
        border
        :height="dynamicHt"
        tooltip-effect="dark"
        style="width: 100%"
        @selection-change="handleSelectionChange">
        <el-table-column
          type="selection"
          width="55">
        </el-table-column>
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
              @click="show(scope.row)">查看</el-button>
            <el-button
              size="small"
              @click="edit(scope.row)">修改</el-button>
          </template>
        </el-table-column>
        <el-table-column
          label="类别"
          width="150"
          prop="type">
        </el-table-column>
        <el-table-column
          prop="name"
          label="名称"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          prop="score"
          label="评价时间"
          width="150"
          show-overflow-tooltip>
          <template scope="scope">
            {{conductDateType(scope.row)}}
          </template>
        </el-table-column>
        <el-table-column
          prop="appraiser"
          label="评价人"
          width="150"
        >
        </el-table-column>
        <el-table-column
          prop="evaluated"
          label="被评价人"
          width="150"

        >
        </el-table-column>
        <el-table-column
          prop="publishStatus"
          label="是否发布"
          width="100"
        >
          <template scope="scope">
            {{scope.row.publishStatus | typeText}}
          </template>
        </el-table-column>
        <!--<el-table-column-->
          <!--prop="score"-->
          <!--label="是否默认"-->
          <!--width="150"-->
        <!--&gt;-->
        <!--</el-table-column>-->

      </el-table>
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
      </div>
    </div>
    <div>

      <!--<Modal-->
        <!--:mask-closable="false"-->
        <!--v-model="editTypeModal"-->
        <!--height="200"-->
        <!--title="对话框标题"-->
        <!--class-name="vertical-center-modal"-->
        <!--:width="1100">-->
        <!--&lt;!&ndash;<div slot="header"> &ndash;&gt;-->
        <!--&lt;!&ndash;</div>&ndash;&gt;-->
        <!--<modal-header slot="header" :content="editTypeId"></modal-header>-->
        <!--<edit-type v-if="editTypeModal"   @cancel="cancel" :url="url"  @editType="treeSubCallback" :operaility-data="treeOperailityData"></edit-type>-->
        <!--<div slot="footer"></div>-->
      <!--</Modal>-->
      <!---->

      <!--新建类型弹窗-->
      <Modal
        :mask-closable="false"
        v-model="addModal"
        height="200"
        title="对话框标题"
        class-name="vertical-center-modal"
        :width="1000">
        <!--<div slot="header"> -->
        <!--</div>-->
        <modal-header slot="header" :content="addId"></modal-header>
        <add v-if="addModal"  @cancel="cancel" :url="url" @add="subCallback" ></add>
        <div slot="footer"></div>
      </Modal>
      <!--修改弹窗-->
      <Modal
        :mask-closable="false"
        v-model="editModal"
        height="200"
        title="对话框标题"
        class-name="vertical-center-modal"
        :width="1000">
        <!--<div slot="header"> -->
        <!--</div>-->
        <modal-header slot="header" :content="editId"></modal-header>
        <edit v-if="editModal"  @cancel="cancel" :url="url" @edit="subCallback" :operaility-data="operailityData"></edit>
        <div slot="footer"></div>
      </Modal>

      <!--查看弹窗-->
      <Modal
        :mask-closable="false"
        v-model="showModal"
        height="200"
        title="对话框标题"
        class-name="vertical-center-modal"
        :width="1000">
        <!--<div slot="header"> -->
        <!--</div>-->
        <modal-header slot="header" :content="viewId"></modal-header>
        <show v-if="showModal"  @cancel="cancel" :url="url" @showModal="subCallback" :operaility-data="operailityData"></show>
        <div slot="footer"></div>
      </Modal>

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
        <remove v-if="removeModal" :delete-url="url.activityRemove" @remove="subCallback" @cancel="cancel" :operaility-data="operailityData"></remove>
        <div slot="footer"></div>
      </Modal>

      <!--发布-->
      <Modal
        close-on-click-modal="false"
        height="200"
        v-model="publishModal"
        title="对话框标题"
        class-name="vertical-center-modal"
        :loading="loading"
        :width="500">
        <modal-header slot="header" :content="publishId"></modal-header>
        <operate v-if="publishModal" :type="'publish'" :operate-url="url.activityPublish" @operate="subCallback" @cancel="cancel" :operaility-data="operailityData"></operate>
        <div slot="footer"></div>
      </Modal>


    </div>
  </div>
</template>
<script>
  /*当前组件必要引入*/
  import url from '../app'
  /*---引入--新建-- */
  import  add from './evaluationActivitySet_add.vue'
  /*---引入--新建-- */
  import  edit from './evaluationActivitySet_edit.vue'
  /*---引入--新建-- */
  import  show from './evaluationActivitySet_view.vue'
  let Util=null;
  export default {
    data() {
      return {
        treeData: [],
        defaultProps: {
          children: 'children',
          label: 'name'
        },
        formValidate:{
          name:'',        //名称
          appraiser:"",   //评价对象
          evaluated:"",   //被评对象
          publishStatus:"",   //发布状态
          sortby:"",   //评价对象name 按照名称进行排序 type 按照类别进行排序
          order:"",   //升序、降序
        },
        //查询项
        url:url,
        /*--按钮button--*/
        //表格数据
        loading:false,
        tableData: [],
        selectTreeData:[],
        dynamicHt:100,
        totalCount:0,
        operailityData:'',
        multipleSelection: [],

        publishModal:false,
        /*--按钮button--*/
        addId:{id:'add',title:'添加'},
        editId:{id:'edit',title:'修改'},
        viewId:{id:'view',title:'查看'},
        removeId:{id:'remove',title:'删除'},
        publishId:{id:'publishId',title:'发布'},
        //当前组件默认请求(list)数据时,ajax处理的 基础信息设置
        listMessTitle: {
          ajaxSuccess: 'updateList',
          ajaxParams: {
            url: url.activityQuery,
            params: {},
          }
        },

      };

    },
    created(){
      this.init()
      this.updateList()//todo 模拟成功
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
        let paginationHt = 50;
        this.dynamicHt = parHt - myTable.offsetTop - paginationHt;
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
          responseData={
            "status":{
              "code":"0",
              "msg":""
            },
            "totalCount":100,
            "data":[
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
                "evaluated":"",
                "evaluatedCount":"",
                "counts":"",
                "dateType":"",
                "startDay":"",
                "endDay":"",
                "startDate":"",
                "endDate":"",
                "publishStatus":"",
                "createTime":"",
                "updateTime":""
              },
              {
                "id":110,
                "type":"教评学",
                "name":"我是一个活动",
                "relationship":"",
                "loopType":"",
                "appraiserType":"",
                "appraiser":"",
                "appraiserCount":"",
                "evaluatedType":"",
                "evaluated":"",
                "evaluatedCount":"",
                "counts":"",
                "dateType":"",
                "startDay":"",
                "endDay":"",
                "startDate":"",
                "endDate":"",
                "publishStatus":"",
                "createTime":"",
                "updateTime":""
              }
            ]
          }
        let data = responseData.data;
        if(!data) return;
        this.tableData = data;
        this.totalCount = responseData.totalCount || 0;
      },
      setTableData(){
        this.listMessTitle.ajaxParams.params = Object.assign(this.listMessTitle.ajaxParams.params,this.queryQptions,this.formValidate);
        this.ajax(this.listMessTitle);
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
        if(!this.isSelected()) return;
        this.operailityData = this.multipleSelection;
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

      //左侧类型事件
      typeAdd(){
        this.openModel('addType')
      },
      typeEdit(){
        this.openModel('editType')
      },
      typeRemove(){
        this.openModel('removeType')
      },

      //获取到选择的node对象
      getNode(flag){
        let tempArr = this.$refs.tree.getCheckedNodes();
        if(flag){
          if(tempArr.length>1){
            this.showMess('只能选择一条数据');
            return false
          }else if(tempArr.length==0){
            this.showMess('至少选择一条数据');
            return false
          }

        }
        return tempArr
      },


      removeTypecancel(){


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
      add,edit,show
    }
  };
</script>
