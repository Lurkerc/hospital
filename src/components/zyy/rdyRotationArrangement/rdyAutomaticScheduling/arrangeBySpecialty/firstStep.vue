<!----------------------------------
****--选择基地(firstStep)
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
      prop="name"
      label="基地名">
    </el-table-column>
    <el-table-column
      prop="specialty"
      label="专业"
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
                name: '内科基地',
                specialty: '内科'
              }, {
                id: '2',
                name: '外科基地',
                specialty: '外科'
              }]
            }
        },
        methods: {
            //初始化请求列表数据
            init(){

            },

        },
        created(){
            this.init();
        },
        watch:{
          radio(val){
            this.$emit("setFirstVal",val);
          }
        },
        mounted(){},
        components: {}
    }
</script>
