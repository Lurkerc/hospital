<template>
  <!-- 列表数据 -->
  <div ref="dataList">
    <el-row style="margin-bottom:10px;padding-bottom:10px;border-bottom:1px solid #dfe6ec;">
      <el-col :span="22" align="center">
        <h2 style="line-height:30px;">{{ stitle || '-' }}</h2>
      </el-col>
      <el-col :span="2" align="right">
        <el-button type="info" size="small" @click="backList">返回列表</el-button>
      </el-col>
    </el-row>
    <!-- 搜索 -->
    <!--<el-row>
      <el-col align="right" style="width:90px;float:right;">
        <el-button :icon="getSearchBtnIcon()" @click="openMoreSearch()">筛选</el-button>
      </el-col>
      <el-col :span="6" style="float:right;">
        <el-input placeholder="请输入考生姓名" v-model="searchObj.userName">
          <el-button slot="append" icon="search" @click="search"></el-button>
        </el-input>
      </el-col>
    </el-row>-->
    <!-- 多条件 -->
    <!--<div class="editForm noMarginBottom" style="overflow:hidden;" v-show="showMoreSearch">
      <el-form :inline="true" style="margin-top:10px;float:right;" label-width="74px">
        <el-row>
          <el-form-item label="考生姓名:">
            <el-input v-model="searchObj.userName"></el-input>
          </el-form-item>
          <el-form-item label="所在部门:">
            <el-input v-model="searchObj.userName"></el-input>
          </el-form-item>
          <el-form-item label="考生编号:">
            <el-input v-model="searchObj.userNum"></el-input>
          </el-form-item>
          <el-button @click="search">查询</el-button>
        </el-row>
      </el-form>
    </div>-->
    <!-- 表格数据 -->
    <div id="tableView" ref="tableView" style="padding-top:10px;">
      <el-table align="center" :height="dynamicHt" :context="self" :data="tableData" tooltip-effect="dark" class="tableShowMoreInfo"
        style="width: 100%;">
        <el-table-column label="操作" width="100">
          <template scope="scope">
            <el-button size="small" type="success" @click="show(scope.row.userId)">查看详情</el-button>
          </template>
        </el-table-column>
        <el-table-column label="考生姓名" prop="userName" show-overflow-tooltip></el-table-column>
        <!--<el-table-column label="部门" prop="sceneId" show-overflow-tooltip></el-table-column>-->
        <el-table-column label="考生编号" prop="userNum" show-overflow-tooltip></el-table-column>
      </el-table>
    </div>
    <!-- 分页 -->
    <div style="float: right;margin-top:10px;">
      <el-pagination @size-change="changePageSize" @current-change="changePage" :current-page="myPages.currentPage" :page-sizes="myPages.pageSizes"
        :page-size="myPages.pageSize" layout="total, sizes, prev, pager, next, jumper" :total="totalCount"></el-pagination>
    </div>
    <!-- 考生信息 -->
    <Modal :mask-closable="false" width="890" v-model="queryStudentModal" title="考站队列设置" class-name="vertical-center-modal">
      <modal-header slot="header" :content="contentHeader.queryStudentId"></modal-header>
      <!--<query-student v-if="queryStudentModal" @cancel="cancel" :id="userId" :sceneId="sceneId"></query-student>-->
      <query-student v-if="queryStudentModal" @cancel="cancel" :userId="userId" :sceneId="sceneId"></query-student>
      <div slot="footer"></div>
    </Modal>
  </div>
</template>

<script>
  let Util = null;

  import api from './api'; // api

  import examineTypeOption from '../examineInterval/examineTypeOption'; // 类型选择
  import examineStatuOption from '../examineInterval/examineStatuOption'; // 状态选择

  import queryStudent from './scoreQuery_student'; // 查看

  export default {
    // http://218.241.184.2:9014/#!/project/api/detail?projectID=15&apiID=529
    props: ['sceneId', 'stitle'],
    data() {
      return {
        userId: 0, // 查看id
        self: this,
        dynamicHt: 100,
        examineTypeOption,
        examineStatuOption,
        showMoreSearch: false, // 更多筛选
        queryStudentModal: false,
        searchObj: { // 搜索
          userName: '', // 姓名
          userNum: '', // 编号

        },
        totalCount: 0,
        tableData: [],
        contentHeader: {
          queryStudentId: {
            id: "queryStudentId",
            title: '考生信息'
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
          method: api.list.method,
          params: {
            curPage: 1,
            pageSize: Util.pageInitPrams.pageSize,
          }
        }
        this.setTableData();
      },
      /************************* 搜索逻辑 *********************************/
      search() {
        Object.assign(this.queryQptions.params, this.searchObj);
        this.setTableData();
      },
      // 获取筛选按钮图标
      getSearchBtnIcon() {
        return this.showMoreSearch ? 'arrow-up' : 'arrow-down'
      },
      // 显示更多筛选
      openMoreSearch() {
        this.showMoreSearch = !this.showMoreSearch
        if (this.showMoreSearch) {
          this.dynamicHt = this.dynamicHt - 47;
        } else {
          this.dynamicHt = this.dynamicHt + 47;
        }
      },
      /************************* 表格逻辑 *********************************/
      /*
       * 设置表格数据
       * @param isLoading Boolean 是否加载
       */
      setTableData() {
        Object.assign(this.queryQptions.params, {
          id: this.sceneId
        });
        this.ajax({
          ajaxSuccess: 'listDataSuccess',
          ajaxParams: this.queryQptions
        })
      },
      // 数据请求成功回调
      listDataSuccess(res, m, loading) {
        this.totalCount = res.totalCount;
        this.tableData = res.data;
      },
      //设置表格及分页的位置
      setTableDynHeight(otherHeight = 0) {
        let contenHeight = this.$refs.dataList.parentNode.parentNode.offsetHeight;
        let tableView = this.$refs.tableView;
        let paginationHt = 50 + otherHeight + 16;
        this.dynamicHt = contenHeight - tableView.offsetTop - paginationHt;
      },
      // 返回列表
      backList() {
        this.$emit('show', {
          view: 'index'
        })
      },
      /************************************** 模态框处理 **************************************************/
      // 查看
      show(id) {
        this.userId = id;
        this.openModel('queryStudent')
      },
      // 取消
      cancel(targer) {
        this[targer + 'Modal'] = false;
      },
      /*
       * 打开指定的模态窗体
       * @param options string 当前指定的模态:"add"、"edit"
       * */
      openModel(options) {
        this[options + 'Modal'] = true;
      },
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
      queryStudent
    },
    created() {
      this.init()
    },
    watch: {
      sceneId(val) {
        this.setTableData()
      },
    }
  }

</script>

<style lang="scss">
  .noMarginBottom {
    .el-form-item {
      margin-bottom: 0;
    }
  }

</style>
