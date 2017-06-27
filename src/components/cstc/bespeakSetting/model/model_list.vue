<template>
  <!-- 模型预约管理 -->
  <layout-tree>
    <!-- 左侧目录树 -->
    <tree-menu slot="left" @tree-click="treeClick" :treeOptions="leftTreeOpt.treeDefaults" :fromWhereTreeType="leftTreeOpt.fromWhereTree"
      @setCurrSltNodeId="setCurrSltNodeId"></tree-menu>
    <!-- 右侧内容 -->
    <div slot="right" id="content" ref="content" class="modal" style="padding:0;">
      1
    </div>
  </layout-tree>
</template>

<script>
  import treeApi from '../../device/treeApi';

  // 左侧菜单树
  import layoutTree from "../../../common/layoutTree";
  // 右侧内容
  import treeMenu from "../../device/tree/menu";
  export default {
    props: ['contenHeight'],
    data() {
      return {
        // 默认激活视图
        deActiveName: '', // storage
        // 左侧菜单
        leftTreeOpt: {
          //tree默认项设置
          treeDefaults: {
            getTreeUrl: treeApi.tree.path, //目录树结构请求地址
            baseUrl: treeApi.baseUrl,
            // getDataUrl: '', //获取目录树叶子节点请求数据地址
            isShowSearch: false, // 隐藏搜索
            isShowMenus: true, // 隐藏操作菜单
          },
          fromWhereTree: "user", // 菜单类型
        },
        deptId: '', // 菜单选中id
      }
    },
    methods: {
      //---------------------------------- 左侧菜单树 ------------------------------------------//
      // 设置默认ID
      setCurrSltNodeId(id) {
        if (this.deptId == "") {
          this.deptId = id;
        } else {
          this.deptId = id;
        }
        this.deActiveName = 'storage'
      },
      /*
       * 左侧目录树节点click调用父组件方法
       *
       * @param obj {} 当前选中节点的一级数据
       * @param node  {}  整个tree节点所有数据
       * @param  self  {}  当前tree vue实例
       *
       * */
      treeClick(obj, node, self) {
        this.deptId = obj.id;
      },
      // 获取内容部分高度
      getContentHeight() {
        // this.contenHeight = this.$refs.content.parentNode.offsetHeight;
      },
    },
    components: {
      layoutTree,
      treeMenu
    },
    mounted() {
      //页面dom稳定后调用
      this.$nextTick(function () {
        //初始表格高度及分页位置
        // this.getContentHeight();
        //为窗体绑定改变大小事件
        let Event = this.$util.events;
        // Event.addHandler(window, "resize", this.getContentHeight);
      })
    }
  }

</script>

<style>
  /* 模型预约管理 */

</style>
