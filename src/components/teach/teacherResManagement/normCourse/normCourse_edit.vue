<!-- 基础教务 - 资源库管理 - 修改标准课程 -->
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
      <!-- <nmenu-item :class="{'active':menuActive === 'TREInfo'}" name="TREInfo" @click="menuClick">试运行评估表</nmenu-item> -->
    </div>
    <!-- 底部 -->
    <div align="center" slot="footer">
      <el-button type="info" @click="saveCall">保存草稿</el-button>
      <el-button type="success" @click="submitCall">提交审核</el-button>
    </div>
    <!-- 内容 start -->
    <!-- 课程基本信息 -->
    <basic-edit v-if="menuActive === 'basic'" ref="basic"></basic-edit>
    <!-- 课程简介 -->
    <intro-edit v-if="menuActive === 'intro'" ref="intro"></intro-edit>
    <!-- 课程教学大纲 -->
    <outline-edit v-if="menuActive === 'outline'" ref="outline"></outline-edit>
    <!-- 教学计划 -->
    <plan-edit v-if="menuActive === 'plan'" ref="plan"></plan-edit>
    <!-- 课件 -->
    <courseware-edit v-if="menuActive === 'courseware'" ref="courseware"></courseware-edit>
    <!-- 评测与作业 -->
    <eo-edit v-if="menuActive === 'EO'" ref="EO"></eo-edit>
    <!-- 教学质量评价表 -->
    <tqv-info-edit v-if="menuActive === 'TQVInfo'" ref="TQVInfo"></tqv-info-edit>
    <!-- 试运行评估表 -->
    <!-- <tre-info-edit v-if="menuActive === 'TREInfo'" ref="TREInfo"></tre-info-edit> -->
    <!-- 内容 end -->
  </layout>
</template>

<script>
  /*当前组件必要引入*/
  import layout from "./_components/layout"; // 基础布局
  import nmenuItem from './_components/menu'; // 菜单项

  import basicEdit from './basic/basic_edit'; // 课程基本信息
  import introEdit from './intro/intro_edit'; // 课程简介
  import outlineEdit from './outline/outline_edit'; // 课程教学大纲
  import planEdit from './plan/plan_edit'; // 教学计划
  import coursewareEdit from './courseware/courseware_edit'; // 课件
  import eoEdit from './EO/EO_edit'; // 评测与作业
  import tqvInfoEdit from './TQVInfo/TQVInfo_edit'; // 教学质量评价表
  // import treInfoEdit from './TREInfo/TREInfo_edit'; // 试运行评估表

  // 测试数据
  import testData from './getData';
  export default {
    props: ['operailityData'],
    data() {
      return {
        menuActive: 'basic', // 激活菜单
      }
    },
    methods: {
      // 菜单点击
      menuClick(menu) {
        // 保存数据到store之后才能切到目标菜单
        this.$refs[this.menuActive].saveToStore() && (this.menuActive = menu);
      },
      // 保存 调用子组件的save方法
      saveCall() {
        // return this.$refs[this.menuActive].submitData()
      },
      // 提交审核
      submitCall() {
        // 提交审核成功之后触发父级组件的add事件
        // if (this.$refs[this.menuActive].submitData('submit')) {
        //   // this.$emit('add')
        // }
      },
      // 获取查看数据
      getViewData() {
        this.$store.commit('curriculum/data/updateData', this.$util._.defaultsDeep({}, testData))
        return
        this.ajax({
          ajaxSuccess: res => this.$store.commit('curriculum/data/updateData', res.data),
          ajaxParams: {
            url: api.get.path + this.operailityData.id,
            method: api.get.method
          }
        })
      },
    },

    //初始化组件
    created() {
      this.$store.commit('curriculum/data/init');
      this.getViewData();
    },

    // 销毁状态
    destroyed() {
      this.$store.commit('curriculum/data/destroy')
    },

    mounted() {},

    components: {
      layout,
      nmenuItem,
      basicEdit,
      introEdit,
      outlineEdit,
      planEdit,
      coursewareEdit,
      eoEdit,
      tqvInfoEdit,
      // treInfoEdit,
    }

  }

</script>
<style lang="scss">


</style>
