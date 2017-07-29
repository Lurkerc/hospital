<!-- 基础教务 - 资源库管理 - 创建标准课程 -->
<template>
  <layout>
    <!-- 菜单 -->
    <div slot="menu">
      <nmenu-item :class="{'active':menuActive === 'basic'}" name="basic" @click="menuClick">课程基本信息</nmenu-item>
      <nmenu-item :class="{'active':menuActive === 'intro'}" name="intro" @click="menuClick">课程简介</nmenu-item>
      <nmenu-item :class="{'active':menuActive === 'outline'}" name="outline" @click="menuClick">课程教学大纲</nmenu-item>
      <nmenu-item :class="{'active':menuActive === 'plan'}" name="plan" @click="menuClick">教学计划</nmenu-item>
      <nmenu-item :class="{'active':menuActive === 'courseware'}" name="courseware" @click="menuClick">课件</nmenu-item>
      <nmenu-item :class="{'active':menuActive === 'EO'}" name="EO" @click="menuClick">评测与作业</nmenu-item>
      <nmenu-item :class="{'active':menuActive === 'TQVInfo'}" name="TQVInfo" @click="menuClick">教学质量评价表</nmenu-item>
      <nmenu-item :class="{'active':menuActive === 'TREInfo'}" name="TREInfo" @click="menuClick">试运行评估表</nmenu-item>
    </div>
    <!-- 底部 -->
    <div align="center" slot="footer">
      <el-button type="info">保存草稿</el-button>
      <el-button type="success">提交审核</el-button>
    </div>
    <!-- 内容 -->
    1
  </layout>
</template>

<script>
  /*当前组件必要引入*/
  import layout from "./components/layout";
  import nmenuItem from './components/menu';

  //当前组件引入全局的util
  let Util = null;
  export default {
    data() {
      return {
        menuActive: 'basic', // 激活菜单
      }
    },
    methods: {
      menuClick(menu, ...other) {
        this.menuActive = menu;
        console.log(menu, ...other)
      }
    },

    //初始化组件
    created() {},

    mounted() {},

    components: {
      layout,
      nmenuItem
    }

  }

</script>
<style lang="scss">


</style>
