<template>
  <!-- 事务管理 -->
  <div id="nosocomial" ref="nosocomial">
    <!-- 按钮 -->
    <div class="buttonList" ref="buttonList">
      <el-button size="small" type="primary" @click="add">新建事项</el-button>
      <el-button size="small" type="success" @click="edit">修改事项</el-button>
      <el-button size="small" type="danger" @click="remove">删除事项</el-button>
      <el-button size="small" type="info">导出Excel</el-button>
    </div>
    <!-- 搜索 -->
    <el-form :inline="true" class="el-form-item-search">
      <el-form-item label="事项名称：">
        <el-input size="small" v-model="value1"></el-input>
      </el-form-item>
      <el-form-item label="事项类型：">
        <el-select size="small" placeholder="事项类型" v-model="value2">
          <el-option v-for="item in typeOption" :key="item.value" :label="item.label" :value="item.value"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="考核开始时间：">
        <el-date-picker size="small" v-model="value3" type="date" placeholder="选择日期" :picker-options="pickerOptions0">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="考核结束时间：">
        <el-date-picker size="small" v-model="value4" type="date" placeholder="选择日期" :picker-options="pickerOptions0">
        </el-date-picker>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" size="small" @click="onSubmit">查询</el-button>
      </el-form-item>
    </el-form>
    <!-- 表格 -->
    <div id="nosocomialTable" ref="nosocomialTable">
      <el-table align="center" :height="dynamicHt" :context="self" :data="tableData1" tooltip-effect="dark" style="width: 100%"
        @selection-change="handleSelectionChange">
        <el-table-column type="selection" width="55">
        </el-table-column>
        <el-table-column label="操作" align="center">
          <template scope="scope">
            <el-button size="small" type="info" @click="show(scope.$index,scope.row)">查看</el-button>
          </template>
        </el-table-column>
        <el-table-column label="序号" align="center"></el-table-column>
        <el-table-column label="事项名称" show-overflow-tooltip></el-table-column>
        <el-table-column label="事项描述" show-overflow-tooltip></el-table-column>
        <el-table-column label="事项类型" show-overflow-tooltip></el-table-column>
        <el-table-column label="人数" show-overflow-tooltip></el-table-column>
        <el-table-column label="联系人" show-overflow-tooltip></el-table-column>
        <el-table-column label="开始时间" show-overflow-tooltip></el-table-column>
        <el-table-column label="结束时间" show-overflow-tooltip></el-table-column>
        <el-table-column label="创建人" show-overflow-tooltip></el-table-column>
        <el-table-column label="创建时间" show-overflow-tooltip></el-table-column>
      </el-table>
    </div>
    <!-- 分页 -->
    <div style="float: right;margin-top:10px;">
      <el-pagination @size-change="changePageSize" @current-change="changePage" :current-page="myPages.currentPage" :page-sizes="myPages.pageSizes"
        :page-size="myPages.pageSize" layout="total, sizes, prev, pager, next, jumper" :total="totalCount"></el-pagination>
    </div>

    <!--增加弹窗-->
    <Modal :mask-closable="false" v-model="addModal" height="200" title="对话框标题" class-name="vertical-center-modal" :width="960">
      <modal-header slot="header" :content="button.addId"></modal-header>
      <add v-if="addModal" @cancel="cancel" @add="subCallback"></add>
      <div slot="footer"></div>
    </Modal>

    <!--编辑弹窗-->
    <Modal :mask-closable="false" v-model="editModal" height="200" title="对话框标题" class-name="vertical-center-modal" :width="960">
      <modal-header slot="header" :content="button.editId"></modal-header>
      <edit v-if="editModal" @cancel="cancel" @add="subCallback"></edit>
      <div slot="footer"></div>
    </Modal>

    <!--删除弹窗-->
    <Modal close-on-click-modal="false" height="200" v-model="removeModal" title="对话框标题" class-name="vertical-center-modal" :loading="loading"
      :width="500">
      <modal-header slot="header" :content="button.removeId"></modal-header>
      <remove v-if="removeModal" :delete-url="deleteUrl" @remove="subCallback" @cancel="cancel" :operaility-data="operailityData"></remove>
      <div slot="footer"></div>
    </Modal>
  </div>
</template>

<script>
  //当前组件引入全局的util
  let Util = null;
  let store = null;

  import typeOption from './typeOption.js'; // 事项类型

  // 引入操作模态组件
  import add from './affairs_add.vue'; // 增加
  import edit from './affairs_edit.vue'; // 编辑

  export default {
    data() {
      return {
        // 配置
        deleteUrl: '', // 删除api url
        operailityData: '',
        pickerOptions0: { // 时间选择器配置
          disabledDate: (time) => time.getTime() < Date.now() - 8.64e7 // 不可操作
        },
        // 搜索
        value1: '', // 事项名称
        value2: '', // 事项类型
        value3: '', // 考核开始时间
        value4: '', // 考核结束时间
        typeOption, // 事项选择类型
        // 表格
        self: this,
        tableData1: [],
        loading: false,
        totalCount: 0,
        dynamicHt: 100,
        multipleSelection: '',
        listMessTitle: {
          ajaxSuccess: 'listDataSuccess',
          ajaxParams: {
            url: '/role/list?name=&identify=&type=',
            params: this.queryQptions
          }
        },
        // 按钮
        button: {
          addId: {
            id: 'add',
            title: '新增事项'
          },
          removeId: {
            id: 'remove',
            title: '删除事项'
          },
          editId: {
            id: 'edit',
            title: '修改事项'
          }
        }
      }

    },
    methods: {
      onSubmit() {
        return false
      },
      //初始化请求列表数据
      init() {
        Util = this.$util;
        //ajax请求参数设置
        this.myPages = Util.pageInitPrams;

        this.queryQptions = {
          url: this.listUrl,
          params: {
            curPage: 1,
            pageSize: Util.pageInitPrams.pageSize
          }
        }
        this.setTableData();
      },

      //设置表格及分页的位置
      setTableDynHeight() {
        let nosocomial = this.$refs.nosocomial;
        let parHt = nosocomial.parentNode.offsetHeight;
        let nosocomialTable = this.$refs.nosocomialTable;
        let paginationHt = 50;
        this.dynamicHt = parHt - nosocomialTable.offsetTop - paginationHt;
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

      //通过get请求列表数据
      listDataSuccess(res, m, loading) {
        let that = this;
        let d = new Date();
        let t2 = d.getTime();
        let responseData = res.data;
        this.totalCount = res.totalCount || 0;
        if (Util._.isObject(responseData["status"]) && responseData["status"]["code"] == 0) {
          let len = responseData.data.length;
          let data = responseData.data.splice(0, 150);
          this.tableData1 = [];
          data = that.addIndex(data);
          for (var i = 0, n = 0; i < data.length; i += 100, n++) {
            setTimeout(() => {
              that.tableData1 = that.tableData1.concat(data.splice(0, 100));
            }, n * 10)
          }
          that.listTotal = 1;
        } else {
          loading(false)
        }
      },
      setTableData(isLoading) {
        this.ajax(this.listMessTitle, isLoading)
      },
      //搜索监听回调
      searchEvent(isLoading) {
        isLoading(true);
        this.setTableData(isLoading)
      },
      /*
       * 列表查询方法
       * @param string 查询from的id
       * */
      handleSubmit(name) {
        this.$refs[name].validate((valid) => {
          if (valid) {
            this.$Message.success('提交成功!');
          } else {
            this.$Message.error('表单验证失败!');
          }
        })
      },

      //-------- 模态框 -----------//
      // 增加
      add() {
        this.openModel('add')
      },
      // 增加
      edit() {
        this.openModel('edit')
      },
      // 取消
      cancel(targer) {
        this[targer + 'Modal'] = false;
      },
      // 删除
      remove() {
        if (!this.isSelected()) return;
        this.operailityData = this.multipleSelection;
        this.openModel('remove');
      },
      // 回调
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
      }
    },
    created() {
      this.init()
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
      edit
    }
  }

</script>

<style>
  .buttonList {
    margin-bottom: 10px;
  }

</style>
