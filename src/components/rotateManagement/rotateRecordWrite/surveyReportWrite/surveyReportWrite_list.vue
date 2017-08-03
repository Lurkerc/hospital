<!----------------------------------
****--调查报告
****--@role     实习生、研究生、住院医、进修生
****--@date     2017/7/9
****--@author   gx
----------------------------------->
<template>
  <div>
    <div style="font-size: 22px;text-align: center" v-if="what==''">
      加载中
    </div>
    <el-form v-else-if="what=='view'"  :model="formValidate" ref="formValidate"  class="demo-form-inline" label-width="100px" >
      <el-row >
        <el-col :span="16" :offset="2">
          <el-form-item label="填写人:" prop="diseaseName">
            {{formValidate.userName}}
          </el-form-item>
        </el-col>
      </el-row >

      <el-row >
        <el-col :span="16" :offset="2">
          <el-form-item label="填写时间:" prop="diseaseName">
            {{formValidate.createTime}}
          </el-form-item>
        </el-col>
      </el-row >

      <el-row >
        <el-col :span="16" :offset="2">
          <el-form-item label="专题综述:" prop="diseaseName">
            <div v-html="formValidate.content" ></div>
          </el-form-item>
        </el-col>
      </el-row >

      <el-row>
        <el-col :span="20" :offset="2">
          <el-table
            v-if="tableData!=0"
            align="center"
            :max-height="250"
            :data="tableData"
            tooltip-effect="dark"
            highlight-current-row
            style="width: 100%;height: 100%">
            <el-table-column
              align="center"
              label="序号"
              prop="index"
              width="100">
              <template scope="scope">
                <span>{{scope.row.index}}</span>
              </template>
            </el-table-column>
            <el-table-column
              show-overflow-tooltip
              prop="createTime"
              label="审核时间">
            </el-table-column>
            <el-table-column
              show-overflow-tooltip
              prop="reviewMess"
              label="审核意见">
            </el-table-column>
            <el-table-column
              show-overflow-tooltip
              prop="spState"
              label="审核状态">
              <template scope="scope">
                {{scope.row.spState | typeText}}
              </template>
            </el-table-column>

          </el-table>
        </el-col>
      </el-row>
      <el-row >
        <el-col :span="10" :offset="4">
          <div style="margin-left: 100px">
            <el-button v-if="formValidate.state!='SUBMIT'"  @click="edit">修改</el-button>
            <el-button  v-if="formValidate.state!='SUBMIT'"   @click="reported">上报</el-button>
          </div>
        </el-col>
      </el-row >
    </el-form>
    <add :url="url"  @add="subCallback" v-else-if="what=='add'"></add>
    <edit :url="url" :operailityData="formValidate" @edit="subCallback" v-else-if="what=='edit'"></edit>
    <!--上报弹窗-->
    <Modal
      close-on-click-modal="false"
      v-model="reportedModal"
      title="对话框标题"
      class-name="vertical-center-modal"
      :width="500">
      <modal-header slot="header" :content="reportedId"></modal-header>
      <operate v-if="reportedModal" :type="'reported'" :operateUrl="url.medicalEthicsModifySubmit"   @operate="subCallback" @cancel="cancel" :operaility-data="[formValidate]"></operate>
      <div slot="footer"></div>
    </Modal>
    <!---->
  </div>
</template>
<script>
  /*当前组件必要引入*/
  import url from '../api'
  /*当前组件必要引入*/
  import add from './surveyReportWrite_add.vue';
  import edit from './surveyReportWrite_edit.vue';
  //当前组件引入全局的util
  let Util = null;
  export default{
    data() {
      return {
        url,
        what:"",
        formValidate:{
//          "id":11,
//          "userName":"张三",
//          "state":"SUBMIT",
//          "createTime":"2017-01-01 10:20:08",
//          "content":"12312312312312312123",
//          "reviewMess":[
//            {
//              "reviewId":111,
//              "spState":"PASS",
//              "reviewMess":"审批意见",
//              "createTime":"2014-05-06",
//              "createUserName":"张三"
//            }
//          ]
        },
        reportedModal:false,

        reportedId : {id:'reportedId',title:'上报'},
        listMessTitle:{
          ajaxSuccess:'SuccessGetCurrData',
          ajaxParams:{
            url:url.medicalEthicsGet,
          }
        }
      }
    },
    methods:{
      SuccessGetCurrData(res) {
        let data = res.data;
        if (!data){
          this.what = 'add';
          return;
        }

        this.formValidate = data;
        if(data.id){
          this.what = 'view';
        }else {
          this.what = 'add';
        }
        if(data.reviewMess){
          this.tableData = data.reviewMess
        }
      },

      //上报
      reported(data){
        this.operailityData = data;
        this.reportedModal =  true;
      },

      subCallback(target,title,updata){
        this.cancel(target);
        if(title){
          this.successMess(title);
        }
        if(!updata){
          this.setTableData();
        }
      },

      /*
       * 监听子组件通讯的方法
       * 作用:根据不同的参数关闭对应的模态
       * @param targer string example:"add"、"edit"
       * */
      cancel(targer){
        this[targer+'Modal'] = false;
      },

      edit(){
        this.what = 'edit';
      },

      setTableData(){
        this.ajax(this.listMessTitle)
      }
    },
    created(){
      this.setTableData();
    },
    mounted(){


    },
    components: {
      add,edit
    }
  }
</script>

