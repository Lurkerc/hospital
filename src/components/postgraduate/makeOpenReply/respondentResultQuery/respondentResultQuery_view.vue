<!----------------------------------
****--查看(respondentSumAudit_view)
****--@date     2017/9/12
****--@author   zyc<332533011@qq.com
----------------------------------->
<template>
  <div>

    <el-form  ref="formValidate"   label-width="90px" >
      <baseView :operailityData="formValidate"></baseView>
      <el-row  class="table-back-one-d">
        <el-col :span="8" >
          <el-form-item label="状态:">
            {{formValidate.resultStatus | dsresultRecord}}
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
  </div>
</template>
<script>
  /*当前组件必要引入*/
  import baseView from '../common/makeOpenReply_base-view.vue'
  import api from "../api.js";
  //当前组件引入全局的util
  let Util = null;
  export default{
    props:["operailityData"],
    data() {
      return {
        formValidate:{},
        //当前组件默认请求(list)数据时,ajax处理的 基础信息设置
        listMessTitle:{
          ajaxSuccess:'updateListData',
          ajaxParams:{
            url:api.defenseAppResGet.path+this.operailityData.id,
            params:{}
          }
        },
      }
    },
    methods: {
      //初始化请求列表数据
      init(){
        this.ajax(this.listMessTitle)
      },

      //通过get请求列表数据
      updateListData(responseData){
        if(!responseData.data)return;
        if(responseData.data.fileInfo){
          responseData.data.fileList=[responseData.data.fileInfo];
        }else {
          responseData.data.fileList=[];
        }
        this.formValidate = responseData.data;
      },
    },
    created(){
      Util = this.$util;
      this.init();
    },
    mounted(){
    },
    components: {
      baseView,
    }
  }
</script>
