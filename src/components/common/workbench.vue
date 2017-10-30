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
      <content-item v-if="~['handle','handled'].indexOf(contentType)">
        <div slot="title" class="uwHeader">
          <h3 class="userOperate left">{{ contentType | contentText }}</h3>
          <span class="uwNum">{{ getHandlerData('TotalCount', contentType) }}</span>
        </div>
        <handle-items :contentType="contentType"></handle-items>
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
          <li class="uwtItem" @click="handleTodo('handle')">
            <span class="uwtTitle dbsy">待办事宜</span>
            <span class="uwNum">{{ getHandlerData('TotalCount', 'handle') }}</span>
          </li>
          <li class="uwtItem" @click="handleTodo('handled')">
            <span class="uwtTitle ybsy">已办事宜</span>
            <span class="uwNum red">{{ getHandlerData('TotalCount', 'handled') }}</span>
          </li>
          <li class="uwtItem" @click="handleTodo('notice')">
            <span class="uwtTitle tzgg">通知公告</span>
            <span class="uwNum green">0</span>
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

  import handleItems from './workbench/handleItems/items.vue'; // 事项

  export default {
    data() {
      return {
        contentType: 'handle', // notice公告|handle事项
      }
    },
    methods: {
      init() {
        this.initQueryQptions();
        ['handle', 'handled'].map(item => this.getHandleForServer(item));
      },
      // 初始化查询项
      initQueryQptions() {
        this.queryQptions = {
          url: '/toDoList/listPage',
          params: {
            curPage: 1,
            pageSize: this.$util.pageInitPrams.pageSize
          }
        }
      },
      // 获取事项相关数据
      getHandlerData(type, name) {
        return this.$store.getters['work/todoItems/workHandle' + type](name)
      },
      // 右侧菜单点击
      handleTodo(type) {
        if (this.contentType === type) {
          return
        }
        this.contentType = type;
        this.initQueryQptions();
        if (type !== 'notice') {
          this.getHandleForServer(type);
        }
      },
      // 获取事项
      getHandleForServer(type) {
        this.queryQptions.params.state = type === 'handle' ? '0' : '1';
        let opt = {
          ajaxSuccess: res => {
            this.$store.commit('work/todoItems/update', {type, res});
          },
          ajaxError: () => this.errorMess('获取事项数据失败，请重试...'),
          ajaxParams: this.queryQptions,
        };
        this.ajax(opt)
      },
    },
    components: {
      workLayout,
      smallsItem,
      contentItem,
      userInfo,
      studentDep,
      handleItems,
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
    },
    filters: {
      contentText(val) {
        let text = {
          handle: "待办事宜",
          handled: "已办事宜",
        };
        return text[val] || val
      },
    },
    created() {
      this.init()
    },
  }

</script>

<style>
  /* 工作台 */

</style>
