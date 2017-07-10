<template>
  <!-- 预约申请 -->
  <div id="bespeakApply" ref="bespeakSetRoom">
    <el-row>
      <el-col :span="14">
        <!-- 操作按钮 -->
        <el-button size="small" type="success" @click="add">新建申请</el-button>
        <el-button size="small" type="danger" @click="del">删除申请</el-button>
      </el-col>
      <!-- 搜索框 -->
      <el-col :span="10" align="right">
        <el-col :span="20">
          <el-input placeholder="请输入项目名称" v-model="searchObj.reservePojectName">
            <el-button slot="append" icon="search" @click="search"></el-button>
          </el-input>
        </el-col>
        <el-col :span="4">
          <el-button :icon="getSearchBtnIcon()" @click="openMoreSearch()">筛选</el-button>
        </el-col>
      </el-col>
    </el-row>
    <!-- 多条件 -->
    <div class="noMarginBottom" style="overflow:hidden;" v-show="showMoreSearch" ref="showMoreSearch">
      <el-form :inline="true" style="margin-top:10px;float:right;">
        <el-form-item label="项目名称:">
          <el-input v-model="searchObj.reservePojectName"></el-input>
        </el-form-item>
        <el-form-item label="申请时间:">
          <date-group :dateGroup="{text:'',startDate:searchObj.applicantStarDate,endDate:searchObj.applicantEndDate}">
            <el-date-picker name="start" v-model="searchObj.applicantStarDate" :editable="false" type="date" placeholder="选择日期" :picker-options="pickerOptions0"
              @change="handleStartTime"></el-date-picker>
            <span>-</span>
            <el-date-picker name="end" v-model="searchObj.applicantEndDate" :editable="false" type="date" placeholder="选择日期" :picker-options="pickerOptions1"
              @change="handleEndTime"></el-date-picker>
          </date-group>
        </el-form-item>
        <el-form-item label="开放预约状态:">
          <el-select v-model="searchObj.status" placeholder="请选择">
            <el-option v-for="item in statusOption" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-button @click="search">查询</el-button>
      </el-form>
    </div>

    <!-- 表格数据 -->
    <div id="tableView" ref="tableView" style="padding-top:10px;">
      <el-table align="center" :height="tableHeight" :context="self" :data="tableData" tooltip-effect="dark" class="tableShowMoreInfo"
        style="width: 100%;" @selection-change="handleSelectionChange">
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column label="操作" width="140" align="center">
          <template scope="scope">
            <el-button size="small" type="info" @click="show(scope.row)">查看</el-button>
            <el-button size="small" type="danger" @click="set(scope.row)">设置</el-button>
          </template>
        </el-table-column>
        <el-table-column label="项目名称" prop="reservePojectName" show-overflow-tooltip></el-table-column>
        <el-table-column label="房间号" prop="roomNum" show-overflow-tooltip></el-table-column>
        <el-table-column label="申请使用时间" prop="reserveDate" show-overflow-tooltip></el-table-column>
        <el-table-column label="申请人" prop="applicatName" show-overflow-tooltip></el-table-column>
        <el-table-column label="申请时间" prop="applicatDate" show-overflow-tooltip></el-table-column>
        <el-table-column label="预约状态" prop="status" show-overflow-tooltip>
          <template scope="scope">
            {{ scope.row.status | typeText }}
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!-- 分页 -->
    <div style="float: right;margin-top:10px;">
      <el-pagination @size-change="changePageSize" @current-change="changePage" :current-page="myPages.currentPage" :page-sizes="myPages.pageSizes"
        :page-size="myPages.pageSize" layout="total, sizes, prev, pager, next, jumper" :total="totalCount"></el-pagination>
    </div>

    <!-- 模态框 设置（set） -->
    <!--<Modal :mask-closable="false" v-model="setModal" height="200" class-name="vertical-center-modal" :width="900">
      <modal-header slot="header" :content="contentHeader.setId"></modal-header>
      <room-set v-if="setModal" @cancel="cancel" @set="subCallback" :op-data="operailityData"></room-set>
      <div slot="footer"></div>
    </Modal>-->
    <!-- 模态框 查看（show） -->
    <!--<Modal :mask-closable="false" v-model="showModal" height="200" class-name="vertical-center-modal" :width="900">
      <modal-header slot="header" :content="contentHeader.showId"></modal-header>
      <room-view v-if="showModal" @cancel="cancel" :op-data="operailityData"></room-view>
      <div slot="footer"></div>
    </Modal>-->

  </div>
</template>
<script>
  let Util = null;

  import api from './api'; // API

  // import roomSet from './room_set'; // 设置
  // import roomView from './room_view'; // 查看

  import statusOption from './statusOption'; // 预约状态类型

  export default {
    props: {
      contenHeight: {
        type: Number,
        default: 100
      },
      update: { // 是否更新表格数据
        type: Boolean,
        default: false
      }
    },
    data() {
      return {
        totalCount: 0,
        self: this,
        statusOption,
        tableHeight: 0,
        dynamicHt: 100, // 表格高度
        loading: false,
        showMoreSearch: false, // 更多筛选
        showModal: false, // 查看
        setModal: false, // 设置

        operailityData: '',
        multipleSelection: '', // 表格已选集
        searchObj: { // 搜索
          reservePojectName: '', //  名称
          applicantStarDate: '', // 开始时间
          applicantEndDate: '', // 结束时间
          status: '', // 状态
          // isOpen: '', // 是否开放预约
          // address: '', // 房间所在位置
          sortby: 'RESERVE_APPLICANTDATE', // 排序字段
          order: 'DESC', // 排序方式
        },
        tableData: [],
        // 模态框提示
        contentHeader: {
          setId: {
            id: 'setId',
            title: '房间预约设置'
          },
          showId: {
            id: 'showId',
            title: '查看房间预约设置'
          }
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
      /************************************** 按钮相关 **************************************************/
      add() {

      },
      del() {

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
    },
    components: {
      // roomSet,
      // roomView
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
    // watch: {
    //   contenHeight(val) {
    //     this.setTableDynHeight()
    //   },
    // },
    created() {
      Util = this.$util;
      this.init()
    }
  }

</script>
<style lang="scss">
  @import'../../../assets/ambuf/css/manage_v1.0/editForm';
  .noMarginBottom {
    .el-form-item {
      margin-bottom: 0;
    }
  }

</style>
