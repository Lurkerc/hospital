
<!--日常管理-->
<!--评优-->


<template>
  <div>
    <el-steps :space="170" :active="active" class="lose-margin2" >
      <button @click="switched(1)" class="step"></button>;
      <el-step  title="自荐" ></el-step>
      <button @click="switched(2)" class="step"></button>;
      <el-step title="评分" ></el-step>
      <button @click="switched(3)" class="step"></button>;
      <el-step title="民主投票"></el-step>
      <button @click="switched(4)" class="step"></button>;
      <el-step title="奖学金"></el-step>
    </el-steps>

    <!--自荐-->
    <div v-show="active == 1" class="autoLayerContent">
        <recommend v-if="2 <= step && active == 1" ></recommend>
    </div>
    <!--评分-->
    <div v-show="active == 2" class="autoLayerContent">
        <score v-if="3 <= step && active == 2" ></score>
    </div>
    <!--民主投票-->
    <div v-show="active == 3" class="autoLayerContent">
        <democratic-vote v-if="3<= step && active == 3" ></democratic-vote>
    </div>

    <!--奖学金-->
    <div v-show="active == 4" class="autoLayerContent">
        <scholarship v-if="4 <= step && active == 4" ></scholarship>
    </div>


  </div>
</template>
<style>
  .autoLayerContent{
    position: absolute;
    top: 100px;
    bottom: 0;
    left: 0;
    right: 0;
  }
</style>
<script>
  //引入--自荐审核--
  import recommend from './recommend_study/recommend_list.vue';
  //引入--评分--
  import score from './score/score_list.vue';
  //引入--民主投票--
  import democraticVote from './democraticVote/democraticVote_list.vue';
  //引入--奖学金--
  import scholarship from './scholarship/scholarship_study_list.vue';
  export default{
    data(){
      return{
        active:1,
        step:4
      }
    },
    methods:{
      switched(index){
        this.active = index;
      }
    },
  components:{
    recommend,score,democraticVote,scholarship
    }
  }
</script>
