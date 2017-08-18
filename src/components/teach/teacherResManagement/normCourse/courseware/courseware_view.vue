<template>
  <!-- 评测与作业 - 查看 -->
  <div>
    <cw-list v-if="cwView === 'list'" @show="show"></cw-list>
    <div v-if="cwView === 'player'">
      <!-- <div style="text-align: right">
        <el-button type="primary" @click="callBack">返回</el-button>
      </div> -->
      <cw-player :cwData="cwData" @show="show"></cw-player>
    </div>

  </div>
</template>

<script>
  import cwList from './view/list'; // 试题列表
  import cwPlayer from './view/player'; // 试题
  export default {
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
