<!--请假条 列表-->
<template>
  <div id="content" ref="content" class="modal">
    <el-form ref="formValidate"  :inline="true" :model="formValidate" class="form-inline lose-margin" label-width="90px" >
      <el-row >
        <el-col :span="6">
          <el-form-item label="科室ID" prop="depId">
              <el-input v-model="formValidate.depId" placeholder="请输入"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="7">
          <el-form-item label="请假人ID" prop="applicantId">
              <el-input v-model="formValidate.applicantId" placeholder="请输入"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="请假类型" prop="leaveType">
              <el-input v-model="formValidate.leaveType" placeholder="请输入"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="5"   >
          <el-button type="primary"  @click="handleSubmit('formValidate')">&nbsp; 搜索 &nbsp;</el-button>
          <el-button type="primary" v-if="searchShow"  @click="handleExpand">&nbsp; {{searchContent}} &nbsp;</el-button>
        </el-col >
        <el-col :span="8" v-show="expand">
          <el-form-item label="开始时间">
            <el-date-picker  prop="beginDateBegin"
              v-model="formValidate.beginDateBegin"
              type="date"
              placeholder="选择日期"
              :picker-options="pickerOptions0"
              @change="handleStartTime"
            >
            </el-date-picker>
            到
            <el-date-picker  prop="beginDateEnd"
              v-model="formValidate.beginDateBegin"
              align="right"
              type="date"
              placeholder="选择日期"
              :picker-options="pickerOptions1"
              @change="handleEndTime">
            </el-date-picker>
          </el-form-item>
        </el-col>

        <el-col :span="8" v-show="expand">
          <el-form-item label="小时" prop="timeLength">
              <el-input v-model="formValidate.timeLength" placeholder="请输入"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="7" v-show="expand">
          <el-form-item label="请假事由" prop="explains">
              <el-input v-model="formValidate.explains" placeholder="请输入"></el-input>
          </el-form-item>
        </el-col>

        <el-col :span="7" v-show="expand">
          <el-form-item label="创建时间" prop="createTime">
              <el-input v-model="formValidate.createTime" placeholder="请输入"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="7" v-show="expand">
          <el-form-item label="修改时间" prop="updateTime">
              <el-input v-model="formValidate.updateTime" placeholder="请输入"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="7" v-show="expand">
          <el-form-item label="0.没有，1有" prop="isAttachment">
              <el-input v-model="formValidate.isAttachment" placeholder="请输入"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="7" v-show="expand">
          <el-form-item label="SXS实习生、YJS研究生、ZYY住院医、JXS进修生" prop="userType">
              <el-input v-model="formValidate.userType" placeholder="请输入"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="7" v-show="expand">
          <el-form-item label="0未删除，1删除" prop="isDelete">
              <el-input v-model="formValidate.isDelete" placeholder="请输入"></el-input>
          </el-form-item>
        </el-col>

      </el-row >
    </el-form>
    <div class="add-remove">
      <el-button  class="but-col"  @click="add"  type="primary">添加</el-button>
      <el-button class="but-col" @click="remove" type="danger">删除</el-button>
      <el-button  class="but-col"  type="primary">发布</el-button>
      <el-button  class="but-col"  type="warning">撤销</el-button>
    </div>
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
        <template scope="scope">
          <span>{{scope.row.index}}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="操作"
        align="center"
        width="150">
        <template scope="scope">
          <el-button
            size="small"
            @click="show(scope.$index,scope.row)">查看
          </el-button>
          <el-button
            size="small"
            @click="edit(scope.$index, scope.row)">修改
          </el-button>
        </template>
      </el-table-column>
      <el-table-column
        prop="depId"
        label="科室ID"
        align="center"
        width="250"
        show-overflow-tooltip>
      </el-table-column>
      <el-table-column
        prop="applicantId"
        label="请假人ID"
        align="center"
        width="250"
        show-overflow-tooltip>
      </el-table-column>
      <el-table-column
        prop="leaveType"
        label="请假类型（枚举：SHI.事假、BING.病假、SANG.丧假、CHAN产假、TAN探亲假、HUN婚假、OTHER其他...）"
        align="center"
        width="250"
        show-overflow-tooltip>
      </el-table-column>
      <el-table-column
        prop="beginDate"
        label="开始时间"
        align="center"
        width="250"
        show-overflow-tooltip>
      </el-table-column>
      <el-table-column
        prop="endDate"
        label="结束时间"
        align="center"
        width="250"
        show-overflow-tooltip>
      </el-table-column>
      <el-table-column
        prop="timeLength"
        label="小时"
        align="center"
        width="250"
        show-overflow-tooltip>
      </el-table-column>
      <el-table-column
        prop="explains"
        label="请假事由"
        align="center"
        width="250"
        show-overflow-tooltip>
      </el-table-column>
      <el-table-column
        prop="status"
        label="WSB.未上报、DSH.审核中(待审)、TG.通过、BTG.不通过、BH.驳回修改"
        align="center"
        width="250"
        show-overflow-tooltip>
      </el-table-column>
      <el-table-column
        prop="createTime"
        label="创建时间"
        align="center"
        width="250"
        show-overflow-tooltip>
      </el-table-column>
      <el-table-column
        prop="updateTime"
        label="修改时间"
        align="center"
        width="250"
        show-overflow-tooltip>
      </el-table-column>
      <el-table-column
        prop="isAttachment"
        label="0.没有，1有"
        align="center"
        width="250"
        show-overflow-tooltip>
      </el-table-column>
      <el-table-column
        prop="userType"
        label="SXS实习生、YJS研究生、ZYY住院医、JXS进修生"
        align="center"
        width="250"
        show-overflow-tooltip>
      </el-table-column>
      <el-table-column
        prop="isDelete"
        label="0未删除，1删除"
        align="center"
        width="250"
        show-overflow-tooltip>
      </el-table-column>
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
          :total="myPages.listTotal">
        </el-pagination>
      </div>
      <!--修改弹窗-->
      <Modal
        height="200"
        :mask-closable="false"
        v-model="editModal"
        title="对话框标题"
        class-name="vertical-center-modal"
        :loading="true"
        :width="1000">
        <!--<div slot="header"> -->
        <!--</div>-->
        <modal-header slot="header" :content="editId"></modal-header>
        <edit :edit="handleEdit" :edit-data="editData"></edit>
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
        :width="1100"
      >
        <!--<div slot="header"> -->
        <!--</div>-->
        <modal-header slot="header" :parent="self" :content="showId"></modal-header>
        <show @loading="showHidden"  @show="handleShow" :show-data="showData"></show>
        <div slot="footer"></div>
      </Modal>
      <!---->
      <!--增加弹窗-->
      <Modal
        close-on-click-modal="false"
        height="200"
        v-model="addModal"
        title="对话框标题"
        class-name="vertical-center-modal"
        :loading="loading"
        :width="1100  ">
        <!--<div slot="header"> -->
        <!--</div>-->
        <modal-header slot="header" :content="addId"></modal-header>
        <add ></add>
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
        <!--<div slot="header"> -->
        <!--</div>-->
        <modal-header slot="header" :content="removeId"></modal-header>
        <div class="remove">确定要删除吗？</div>

        <el-row >
          <el-col :span="10" :offset="14">
            <el-button  class="but-col" @click="removeConfirm" type="primary">确定</el-button>
            <el-button class="but-col"  @click="cancel('remove')" type="danger">取消</el-button>
          </el-col>
          </el-col >
        </el-row >
        <div slot="footer"></div>
      </Modal>
      <!---->
    </div>
  </div>
</template>
<script >
  import add from "./LeaveNote_add.vue";
  import show from "./LeaveNote_view.vue";
  import edit from "./LeaveNote_edit.vue";
  let Util=null;

  export default{
    data() {
      return {
        formValidate: {
         	depId:''
         	,
         	applicantId:''
         	,
         	leaveType:''
         	,
         	beginDateBegin:'',
         	beginDateEnd:''
         	,
         	endDateBegin:'',
         	endDateEnd:''
         	,
         	timeLength:''
         	,
         	explains:''
         	,
         	status:''
         	,
         	createTime:''
         	,
         	updateTime:''
         	,
         	isAttachment:''
         	,
         	userType:''
         	,
         	isDelete:''

        },
        options: [{
          value: '0',
          label: '待审核'
        }, {
          value: '1',
          label: '审核通过'
        }, {
          value: '2',
          label: '未审核'
        }],
        searchShow:false,
        searchContent:'',
        starTimes:'',
        endTimes:'',
        pickerOptions0: {
          //选择开始时间后设置结束日期的限制
          disabledDate:(time) => {
            if(this.endTimes!="") {
              return time.getTime() >= this.endTimes;
            }
          }
        },
        pickerOptions1: {
          //选择结束时间后设置开始日期的限制
          disabledDate:(time)=> {
            if(this.starTimes!="") {
              return time.getTime() <= this.starTimes;
            }
          }
        },
        value1:'',
        value2:'',
        editData: '',
        showData:'',
        addModal: false,
        editModal: false,
        showModal: false,
        removeModal: false,
        addId:{
          id:'add',
          title:'添加'},
        removeId:{
            id:'remove',
          title:'删除'
        },
        showId:{
          id:'show',
          title:'查看'
        },
        editId:{
          id:'edit',
          title:'修改'
        },

        multipleSelection: [],
        dynamicHt: 100,
        self: this,
        tableData1: [
          {
           	depId:'',
           	applicantId:'',
           	leaveType:'',
           	beginDate:'',
           	endDate:'',
           	timeLength:'',
           	explains:'',
           	status:'',
           	createTime:'',
           	updateTime:'',
           	isAttachment:'',
           	userType:'',
           	isDelete:''
          }
        ],
        loading:false,
        listTotal:0

      }
    },
    methods: {
      init(){
        Util = this.$util;
        //ajax请求参数设置
        this.listUrl = "/role/list";
        this.myPages =  Util.pageInitPrams;

        this.queryQptions = {
          url:this.listUrl,
          params:{curPage: 1,pageSize: Util.pageInitPrams.pageSize}
        }

        this.setTableData();
        this.expand = false;
        //搜索高级设置
        if(Util._.size(this.formValidate)>3){
          this.searchShow=true;
          this.searchContent='显示筛选';
        }else{
          this.searchShow=false;
        }
      },
        //时间
      deformatterDate(d){
        return new Date(d).getTime()-1000*60*60*24;
      },
      handleStartTime(d){
        this.starTimes = this.deformatterDate(d);
      },
      handleEndTime(d){
        this.endTimes = this.deformatterDate(d);
      },
      handleSelectionChange(val) {
        alert(val)
        this.multipleSelection = val;
      },

      setTableData(){
        let that = this;
        //处理服务数据
        let myPromise = Util.queryData(this.queryQptions)();
        myPromise.then(function (res) {
          let responseData = res.data;

          if(_.isObject(responseData["status"])&&responseData["status"]["code"]==0){
            that.tableData1 = that.addIndex(responseData.data);
            that.listTotal = responseData.totalCount||that.listTotal;
          }
        }).catch(function(response){
          if (response instanceof Error) {
            // 意外发生在设置要求引发一个错误
            console.log('Error', response.message);
          } else {
            // The request was made, but the server responded with a status code
            // that falls out of the range of 2xx
            console.log(response.data);
            console.log(response.status);
            console.log(response.headers);
            console.log(response.config);
          }
        })
      },
      changePageSize (n){
        this.queryQptions.params.pageSize = n;
        this.setTableData();
      },
      addIndex(data){
        let arr = []
        for(let i=0,length=data.length;i<length;i++){
          data[i].index = (this.queryQptions.params.curPage-1)*this.queryQptions.params.pageSize+i+1;

          arr.push(data[i])
        }
        return arr
      },
      changePage (n) {
        // 这里直接更改了模拟的数据，真实使用场景应该从服务端获取数据
        this.queryQptions.params.curPage = n;
        this.setTableData();
      },
      handleSubmit(name){
        //查询
        this.$refs[name].validate((valid) => {
          if (valid) {
            this.$Message.success('提交成功!');
          } else {
            this.$Message.error('表单验证失败!');
          }
        })
      },
      handleExpand(){
        this.expand = !this.expand;
        let searchContent = ['显示筛选','隐藏筛选'];
        let content = this.expand?1:0 ;
        this.searchContent = searchContent[content];
      },
      add(index){
          this.addModal = true;
      },
      edit(index){
        this.editData = this.tableData1[index];

        this.editModal = true;
      },
      handleEdit(data){
        console.log(data)
      },
      show(index){

        this.showData =this.tableData1[index].id
        this.showModal = true;
      },
      handleShow(data){
        this.showModal = false
      },
      remove(){

          this.removeModal = true;
      },
      removeConfirm(){
        alert('删除成功')
        this.removeModal = false;
      },
      cancel(targer){
        this[targer+'modal'] = false;
      },
      handleNewspapers(){


      },
//      remove(){
//        let arr = this.multipleSelection;
//        let arrId = []
//        for(let i=0;i<arr.length;i++){
//          arrId.push(arr[i].id)
//        }
//        alert(arrId)
//
//      },
      showHidden(status){
        this.loading = !!status
      }
    },
    created(){

      this.init();
    },
    mounted(){
      let content = this.$refs.content;
      let parHt = content.parentNode.offsetHeight;
      let myTable = this.$refs.myTable;
      this.dynamicHt = parHt - 170;
    },
    components:{
      show,edit,add
    },
    watch:{
//      showData(){
//        this.loading=true;
//      }
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
