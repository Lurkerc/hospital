<template>
  <!-- 选项标准课程 -->
  <div>
    <!-- 选择课程 -->
    <norm-course-select v-if="courseActiveName === 'select'" @select="selectCourseCall"></norm-course-select>
    <!-- 编辑课程 -->
    <course-edit v-if="courseActiveName === 'add'" :operaility-data="selectCourse" style="height:100%">
      <!-- <slot slot="preMenu" name="test" text="测试"></slot> -->
    </course-edit>
    <!-- 询问弹窗 -->
    <Modal :mask-closable="false" v-model="askModal" class-name="vertical-center-modal" :width="500">
      <modal-header slot="header" :content="askId"></modal-header>
      <div>
        <div class="remove">是否确定不选择已有标准课程资源,创建新的授课？</div>
        <el-row>
          <el-col align="center">
            <el-button type="info" @click="createCourse">确定</el-button>
            <el-button class="but-col" @click="cancelAsk">取消</el-button>
          </el-col>
        </el-row>
      </div>
      <div slot="footer"></div>
    </Modal>
  </div>
</template>

<script>
  import courseEdit from '../../../teach/teacherResManagement/normCourse/normCourse_edit'; // 基础添加
  import nmenuItem from '../../../teach/teacherResManagement/normCourse/_components/menu'; // 菜单项
  import normCourseSelect from '../../../teach/teacherResManagement/normCourse/normCourse_select';

  export default {
    data() {
      return {
        askModal: false,
        courseActiveName: 'select',
        askId: {
          id: 'askId',
          title: '提示',
        },
        selectCourse: null,
      }
    },
    methods: {
      // 选择标准课程
      selectCourseCall(selObj) {
        if (selObj) {
          this.selectCourse = selObj;
          this.courseActiveName = 'add';
        } else {
          this.askModal = true
        }
      },
      // 创建新的课程
      createCourse() {
        this.cancelAsk();
        this.courseActiveName = 'add';
      },
      // 关闭询问窗口
      cancelAsk() {
        this.askModal = false;
      },
    },
    components: {
      courseEdit,
      nmenuItem,
      normCourseSelect
    }
  }

</script>

<style>
  /* 选项标准课程 */

</style>
