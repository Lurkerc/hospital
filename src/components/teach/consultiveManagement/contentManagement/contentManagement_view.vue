<template>

  <div class="showWrapper leaveManagement-show">
    <el-form ref="formValidate"  class="demo-form-inline" label-width="90px">
      <el-row >
        <el-col :span="8" :offset="2">
          <el-form-item label="所属栏目" prop="name" >
            {{data.moduleName}}
          </el-form-item>
        </el-col >


        <el-col :span="8" :offset="1">
          <el-form-item label="标题:" class="feildFontweight">
            {{data.title}}
          </el-form-item>
        </el-col >
      </el-row >

      <el-row >
        <el-col :span="8" :offset="2">
          <el-form-item label="作者:" class="feildFontweight">
            {{data.authorName}}
          </el-form-item>
        </el-col >

        <el-col :span="8" :offset="1">
          <el-form-item label="来源:" class="feildFontweight">
            {{data.source == 'REPRINTED'?'转载':data.source == 'REPRINTED'?'原创':'其他'}}
          </el-form-item>
        </el-col >
      </el-row >
      <el-row >
        <el-col :span="8" :offset="2">
          <el-form-item label="URL:" class="feildFontweight">
            {{data.url}}
          </el-form-item>
        </el-col >

        <el-col :span="8" :offset="1">
          <el-form-item type="number" label="置顶顺序:" class="feildFontweight">
            {{data.newsOrder}}
          </el-form-item>
        </el-col >

        <el-col :span="8" :offset="2">
          <el-form-item label="内容类型:" class="feildFontweight">
            {{data.contentType == 'ORDINARY'?'普通':data.contentType == 'MULTIMEDIA'?'多媒体':data.contentType}}
          </el-form-item>
        </el-col >
      </el-row >

      <el-row >
        <el-col :span="17" :offset="2">
          <el-form-item type="附件" label="内容:" class="feildFontweight">
            {{data.content}} 富文本
          </el-form-item>
        </el-col >
      </el-row >

      <el-row >
        <el-col :span="17" :offset="2">
          <el-form-item v-if="data.contentType=='MULTIMEDIA'" type="附件" label="" class="feildFontweight">
            多媒体视频
          </el-form-item>
        </el-col >
      </el-row >


      <el-row >
        <el-col :span="8" :offset="2">
          <el-form-item type="附件" label="附件:" class="feildFontweight">

            <upload-file :uploadFiles="data.fileList" :show="true"></upload-file>
          </el-form-item>
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
    props: ['operailityData','url'],
    data (){
      return{
        //当前组件默认请求(list)数据时,ajax处理的 基础信息设置
        showData:{},
        listMessTitle:{
          paramsData:'listUrl',
          ajaxSuccess:'SuccessGetCurrData',
          ajaxParams:{
            url:this.url.columnGet+this.operailityData.id,
          }
        },

       // 获取到的数据
        "data":{
          "moduleId":"栏目id",
          "moduleName":"栏目名称",
          "id":"1",
          "title":"投票项目",
          "authorName":"张三",
          "source":"REPRINTED",
          "newsUrl":"**/**.action",
          "newsOrder":"1",
          "contentType":"MULTIMEDIA",
          "content":"测试内容",
          "multimediaFileList":[
            {
              "fileId":"1",
              "fileName":"文件名称",
              "fileType":"MP3",
              "filePath":"文件路径"
            }
          ],
          "fileList":[
            {
              "fileId":"1",
              "fileName":"文件名称",
              "fileType":"txt"
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
    }
  }
</script>
