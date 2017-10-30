<!--
****--@name     ${*}
****--@role     ${*}
****--@date     2017/9/6
****--@author   yc
-->
<template>
  <el-row class="uwContent">
    <template v-if="arr.length">
      <div v-for="(item,i) in arr" :key="i">
        <el-col :span="14">【{{ item.types }}】 {{ item.title }}</el-col>
        <el-col :span="5" :offset="1">{{ item.times || '-' }}</el-col>
        <el-col :span="2" align="right">
          <el-button type="text" @click="needTodo(item)">办理</el-button>
        </el-col>
      </div>
    </template>
    <p v-else class="uwContentNoDataTips">暂无相关事项</p>
  </el-row>
</template>
<style>
  .uwContentNoDataTips {
    text-align: center;
    line-height: 300px;
  }
</style>
<script>
  /*当前组件必要引入*/

  //当前组件引入全局的util
  let Util = null;
  export default {
    props: ['contentType'],
    data() {
      return {
        arr: [],
      }
    },
    methods: {
      //初始化请求列表数据
      init() {
        this.getArrs()
      },
      getArrs() {
        this.arr = this.$store.getters['work/todoItems/workHandleArr'](this.contentType);
//        console.log(this.arr)
      },
      // 待办事宜 办理
      needTodo(item) {
        this.showMess(item.title)
      },
    },
    created() {
      this.init();
    },
    mounted() {
    },
    components: {},
    watch: {
      contentType(val) {
        this.getArrs()
      }
    }
  }

</script>
