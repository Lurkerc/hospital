<template>
  <!-- 在线学习导航 -->
  <div class="coursesNavMain">
    <el-row>
      <!-- 8 6 4 3 -->
      <el-col class="coursesNavItem" :lg="2" :md="3" :sm="5" :xs="7" v-for="(item,index) in 10" :key="index">
        <div class="coursesNavText" :class="{'active': index === 0 }">
          <p class="overflow-txt1">菜单{{ item }}</p>
        </div>
      </el-col>
    </el-row>
    <el-tabs class="coursesNavChild" v-model="navActiveName" type="card" @tab-click="handleClick">
      <el-tab-pane label="用户管理" name="first"></el-tab-pane>
      <el-tab-pane label="配置管理" name="second"></el-tab-pane>
      <el-tab-pane label="角色管理" name="third"></el-tab-pane>
      <el-tab-pane label="定时任务补偿" name="fourth"></el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        navActiveName: ''
      }
    },
    methods: {
      handleClick() {

      },
    }
  }

</script>

<style lang="scss">
  /* 在线学习导航 */

  .coursesNavMain {
    background: #eaedf1;
  }

  .coursesNavItem {
    margin: 20px 2% 0;
  }

  .coursesNavText {
    font-size: 16px;
    padding: 0 16px;
    p {
      line-height: 32px;
      cursor: pointer;
    }
    &.active {
      background-color: #58B7FF;
      color: #fff;
    }
  }

  .coursesNavChild {
    margin-top: 20px;
    padding: 0 2%;
    .el-tabs__header {
      margin: 0;
      border-bottom: none;
      border-top: 1px solid #d1dbe5;
      .el-tabs__item {
        &,
        &.is-active {
          border: none;
        }
      }
    }
    .el-tabs__content {
      display: none;
    }
    .el-tabs__nav-next,
    .el-tabs__nav-prev {
      line-height: 42px;
    }
  }

</style>
