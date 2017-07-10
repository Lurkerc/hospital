<!--
**** 科研日志填写
**** @date     2017/7/3
**** @author   gx
-->
<template>
  <div>
    <el-form>
      <el-row>
        <el-col :span="8">
          <el-button size="small" type="success">添加</el-button>
          <el-button size="small" type="danger">删除</el-button>
          <el-button size="small" type="info">导出科研日志到World</el-button>
        </el-col>
        <el-col :span="16" align="right">
          <el-form-item label="标题：">
            <!--<el-input v-model=""></el-input>-->
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
  </div>
</template>
<script>
  /*当前组件必要引入*/

  //当前组件引入全局的util
  let Util = null;
  export default {
    data() {
      return {
        searchObj: {

        }
      }
    },
    methods: {
      //初始化请求列表数据
      init() {
      },

    },
    created() {
      this.init();
    },
    mounted() {},
    components: {}
  }

</script>
