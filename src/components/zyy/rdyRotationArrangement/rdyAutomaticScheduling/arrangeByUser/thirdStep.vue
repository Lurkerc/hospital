<!----------------------------------
****--选择培训标准(thirdStep)
****--@date     2017/7/23
****--@author   zyc<332533011@qq.com
----------------------------------->
<template>
  <el-radio-group v-model="radio" style="width: 100%;">
    <el-table
      :data="tableData1"
      height="480"
      border
      style="width: 100%">
      <el-table-column
        label=""
        width="50">
        <template scope="scope">
          <el-radio class="radio" :label="scope.row">&nbsp;</el-radio>
        </template>
      </el-table-column>
      <el-table-column
        prop="depName"
        label="基地名">
      </el-table-column>
      <el-table-column
        prop="name"
        label="培训标准名称">
      </el-table-column>
      <el-table-column
        prop="specialty"
        label="专业"
        width="180">
      </el-table-column>
      <el-table-column
        prop="highestEdu"
        label="学历"
        width="180">
      </el-table-column>
    </el-table>
  </el-radio-group>
</template>
<script>
  /*当前组件必要引入*/

  //当前组件引入全局的util
  let Util = null;
  export default{
    data() {
      return {
        radio:"",
        tableData1: [{
          id: '1',
          depName: '内科基地名称1',
          name: '内科培训细则1',
          specialty: '内科',
          highestEdu:"本科",
        }, {
          id: '2',
          depName: '内科基地名称2',
          name: '内科培训细则2',
          specialty: '内科',
          highestEdu:"本科",
        }]
      }
    },
    methods: {
      //初始化请求列表数据
      init(){

      },

    },
    watch:{
      radio(val){
        this.$emit("setThirdVal",val);
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

