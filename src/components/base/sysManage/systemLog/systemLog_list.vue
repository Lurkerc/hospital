<!--系统日志-->

<template>
  <div id="content"  ref="content"  class="modal">
    <div class="listUpAreaBox">
      <div class="listUpArea-menus">
        <div class="add-remove">
          <el-button class="but-col" @click="derive" type="primary">导出</el-button>
        </div>
      </div>
      <div class="listUpArea-search">
        <div class="listUpArea-searchWrapper">
          <!--右侧查询-->
          <el-form ref="formValidate"  :inline="true" :model="formValidate" class="form-inline lose-margin" label-width="60px" >
            <div class="listUpArea-searchLeft">
              <input class="hidden">
              <el-input placeholder="请输入内容" v-model="formValidate.name">
                <div slot="prepend">姓名</div>
                <el-button @click="handleSubmit('formValidate')" slot="append" icon="search"></el-button>
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
    <div>
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
            align="center"
            prop="userName"
            label="操作人"
            width="120">
          </el-table-column>
          <el-table-column
            prop="userName"
            label="操作"
            width="120">
          </el-table-column>
          <el-table-column
            prop="userName"
            label="模块"
            align="center"
            width="120"

          >
          </el-table-column>
          <el-table-column
            prop=""
            label="子模块"
            width="120"
          >
          </el-table-column>
          <el-table-column
            prop="userName"
            label="操作对象"
            width="120"
          >
          </el-table-column>
          <el-table-column
            prop="userName"
            label="部门"
            width="120"
          >
          </el-table-column>
          <el-table-column
            prop="userName"
            label="账号"
            width="120"
          >
          </el-table-column>
          <el-table-column
            prop="userName"
            label="ip"
            width="120"
          >
          </el-table-column>
          <el-table-column
            prop=""
            label="操作时间"

          >
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
      </div>
    </div>

  </div>


</template>
<script >

  //当前组件引入全局的util
  let Util=null;

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
        addData:'',
        editData: '',
        showData:'',
        auditData:'',
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
        jurisditionId:{
          id:'jurisdition',
          title:'分配人员'
        },
        personId:{
          id:'edit',
          title:'分配权限'
        },

        operailityData:'',
        multipleSelection: [],
        dynamicHt: 100,
        self: this,
        tableData1: [],
        loading:false,
        listTotal:0,
        listMessTitle:{
          ajaxSuccess:'listDataSuccess',
          ajaxParams:{
            url:'/role/list',
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
          curPage: 1,pageSize: Util.pageInitPrams.pageSize
        }

        this.setTableData();
        //console.log(  this.queryQptions);
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
      listDataSuccess(res){
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
        }
      },
      setTableData(){
        this.listMessTitle.ajaxParams.params =  Object.assign({},this.listMessTitle.ajaxParams.params,this.formValidate)
        this.ajax(this.listMessTitle)
      },
      /*
       * 列表查询方法
       * @param string 查询from的id
       * */
      handleSubmit(name){
        this.setTableData()
      },

      //导出
      derive(){

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
    }


  }
</script>




