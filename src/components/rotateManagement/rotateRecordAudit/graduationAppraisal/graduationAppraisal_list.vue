<!--
****--结业审核
****--@date     2017/7/3
****--@author   gx
-->
<template>
  <div ref="graduationAppraisal">
    <el-form :inline="true">
      <el-row>
        <el-col :span="14">
          <el-button type="success" @click="leadin">导入成绩</el-button>
          <el-button type="info" @click="derive('exportQualifiedUser')">导出合格名单</el-button>
          <el-button type="danger" @click="derive('exportNoQualifiedUser')">导出不合格名单</el-button>
          <el-button type="primary">转为研究生</el-button>
        </el-col>
        <el-col :span="10" align="right" style="padding-bottom:20px;">
          <el-input :maxlength="20" placeholder="请输入姓名" icon="search" v-model="searchObj.userName" :on-icon-click="search" style="width:260px;"></el-input>
          <el-button :icon="searchMore ? 'arrow-down' : 'arrow-up'" @click="showSearchMore">筛选</el-button>
        </el-col>
        <div v-show="searchMore" style="clear:both;" align="right" ref="searchMore">
          <el-form-item label="姓名：">
            <el-input v-model="searchObj.userName"></el-input>
          </el-form-item>
          <el-form-item label="学校：">
            <el-input v-model="searchObj.schoolName"></el-input>
          </el-form-item>
          <el-form-item label="年份：">
            <el-date-picker v-model="searchObj.year" align="right" type="year" placeholder="选择年">
            </el-date-picker>
          </el-form-item>
          <el-form-item label="专业：">
            <el-input v-model="searchObj.specialty"></el-input>
          </el-form-item>
          <el-button type="info" @click="search">搜索</el-button>
        </div>
      </el-row>
    </el-form>
    <!-- 表格 -->
    <div id="myTable" ref="myTable">
      <el-table ref="multipleTable" align="center" :height="tabHeight" :context="self" :data="tableData" tooltip-effect="dark"
        style="width: 100%" @selection-change="handleSelectionChange">
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column label="序号" prop="index" width="100"></el-table-column>
        <el-table-column label="操作" align="center" width="140">
          <template scope="scope">
            <el-button size="small" type="success" @click="add(scope.row)">审核</el-button>
            <el-button size="small" type="primary" @click="show(scope.row)">查看</el-button>
          </template>
        </el-table-column>
        <el-table-column prop="userName" label="姓名" align="center" width="200"></el-table-column>
        <el-table-column prop="schoolName" label="学校" show-overflow-tooltip></el-table-column>
        <el-table-column prop="profession" label="专业" show-overflow-tooltip></el-table-column>
        <el-table-column prop="depQualified" label="出科鉴定" show-overflow-tooltip>
          <template scope="scope">
            {{ scope.row.depQualified | typeText }}
          </template>
        </el-table-column>
        <el-table-column prop="theoryScore" label="结业考试成绩" show-overflow-tooltip>
          <template scope="scope">
            <el-button :plain="true" :type="scope.row.depQualified === 'NO_QUALIFIED' ? 'danger' : 'success'" size="small" @click="showGiven(scope.row)">{{ scope.row.theoryScore }}</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div style="margin: 10px;">
      <div style="float: right;">
        <el-pagination @size-change="changePageSize" @current-change="changePage" :current-page="myPages.currentPage" :page-sizes="myPages.pageSizes"
          :page-size="myPages.pageSize" layout="total, sizes, prev, pager, next, jumper" :total="listTotal">
        </el-pagination>
      </div>
    </div>
    <!-- 模态框 增加（add） -->
    <Modal :mask-closable="false" v-model="addModal" height="200" class-name="vertical-center-modal" :width="900">
      <modal-header slot="header" :content="contenHeader.addId"></modal-header>
      <add v-if="addModal" @cancel="cancel" @add="subCallback" :operaility-data="operailityData"></add>
      <div slot="footer"></div>
    </Modal>
    <!-- 模态框 查看（view） -->
    <Modal :mask-closable="false" v-model="showModal" height="200" class-name="vertical-center-modal" :loading="true" :width="900">
      <modal-header slot="header" :parent="self" :content="contenHeader.showId"></modal-header>
      <show v-if="showModal" @cancel="cancel" :operaility-data="operailityData"></show>
      <div slot="footer"></div>
    </Modal>
    <!-- 模态框 查看出科情况 -->
    <Modal :mask-closable="false" v-model="givenViewModal" height="200" class-name="vertical-center-modal" :loading="true" :width="900">
      <modal-header slot="header" :parent="self" :content="contenHeader.givenViewId"></modal-header>
      <given-view v-if="givenViewModal" @cancel="cancel" :operaility-data="operailityData"></given-view>
      <div slot="footer"></div>
    </Modal>
    <!--导出弹窗-->
    <Modal :mask-closable="false" height="200" v-model="deriveModal" class-name="vertical-center-modal" :width="500">
      <modal-header slot="header" :content="contenHeader.deriveId"></modal-header>
      <div>
        <div class="remove">确认导出吗</div>
        <el-row>
          <el-col :span="10" :offset="14">
            <a :href="deriveUrl">
              <el-button @click="deriveModal=false" type="primary">确定</el-button>
            </a>
            <el-button class="but-col" @click="deriveModal=false">取消</el-button>
          </el-col>
          </el-col>
        </el-row>
      </div>
      <div slot="footer"></div>
    </Modal>
    <!-- 模态框 导入成绩（leadin） -->
    <Modal :mask-closable="false" v-model="leadinModal" height="200" title="对话框标题" class-name="vertical-center-modal" :width="800">
      <modal-header slot="header" :content="contenHeader.leadinId"></modal-header>
      <leadin v-if="leadinModal" :url="api" @cancel="cancel" @toChannel="subCallback"></leadin>
      <div slot="footer"></div>
    </Modal>
  </div>
</template>
<script>
  /*当前组件必要引入*/
  import api from './api';
  import add from './graduationAppraisal_add';
  import show from './graduationAppraisal_view';
  import givenView from '../../rotateRecordWrite/givenTheApplicationOfLarge/givenTheApplicationOfLarge_view';
  import leadin from './graduationAppraisal_toChannel'; // 导入
  //当前组件引入全局的util
  let Util = null;
  export default {
    data() {
      return {
        api,
        deriveUrl: '',
        leadinModal: false,
        deriveModal: false,
        qualifiedActive: '',
        searchMore: false,
        searchObj: {
          userName: '', // 姓名
          schoolName: '', // 学校名称
          year: new Date().getFullYear().toString(), // 年份
          specialty: '', // 专业
        },
        dynamicHt: 100,
        tabHeight: 0,
        self: this,
        operailityData: [],
        multipleSelection: [],
        tableData: [],
        listTotal: 0,
        givenViewModal: false,
        contenHeader: {
          addId: {
            id: "addId",
            title: '添加审核'
          },
          showId: {
            id: "showId",
            title: "查看审核"
          },
          givenViewId: {
            id: 'givenViewId',
            title: '查看出科详情'
          },
          deriveId: {
            id: "deriveId",
            title: "导出名单"
          },
          leadinId: {
            id: 'leadinId',
            title: "导入成绩"
          },
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
            pageSize: Util.pageInitPrams.pageSize
          }
        }

        this.setTableData()
      },
      /*************************** 按钮事件 *************************/
      // 搜索
      search() {
        this.setTableData()
      },
      // 筛选 
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
      // 添加
      add(row) {
        this.operailityData = row;
        this.openModel('add')
      },
      // 查看
      show(row) {
        this.operailityData = row;
        this.openModel('show')
      },
      // 考核成绩
      showGiven(row) {
        return
        this.operailityData = row;
        this.openModel('givenView')
      },
      // 导出
      derive(type) {
        let params = [];
        Util._.map(this.searchObj, (key, val) => {
          params.push(key + '=' + val)
        })
        this.deriveUrl = '/api' + api[type].path + '?' + params.join('&');
        this.openModel('derive');
      },
      // 导入
      leadin() {
        this.openModel('leadin')
      },
      /********************************* 表格相关 *****************************/
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
        let params = this.queryQptions.params;
        params.year = this.conductDate(params.year, 'yyyy');
        this.ajax({
          ajaxSuccess: 'listDataSuccess',
          ajaxParams: this.queryQptions
        }, isLoading)
      },
      // 数据请求成功回调
      listDataSuccess(res, m, loading) {
        this.totalCount = res.totalCount || 0;
        this.tableData = this.addIndex(res.data || []);
      },
      //设置表格及分页的位置
      setTableDynHeight() {
        let contenHeight = this.$refs.graduationAppraisal.parentNode.offsetHeight;
        let tableData = this.$refs.myTable;
        let paginationHt = 50;
        this.dynamicHt = contenHeight - tableData.offsetTop - paginationHt;
        this.tabHeight = this.dynamicHt;
      },
      /*
       * checkbox 选择后触发事件
       * @param val Array 存在所有的选择每一个行数据
       */
      handleSelectionChange(val) {
        this.multipleSelection = val;
      },
      /********************************* 弹窗相关 *****************************/
      // 取消
      cancel(targer) {
        this[targer + 'Modal'] = false;
      },
      // 弹窗回调
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
      add,
      show,
      givenView,
      leadin
    }
  }

</script>

<style lang="scss">


</style>
