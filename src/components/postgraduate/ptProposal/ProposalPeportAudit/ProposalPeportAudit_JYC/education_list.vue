<!----------------------------------
****--@name     开题申请审核
****--@role     导师、教研室秘书、教育处
****--@date     2017/7/10
****--@author   gx
----------------------------------->

<template>
  <div id="content" ref="content" class="modal">
    <el-form   :model="formValidate" :rules="rules" ref="formValidate"  inline label-width="100px">
      <el-row style="margin-bottom:0">
        <!--列表操作按钮-->
        <el-col :span="10" >
          <el-button type="primary" @click="pass">批量通过</el-button>
          <el-button type="danger" @click="reject">批量驳回</el-button>
        </el-col>
        <!--搜索项-->
        <el-col :span="14"  align="right">
          <el-form-item prop="name">
            <el-input style="width:300px;"   v-model="formValidate.name" placeholder="输入姓名搜索">
              <el-button @click="searchEvent"  slot="append"  icon="search"></el-button>
            </el-input>
          </el-form-item>
          <el-button :icon="searchMore ? 'arrow-down' : 'arrow-up'" @click="showSearchMore">筛选</el-button>
        </el-col>
      </el-row>
      <br>
      <!--高级搜索项-->
      <div v-show="searchMore" ref="searchMore">
        <el-form-item label="年级"  >
          <el-select filterable  v-model="formValidate.boundary" placeholder="请选择">
            <el-option label="全部" value=""></el-option>
            <el-option v-for="item in optionData" :key="item" :label="item" :value="item" ></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="学位类型" >
          <el-select filterable  v-model="formValidate.degree" placeholder="请选择">
            <el-option label="全部" value=""></el-option>
            <el-option label="学术学位" value="MAJOR"></el-option>
            <el-option label="专业学位" value="LEARNING"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="专业" >
          <el-select   v-model="formValidate.specialtyName" placeholder="请选择">
            <major></major>
          </el-select>
        </el-form-item>

        <el-form-item label="状态" prop="status" >
          <el-select filterable  v-model="formValidate.status" placeholder="请选择">
            <!--<el-option label="导师审核中" value="DSDSH"></el-option>-->
            <!--<el-option label="导师审核驳回" value="DSBH"></el-option>-->
            <!--<el-option label="教研室审核中" value="JYSDSH"></el-option>-->
            <!--<el-option label="教研室审核驳回" value="JYSBH"></el-option>-->
            <el-option label="全部" value="JYCDSH,JYCBH,TG"></el-option>
            <el-option label="待审核" value="JYCDSH"></el-option>
            <el-option label="不通过" value="JYCBH"></el-option>
            <el-option label="通过" value="TG"></el-option>
          </el-select>
        </el-form-item>
        <el-button type="info" @click="searchEvent">查询</el-button>
      </div>
    </el-form>

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
            type="selection"
            width="55">
          </el-table-column>
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
            show-overflow-tooltip
            align="center"
            label="开题申请文档"
            prop="fileId"
            width="200">
            <template scope="scope">
              <el-button size="small"  :disabled="scope.row.status != 'JYCDSH'"  @click="audit(scope.row)">审核</el-button>
            </template>
          </el-table-column>
          <el-table-column
            show-overflow-tooltip
            align="center"
            prop="name"
            label="姓名"
            width="200">
          </el-table-column>
          <el-table-column
            show-overflow-tooltip
            prop="boundary"
            label="性别"
            align="center">
          </el-table-column>
          <el-table-column
            show-overflow-tooltip
            prop="researchDirection"
            label="研究方向">
          </el-table-column>
          <el-table-column
            show-overflow-tooltip
            prop="topicName"
            label="课题名称">
          </el-table-column>
          <el-table-column
            show-overflow-tooltip
            prop="tutorName"
            label="导师姓名">
          </el-table-column>
          <el-table-column
            show-overflow-tooltip
            prop="groupMembers"
            label="小组成员">
          </el-table-column>
          <el-table-column
            show-overflow-tooltip
            prop="specialtyCode"
            label="专业代码">
          </el-table-column>
          <el-table-column
            show-overflow-tooltip
            prop="specialtyName"
            label="专业名称">
          </el-table-column>
          <el-table-column
            show-overflow-tooltip
            prop="status"
            label="状态">
            <template scope="scope">
              {{scope.row.status | education}}
            </template>
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
            :total="totalCount">
          </el-pagination>
        </div>
      </div>
    </div>

    <!--审核弹窗-->
    <Modal
      :mask-closable="false"
      width="1000"
      v-model="auditModal"
      title="查看档案管理弹窗"
      class-name="vertical-center-modal"
      :loading="loading">
      <modal-header slot="header" :content="auditId"></modal-header>
      <audit :peport="peport" :view="view" v-if="auditModal" @cancel="cancel" @audit="subCallback" :operaility-data="operailityData" :url="url"></audit>
      <div slot="footer"></div>
    </Modal>
    <!--批量通过-->
    <Modal
      width="500"
      v-model="passModal"
      title="查看档案管理弹窗"
      class-name="vertical-center-modal"
      :loading="loading">
      <modal-header slot="header" :content="passId"></modal-header>
      <operate v-if="passModal" :type="'pass'" :operate-url="url.diseaseRecordManageModifySubPass" :methods="'post'" :operateData="passData" @cancel="cancel" @operate="subCallback" :operaility-data="operailityData" ></operate>
      <div slot="footer"></div>
    </Modal>

    <!--批量驳回-->
    <Modal
      width="500"
      v-model="rejectModal"
      title="查看档案管理弹窗"
      class-name="vertical-center-modal"
      :loading="loading">
      <modal-header slot="header" :content="rejectId"></modal-header>
      <operate v-if="rejectModal" :type="'reject'" :operate-url="url.diseaseRecordManageModifySubReject" :operateData="rejectData" :methods="'post'"  @cancel="cancel" @operate="subCallback" :operaility-data="operailityData" ></operate>
      <div slot="footer"></div>
    </Modal>
  </div>
</template>
<script>
  /*当前组件必要引入*/
  import audit from "./education_audit.vue";
  import {proposalApplicationAuditList as rules} from '../../rules'
  import major from '../../../common/major.vue'

  //当前组件引入全局的util
  let Util=null;
  export default{
    props:['url','view','peport'],
    data() {
      return {
        rules,
        optionData:[],
        //查询表单
        listUrl:'/role/list?name=&identify=&type=',
        deleteUrl:'/role/remove',
        formValidate: {
          name: '',       //姓名
          boundary: '',//年级
          specialtyName: ''   ,  //专业
          degree: ''   ,  //学位类型
          status: 'JYCDSH'   ,  //状态
          applicantType:'ORDINARY',
        },
        style:{
          publish:false,
        },
        passData:{
          url:this.url.jycAudit.path,
          method:this.url.jycAudit.method,
          data:{status:'TG',jycAuditOpinion:'通过'}
        },
        rejectData:{
          url:this.url.jycAudit.path,
          method:this.url.jycAudit.method,
          data:{status:'JYCBH',jycAuditOpinion:'驳回'}
        },
        operailityData:'',
        multipleSelection: [],
        dynamicHt: 100,
        self: this,
        tableData: [],
        searchMore: false,
        auditModal: false,
        loading:false,
        passModal:false,
        rejectModal:false,
        totalCount:0,
        //当前组件默认请求(list)数据时,ajax处理的 基础信息设置
        listMessTitle:{
          paramsData:'listUrl',
          ajaxSuccess:'updateListData',
          ajaxParams:{
            url:this.url.auditList.path,
            params:{}
          }
        },
        /*--按钮button--*/
        addId:{id:'addId',title:'新建'},
        editId:{id:'editId',title:'修改'},
        removeId:{id:'removeId',title:'删除'},
        auditId:{id:'auditId',title:'审核'},
        reportedId:{id:'reportedId',title:'上报'},
        passId:{id:'passId',title:'通过'},
        rejectId:{id:'rejectId',title:'驳回'},
      }
    },
    methods: {
      //初始化请求列表数据
      init(){
        let year = new Date().getFullYear();
        let tempArr = []
        for(let i=0 ;i<4;i++){
          tempArr.push(year-i);
        }
        this.optionData = tempArr;



        if(this.view=='change'){
          this.formValidate.applicantType = 'CHANGE'
        }else if (this.view=='again'){
          this.formValidate.applicantType = 'AGAIN'
        }
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
        this.style = {publish:false};
        for(let i=0;i<val.length;i++){
          let item = val[i];
          if(item.publishStatus=='PUBLISH'){
            this.style.publish = true
          }
        }
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
        if(!responseData.data)return;
        this.tableData = this.addIndex(responseData.data);
        if(!responseData.totalCount) return;
        this.totalCount = responseData.totalCount;
      },
      setTableData(){
        let  formValidate = Util._.defaultsDeep({}, this.formValidate);
        formValidate.specialtyName = formValidate.specialtyName.split('-')[0];
        this.listMessTitle.ajaxParams.params = Object.assign(this.listMessTitle.ajaxParams.params,this.queryQptions,formValidate);
        this.ajax(this.listMessTitle);
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


      /*--点击--添加--按钮--*/
      add(){
        this.openModel("add");
      },
      /*--点击--发布--按钮--*/
      reported(data){
        this.operailityData = [data];
        this.openModel('reported')
      },
      /*--点击--修改--按钮--*/
      edit(data){
        this.operailityData = data;
        this.openModel("edit");
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
      audit(data){
        this.operailityData = data;
        this.openModel("audit");
      },

      /*--点击--批量通过--按钮--*/
      pass(){
        if(!this.isSelected()) return;
        this.operailityData = [];
        this.passData.data.ids =  this.assemblingId(this.multipleSelection);
        this.openModel('pass') ;
      },


      reject(){
        if(!this.isSelected()) return;
        this.operailityData = [];
        this.rejectData.data.ids =  this.assemblingId(this.multipleSelection);
        this.openModel('reject') ;
      },


      assemblingId(data){
        let myUrl = []
        for (var i = 0; i < data.length; i++) {
          myUrl.push(data[i].id);
        }
        return myUrl.join(',')
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


      // 高级搜索按钮展开搜索表单并重新计算表格高度
      showSearchMore() {
        this.searchMore = !this.searchMore;
        this.$nextTick(function () {
          this.setTableDynHeight()
        })
      },

//审核步骤
      auditStep(status){
        let obj = {
          'WSB':'-1',
          'DSDSH':'0',
          'DSBH':'1',
          'JYSDSH':'2',
          'JYSBH':'3',
          'JYCDSH':'4',
          'JYCBH':'5',
          'TG':'6',
          'MODIFY_END':'-1',
          'AGAIN_END':'-1',
        }
        return obj[status];

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
      audit,major
    }
  }
</script>

