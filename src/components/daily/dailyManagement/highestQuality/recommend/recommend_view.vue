<template>

  <div class="showWrapper leaveManagement-show">
    <el-form ref="formValidate"  class="demo-form-inline" label-width="90px">
      <el-row class="lose-margin2" >
        <el-col :span="11" :offset="10">
         评优自荐
        </el-col >
      </el-row >
      <el-row class="lose-margin2">
        <el-col :span="20" :offset="2">
          <quill-editor v-model="data.reason"
                        ref="myQuillEditor"
          >
          </quill-editor>
        </el-col>
      </el-row >

      <el-row >
        <el-col :span="20" :offset="2">
          <el-form-item  label="自荐人:" prop="name" class="feildFontweight">
            {{data.userName}} &nbsp;  &nbsp; <span class="feildFontweight">日期:</span> {{data.declare_date}}
          </el-form-item >

        </el-col >
      </el-row >

      <el-row >
        <el-col :span="20" :offset="2">
          <el-form-item label="相关资料:" prop="name" class="feildFontweight">
            <upload-file :uploadFiles="data.fileList" :show="true"></upload-file>
          </el-form-item >
        </el-col >
      </el-row >


      <el-row >
        <el-col :span="20" :offset="2">
          <el-form-item  label="审核结果:" prop="name" class="feildFontweight">
            {{converter(data.examineStatus)}}
          </el-form-item >
        </el-col >
      </el-row >

      <el-row >
        <el-col :span="20" :offset="2">
          <el-form-item  label="审批意见:" prop="name" class="feildFontweight">
            <el-input
              type="textarea"
              :rows="11"
              readonly
              resize="none"
              v-model="data.opinion">
            </el-input>
          </el-form-item >

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
        //当前组件默认请求(list)数据时,ajax处理的 基础信息设置
        showData:{},
        listMessTitle:{
          paramsData:'listUrl',
          ajaxSuccess:'SuccessGetCurrData',
          ajaxParams:{
            url:'appraising/sellOneself/get/'+this.operailityData.id,
          }
        },
        "data":{
          "id":"",     //自荐id
          "userId":"",           //学生id
          "userName":"",      //学生姓名
          "reason":"",      //自荐理由

          "declare_date":"",    //填报时间
          "opinion":"",                   //审批意见
          "examineStatus":"WSB",      //考核状态
          "fileList":[
            {
              "fileId":"",
              "fileName":"",
              "fileType":""
            }
          ]
        },
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
          this.data = responseData.data
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

      //转换列表状态
      converter(status){
        switch(status){
          case 'WSB': status = '未上报';
            break;
          case 'DSH': status = '待审核';
            break;
          case 'BTG': status = '不通过';
            break;
          case 'TG': status = '通过';
            break;
        }
        return status;

      }
    }
  }
</script>

