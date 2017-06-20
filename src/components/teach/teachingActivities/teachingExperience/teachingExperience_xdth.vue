<!--档案查看-->
<template>
  <div>
    <el-form ref="formValidate" :rules="this.$store.state.rules.authority" label-width="100px">

      </br>
      <p style="height: 200px;font-size: 20px;text-align: center;line-height: 200px" v-if="data.length==0">暂无数据</p>
      <fieldset class="layui-elem-field" v-for="(item,index) in data" :key="index">
        <legend>{{item.createUserName}}</legend>
        <el-row>
          <el-col :span="20" :offset="2">
            <el-form-item label="心得体会:" prop="name1">
              <el-input type="textarea" :rows="6" readonly resize="none" v-model="item.activityTips"></el-input>
            </el-form-item>

          </el-col>
        </el-row>

        <el-row>
          <el-col :span="20" :offset="2">
            <el-form-item label="相关资料:" prop="name7">
              <upload-file  :type="'picture-card'" :show="true" :uploadFiles="item.fileList" @setUploadFiles="updateListData"></upload-file>
            </el-form-item>
          </el-col>
        </el-row>
      </fieldset>
    </el-form>
  </div>
</template>
<script>
  export default {
    props:['operailityData','url'],
    data() {
      return {
        activeName: 'first',

        //获取到的数据
        "data":[{
          "id":"",
          "createUserId":"",
          "createUserName":"",
          "activityTips":"",
          "fileList":[
            {
              "fileId":"",
              "fileName":"",
              "fileUrl":"",
              "fileType":""
            }
          ]
        }],
        formValidate:{
          activityId:this.operailityData.id,      //教学活动ID
          activityTips:'',      //心得体会
        },

        //当前组件默认请求(list)数据时,ajax处理的 基础信息设置
        listMessTitle:{
          ajaxSuccess:'updateListData',
          ajaxParams:{
            url:this.url.teachActivity+'/'+this.operailityData.id,
            params:{}
          }
        },

      };

    },

    created(){
      this.init();
    },

    methods: {

      init(){
        this.ajax(this.listMessTitle)
      },

      //通过get请求列表数据
      updateListData(responseData){
        this.data = responseData.data;
        this.formValidate.activityTips = responseData.data.activityTips;
      },

    }
  };
</script>
