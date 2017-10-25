<!----------------------------------
****--@name     人员审核
****--@role     教育处
****--@date     2017/7/10
****--@author   gx
----------------------------------->
<template>
  <div ref="conten">
    <el-row>
      <!-- 搜索 -->
      <el-form :inline="true">
        <el-col align="right">
          <!--<el-form-item label="年级：">-->
            <!--<el-select v-model="searchObj.boundary" placeholder="请选择">-->
              <!--<el-option v-for="(item,index) in boundaryOption" :key="item.index" :label="item.label"-->
                         <!--:value="item.value"></el-option>-->
            <!--</el-select>-->
          <!--</el-form-item>-->
          <el-form-item label="姓名：">
            <el-input v-model="searchObj.name"></el-input>
          </el-form-item>
          <el-form-item label="专业：">
            <el-select v-model="searchObj.major" placeholder="请选择">
              <el-option v-for="(item,index) in {}" :key="item.index" :label="item.label"
                         :value="item.value"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="学位：">
            <el-select v-model="searchObj.degree" placeholder="请选择">
              <el-option v-for="(item,index) in degreeOption" :key="item.index" :label="item.label"
                         :value="item.value"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button type="info" @click="search">搜索</el-button>
          </el-form-item>
        </el-col>
      </el-form>
      <!-- 操作按钮 -->
      <el-col style="padding-bottom: 20px">
        <el-button type="primary" @click="derive" >导出</el-button>
      </el-col>
    </el-row>
    <!-- 表格 -->
    <div ref="table">
      <el-table align="center" :context="self" :height="dynamicHt" :data="tableData" tooltip-effect="dark"
                style="width: 100%">
        <el-table-column label="序号" prop="index" width="70"></el-table-column>
        <el-table-column label="操作" align="center" width="70">
          <template scope="scope">
            <el-button size="small" type="success" @click="show(scope.row)">审核</el-button>
            <!--<el-button size="small" type="warning" @click="edit(scope.$index,scope.row)">修改</el-button>-->
          </template>
        </el-table-column>
        <el-table-column label="学号" prop="studentId" show-overflow-tooltip></el-table-column>
        <el-table-column label="姓名" prop="name" show-overflow-tooltip></el-table-column>
        <el-table-column label="性别" prop="sex">
          <template scope="scope">
            {{ scope.row.sex | typeText }}
          </template>
        </el-table-column>
        <el-table-column label="电话号码" prop="phone" show-overflow-tooltip></el-table-column>
        <el-table-column label="专业代码" prop="majorCode" show-overflow-tooltip></el-table-column>
        <el-table-column label="专业名称" prop="major" show-overflow-tooltip></el-table-column>
        <el-table-column label="学位类型" prop="degree" show-overflow-tooltip>
          <template scope="scope">
            {{ scope.row.degree | typeText }}
          </template>
        </el-table-column>
        <el-table-column label="状态" prop="strtus" show-overflow-tooltip>
          <template scope="scope">
            {{ scope.row.strtus | typeText }}
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!-- 分页按钮 -->
    <div style="float: right;margin-top:10px;">
      <el-pagination @size-change="changePageSize" @current-change="changePage" :current-page="myPages.currentPage"
                     :page-sizes="myPages.pageSizes" :page-size="myPages.pageSize"
                     layout="total, sizes, prev, pager, next, jumper" :total="totalCount"></el-pagination>
    </div>

    <!--导出弹窗-->
    <Modal :mask-closable="false" close-on-click-modal="false" height="200" v-model="deriveModal"
           class-name="vertical-center-modal" :width="500">
      <modal-header slot="header" :content="deriveId"></modal-header>
      <div>
        <div class="remove">确认导出吗</div>
        <el-row>
          <el-col :span="10" :offset="14">
            <a :href="excelExportUrl">
              <el-button @click="affirmDerive" type="primary">确定</el-button>
            </a>
            <el-button class="but-col" @click=" deriveModal=false">取消</el-button>
          </el-col>
          </el-col>
        </el-row>
      </div>
      <div slot="footer"></div>
    </Modal>

  </div>
</template>
<script>
  /*当前组件必要引入*/
  import api from './api';
  //当前组件引入全局的util
  let Util = null;
  export default {
    data() {
      return {
        excelExportUrl:api.excelExport,
        deleteUrl: api.delete,

        boundaryOption: [{value: "", label: "全部"},], // 年级
        degreeOption: [{value: "", label: "全部"}, {value: "MAJOR", label: "学术学位"}, {value: "LEARNING", label: "专业学位"},], // 学位

        searchObj: { // 搜索对象
          boundary: '', //年级
          name: '', // 姓名
          major: '', // 专业
          degree: '', // 学位
        },

        //* 表格 *//
        self: this,
        totalCount: 0,
        loading: false,
        dynamicHt: 100, // 表格高度
        operailityData: '',
        tableData: [], // 表格数据

        deriveModal: false,
        toChannelModal: false,
        shortNoteModal: false,
        porAddModal: false,

        /*--按钮button--*/
        deriveId: {
          id: 'deriveId',
          title: '导出'
        },
      }
    },
    methods: {
      //初始化请求列表数据
      init() {
        this.getBoundaryByYear();

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
      /************************** 表格 ************************/
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
        this.totalCount = res.totalCount || 0;
        this.tableData = this.addIndex(res.data || []);
      },
      //设置表格及分页的位置
      setTableDynHeight() {
        let contenHeight = this.$refs.conten.parentNode.offsetHeight;
        let tableTop = this.$refs.table.offsetTop;
        let paginationHt = 50;
        this.dynamicHt = contenHeight - tableTop - paginationHt;
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
      /************************** 搜索 ************************/
      // 获取年级
      getBoundaryByYear() {
        let now = new Date().getFullYear();
        let lastYear = 2016;
        for (let i = 0; i <= now - lastYear; i++) {
          this.boundaryOption.push({value: now - i, label: now - i})
        }
      },
      /************************ 操作***************************/
      // 查看
      show(row) {
        this.operailityData = row;
        this.openModel('show')
      },
      // 搜索
      search() {
        this.setTableData();
      },

      //导出
      derive() {
        this.openModel('derive')
      },

      //确定导出
      affirmDerive() {
        this.cancel('derive')
      },

      /********************** 模态窗操作 ************************/
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
      // 操作回调
      subCallback(target, title, updata) {
        this.cancel(target);
        if (title) {
          this.successMess(title);
        }
        if (!updata) {
          this.setTableData();
        }
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
    }
  }
</script>
