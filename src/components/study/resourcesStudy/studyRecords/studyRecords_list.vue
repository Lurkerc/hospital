<!----------------------------------
****--学习记录(studyRecords_list)
****--@date     2017/8/7
****--@author   zyc<332533011@qq.com
----------------------------------->
<template>
<div id="content" ref="content" class="modal">
  <div class="listUpAreaBox" style="height: 38px">
    <div class="listUpArea-menus">
    </div>
    <div class="listUpArea-search">
      <div class="listUpArea-searchWrapper">
        <!--右侧查询-->
        <el-form ref="formValidate"  :inline="true" :model="formValidate" class="form-inline lose-margin" label-width="90px" >
          <div class="listUpArea-searchLeft">
            <!--<input class="hidden">-->
            <el-select v-model="formValidate.types" placeholder="请选择状态">
              <el-option label="全部" value=""></el-option>
              <el-option label="教学视频" value="VIDEO"></el-option>
              <el-option label="文档文献" value="LITERATURE"></el-option>
              <el-option label="典型病例" value="CASES"></el-option>
              <el-option label="医学图谱" value="ATLAS"></el-option>
            </el-select>
            <el-button @click="handleSubmit('formValidate')" slot="append" icon="search"></el-button>
            <!--<el-input placeholder="请输入内容" v-model="formValidate.title">-->
              <!--<div slot="prepend">资源名称</div>-->
              <!--<el-button @click="handleSubmit('formValidate')" slot="append" icon="search"></el-button>-->
            <!--</el-input>-->
          </div>
          <div class="listUpArea-moreSearch">
            <!--<el-button @click="showMoreSearch" type="text">高级查询</el-button>-->
          </div>
        </el-form>
      </div>
    </div>
  </div>
  <div v-if="isShowMoreSearch" class="listUpArea-moreSearchBox">
    <el-select v-model="formValidate.types" placeholder="请选择状态">
      <el-option label="全部" value=""></el-option>
      <el-option label="教学视频" value="VIDEO"></el-option>
      <el-option label="文档文献" value="LITERATURE"></el-option>
      <el-option label="典型病例" value="CASES"></el-option>
      <el-option label="医学图谱" value="ATLAS"></el-option>
    </el-select>
  </div>
  <br />
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
      style="width: 100%">
      <el-table-column
        label="序号"
        prop="index"
        width="70">
        <template scope="scope">{{scope.row.index}}</template>
      </el-table-column>
      <el-table-column
        prop="title"
        label="资源名称"
        align="center"
        width="200"
        show-overflow-tooltip>
        <template scope="scope">
          <el-button @click="show(scope.row)" type="text">{{scope.row.title}}</el-button>
        </template>
      </el-table-column>
      <el-table-column
        prop="types"
        label="资源类型">
        <template scope="scope">
          {{types[scope.row.types]}}
        </template>
      </el-table-column>
      <el-table-column
        prop="createTime"
        label="开始时间">
        <template scope="scope">
          {{scope.row.createTime | formatDate('yyyy-MM-dd HH:mm:ss')}}
        </template>
      </el-table-column>
      <el-table-column
        prop="updateTime"
        label="结束时间">
        <template scope="scope">
          {{scope.row.updateTime  | formatDate('yyyy-MM-dd HH:mm:ss')}}
        </template>
      </el-table-column>
      <el-table-column
        prop="status "
        label="状态">
        <template scope="scope">
          {{studyRecord[scope.row.status]}}
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
  <!--查看弹窗-->
  <Modal
    :mask-closable="false"
    v-model="showModal"
    height="200"
    title="对话框标题"
    class-name="vertical-center-modal"
    :loading="true"
    :width="1100"
  >
    <modal-header slot="header" :parent="self" :content="showId"></modal-header>
    <show v-if="showModal"  @cancel="cancel" :operaility-data="operailityData"></show>
    <div slot="footer"></div>
  </Modal>
</div>
</template>
<script>
/*当前组件必要引入*/
import api from "../api.js";
import show from './studyRecords_view.vue';
//当前组件引入全局的util
let Util = null;
export default{
  data() {
    return {
      api,
      types:api.types,
      studyRecord:api.studyRecord,
      formValidate: {
        "id":'',
        "title":"",
        "types":"",
        "createTime":"",
        "updateTime":"",
        "status":0
      },
      showId:{
        id:'auditId',
        title:'查看'
      },
      operailityData:'',
      multipleSelection:[],
      dynamicHt: 100,
      self: this,
      tableData1: [],
      loading:false,
      listTotal:0,
      listMessTitle:{
        ajaxSuccess:'updateListData',
        ajaxParams:{
          url:api.userHistoryInfo.path,
          params:{
            name:'',code:''
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


    //通过get请求列表数据
    updateListData(responseData){
      let data = responseData.data;
      this.tableData1=[];
      data = this.addIndex(data);
      this.tableData1= data;
      this.listTotal = responseData.totalCount || 0;
    },


    setTableData(params){
      this.setAjaxParams();
      this.ajax(this.listMessTitle);
    },


    //设置提交的参数
    setAjaxParams(){
      this.listMessTitle.ajaxParams.params = Object.assign(this.listMessTitle.ajaxParams.params,this.queryQptions.params,this.formValidate);
    },


    /*
     * 列表查询方法
     * @param string 查询from的id
     * */
    handleSubmit(name){
      this.setTableData();
    },


    /*
     * 点击--查看--按钮
     * @param index string|number  当前行索引
     * */
    show(data){
      this.operailityData = data;
      this.showModal = true;
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
    }
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
  components: {show}
}
</script>
