<!----------------------------------
****--畅言一下(chatteris)
****--@date     2017/8/7
****--@author   zyc<332533011@qq.com
----------------------------------->
<template>
  <div>
    <el-tabs v-model="activeName">
      <el-tab-pane name="first" :label="currType">
        <el-input :autosize="{ minRows: 4, maxRows: 8}" type="textarea" v-model="formValidate.comments" placeholder="请填写评论内容!"></el-input>
      </el-tab-pane>
    </el-tabs>
    <el-row>
      <el-col :span="20">&nbsp;</el-col>
      <el-col :span="4">
        <div class="comment-subBtn">
          <load-btn @listenSubEvent="listenSubEvent" type="warning" :btnData="loadBtn"></load-btn>
        </div>
      </el-col>
    </el-row>
    <div class="commentNum">共<em>{{listTotal}}</em>条评论</div>
    <el-tabs v-model="activeName">
      <el-tab-pane name="first" label="评论">

        <div class="comment-list" v-for="item in 5">
          <div class="comment-list-date">2017-08-15</div>
          <div class="comment-list-header">
            <div class="uwUserInfo">
            <div class="userHeadPic"><img :src="userInfo.headPhoto"></div>
            </div>
          </div>
          <div class="comment-user-mess">
            闫沧(住院医)
          </div>
          <div class="comment-list-content">
            老师讲的不错很棒!
          </div>
        </div>
      </el-tab-pane>
    </el-tabs>
    <div class="showMore">
      <el-button @click="queryMore" v-if="isHashMore" type="text">查看更多评论>></el-button>
      <span v-if="false">已经没有更多评论可查看!</span>
    </div>
  </div>
</template>
<script>
/*当前组件必要引入*/
import api from "./api.js";
//当前组件引入全局的util
let Util = null;
export default{
    props:{
      types:{  //评论资源类型
        type:String,
        default:"VIDEO",  //  教学视频  文档文献  典型病例  医学图谱  VIDEO LITERATURE CASES ATLAS
      },
      resourceId:{  //评论的资源ID
        type:Number,
        default:0,
      },
      comments:{  //评论内容
        type:String,
        default:"",
      }
    },
    data() {
      let typeOptions={
          "VIDEO":"视频评论",
          "LITERATURE":"评论",
          "CASES":"评论",
          "ATLAS":"评论",
        }
      return {
        //保存按钮基本信息
        loadBtn:{title:'提交',callParEvent:'listenSubEvent'},

        activeName: 'first',
        currType:typeOptions[this.types],
        formValidate:{
          types:this.types,
          resourceId:this.resourceId,
          comments:this.comments,
        },
        commentList:[
          /*{
            "id":3,
            "userId":"1",
            "userName":1,
            "userHeadImg":1,
            "comments":1,
            "createTime":"1"
          },
          {
            "id":3,
            "userId":"1",
            "userName":1,
            "userHeadImg":1,
            "comments":1,
            "createTime":"1"
          }*/
        ],

        //评论列表、及分页属性
        isHashMore:true,
        params:{curPage: 1,pageSize: 10},
        listTotal:0,
        listMessTitle:{
          ajaxSuccess:'updateListData',
          ajaxParams:{
            url: api.commentListPage.path,
            method: api.commentListPage.method,
            params:{
              types:this.types,
              resourceId:this.resourceId
            }
          }
        },

        //当前组件提交(add)数据时,ajax处理的 基础信息设置
        addMessTitle:{
          ajaxSuccess:'saveSuccess',
          ajaxError:'saveError',
          ajaxParams:{
            url: api.commentAdd.path,
            method: api.commentAdd.method,
            jsonString:true
          }
        },
      }
    },
    methods: {
      //初始化请求列表数据
      init(){
        this.listMessTitle.ajaxParams.params = Object.assign(this.listMessTitle.ajaxParams.params,this.params);
        //this.ajax(this.listMessTitle);
      },

      /*
       * 点击提交按钮 监听是否提交数据
       * @param isLoadingFun boolean  form表单验证是否通过
       * */
      listenSubEvent(isLoadingFun){
        let isSubmit = this.submitForm("formValidate");
        isSubmit = true;
        if(isSubmit) {
          if (!isLoadingFun) isLoadingFun = function () {};
          isLoadingFun(true)
          this.addMessTitle.ajaxParams.data = this.getFormData(this.formValidate);
          this.ajax(this.addMessTitle, isLoadingFun)
        }
      },

      //通过get请求列表数据
      updateListData(responseData){
        let data = responseData.data;
        if(data.length==0){
          this.isHashMore = false;
        }
        this.commentList = this.commentList.concat(data);
        this.listTotal = responseData.totalCount || 0;
      },

      //评论保存成功
      saveSuccess(){
        this.successMess("评论成功!");
      },

      //评论保存失败
      saveError(){
        this.successMess("评论失败!")
      },

      //点击更多评论
      queryMore(){
        let num = this.params.curPage;
        this.params={
          curPage: ++num,
          pageSize: 10
        }
        this.listMessTitle.ajaxParams.params = Object.assign(this.listMessTitle.ajaxParams.params,this.params);
        this.ajax(this.listMessTitle);
      }

    },
    created(){
        this.init();
    },
    mounted(){
    },
    computed:{
      userInfo(){
        let info = this.$store.getters.getUserInfo || {};

        return info;
      }
    },
    components: {}
}
</script>
<style lang="scss">
  /* 用户资料 */

  @import "../../../assets/ambuf/css/workbench_v1.0/userInfo";

</style>
<style>
  @import "../../../assets/ambuf/css/videoStudy/default.css";
</style>
