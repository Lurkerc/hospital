<template>
  <!-- 课件 - 查看 -->
  <div>
    <cw-list v-if="cwView === 'list'" @show="show" :showProgress="showProgress"></cw-list>
    <div v-if="cwView === 'player'">
      <cw-player :cwData="cwData" @show="show"></cw-player>
    </div>
  </div>
</template>

<script>
  import cwList from './view/list'; // 课件列表
  import cwPlayer from './view/player'; // 课件查看
  export default {
    // 是否显示进度条
    props: ['showProgress'],
    data() {
      return {
        cwView: 'list',
        cwData: {
          // planIndex 第几课
          // type 课件类型
        },
      }
    },
    methods: {
      // 初始化
      show(view, data) {
        this.cwView = view;
        this.cwData = data;
      },

      //返回
      callBack() {
        this.cwView = 'list';
      },
    },
    components: {
      cwList,
      cwPlayer
    }
  }

</script>
