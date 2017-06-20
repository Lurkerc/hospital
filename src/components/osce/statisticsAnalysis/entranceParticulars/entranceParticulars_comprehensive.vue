<!--综合统计-->
<!---楼房信息管理-->
<template>
  <div id="content" ref="content" class="modal">
    <div class="text-headline">{{data.name}}</div>
    <div>
      <!--表格数据-->
      <div id="myTable" ref="myTable">
        <el-table v-if="data.header" align="center" :height="dynamicHt" :data="data.tableData" tooltip-effect="dark" highlight-current-row
          style="width: 100%;height: 100%">
          <el-table-column align="center" label="序号" type="index" width="100">
          </el-table-column>
          <el-table-column v-for="(item,index) in  data.header.headerData" align="center" :prop="item.key" :label="item.label" :key="index">
          </el-table-column>
        </el-table>

      </div>
    </div>
  </div>
</template>
<script>
  //当前组件引入全局的util
  let Util = null;
  export default {
    props: ['operailityData', 'url'],
    data() {
      return {
        //查询表单
        formValidate: {
          sceneId: this.operailityData.sceneId, //场次id
          statisticsId: this.operailityData.statisticsId, //统计id
        },
        dynamicHt: 100,
        data: {
          header: ''
        },
        totalCount: 0,
        //当前组件默认请求(list)数据时,ajax处理的 基础信息设置
        listMessTitle: {
          ajaxSuccess: 'updateListData',
          ajaxParams: {
            url: this.url.comprehensiveGet,
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
        this.setTableData();
      },
      //设置表格及分页的位置
      setTableDynHeight() {
        let content = this.$refs.content;
        let parHt = content.parentNode.offsetHeight;
        let myTable = this.$refs.myTable;
        let paginationHt = 50;
        this.dynamicHt = parHt - myTable.offsetTop - paginationHt;
      },

      //通过get请求列表数据
      updateListData(responseData) {
        this.data.name = responseData.data.name;
        this.data.header = this.conductHeader(responseData.data.title);
        this.data.tableData = this.conductTable(responseData.data.data);
      },
      setTableData() {
        this.listMessTitle.ajaxParams.params = Object.assign(this.listMessTitle.ajaxParams.params, this.formValidate);
        this.ajax(this.listMessTitle);
      },


      //处理表格头部
      conductHeader(data) {
        let temArr = [];
        let keys = [];
        for (let i = 0; i < data.length; i++) {
          temArr.push({
            label: data[i],
            key: '_key' + i
          });
          keys.push('_key' + i);
        }
        return {
          headerData: temArr,
          keys: keys
        }
      },

      //处理表格数据
      conductTable(data) {
        let keys = this.data.header.keys;
        let temArr = [];
        for (let i = 0; i < data.length; i++) {
          temArr[i] = {};
          for (let k = 0; k < data[i].length; k++) {
            temArr[i][keys[k]] = data[i][k];
          }
        }
        return temArr
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
      //当前组件引入的子组件
    }
  }

</script>
