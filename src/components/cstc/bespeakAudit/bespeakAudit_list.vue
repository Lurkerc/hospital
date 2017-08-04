<template>
  <!-- 预约申请 -->
  <div id="bespeakClass" ref="bespeakSetRoom">
    <el-row style="padding-bottom:20px;">
      <!-- 搜索框 -->
      <el-col align="right">
        <el-input placeholder="请输入课程名称" v-model="searchObj.name" style="width:300px;" :maxlength="20">
          <el-button slot="append" icon="search" @click="search"></el-button>
        </el-input>
        <el-button :icon="getSearchBtnIcon()" @click="openMoreSearch()">筛选</el-button>
      </el-col>
    </el-row>
    <!-- 多条件 -->
    <div style="overflow:hidden;" v-show="showMoreSearch" ref="showMoreSearch" align="right">
      <el-form :inline="true">
        <el-form-item label="课程名称:">
          <el-input v-model="searchObj.name"></el-input>
        </el-form-item>
        <el-form-item label="申请时间:">
          <date-group :dateGroup="{text:'',startDate:searchObj.createStartTime,endDate:searchObj.createEndTime}">
            <el-date-picker name="start" v-model="searchObj.createStartTime" :editable="false" type="date" placeholder="选择日期" :picker-options="pickerOptions0"
              @change="handleStartTime"></el-date-picker>
            <span>-</span>
            <el-date-picker name="end" v-model="searchObj.createEndTime" :editable="false" type="date" placeholder="选择日期" :picker-options="pickerOptions1"
              @change="handleEndTime"></el-date-picker>
          </date-group>
        </el-form-item>
        <el-form-item label="开放预约状态:">
          <el-select v-model="searchObj.status" placeholder="请选择">
            <el-option v-for="item in statusOption" :key="item.value" :label="item.label" :value="item.value"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item style="margin-right:0;">
          <el-button @click="search" type="info">查询</el-button>
        </el-form-item>
      </el-form>
    </div>

    <!-- 表格数据 -->
    <div id="tableView" ref="tableView">
      <el-table align="center" :height="tableHeight" :context="self" :data="tableData" tooltip-effect="dark" class="tableShowMoreInfo"
        style="width: 100%;" @selection-change="handleSelectionChange">
        <el-table-column label="操作" width="70">
          <template scope="scope">
            <el-button size="small" type="info" @click="add(scope.row)">查看</el-button>
          </template>
        </el-table-column>
        <el-table-column label="课程名称" prop="name" show-overflow-tooltip></el-table-column>
        <el-table-column label="授课人" prop="lecturer" show-overflow-tooltip></el-table-column>
        <el-table-column label="授课对象" prop="userType" show-overflow-tooltip>
          <template scope="scope">
            {{ scope.row.userType | userType }}
          </template>
        </el-table-column>
        <el-table-column label="申请人" prop="creater" show-overflow-tooltip></el-table-column>
        <el-table-column label="申请时间" prop="createTime" show-overflow-tooltip>
          <template scope="scope">
            {{ scope.row.createTime | formatDate('yyyy-MM-dd') }}
          </template>
        </el-table-column>
        <el-table-column label="预约状态" prop="status" show-overflow-tooltip>
          <template scope="scope">
            {{ scope.row.status | bespeakType }}
          </template>
        </el-table-column>
        <el-table-column label="最低开课人数" prop="minNum" show-overflow-tooltip></el-table-column>
        <el-table-column label="已申请人数" prop="applicantsNum" show-overflow-tooltip></el-table-column>
      </el-table>
    </div>
    <!-- 分页 -->
    <div style="float: right;margin-top:10px;">
      <el-pagination @size-change="changePageSize" @current-change="changePage" :current-page="myPages.currentPage" :page-sizes="myPages.pageSizes"
        :page-size="myPages.pageSize" layout="total, sizes, prev, pager, next, jumper" :total="totalCount"></el-pagination>
    </div>

    <!-- 增加 -->
    <Modal :mask-closable="false" v-model="addModal" height="200" class-name="vertical-center-modal" :width="1000">
      <modal-header slot="header" :content="contentHeader.addId"></modal-header>
      <add v-if="addModal" @cancel="cancel" @add="subCallback" :operaility-data="operailityData"></add>
      <div slot="footer"></div>
    </Modal>
  </div>
</template>
<script>
  let Util = null;

  import api from './api'; // API
  import statusOption from '../bespeakClass/statusOption'; // 预约状态类型

  import add from './bespeakAudit_add';

  export default {
    data() {
      return {
        api,
        totalCount: 0,
        self: this,
        statusOption,
        tableHeight: 0,
        dynamicHt: 100, // 表格高度
        loading: false,
        reportModal: false,
        showMoreSearch: false, // 更多筛选
        operailityData: [],
        multipleSelection: [], // 表格已选集
        searchObj: { // 搜索
          name: '', //  名称
          createStartTime: '', // 开始时间
          createEndTime: '', // 结束时间
          status: '', // 状态
          // isOpen: '', // 是否开放预约
          // address: '', // 房间所在位置
          sortby: 'RESERVE_PROJECT_ROOM_CREATETIME', // 排序字段
          order: 'DESC', // 排序方式
        },
        tableData: [],
        // 模态框提示
        contentHeader: {
          addId: {
            id: 'addId',
            title: '审核预约申请'
          },
        }
      }
    },
    methods: {
      /************************** 基本逻辑 ******************************/
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
      },
      /************************* 搜索逻辑 *********************************/
      search() {
        this.setTableData();
      },
      // 获取筛选按钮图标
      getSearchBtnIcon() {
        return this.showMoreSearch ? 'arrow-up' : 'arrow-down'
      },
      // 显示更多筛选
      openMoreSearch() {
        this.showMoreSearch = !this.showMoreSearch;
        this.$nextTick(() => {
          if (this.showMoreSearch) {
            this.tableHeight = this.dynamicHt - this.$refs.showMoreSearch.offsetHeight;
          } else {
            this.tableHeight = this.dynamicHt;
          }
        })
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
      setTableDynHeight(otherHeight = 0) {
        let contenHeight = this.$refs.bespeakSetRoom.parentNode.offsetHeight;
        let tableView = this.$refs.tableView;
        let paginationHt = 50 + otherHeight;
        this.dynamicHt = contenHeight - tableView.offsetTop - paginationHt;
        this.tableHeight = this.dynamicHt;
      },
      /************************************** 按钮相关 **************************************************/
      // 审核
      add(row) {
        this.operailityData = row;
        this.openModel('add')
      },
      /************************************** 模态框处理 **************************************************/
      // 取消
      cancel(targer) {
        this[targer + 'Modal'] = false;
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
    },
    components: {
      add,
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
    created() {
      Util = this.$util;
      this.init()
    }
  }

</script>
<style lang="scss">


</style>
