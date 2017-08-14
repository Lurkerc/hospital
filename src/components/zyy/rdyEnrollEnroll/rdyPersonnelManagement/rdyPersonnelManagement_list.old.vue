<!-- 住院医 - 报名招录 - 人员管理 -->
<template>
  <layout-tree class="defined-t">
    <left-tree slot="left" :clickAddChange="clickAddChange" @setCurrSltNodeId="setTreeDepId" @clickAdd="handleAdd" @tree-click="treeClick"
      @tree-remove-node="treeRemoveNode" :treeOptions="treeDefaults" :fromWhereTreeType="fromWhereTree"></left-tree>
    <div slot="right" id="content" ref="content" class="modal">
      <div class="listUpAreaBox">
        <div class="listUpArea-menus">
          <div class="add-remove">
            <el-button class="but-col" @click="add" type="primary">添加</el-button>
            <el-button class="but-col" @click="reset" type="danger">重置密码</el-button>
            <el-button class="but-col" @click="toChannel" type="primary">导入</el-button>
            <el-button class="but-col" @click="derive" type="primary">导出</el-button>
            <el-button class="but-col" @click="shortNote" type="primary">短信通知</el-button>
          </div>
        </div>
        <div class="listUpArea-search">
          <div class="listUpArea-searchWrapper">
            <!--右侧查询-->
            <el-form ref="formValidate" :inline="true" :model="formValidate" class="form-inline lose-margin" label-width="60px">
              <div class="listUpArea-searchLeft">
                <input class="hidden">
                <el-input placeholder="请输入内容" v-model="formValidate.name">
                  <div slot="prepend">姓名</div>
                  <el-button slot="append" @click="handleSubmit('formValidate')" icon="search"></el-button>
                </el-input>
              </div>
              <div class="listUpArea-moreSearch">
                <el-button @click="showSearchMore" type="text">高级查询</el-button>
              </div>
            </el-form>
          </div>
        </div>
      </div>
      <div v-if="searchMore" class="listUpAreaMoreSearchBox" ref="searchMore">
        <el-form :inline="true">
          <el-form-item label="姓名：">
            <el-input v-model="formValidate.name"></el-input>
          </el-form-item>
          <el-form-item label="性别：">
            <el-select v-model="formValidate.sex" filterable clearable placeholder="请选择" style="width:175px;" class="nation">
              <el-option v-for="(item,index) in sexOption" :key="index" :label="item.label" :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="手机号：">
            <el-input v-model="formValidate.mobile"></el-input>
          </el-form-item>
          <el-form-item label="邮箱：">
            <el-input v-model="formValidate.email"></el-input>
          </el-form-item>
          <el-form-item label="身份证：">
            <el-input v-model="formValidate.idNumber"></el-input>
          </el-form-item>
          <el-form-item label="年级：">
            <el-input v-model="formValidate.grade"></el-input>
          </el-form-item>
          <el-form-item label="班级：">
            <el-input v-model="formValidate.classNum"></el-input>
          </el-form-item>
          <el-form-item label="审核状态：">
            <el-select v-model="formValidate.auditStatus" filterable clearable placeholder="请选择" style="width:175px;" class="nation">
              <el-option v-for="(item,index) in auditStatusOption" :key="index" :label="item.label" :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-button type="info" @click="search">查询</el-button>
        </el-form>
      </div>
      <div id="myTable" ref="myTable" class="userDataTable">
        <el-table ref="multipleTable" align="center" :height="tabHeight" :context="self" :data="tableData1" tooltip-effect="dark"
          style="width: 100%" @selection-change="handleSelectionChange">
          <el-table-column type="selection" width="55">
          </el-table-column>
          <el-table-column label="序号" prop="index" width="70"></el-table-column>
          <el-table-column label="操作" align="center" width="200">
            <template scope="scope">
              <el-button size="small" @click="show(scope.$index,scope.row)">查看
              </el-button>
              <el-button size="small" @click="edit(scope.$index, scope.row)">修改
              </el-button>
              <el-button size="small" v-if="scope.row.account.enable" class="but-col" @click="forbidden(scope.$index, scope.row)" type="danger">禁用</el-button>
              <el-button size="small" v-if="!scope.row.account.enable" class="but-col" @click="startUsing(scope.$index, scope.row)">启用</el-button>
            </template>
          </el-table-column>
          <el-table-column prop="name" label="姓名" align="center" width="200"></el-table-column>
          <el-table-column prop="school.name" label="学校" show-overflow-tooltip></el-table-column>
          <el-table-column prop="specialty" label="专业" show-overflow-tooltip></el-table-column>
          <el-table-column prop="mobile" label="手机号" show-overflow-tooltip></el-table-column>
          <el-table-column prop="email" label="邮箱" show-overflow-tooltip></el-table-column>
        </el-table>
      </div>
      <div style="margin: 10px;">
        <div style="float: right;">
          <el-pagination @size-change="changePageSize" @current-change="changePage" :current-page="myPages.currentPage" :page-sizes="myPages.pageSizes"
            :page-size="myPages.pageSize" layout="total, sizes, prev, pager, next, jumper" :total="listTotal">
          </el-pagination>
        </div>
      </div>
      <!--弹窗-->
      <div>
        <!--修改弹窗-->
        <Modal :mask-closable="false" v-model="editModal" height="200" class-name="vertical-center-modal" :width="1000">
          <modal-header slot="header" :content="editId"></modal-header>
          <edit v-if="editModal" @cancel="cancel" @edit="subCallback" :operaility-data="operailityData"></edit>
          <div slot="footer"></div>
        </Modal>
        <!--增加弹窗-->
        <Modal :mask-closable="false" v-model="addModal" height="200" class-name="vertical-center-modal" :width="1000">
          <modal-header slot="header" :content="addId"></modal-header>
          <add v-if="addModal" @cancel="cancel" @add="subCallback" :operailityData="operailityData"></add>
          <div slot="footer"></div>
        </Modal>
        <!--查看弹窗-->
        <Modal :mask-closable="false" v-model="showModal" height="200" class-name="vertical-center-modal" :width="1000">
          <modal-header slot="header" :parent="self" :content="showId"></modal-header>
          <show v-if="showModal" @cancel="cancel" :operaility-data="operailityData" studentType="ZYY"></show>
          <div slot="footer"></div>
        </Modal>
        <!--删除弹窗-->
        <Modal :mask-closable="false" close-on-click-modal="false" height="200" v-model="removeModal" class-name="vertical-center-modal"
          :width="500">
          <modal-header slot="header" :content="removeId"></modal-header>
          <remove v-if="removeModal" :deleteUrl="deleteUrl" @remove="subCallback" @cancel="cancel" :operaility-data="operailityData"></remove>
          <div slot="footer"></div>
        </Modal>
        <!--导入弹窗-->
        <Modal :mask-closable="false" close-on-click-modal="false" height="200" v-model="toChannelModal" class-name="vertical-center-modal"
          :width="800">
          <modal-header slot="header" :content="toChannelId"></modal-header>
          <toChannel v-if="toChannelModal" :deptId="deptId" @toChannel="subCallback" @cancel="cancel" :operaility-data="operailityData"></toChannel>
          <div slot="footer"></div>
        </Modal>
        <!--导出弹窗-->
        <Modal :mask-closable="false" close-on-click-modal="false" height="200" v-model="deriveModal" class-name="vertical-center-modal"
          :width="500">
          <modal-header slot="header" :content="deriveId"></modal-header>
          <div>
            <div class="remove">确认导出吗</div>
            <el-row>
              <el-col :span="10" :offset="14">
                <a :href="'/api/user/export/'+deptId">
                  <el-button @click="affirmDerive" type="primary">确定</el-button>
                </a>
                <el-button class="but-col" @click=" deriveModal=false">取消</el-button>
              </el-col>
              </el-col>
            </el-row>
          </div>
          <div slot="footer"></div>
        </Modal>
        <!--短信通知弹窗-->
        <Modal :mask-closable="false" close-on-click-modal="false" height="200" v-model="shortNoteModal" class-name="vertical-center-modal"
          :width="800">
          <modal-header slot="header" :content="shortNoteId"></modal-header>
          <shortNote v-if="shortNoteModal" @shortNote="subCallback" @cancel="cancel" :operaility-data="operailityData"></shortNote>
          <div slot="footer"></div>
        </Modal>
      </div>
    </div>
  </layout-tree>
</template>
<style>
  .defined-t .el-select .el-input {
    width: 110px;
  }

</style>
<script>
  /*当前组件必要引入*/
  //引入--修改--组件
  import edit from "./rdyPersonnelManagement_edit";
  //引入--查看--组件
  import show from "../../../base/sysManage/departmentStaff/departmentStaff_view";
  //引入--添加--组件
  import add from "./rdyPersonnelManagement_add";
  //引入--导入--组件
  import toChannel from "../../../intern/recruitStudent/usersManagement/usersManagement_toChannel";
  //引入--短信通知--组件
  import shortNote from "../../../intern/recruitStudent/usersManagement/usersManagement_shortNote";

  import layoutTree from "../../../common/layoutTree";
  import leftTree from "../../../intern/recruitStudent/usersManagement/tree/leftTree";

  import sexOption from '../../../intern/recruitStudent/usersManagement/sexOption'; // 性别
  import auditStatusOption from '../../../intern/recruitStudent/usersManagement/auditStatusOption'; // 审核状态

  //当前组件引入全局的util
  let Util = null;
  let store = null;
  export default {
    data() {
      return {
        sexOption,
        auditStatusOption,
        //tree默认项设置
        treeDefaults: {
          getTreeUrl: "/dept/tree-by-ZYY",
          getDataUrl: '',
          isShowMenus: true,
        },
        fromWhereTree: "user",

        //查询表单
        deleteUrl: '/role/remove',
        //禁用
        isUsing: true,
        forbiddenUrl: '/account/disEnable',
        usingUrl: '/account/enable',
        formValidate: {
          name: '', // 按照姓名模糊查询
          sex: '', // 性别
          mobile: '', // 手机号
          email: '', // 邮箱
          idNumber: '', // 身份号
          grade: '', // 年级
          classNum: '', // 班级
          auditStatus: '', // 审核状态
        },
        gender: [{
          value: '0',
          label: '男'
        }, {
          value: '1',
          label: '女'
        }],
        /*--按钮button--*/
        addId: {
          id: 'add',
          title: '添加'
        },
        removeId: {
          id: 'remove',
          title: '删除'
        },
        forbiddenId: {
          id: 'forbidden',
          title: '禁用'
        },
        editId: {
          id: 'edit',
          title: '修改'
        },
        auditId: {
          id: 'auditId',
          title: '审核'
        },
        showId: {
          id: 'auditId',
          title: '查看'
        },
        toChannelId: {
          id: 'toChannelId',
          title: '导入'
        },
        shortNoteId: {
          id: 'shortNoteId',
          title: '短信通知'
        },
        deriveId: {
          id: 'deriveId',
          title: '导出'
        },
        //点击add按钮,值发生改变
        clickAddChange: false,
        //当前tree选中的node id
        deptId: '',

        searchMore: false,
        deriveModal: false,
        toChannelModal: false,
        shortNoteModal: false,
        operailityData: '',
        multipleSelection: [],
        dynamicHt: 100,
        tabHeight: 100,
        self: this,
        tableData1: [],
        loading: false,
        listTotal: 0,

        //初始化加载页面信息
        listMessTitle: {
          ajaxSuccess: 'updateListData',
          ajaxParams: {
            url: '/user/search-all',
            params: {}
          }
        },

      }
    },
    methods: {
      //初始化请求列表数据
      init() {
        Util = this.$util;
        //ajax请求参数设置
        this.myPages = Util.pageInitPrams;

        this.queryQptions = {
          //url:this.listUrl,
          params: {
            curPage: 1,
            pageSize: Util.pageInitPrams.pageSize
          }
        }
      },

      //设置表格及分页的位置
      setTableDynHeight() {
        let content = this.$refs.content;
        let parHt = content.parentNode.offsetHeight;
        let myTable = this.$refs.myTable;
        let paginationHt = 50;
        this.dynamicHt = parHt - myTable.offsetTop - paginationHt;
        this.tabHeight = parHt - myTable.offsetTop - paginationHt;
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
      isSelected(isOnly) {
        let len = this.multipleSelection.length;
        let flag = true;
        if (len == 0) {
          this.showMess("请选择数据!");
          flag = false;
        }
        if (len > 1 && isOnly) {
          this.showMess("只能修改一条数据!")
          flag = false;
        }
        return flag;
      },


      //通过get请求列表数据并渲染表格数据
      updateListData(responseData) {
        let data = responseData.data;
        this.tableData1 = [];
        data = this.addIndex(data);
        this.tableData1 = data;
        this.listTotal = responseData.totalCount || 0;
      },


      //初始化加载列表数据
      setTableData() {
        this.setAjaxParams();
        this.postParamToServer();
      },

      //设置提交的参数
      setAjaxParams() {
        this.listMessTitle.ajaxParams.params = Object.assign(this.listMessTitle.ajaxParams.params, this.queryQptions.params,
          this.formValidate);
      },


      //向服务器发送数据
      postParamToServer() {
        let options = Util._.defaultsDeep({}, this.listMessTitle);
        if (this.deptId != "") {
          options["ajaxParams"]["params"]["deptIds"] = this.deptId;
        }
        this.ajax(options);
      },


      /*
       * 列表查询方法
       * @param string 查询from的id
       * */
      handleSubmit(name) {
        this.setTableData();
      },


      /*--点击--添加--按钮--*/
      add() {
        this.clickAddChange = !this.clickAddChange
      },

      // 搜索
      search() {
        this.setTableData();
      },

      // 高级搜索按钮
      showSearchMore() {
        this.searchMore = !this.searchMore;
        this.$nextTick(function () {
          if (this.searchMore) {
            this.tabHeight = this.dynamicHt - this.$refs.searchMore.offsetHeight;
          } else {
            this.tabHeight = this.dynamicHt
          }
        })
      },

      /*
       * 未分配可管理的部门
       * @return flag blooean
       * */
      undistributedDep() {
        return true
        let flag = true;
        if (this.deptId == "") {
          this.showMess("还没有给您分配部门管理员!暂无部门可管理!");
          flag = false;
        }
        return flag
      },


      handleAdd(isSltedTreeNode) {
        if (!this.undistributedDep()) return;
        let isSltedTree = this.isSltedTree(isSltedTreeNode);
        if (isSltedTree) {
          this.operailityData = {
            deptId: this.deptId
          };
          this.openModel('add');
        } else {
          this.$message.error("请选择相应部门目录!")
        }
      },


      /*--点击--删除--按钮--*/
      remove() {
        if (!this.isSelected()) return;
        this.operailityData = this.multipleSelection;
        this.openModel('remove');
      },


      /*
       * 点击--查看--按钮
       * @param index string|number  当前行索引
       * */
      show(index) {
        this.operailityData = this.tableData1[index];
        this.showModal = true;
      },


      /*
       * 点击--修改角色--按钮
       * @param index string|number  当前行索引
       * */
      edit(index) {
        if (typeof index == 'undefined') {
          if (!this.isSelected(true)) return;
          this.operailityData = this.multipleSelection[0];
          this.openModel('edit')
        } else {
          this.operailityData = this.tableData1[index];
          this.openModel('edit')
        }
      },


      //禁用
      forbidden(index) {
        this.$Modal.confirm({
          title: '禁用',
          content: '<p>您确定要禁用该账户吗</p>',
          loading: true,
          onOk: () => {
            let rowData = this.tableData1[index];
            let ids = "",
              tempArr = [];

            /*if(this.multipleSelection.length>1){
              for(var i=0,item;i<this.multipleSelection.length;i++){
                item=this.multipleSelection[i];
                tempArr.push(item.id);
              }
              ids = tempArr.join(",");
            }else{
              ids = rowData.id;
            }*/
            ids = rowData.id;


            //初始化加载页面信息
            let resetTitle = {
              ajaxSuccess: (res) => {
                this.$Modal.remove();
                this.successMess('禁用成功!');
                rowData["account"]['enable'] = false;
              },
              errorTitle: '禁用失败!',
              ajaxParams: {
                url: '/account/disEnable/' + ids,
                method: 'put'
              }
            }
            this.ajax(resetTitle);
          }
        });
      },


      //启用
      startUsing(index) {
        this.$Modal.confirm({
          title: '启用',
          content: '<p>您确定要启用该账户吗</p>',
          loading: true,
          onOk: () => {
            let rowData = this.tableData1[index];
            let ids = "",
              tempArr = [];

            /*if(this.multipleSelection.length>1){
              for(var i=0,item;i<this.multipleSelection.length;i++){
                item=this.multipleSelection[i];
                tempArr.push(item.id);
              }
              ids = tempArr.join(",");
            }else{
              ids = rowData.id;
            }*/
            ids = rowData.id;

            //初始化加载页面信息
            let resetTitle = {
              ajaxSuccess: (res) => {
                this.$Modal.remove();
                this.successMess('禁用成功!');
                rowData["account"]['enable'] = true;
              },
              errorTitle: '禁用失败!',
              ajaxParams: {
                url: '/account/enable/' + ids,
                method: 'put'
              }
            }
            this.ajax(resetTitle);
          }
        });
      },


      //重置
      reset() {
        if (!this.undistributedDep()) return;
        if (!this.isSelected()) return;
        this.$Modal.confirm({
          title: '重置密码',
          content: '<p>您确定要重置选中账户的密码吗</p>',
          loading: true,
          onOk: () => {
            let ids = "",
              tempArr = [];
            for (var i = 0, item; i < this.multipleSelection.length; i++) {
              item = this.multipleSelection[i];
              tempArr.push(item.id);
              this.multipleSelection = [];
            }
            ids = tempArr.join(",");
            //初始化加载页面信息
            let resetTitle = {
              ajaxSuccess: (res) => {
                this.$Modal.remove();
                this.successMess('重置成功!密码为:666666');
                this.isUsing = true;
                this.$refs.multipleTable.clearSelection();
              },
              errorTitle: '重置失败!',
              ajaxParams: {
                url: '/account/reset-password/' + ids,
                method: 'put'
              }
            }
            this.ajax(resetTitle);
          }
        });
      },


      //导入
      toChannel() {
        if (!this.undistributedDep()) return;
        this.openModel('toChannel')
      },


      //导出
      derive() {
        if (!this.undistributedDep()) return;
        this.openModel('derive')
      },


      //短信通知
      shortNote() {
        if (!this.undistributedDep()) return;
        this.openModel('shortNote')
      },


      /*
       * 监听子组件通讯的方法
       * 作用:根据不同的参数关闭对应的模态
       * @param targer string example:"add"、"edit"
       * */
      cancel(targer) {
        this[targer + 'Modal'] = false;
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
      subCallback(target, title, updata) {
        this.cancel(target);
        if (title) {
          this.successMess(title);
        }
        if (!updata) {
          this.setTableData();
        }
      },


      /*
       * 打开指定的模态窗体
       * @param options string 当前指定的模态:"add"、"edit"
       * */
      openModel(options) {
        this[options + 'Modal'] = true;
      },


      /*
       * 左侧目录树节点click调用父组件方法
       *
       * @param obj {} 当前选中节点的一级数据
       *
       * @param node  {}  整个tree节点所有数据
       *
       * @param  self  {}  当前tree vue实例
       *
       * */
      treeClick(obj, node, self) {

        /*if(node.isLeaf){  //当前是否为叶子节点
            alert("====")
        }else {

        }*/
        this.setTreeDepId(obj.id);
        this.showTreeList(obj.id);
      },


      /*
       * 删除目录树回调
       *
       * */
      treeRemoveNode() {
        this.setTreeDepId("");
        this.showTreeList("")
      },


      /*
       * 根据部门id查询当前部门的人员信息
       * @param id number 当前部门id
       * */
      showTreeList(id) {
        //初始化加载页面信息
        //        this.postParamToServer();
      },


      /*
       * 是否选择部门
       * @return flag blooean  是否选择目录树节点
       * */
      isSltedTree(isSltedTreeNode) {
        let flag = false;
        if (this.deptId != "" || isSltedTreeNode(this.treeClickInit)) {
          flag = true;
        }
        return flag;
      },


      /*
       *  初始化或者刷新数列表的时候  调用treeClick函数 为deptId赋值
       * */
      treeClickInit(obj) {
        this.treeClick(obj)
      },


      //确定导出
      affirmDerive() {
        //        let http = this.$store.getters.getEnvPath.http;
        //        window.open() ;
        this.cancel('derive')
      },
      /*
       * 设置当前部门Id
       * */
      setTreeDepId(id) {
        if (id != "") {
          this.deptId = id;
          this.setTableData();
        }
      }
    },

    //初始化组件
    created() {
      this.init();
    },

    mounted() {

      //页面dom稳定后调用
      this.$nextTick(function () {
        //初始表格高度及分页位置
        this.setTableDynHeight();
        //为窗体绑定改变大小事件
        let Event = Util.events;
        Event.addHandler(window, "resize", this.setTableDynHeight);
      })
    },

    components: {
      //当前组件引入的子组件
      edit,
      add,
      show,
      toChannel,
      shortNote,
      layoutTree,
      leftTree
    }

  }

</script>
<style lang="scss">
  .add-remove {
    margin-bottom: 20px;
  }

  .header {
    height: 30px;
    font-size: 18px;
    color: #ffffff;
  }

  .userDataTable {
    margin-top: 20px;
  }

  .listUpAreaMoreSearchBox {
    margin-top: 20px;
    .el-select .el-input {
      width: 100%;
    }
    &~.userDataTable {
      margin-top: 0;
    }
  }

</style>
