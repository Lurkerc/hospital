<!-- 视频库 -->
<!-- 基础教务 - 资源库管理 - 标准课程 -->
<template>
  <layout-tree>
    <left-tree slot="left" :clickAddChange="clickAddChange" @setCurrSltNodeId="setTreeDepId" @clickAdd="handleAdd" @tree-click="treeClick"
               @tree-remove-node="treeRemoveNode" :treeOptions="treeDefaults" :fromWhereTreeType="fromWhereTree"></left-tree>
    <div slot="right" id="content" ref="content" class="modal">

    </div>
  </layout-tree>
</template>
<style>
  .el-select .el-input {
    width: 110px;
  }

</style>
<script>

  import layoutTree from "../../../common/layoutTree";
  import leftTree from "../../../common/leftTree";
  //当前组件引入全局的util
  let Util = null;
  let store = null;
  export default {
    data() {
      return {
        //tree默认项设置
        treeDefaults: {
          getTreeUrl: "/dept/tree-by-SXS",
          getDataUrl: '',
          isShowMenus: false,
          isShowSearch: false,
        },
        fromWhereTree: "user",

        //查询表单
        deleteUrl: '/role/remove',
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
        operailityData: '',
        multipleSelection: [],
        dynamicHt: 100,
        tabHeight: 100,
        self: this,
        tableData: [{
          name: "呼吸系统疾病",
          createUser: "张三",
          changeStatu: "完成",
          statu: "待修订",
          classNum: "2",
          createTime: "2017-10-20",
          updateTime: "2017-10-22",
        }],
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
        return
        let data = responseData.data;
        this.tableData = [];
        data = this.addIndex(data);
        this.tableData = data;
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
        this.operailityData = this.tableData[index];
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
          this.operailityData = this.tableData[index];
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
            let rowData = this.tableData[index];
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
            let rowData = this.tableData[index];
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
      // edit,
      add,
      // show,
      // toChannel,
      // shortNote,
      layoutTree,
      leftTree
    }

  }

</script>

