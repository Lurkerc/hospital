<template>
  <!-- 课程教学大纲 - 查看 -->
  <div v-html="outline"></div>
</template>

<script>
  export default {
    data() {
      return {
        outline: '',
      }
    },
    methods: {
      // 初始化
      init() {
        this.outline = this.$store.state.curriculum.look.course.outline;
      },
    },
    created() {
      this.init()
    }
  }

</script>

<style>
  /* 课程教学大纲 - 查看 */

</style>
