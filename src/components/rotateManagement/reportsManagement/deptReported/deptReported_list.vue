<!--
****科室报到
-->
<template>
  <div ref="deptReported">
    <div ref="search">
      <el-form :inline="true" align="right">
        <el-form-item label="姓名：">
          <el-input v-model="searchObj.userName"></el-input>
        </el-form-item>
        <el-form-item label="专业：">
          <el-input v-model="searchObj.specialty"></el-input>
        </el-form-item>
        <el-form-item label="生源：">
          <el-select v-model="searchObj.userType" clearable filterable placeholder="请选择">
            <el-option v-for="item in userTypeOption" :key="item.label" :label="item.label" :value="item.value"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="科室：">
          <el-select v-model="searchObj.depId" clearable filterable placeholder="请选择">
            <el-option :key="0" label="全部" value=""></el-option>
            <el-option v-for="item in depOption" :key="item.id" :label="item.name" :value="item.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="状态：">
          <el-select v-model="searchObj.isRegister" clearable filterable placeholder="请选择">
            <el-option v-for="item in isRegisterOption" :key="item.label" :label="item.label" :value="item.value"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="info" @click="search">搜索</el-button>
        </el-form-item>
      </el-form>
    </div>
    <!-- 表格数据 -->
    <div id="tableView" ref="tableView" style="padding-top:10px;">
      <el-table align="center" :height="dynamicHt" :context="self" :data="tableData" tooltip-effect="dark" class="tableShowMoreInfo"
        style="width: 100%;" @selection-change="handleSelectionChange">
        <el-table-column label="序号" type="index" width="80"></el-table-column>
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column label="操作" width="140">
          <template scope="scope">
            <el-button size="small" type="info" @click="show(scope.row)">查看</el-button>
            <el-button size="small" type="danger" @click="depSign(scope.row)" v-if="scope.row.isRegister === 'NO_REGISTER'">报到</el-button>
          </template>
        </el-table-column>
        <el-table-column label="姓名" prop="userName" show-overflow-tooltip></el-table-column>
        <el-table-column label="学校" prop="schoolName" show-overflow-tooltip></el-table-column>
        <el-table-column label="专业" prop="specialty" show-overflow-tooltip></el-table-column>
        <el-table-column label="科室" prop="depName" show-overflow-tooltip></el-table-column>
        <el-table-column label="入科时间" prop="rotaryBeginTime" show-overflow-tooltip></el-table-column>
        <el-table-column label="状态" prop="isRegister" show-overflow-tooltip>
          <template scope="scope">
            {{ scope.row.isRegister | typeText }}
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!-- 分页 -->
    <div style="float: right;margin-top:10px;">
      <el-pagination @size-change="changePageSize" @current-change="changePage" :current-page="myPages.currentPage" :page-sizes="myPages.pageSizes"
        :page-size="myPages.pageSize" layout="total, sizes, prev, pager, next, jumper" :total="totalCount"></el-pagination>
    </div>
    <!-- 模态框 报到 -->
    <Modal :mask-closable="false" v-model="depSignModal" height="200" class-name="vertical-center-modal" :width="700">
      <modal-header slot="header" :content="contentHeader.depSignId"></modal-header>
      <dep-sign v-if="depSignModal" @cancel="cancel" @depSign="subCallback" :operaility-data="operailityData"></dep-sign>
      <div slot="footer"></div>
    </Modal>
    <!-- 模态框 查看（view） -->
    <Modal :mask-closable="false" v-model="showModal" height="200" class-name="vertical-center-modal" :loading="true" :width="600">
      <modal-header slot="header" :parent="self" :content="contentHeader.showId"></modal-header>
      <show v-if="showModal" @cancel="cancel" :operaility-data="operailityData"></show>
      <div slot="footer"></div>
    </Modal>
  </div>
</template>
<script>
  /*当前组件必要引入*/
  // api
  import api from './api';
  // opt
  import sortbyOption from './sortbyOption'; // 排序选项
  import orderOption from './orderOption'; // 顺序选项
  import userTypeOption from './userTypeOption'; // 生源类型
  import isRegisterOption from './isRegisterOption'; // 报到状态
  // com
  import show from './deptReported_view'; // 查看  
  import depSign from './deptReported_sign'; // 报到
  //当前组件引入全局的util
  let Util = null;
  export default {
    data() {
      return {
        userTypeOption,
        isRegisterOption,
        depOption: [], // 科室列表
        searchObj: {
          sortby: "isRegister", // 排序字段|报到状态
          order: "DESC", // 排序方式|倒序
          userName: '', // 用户姓名
          userType: '', // 生源类型
          specialty: '', // 专业
          depId: '', // 科室
          isRegister: '', // 报到状态
        },
        dynamicHt: 0,
        totalCount: 0,
        self: this,
        loading: false,
        depSignModal: false,

        operailityData: '',
        multipleSelection: '', // 表格已选集
        tableData: [],
        // 模态框提示
        contentHeader: {
          depSignId: {
            id: 'depSignId',
            title: '报到'
          },
          showId: {
            id: 'showId',
            title: '查看'
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
          url: api.list.path,
          params: {
            curPage: 1,
            pageSize: Util.pageInitPrams.pageSize,
          }
        }
        this.setTableData();
        this.getDepOption();
      },
      /************************* 表格逻辑 *********************************/
      /*
       * checkbox 选择后触发事件
       * @param val Array 存在所有的选择每一个行数据
       */
      handleSelectionChange(val) {
        this.multipleSelection = val;
      },
      /*
       * 设置表格数据
       * @param isLoading Boolean 是否加载
       */
      setTableData(isLoading) {
        Object.assign(this.queryQptions.params, this.searchObj);
        this.ajax({
          ajaxSuccess: 'listDataSuccess',
          ajaxParams: this.queryQptions
        }, isLoading)
      },
      // 数据请求成功回调
      listDataSuccess(res, m, loading) {
        this.totalCount = res.totalCount;
        this.tableData = res.data;
      },
      //设置表格及分页的位置
      setTableDynHeight() {
        let contenHeight = this.$refs.deptReported.parentNode.offsetHeight;
        let tableView = this.$refs.tableView.offsetTop;
        let paginationHt = 50;
        this.dynamicHt = contenHeight - tableView - paginationHt;
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
      /************************************** 模态框处理 **************************************************/
      // 增加，选择考核类型
      show(row) {
        this.operailityData = row;
        this.openModel('show')
      },
      // 设置
      set(row) {
        this.operailityData = row && [row] || this.multipleSelection;
        if (!this.operailityData.length) {
          this.errorMess('请选择需要设置的房间')
          return
        }
        this.openModel('set')
      },
      // 取消
      cancel(targer) {
        this[targer + 'Modal'] = false;
      },
      // 删除
      /*--点击--删除--按钮--*/
      remove() {
        if (this.isSelected()) {
          this.operailityData = this.multipleSelection;
          this.openModel('remove')
        }
      },
      // 增加回调
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
      /********************************* 数据获取 *********************************/
      // 获取科室选项
      getDepOption() {
        let opt = {
          ajaxSuccess: res => this.depOption = res.data || [],
          ajaxParams: {
            url: api.depList.path,
            method: api.depList.method,
          }
        };
        this.ajax(opt)
      },
      /********************************* 按钮相关 *********************************/
      // 搜索
      search() {
        this.setTableData()
      },
      // 报到
      depSign(row) {
        this.operailityData = row;
        this.openModel('depSign')
      },
      // 查看
      show(row) {
        this.operailityData = row;
        this.openModel('show')
      },
    },
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
      show,
      depSign
    }
  }

</script>
