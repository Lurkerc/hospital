<!-- 住院医 - 报名招录 - 人员管理 -->
<template>
  <layout-tree class="defined-t">
    <left-tree slot="left" @setCurrSltNodeId="setTreeDepId" @tree-click="treeClick" @tree-remove-node="treeRemoveNode" :treeOptions="treeDefaults" :fromWhereTreeType="fromWhereTree"></left-tree>
    <zyy-content slot="right" :deptId="deptId" :fromWhereTree="fromWhereTree"></zyy-content>
  </layout-tree>
</template>
<style>
  .defined-t .el-select .el-input {
    width: 158px;
  }

</style>
<script>
  /*当前组件必要引入*/
  import layoutTree from "../../../common/layoutTree";
  import leftTree from "../../../intern/recruitStudent/usersManagement/tree/leftTree";
  // 住院医部门人员
  import zyyContent from "./rdyPersonnelManagement_content";
  export default {
    data() {
      return {
        //tree默认项设置
        treeDefaults: {
          getTreeUrl: "/dept/tree-by-ZYY",
          getDataUrl: '',
          isShowMenus: true,
        },
        fromWhereTree: "user",
        //当前tree选中的node id
        deptId: '',
      }
    },
    methods: {
      //初始化请求列表数据
      init() {},


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
      zyyContent,
      layoutTree,
      leftTree
    }

  }

</script>
<style lang="scss">
  .add-remove {
    margin-bottom: 20px;
  }

  .header {
    height: 30px;
    font-size: 18px;
    color: #ffffff;
  }

  .userDataTable {
    margin-top: 20px;
  }

  .listUpAreaMoreSearchBox {
    margin-top: 20px;
    .el-select .el-input {
      width: 100%;
    }
    &~.userDataTable {
      margin-top: 0;
    }
  }

</style>
