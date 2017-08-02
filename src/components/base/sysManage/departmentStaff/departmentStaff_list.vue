<!--系统管理-->
<!--部门人员管理-->
<template>
  <layout-tree>
    <left-tree slot="left" @setCurrSltNodeId="setTreeDepId" @tree-click="treeClick" @tree-remove-node="treeRemoveNode" :treeOptions="treeDefaults"
      :fromWhereTreeType="fromWhereTree"></left-tree>
    <!-- 住院医人员管理 -->
    <zyy-content v-if="viewTypes === 'ZYY'" slot="right" :deptId="deptId"></zyy-content>
    <!-- 默认部门人员管理 -->
    <dep-content v-else slot="right" :deptId="deptId"></dep-content>
  </layout-tree>
</template>
<style>
  .el-select .el-input {
    width: 110px;
  }

</style>
<script>
  /*当前组件必要引入*/
  import layoutTree from "../../../common/layoutTree.vue";
  import leftTree from "../../../common/leftTree.vue";
  // 默认部门人员
  import depContent from "./departmentStaff_content";
  // 住院医部门人员
  import zyyContent from "../../../zyy/rdyEnrollEnroll/rdyPersonnelManagement/rdyPersonnelManagement_content";

  //当前组件引入全局的util
  let Util = null;
  let store = null;
  export default {
    data() {
      return {
        viewTypes: '', // 视图类型
        //tree默认项设置
        treeDefaults: {
          getTreeUrl: "/dept/tree-by-manager",
          getDataUrl: '',
          isShowMenus: true,
        },
        fromWhereTree: "user",

        //查询表单
        deleteUrl: '/role/remove',
        //当前tree选中的node id
        deptId: '',
      }
    },
    methods: {

      //初始化请求列表数据
      init() {
        Util = this.$util;
      },


      /*
       * 左侧目录树节点click调用父组件方法
       *
       * @param obj {} 当前选中节点的一级数据
       *
       * @param node  {}  整个tree节点所有数据
       *
       * @param  self  {}  当前tree vue实例
       *
       * */
      treeClick(obj, node, self) {
        // 记录视图
        this.viewTypes = obj.types;
        this.setTreeDepId(obj.id);
      },


      /*
       * 删除目录树回调
       *
       * */
      treeRemoveNode() {
        this.deptId = '';
      },


      /*
       *  初始化或者刷新数列表的时候  调用treeClick函数 为deptId赋值
       * */
      treeClickInit(obj) {
        this.treeClick(obj)
      },

      /*
       * 设置当前部门Id
       * */
      setTreeDepId(id) {
        if (id) {
          this.deptId = id;
        }
      },

    },

    //初始化组件
    created() {
      this.init();
    },

    components: {
      //当前组件引入的子组件
      depContent,
      zyyContent,
      layoutTree,
      leftTree
    }
  }

</script>
<style>
  .add-remove {
    margin-bottom: 20px;
  }

  .header {
    height: 30px;
    font-size: 18px;
    color: #ffffff;
  }

</style>
