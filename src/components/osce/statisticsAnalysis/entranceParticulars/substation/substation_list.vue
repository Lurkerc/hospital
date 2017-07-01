<template>
  <!-- 考生考核表信息 -->
  <div class="modalContent" ref="content">
    <div class="text-headline ">分站得分总览</div>
    <hr>
    <div class="leftCon" style="top: 50px;border-top: 1px solid #dfe6ec;">
      <p class="infoItem bottom">考站名称：{{data.stationName || ''}}</p>
      <p class="infoItem bottom">最高分：{{data.maxMark}}</p>
      <p class="infoItem bottom">最低分：{{data.minMark}}</p>
    </div>
    <div class="contentMain">
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane v-for="(item,index) in contentList" :key="index" :label="item.contentName" :name="index+''"></el-tab-pane>
      </el-tabs>
      <div>
        <!--表格数据-->
        <div id="myTable" ref="myTable">
          <el-table align="center" :height="400" :data="scoreTableDetailsList" tooltip-effect="dark" highlight-current-row style="width: 100%;height: 100%">
            <el-table-column align="center" label="编号" type="index" width="100">
            </el-table-column>

            <el-table-column align="center" prop="content" label="评分项目" show-overflow-tooltip>
            </el-table-column>
            <el-table-column prop="score" label="分值" align="center" width="100">
            </el-table-column>
            <el-table-column prop="avgMark" label="平均分" align="center" width="100">
            </el-table-column>
            <el-table-column label="得分率" align="center" width="130">
              <template scope="scope">
                {{ scope.row.avgMark/scope.row.score == scope.row.avgMark/scope.row.score?+(scope.row.avgMark/scope.row.score).toFixed(2):''
                }}
              </template>
            </el-table-column>
          </el-table>
          </br>
          <el-table align="center" :height="200" :data="markList" tooltip-effect="dark" highlight-current-row style="width: 100%;height: 100%">
            <el-table-column align="center" label="姓名" prop="userName" width="300">
            </el-table-column>
            <el-table-column prop="totalMark" label="得分" align="center">
            </el-table-column>
          </el-table>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  //当前组件引入全局的util
  let Util = null;
  export default {
    props: ['operailityData', 'url'],

    data() {
      return {
        formValidate: {
          stationId: this.operailityData.stationId, //统计id
        },
        //评分表
        scoreValidate: {
          scoreTableId: '', //评分表
        },
        isShowList: true,
        //tab列表
        contentList: [],
        scoreTableDetailsList: [], //评分表详情
        markList: [], //成绩列表
        operailityShowData: '',
        multipleSelection: [],
        dynamicHt: 100,
        self: this,
        //获取到的数据
        tableData: [],
        data: {},

        loading: false,
        totalCount: 0,
        //标签切换
        oldIndex: 0, //保存切换的值
        activeName: '0',
        //当前组件默认请求(list)数据时,ajax处理的 基础信息设置
        leftListMessTitle: {
          ajaxSuccess: 'updateListData',
          ajaxParams: {
            url: this.url.stationGet + this.operailityData.stationId,
            params: {}
          }
        },
        //当前组件默认请求(list)数据时,ajax处理的 基础信息设置
        scoreListMessTitle: {
          ajaxSuccess: 'scoreListData',
          ajaxParams: {
            url: this.url.contentGet,
            params: {}
          }
        },
      }
    },
    methods: {
      //初始化请求列表数据
      init() {
        Util = this.$util;
        //ajax请求参数设置
        this.setTableData();
      },
      //设置表格及分页的位置
      setTableDynHeight() {
        let content = this.$refs.content;
        let parHt = content.parentNode.offsetHeight;
        let myTable = this.$refs.myTable;
        let paginationHt = 0;
        this.dynamicHt = parHt - myTable.offsetTop - paginationHt;
      },


      //通过get请求列表数据
      updateListData(responseData) {
        let data = responseData.data
        if (!data) return;
        this.data = data
        if (data.contentList) {
          this.contentList = data.contentList;
          this.setScoreData(data.contentList[0])
        }

      },

      //获取左侧内容
      setTableData() {
        this.leftListMessTitle.ajaxParams.params = Object.assign(this.leftListMessTitle.ajaxParams.params, this.formValidate);
        this.ajax(this.leftListMessTitle);
      },

      //获取评分表数据
      scoreListData(responseData) {
        let data = responseData.data
        if (!data) return;
        this.markList = data.markList;
        this.scoreTableDetailsList = data.detatilsList;
      },
      //获取评分表内容
      setScoreData(scoreValidate) {
        if (!scoreValidate) return;
        let scoreListMessTitle;
        scoreListMessTitle = this.$util._.defaultsDeep({}, this.scoreListMessTitle);
        this.scoreValidate.scoreTableId = scoreValidate.scoreTableId;
        scoreListMessTitle.ajaxParams.params = Object.assign(scoreListMessTitle.ajaxParams.params, this.scoreValidate);
        //        scoreListMessTitle.ajaxParams.url = scoreListMessTitle.ajaxParams.url+'/'+scoreValidate.scoreTableId;
        this.ajax(scoreListMessTitle);
      },
      /*--点击--添加--按钮--*/
      add() {
        this.openModel("add");
      },
      /*--点击--修改--按钮--*/
      edit(data) {
        this.operailityData = data;
        this.openModel("edit");
      },
      /*--点击--删除--按钮--*/
      remove() {
        if (!this.isSelected()) return;
        this.operailityData = this.multipleSelection;
        this.openModel('remove');
      },
      /*
       * 点击--查看--按钮
       * @param index string|number  当前行索引
       * */
      show(data) {
        this.operailityShowData = data;
        this.operailityShowData.userPhoto = this.data.userPhoto;
        this.isShowList = false;
      },

      //返回
      goBack() {
        this.isShowList = true;
      },

      /*
       * 监听子组件通讯的方法
       * 作用:根据不同的参数关闭对应的模态
       * @param targer string example:"add"、"edit"
       * */
      cancel(targer) {
        this[targer + 'Modal'] = false;
      },
      /*
       * 监听子组件通讯的方法
       * 作用:ajax请求成功回调,该监听方法在libs/util 中的混合模式下定义回调
       * @param targer string example:"add"、"edit"
       * @param targer string 提示返回的ajax回调返回的信息改信息在对应的子组件中定义
       * 例如:errorTitle、errorTitle
       *addMessTitle:{
       *    type:'add',
       *    successTitle:'添加成功!',
       *    errorTitle:'添加失败!',
       *    ajaxSuccess:'ajaxSuccess',
       *    ajaxError:'ajaxError',
       *    ajaxParams:{
       *      url:'/role/add',
       *      method:'post'
       *    }
       *    }
       * @param udata boolean 默认false  是否不需要刷新当前表格数据
       * */
      subCallback(target, title, updata) {
        this.cancel(target);
        if (title) {
          this.successMess(title);
        }
        if (!updata) {
          this.setTableData();
        }
      },
      /*
       * 打开指定的模态窗体
       * @param options string 当前指定的模态:"add"、"edit"
       * */
      openModel(options) {
        this[options + 'Modal'] = true;
      },


      //tab切换
      handleClick(tab) {
        let index = tab.index;
        if (index == this.oldIndex) return;
        this.oldIndex = index;
        let data = this.contentList[index];
        this.setScoreData(data);;
      },

    },
    created() {
      this.init();
    },
    mounted() {
      //页面dom稳定后调用
      this.$nextTick(function () {
        //初始表格高度及分页位置
        this.setTableDynHeight();
        //为窗体绑定改变大小事件
        let Event = Util.events;
        Event.addHandler(window, "resize", this.setTableDynHeight);
      })
    },
    components: {}
  }

</script>
