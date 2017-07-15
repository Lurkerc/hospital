<template>
  <!-- 工作台 -->
  <work-layout>
    <div slot="notice">通知：没有通知！</div>
    <div slot="content">
      <!-- 学生事项 -->
      <content-item v-if="isStudent">
        <student-dep></student-dep>
      </content-item>
      <!-- 下一个内容项 -->
      <content-item>
        <div slot="title" class="uwHeader">
          <h3 class="userOperate left">待办事宜</h3>
          <span class="uwNum">20</span>
        </div>
        <el-row class="uwContent">
          <div v-for="i in 5" :key="i">
            <el-col :span="14">【请假】 张三事假2017-1-1至2017-1-{{ i }}共{{ i }}天</el-col>
            <el-col :span="5" :offset="1">2017/1/{{ i }}</el-col>
            <el-col :span="2" align="right">
              <el-button type="text" @click="needTodo">办理</el-button>
            </el-col>
          </div>
        </el-row>
      </content-item>
    </div>
    <div slot="right">
      <!-- 用户资料 -->
      <smalls-item>
        <user-info></user-info>
      </smalls-item>
      <!-- 事项队列 -->
      <smalls-item>
        <ul class="uwTodoList">
          <li class="uwtItem">
            <span class="uwtTitle dbsy">待办事宜</span>
            <span class="uwNum">10000</span>
          </li>
          <li class="uwtItem">
            <span class="uwtTitle ybsy">已办事宜</span>
            <span class="uwNum red">2</span>
          </li>
          <li class="uwtItem">
            <span class="uwtTitle tzgg">通知公告</span>
            <span class="uwNum green">20</span>
          </li>
        </ul>
      </smalls-item>
      <!-- 日期控件 -->
    </div>
  </work-layout>
</template>

<script>
  import workLayout from './workBench/layout/work'; // 工作台布局基础
  import smallsItem from './workBench/layout/smallItem'; // 小项
  import contentItem from './workBench/layout/contentItem'; // 内容项
  import userInfo from './workBench/layout/userInfo'; // 用户信息
  import studentDep from './workbench/layout/studenDep'; // 学生科室情况

  export default {
    data() {
      return {
        // isStudent: false,
      }
    },
    methods: {
      // 待办事宜 办理
      needTodo() {
        this.showMess('点啥呢...')
      },
    },
    components: {
      workLayout,
      smallsItem,
      contentItem,
      userInfo,
      studentDep,
    },
    computed: {
      // 是否是学生
      isStudent() {
        let info = this.$store.getters.getUserInfo || {};
        let isStudent = false;
        let student = ['SXS', 'ZYY', 'JXS', 'YJS'];
        if (info.roleList) {
          isStudent = student.indexOf(info.roleList[0].identify) > -1
        }
        return isStudent;
      }
    }
  }

</script>

<style>
  /* 工作台 */

</style>
