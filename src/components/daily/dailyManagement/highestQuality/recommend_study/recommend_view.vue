<template>

  <div class="showWrapper leaveManagement-show">
      <el-row class="lose-margin2" >
        <el-col :span="11" :offset="10">
          <span style="font:700 20px '微软雅黑'">评优自荐</span>
        </el-col >
      </el-row >
      <el-form ref="formValidate"  class="demo-form-inline" label-width="90px">
        <!--富文本-->
        <el-row class="lose-margin2">
          <el-col :span="20" :offset="2">
            <fieldset class="layui-elem-field">
              <legend>暴露详情</legend>
              <quill-editor v-model="data.reason"
                            ref="myQuillEditor"
              >
              </quill-editor>
            </fieldset>
          </el-col>
        </el-row >
          <el-col :span="17" :offset="2">
            <el-form-item label="相关资料:" prop="name" class="feildFontweight">
              <upload-file :uploadFiles="data.fileList" :show="true"></upload-file>
            </el-form-item >
          </el-col >
        </el-row >

      <el-row >
        <el-col :span="17" :offset="2">
          <el-form-item label="审核结果:" prop="name" class="feildFontweight">
            {{converterStatus(data.examineStatus)}}
          </el-form-item  >
        </el-col >
      </el-row >

      <el-row >
        <el-col :span="17" :offset="2">
          <el-form-item label="审批意见:" prop="name" class="feildFontweight">
            <el-input
              type="textarea"
              :rows="5"
              readonly
              resize="none"
              v-model="data.opinion">
            </el-input>
          </el-form-item  >
        </el-col >
      </el-row >

    </el-form>
  </div>
</template>
<script>
  //当前组件引入全局的util
  let Util=null;
  export default {
    //props接收父组件传递过来的数据
    props: ['operailityData'],
    options:[{
      value: '选项1',
      label: '黄金糕'
    }, {
      value: '选项2',
      label: '双皮奶'
    }, {
      value: '选项3',
      label: '蚵仔煎'
    }, {
      value: '选项4',
      label: '龙须面'
    }, {
      value: '选项5',
      label: '北京烤鸭'
    }],
    data (){
      return{
        "data":{
          "id":"",
          "userId":"",
          "userName":"",
          "reason":"",
          "declare_date":"",
          "opinion":"",
          "examineStatus":"",
          "fileList":[
            {
              "fileId":"",
              "fileName":"",
              "fileType":""
            }
          ]
        },
        //当前组件默认请求(list)数据时,ajax处理的 基础信息设置
        showData:{},
        listMessTitle:{
          paramsData:'listUrl',
          ajaxSuccess:'SuccessGetCurrData',
          ajaxParams:{
            url:'appraising/sellOneself/get/'+this.operailityData.sellOneselfId,
          }
        }
      }
    },
    created(){
      //给当前组件注入全局util
      Util = this.$util;
    },
    mounted(){
      //初始化
      this.init();
    },
    methods:{
      /*
       * 默认组件第一次请求数据
       * @param res JSON  数据请求成功后返回的数据
       * */
      SuccessGetCurrData(responseData){
        this.data = responseData.data;
      },
      /*
       * 当前组件发送事件给父组件
       * 发送关闭(cancel)模态事件给父组件,请求关闭当前模态窗
       * */
      cancel(){
        this.$emit('cancel','show');
      },
      /*
       * 组件初始化入口
       * */
      init(){
        //默认请求加载数据
        this.ajax(this.listMessTitle);
      },

      converterStatus(status){
        switch(status){
          case 'WSB' :status = '未上报' ;
            break;
          case 'DSH' :status = '审核中(待审)' ;
            break;
          case 'TG' :status = '通过' ;
            break;
          case 'BTG' :status = '不通过' ;
        }
        return status;
      },
    }
  }
</script>
<style>
  .showWrapper{
    height: 100%;
    padding: 20px;
    border: 1px solid #eee;
  }
  .feildFontweight{
    font-weight: bold;
  }
</style>
