<template>
  <!-- 评测与作业 - 查看 -->
  <div>
    <eq-list v-if="eqView === 'list'" @show="show"></eq-list>
    <div  v-if="eqView === 'subject'">
      <div style="text-align: right"> <el-button type="primary" @click="callBack">返回</el-button></div>
      <eq-subject :eqData="eqData" @show="show"></eq-subject>
    </div>

  </div>
</template>

<script>
  import eqList from './EO_list'; // 试题列表
  import eqSubject from './EO_subject'; // 试题
  export default {
    data() {
      return {
        eqView: 'list',
        eqData: {
          // type,
          // itemData
        },
      }
    },
    methods: {
      // 初始化
      show(view, data) {
        this.eqView = view;
        this.eqData = data;
      },


      //返回
      callBack(){
        this.eqView = 'list';

      },
    },
    components: {
      eqList,
      eqSubject
    }
  }

</script>

<style>
  /* 评测与作业 - 查看 */

  .eqViewItem {
    margin: 10px 0 20px 0;
  }

  .eqTestBtn {
    float: right;
    margin: 6px;
  }

</style>
