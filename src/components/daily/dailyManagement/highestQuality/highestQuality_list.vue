
<!--日常管理-->
<!--评优-->


<template>
  <div style="height: 100%;position: relative;">
    <el-steps :space="170" :active="active" class="lose-margin2" >
      <button @click="switched(1)" class="step"></button>;
      <el-step  title="评优项目管理" ></el-step>
      <button @click="switched(2)" class="step"></button>;
      <el-step title="自荐审核" ></el-step>
      <button @click="switched(3)" class="step"></button>;
      <el-step title="评分" ></el-step>
      <button @click="switched(4)" class="step"></button>;
      <el-step title="组织投票" ></el-step>
      <button @click="switched(5)" class="step"></button>;
      <el-step title="公告" ></el-step>
      <button @click="switched(6)" class="step"></button>;
      <el-step title="奖学金"></el-step>
    </el-steps>
<!--评优项目管理-->
    <div  v-show="active == 1" class="autoLayerContent">

      <project-management v-if="1 <= step && active == 1"></project-management>

    </div>
    <!--自荐审核-->
    <div v-show="active == 2" class="autoLayerContent">

        <recommend v-if="2 <= step && active == 2" ></recommend>

    </div>
    <!--评分-->
    <div v-show="active == 3" class="autoLayerContent">
        <score v-if="3 <= step && active == 3" ></score>
    </div>
    <!--组织投票-->
    <div v-show="active == 4" class="autoLayerContent">
        <Organizationa-voting v-if="4<= step && active == 4" ></Organizationa-voting>
    </div>
    <!--公告-->
    <div v-show="active == 5" class="autoLayerContent">
        <notice v-if="5 <= step && active == 5" ></notice>
    </div>
    <!--奖学金-->
    <div v-show="active == 6" class="autoLayerContent">
        <scholarship v-if="6 <= step && active == 6" ></scholarship>
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
  //引入--评优项目管理--
  import projectManagement from './projectManagement/projectManagement_list.vue';
  //引入--自荐审核--
  import recommend from './recommend/recommend_list.vue';
  //引入--评分--
  import score from './score/score_list.vue';
  //引入--组织投票--
  import OrganizationaVoting from './OrganizationaVoting/OrganizationaVoting_list.vue';
  //引入--公告--
  import notice from './notice/notice_list.vue';
  //引入--奖学金--
  import scholarship from './scholarship/scholarship_list.vue';
  export default{
    data(){
      return{
        active:1,
        step:6
      }
    },
    methods:{
      switched(index){
        this.active = index;
      }
    },
  components:{
    projectManagement,recommend,score,OrganizationaVoting,notice,scholarship
    }
  }
</script>
