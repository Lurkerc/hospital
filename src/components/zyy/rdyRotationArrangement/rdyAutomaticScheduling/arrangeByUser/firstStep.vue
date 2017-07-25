<!----------------------------------
****--选择人员(firstStep)
****--@date     2017/7/23
****--@author   zyc<332533011@qq.com
----------------------------------->
<template>
  <el-table
    stripe
    ref="multipleTable"
    align="center"
    height="480"
    :context="self"
    :data="tableData1"
    tooltip-effect="dark"
    highlight-current-row
    style="width: 100%;height: 100%"
    @selection-change="handleSelectionChange">
    <el-table-column
      type="selection"
      width="55">
    </el-table-column>
    <el-table-column
      align="center"
      label="序号"
      prop="index"
      width="75">
      <template scope="scope">
        <span>{{scope.$index+1}}</span>
      </template>
    </el-table-column>
    <el-table-column
      prop="userName"
      label="姓名"
      width="160"
      show-overflow-tooltip>
    </el-table-column>
    <el-table-column
      prop="specialty"
      label="专业"
      show-overflow-tooltip>
    </el-table-column>
    <el-table-column
      prop="highestEdu"
      label="学历"
      align="center"
      width="200">
    </el-table-column>
    <el-table-column
      prop="year"
      label="培训年限"
      align="center"
      width="150">
    </el-table-column>
  </el-table>
</template>
<script>
  /*当前组件必要引入*/

  //当前组件引入全局的util
  let Util = null;
  export default{
    props:["initUser"],
    data() {
      return {
        multipleSelection: this.initUser,
        dynamicHt: 100,
        self: this,
        loading:false,
        listTotal:0,
        tableData1: [{
          id: '1',
          userName: '张三',
          specialty: '内科',
          highestEdu:"本科",
          year:2,
        }, {
          id: '2',
          userName: '黄飞鸿',
          specialty: '内科',
          highestEdu:"博士",
          year:2,
        }]
      }
    },
    methods: {
      //初始化请求列表数据
      init(){

      },


      //通过get请求列表数据
      updateListData(responseData){
        let data = responseData.data;
        this.tableData1=[];
        this.tableData1=data;
        for(var i=0,item;i<data.length;i++){
          item = data[i];
          item["index"] = i;
          this.dataObj[item["userId"]] = item;
        }
        this.$nextTick(function () {
          let tempArr = this.multipleSelection;
          for (var i = 0,idx; i < tempArr.length; i++) {
            idx = this.dataObj[tempArr[i]["userId"]]["index"];
            this.$refs.multipleTable.toggleRowSelection(this.tableData1[idx], true);
          }
        })
        //this.listTotal = responseData.totalCount || 0;
      },


      /*
       * checkbox 选择后触发事件
       * @param val Array 存在所有的选择每一个行数据
       */
      handleSelectionChange(val) {
        this.multipleSelection = val;
      },

    },
    watch:{
      multipleSelection(val){
        if(val.length>0){
          this.$emit("setFirstVal",val);
        }
      }
    },
    created(){
      this.init();
    },
    mounted(){
    },
    components: {}
  }
</script>
