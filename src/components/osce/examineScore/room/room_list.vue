<template>
  <!-- 列表数据 -->
  <div class="msiListContent">
    <div class="msiListContentItem" v-for="item in list" @click="show(item.nowIndex)" v-if="!hasList()">
      <img :src="item.userPhotoPath">
      <p>{{ item.userName }}</p>
      <p>{{ getTimeText(item) }}</p>
      <p>得分：{{ item.mark || 0}}</p>
    </div>
    <p v-else>暂无数据</p>
  </div>
</template>

<script>
  export default {
    props: ['list'],
    methods: {
      // 查看考生考试详情
      show(index) {
        this.$emit('lookStudent', index)
      },
      // 是否有值
      hasList() {
        return this.$util.isEmptyObject(this.list)
      },
      // 时间转换
      getTimeText(row) {
        return this.conductDate(row.startTime, 'HH:mm') + ' - ' + this.conductDate(row.endTime, 'HH:mm')
      }
    }
  }

</script>
