<template>
  <!-- 考核安排 -->
  <div>
    <keep-alive>
      <plan-index v-if="examinePlanActive === 'index'" @show="show"></plan-index>
    </keep-alive>
    <plan-view v-if="examinePlanActive === 'view'" :stitle="title" :id="id" :sceneType="sceneType" @show="show"></plan-view>
  </div>
</template>

<script>
  import planIndex from './examinePlan_index'; // 列表数据
  import planView from './examinePlanView/examinePlanView'; // 时间表查看
  export default {
    data() {
      return {
        id: 0, // 查看的场次id
        title: '-', // 场次标题 
        sceneType: '',
        examinePlanActive: 'index', // 视图切换
      }
    },
    methods: {
      show(res) {
        this.id = res.id || 0;
        this.title = res.title || '';
        this.sceneType = res.sceneType || '';
        this.examinePlanActive = res.view;
      }
    },
    components: {
      planIndex,
      planView
    }
  }

</script>

<style>


</style>
