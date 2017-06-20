<!--投票结果-->
<template>
  <div id="nosocomial" ref="nosocomial" class="modal">
    <div >
      <el-row >
        <el-col :span="10" :offset="10">
         {{data.title}}
        </el-col>
      </el-row >
    </div>
    <div class="add-remove">
      <el-row >
        <el-col :span="6" >
          <el-button  class="but-col"   type="primary">导出excel</el-button>
        </el-col>
      </el-row >
    </div>
    <div
      id="nosocomialTable"
      ref="nosocomialTable"
    >
      <el-table
        align="center"
        :height="300"
        :data="data.voteResultList"
        tooltip-effect="dark"
        style="width: 100%"
        @selection-change="handleSelectionChange">

        <el-table-column
          label="序号"
          prop="index"
          width="70">
          <template scope="scope">
            <span>{{scope.row.index}}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="userName"
          label="姓名"
          align="center"
          width="200"
          show-overflow-tooltip
        >
          <template scope="scope">
            <el-button
              size="small"
              @click="show(scope.row)">{{scope.row.userName}}
            </el-button>
          </template>
        </el-table-column>
        <el-table-column
          prop="voteNum"
          label="得票数"
          align="center"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          prop="rewardDate"
          label="得票率 "
          show-overflow-tooltip>
          <template scope="scope">
            <!--得票率-->
            <el-progress :text-inside="true" :stroke-width="18" :percentage="scope.row.voteNum==''?0:scope.row.voteNum/data.totalNum*100"></el-progress>
          </template>
        </el-table-column>
      </el-table>
    </div>
      <!--姓名弹窗-->
      <Modal
        :mask-closable="false"
        v-model="showModal"
        height="200"
        title="对话框标题"
        class-name="vertical-center-modal"
        :width="800">
        <!--<div slot="header"> -->
        <!--</div>-->
        <modal-header slot="header" :content="showId"></modal-header>
        <show v-if="showModal"       :operaility-data="pollOperailityData"></show>
        <div slot="footer"></div>
      </Modal>
      <!---->

    </div>
  </div>
</template>

<script >

  /*
   * 引入--查看--组件
   * */
  import  show from './OrganizationaVoting_poll_view.vue'


  //当前组件引入全局的util
  let Util=null;
  let store = null;
  export default{
    props:['operailityData'],
    data() {
      return {

        "data":{
          "title":"",
          "voteResultList":[
            {
              "id":"",
              "userId":"",
              "userName":"",
              "voteNum":""
            }
          ],
          "totalNum":""
        },

        showId:{
          id:'auditId',
          title:'查看'
        },
        pollOperailityData:'',
        showModal:false,
        multipleSelection: [],
        tableData1: [{name:'张三'}],
        listMessTitle:{
          ajaxSuccess:'listDataSuccess',
          ajaxParams:{
            url:'appraising/vote/project/getResult/'+this.operailityData.id,
            params:{}
          }
        },
      }
    },
    methods: {

      //初始化请求列表数据
      init(){
        Util = this.$util;
        //ajax请求参数设置
        this.myPages =  Util.pageInitPrams;

        this.queryQptions = {
          url:this.listUrl,
          params:{curPage: 1,pageSize: Util.pageInitPrams.pageSize}
        }

        this.setTableData();
      },



      /*
       * checkbox 选择后触发事件
       * @param val Array 存在所有的选择每一个行数据
       */
      handleSelectionChange(val) {
        this.multipleSelection = val;
      },


      /*
       * 列表数据只能选择一个
       * @param isOnly true  是否只选择一个
       */
      isSelected(isOnly){
        let len = this.multipleSelection.length;
        let flag = true;
        if(len==0){
          this.showMess("请选择数据!");
          flag = false;
        }
        if(len>1 && isOnly){
          this.showMess("只能修改一条数据!")
          flag = false;
        }
        return flag;
      },



      /*
       *点击姓名，查看信息
        *
         * */

      show(data){
          this.pollOperailityData = data
          this.showModal = true;
      },


      //通过get请求列表数据
      listDataSuccess(res,m,loading){
        this.data = res.data;
      },
      setTableData(isLoading){
        this.ajax(this.listMessTitle,isLoading)
      },


    },
    created(){
      this.init();
    },
    components:{
      show
    }
  }
</script>



