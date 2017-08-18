<template>
  <!-- 课程简介 - 查看 -->
  <div v-html="remark"></div>
</template>

<script>
  export default {
    data() {
      return {
        remark: '',
      }
    },
    methods: {
      // 初始化
      init() {
        this.remark = this.$store.state.curriculum.look.course.remark;
      },
    },
    created() {
      this.init()
    }
  }

</script>

<style>
  /* 课程简介 - 查看 */

</style>
