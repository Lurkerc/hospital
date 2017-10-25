<template>
  <div>
    <el-row>
      <el-col :span="8" :offset="14">
        <el-form labelWidth="160px">
          <el-form-item label="输入房间号进行筛选：">
            <el-input placeholder="请输入房间号" v-model="roomNum" @input="search">
              <!--<el-button slot="append" icon="search" @click="search"></el-button>-->
            </el-input>
          </el-form-item>
        </el-form>
      </el-col>
      <el-col :span="20" :offset="2">
          <el-table ref="multipleTable" align="center" :context="self" :data="tableData" tooltip-effect="dark" :height="dynamicHt"
            style="width: 100%" @selection-change="handleSelectionChange">
            <el-table-column type="selection" :selectable="selectable" width="55"></el-table-column>
            <el-table-column label="房间号" prop="roomNum" align="center"></el-table-column>
            <el-table-column label="房间名称" prop="roomName" show-overflow-tooltip></el-table-column>
            <el-table-column label="可容量" prop="capacity" show-overflow-tooltip></el-table-column>
            <el-table-column label="简介" prop="summary" show-overflow-tooltip></el-table-column>
          </el-table>
        <!-- 分页按钮 -->
        <!--<div style="float: right;margin-top:10px;">
          <el-pagination @size-change="changePageSize" @current-change="changePage" :current-page="myPages.currentPage" :page-sizes="myPages.pageSizes"
            :page-size="myPages.pageSize" layout="total, sizes, prev, pager, next, jumper" :total="myPages.listTotal"></el-pagination>
        </div>-->
      </el-col>
      <div style="clear:both;padding-top:20px;">
        <el-col :span="6" :offset="6" align="center">
          <el-button type="primary" @click="selectRoom">确定</el-button>
        </el-col>
        <el-col :span="6" align="center">
          <el-button @click="cancel">取消</el-button>
        </el-col>
      </div>
    </el-row>
  </div>
</template>

<script>
  // 使用组件需在父组件data中定义：selectRoomModal:false
  // 需要传递请求相关参数：urlParams:{path:api路径，method:请求方法}
  // 点击确定将触发‘select’自定义方法返回选中的数据对象集：[{}]
  let Util = null;
  export default {
    props: {
      urlParams: {
        type: Object,
        default: () => ({
          path: 'room/select/list', // api路径
          method: 'get', // 请求方法
        })
      },
      select: { // 已经选中的id集合（数组）
        type: Array,
        default: () => []
      },
      selectOne: { // 是否只选一个
        type: Boolean,
        default: false
      },
      disSelect: { // 不允许选择房间(需要配合状态使用)
        type: Boolean,
        default: false
      },
      unSelectRoom: { // 禁选房间
        type: Array,
        default: () => []
      }
    },
    data() {
      return {
        self: this,
        roomNum: '', // 搜索房间号
        dynamicHt: 300,
        selectData: [], // 已选择的数据
        tableData: [],
        allData:[],
      }
    },
    methods: {
      init: function () {
        Util = this.$util;
        //ajax请求参数设置
        this.myPages = Util.pageInitPrams;

        this.queryQptions = {
          url: this.urlParams.path,
          params: {
//            curPage: 1,
//            pageSize: Util.pageInitPrams.pageSize
          }
        }

        this.setTableData()
      },
      //*----------- 表格 ------------*//
      /*
       * checkbox 选择后触发事件
       * @param val Array 存在所有的选择每一个行数据
       */
      handleSelectionChange(val) {
        this.selectData = val;
      },
      /*
       * 表格是否可选
       **/
      selectable(row) {
        let tag = true;
        // // 表格开启了是否选择
        if (this.disSelect && (this.unSelectRoom.indexOf(+row.id) > -1)) {
          tag = false;
        }
        return tag
      },
      /*
       * 设置表格数据
       * @param isLoading Boolean 是否加载
       */
      setTableData(isLoading) {
        this.ajax({
          ajaxSuccess: 'listDataSuccess',
          ajaxParams: this.queryQptions
        }, isLoading)
      },
      // 数据请求成功回调
      listDataSuccess(res, m, loading) {
        this.listTotal = res.totalCount || 0;
        this.tableData = res.data;
        this.allData = res.data;
        this.$nextTick(() => {
          if (this.select.length) {
            let thisPageIds = [];
            let rowIndex;
            res.data.map(item => thisPageIds.push(item.id));
            this.select.map(id => {
              rowIndex = thisPageIds.indexOf(id);
              if (rowIndex > -1) {
                this.$refs.multipleTable.toggleRowSelection(this.tableData[rowIndex]); // 选中数据
              }
            })
          }
        })
      },
      /*
       * 列表数据只能选择一个
       * @param isOnly true  是否只选择一个
       */
      isSelected(isOnly) {
        let len = this.selectData.length;
        let flag = true;
        if (len == 0) {
          this.showMess("请选择房间！");
          flag = false;
        }
        if (len > 1 && isOnly) {
          this.showMess("只能选择一个房间!")
          flag = false;
        }
        return flag;
      },
      /**************** 按钮交互 ***************/
      // 取消
      cancel() {
        this.$emit('cancel', 'selectRoom')
      },
      // 确定
      selectRoom() {
        if (this.isSelected(this.selectOne)) {
          this.$emit('select', this.selectData)
        }
      },
      search() {
        let arr = [];
        (this.allData || []).map(item=>{
          if (~item.roomNum.indexOf(this.roomNum)){
            arr.push(item)
          }
        })
        this.tableData = arr
      }
    },
    created() {
      this.init()
    }
  }

</script>

<style>


</style>
