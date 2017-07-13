<!---自动排班--->
<template>
  <div class="arrangeTab" style="height: 700px;overflow: auto;">
    <el-tabs v-model="activeName"  @tab-click="handleClick">
      <el-tab-pane label="按分组排班" name="arrangeByGroup">
        <keep-alive>
          <by-group v-if="showFirstLab" :isInit="currentTabIdx" style="height: 100%;"></by-group>
        </keep-alive>
      </el-tab-pane>
      <el-tab-pane label="按人员排班" name="arrangeByUser">
        <keep-alive>
          <by-user v-if="showSecondLab" style="height: 100%;"></by-user>
        </keep-alive>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<style>

  .arrangeTab .el-tabs{
    position: relative;
    height: 100%;
  }
  .arrangeTab .el-tabs__content{
    position: absolute;
    left: 0;
    right: 0;
    top:65px;
    bottom: 0;
  }
  .departments .el-tab-pane{
    height: 100%;
  }
</style>
<script>
  import  byGroup from './arrangeByGroup/index.vue'
  import  byUser from './arrangeByUser/index.vue'
  export default {

    data(){
      return{
        activeName:'arrangeByGroup',
        currentTabIdx:"0",
        showFirstLab:true,
        showSecondLab:false,
      }
    },

    methods: {
      handleClick(tab, event) {
        this.currentTabIdx = tab.index;
        if(this.currentTabIdx==0){
          this.showFirstLab=true;
          this.showSecondLab=false;
        }else{
          this.showFirstLab=false;
          this.showSecondLab=true;
        }
      }
    },
    components:{
      byGroup,byUser
    }


  }
</script>
