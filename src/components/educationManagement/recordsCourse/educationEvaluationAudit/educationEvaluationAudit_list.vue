<!----------------------------------
****--@name     进修考核审核
****--@role     教学秘书
****--@date     2017/7/10
****--@author   gx
----------------------------------->
<template>
  <div ref="content">
    <!--搜索form-->
    <el-form :inline="true" :model="searchObj">
      <el-form-item label="考核时间:" prop="admissionDate">
        <el-date-picker
          v-model="searchObj.reviewTime"
          type="month"
          :editable="false"
          placeholder="选择日期" @change="handleChangeTime">
        </el-date-picker>
      </el-form-item>

      <el-form-item label="状态">
        <el-select v-model="searchObj.state" placeholder="请选择">
          <el-option v-for="(item,index) in statusOption" :key="index" :label="item.label" :value="item.value"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="search">查询</el-button>
      </el-form-item>
    </el-form>

    <!--表格数据-->
    <div ref="myTable">
      <el-table
        align="center"
        :height="dynamicHt"
        :context="self"
        :data="tableData"
        tooltip-effect="dark"
        highlight-current-row
        style="width: 100%;height: 100%"
        @selection-change="handleSelectionChange">
        <!--<el-table-column-->
          <!--type="selection"-->
          <!--width="55">-->
        <!--</el-table-column>-->
        <el-table-column
          label="操作"
          width="160">
          <template scope="scope">
            <el-button size="small" type="info" @click="show(scope.row)">查看</el-button>
            <el-button size="small" type="danger" @click="edit(scope.row)" :disabled="['NO_SUBMIT','PASS'].indexOf(scope.row.state) > -1">审核</el-button>
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          show-overflow-tooltip
          prop="userName"
          label="进修科目"
        >
        </el-table-column>
        <el-table-column
          prop="reviewTime"
          label="考核时间"
        >
        </el-table-column>
        <el-table-column
          prop="createTime"
          label="填写时间"
          align="center"
          show-overflow-tooltip
        >
        </el-table-column>
        <el-table-column
          prop="courseNames"
          label="进修科室"
          show-overflow-tooltip
        ></el-table-column>

        <el-table-column
          prop="state"
          label="状态"
          show-overflow-tooltip
        >
          <template scope="scope">
            {{ scope.row.state | monthlyReview }}
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
          :total="listTotal">
        </el-pagination>
      </div>
    </div>

    <!--修改弹窗-->
    <Modal :mask-closable="false" v-model="editModal" height="200" class-name="vertical-center-modal" :width="1100">
      <modal-header slot="header" :content="button.editId"></modal-header>
      <edit v-if="editModal" @cancel="cancel" @edit="subCallback" :operaility-data="operailityData"></edit>
      <div slot="footer"></div>
    </Modal>
    <!--查看弹窗-->
    <Modal :mask-closable="false" v-model="showModal" height="200" class-name="vertical-center-modal" :width="1100">
      <modal-header slot="header" :parent="self" :content="button.showId"></modal-header>
      <show v-if="showModal" @cancel="cancel" :operaility-data="operailityData" studentType="ZYY"></show>
      <div slot="footer"></div>
    </Modal>

  </div>
</template>
<script>
  /*当前组件必要引入*/
  import api from '../educationEvaluationQuery/api'
  import statusOption from '../educationEvaluationQuery/statusOption';
  //引入查看组件
  import edit from "./educationEvaluationAudit_input.vue";
  import show from '../educationEvaluationQuery/educationEvaluationQuery_view.vue';
  //引入--修改--组件
  //import revise from "../components/revise.vue";
  //当前组件引入全局的util
  let Util = null;
  export default {
    data() {
      return {
        statusOption,
        deleteUrl: api.delete,
        searchObj: {
          reviewTime: '',
          state: '',
        },
        //删除
        operailityData: {},
        multipleSelection: [],
        dynamicHt: 100,
        self: this,
        loading: false,
        listTotal: 0,
        tableData: [],
        //* 按钮 *//
        button: {
          showId: {
            id: 'showId',
            title: '查看月度工作考核'
          },
          editId: {
            id: 'editId',
            title: '月度工作考核审核'
          },
        },
        listMessTitle: {
          ajaxSuccess: 'successGetList',
          ajaxParams: {
            url: api.pageListManage.path,
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
          params: {curPage: 1, pageSize: Util.pageInitPrams.pageSize}
        }
        this.setTableData()
      },

      setTableData() {
        this.listMessTitle.ajaxParams.params = Object.assign(this.listMessTitle.ajaxParams.params, this.queryQptions.params,this.searchObj);
        this.ajax(this.listMessTitle);
      },

      successGetList(res) {
        let data = res.data;
        data = this.addIndex(data);
        this.tableData = data;
        this.listTotal = res.totalCount || 0;
      },
      /*
       * checkbox 选择后触发事件
       * @param val Array 存在所有的选择每一个行数据
       */
      handleSelectionChange(val) {
        this.multipleSelection = val;
      },
      //设置表格及分页的位置
      setTableDynHeight() {
        let content = this.$refs.content;
        let parHt = content.parentNode.offsetHeight;
        let myTable = this.$refs.myTable;
        let paginationHt = 50;
        this.dynamicHt = parHt - myTable.offsetTop - paginationHt;
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
          this.showMess("只能选择一条数据!")
          flag = false;
        }
        return flag;
      },
      //查询时间转换
      handleChangeTime(value) {
        this.searchObj.reviewTime = value;
      },
      //查询
      search() {
        this.setTableData()
      },
      // 新建申请
      add() {
        this.openModel('add')
      },
      // 查看
      show(row) {
        this.operailityData = row;
        this.openModel('show')
      },
      // 编辑
      edit(row) {
        this.operailityData = row;
        this.openModel('edit')
      },
      // 删除
      remove() {
        if (this.isSelected()) {
          this.multipleSelection.map(item=>item.id=item.monthlyReviewId);
          this.operailityData = this.multipleSelection;
          this.openModel('remove')
        }
      },
      /*
       * 打开指定的模态窗体
       * @param options string 当前指定的模态:"add"、"edit"
       * */
      openModel(options) {
        this[options + 'Modal'] = true;
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
      // 取消
      cancel(targer) {
        this[targer + 'Modal'] = false;
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
      edit,
      show,
    }
  }
</script>
