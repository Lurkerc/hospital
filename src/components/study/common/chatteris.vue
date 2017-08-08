<!----------------------------------
****--畅言一下(chatteris)
****--@date     2017/8/7
****--@author   zyc<332533011@qq.com
----------------------------------->
<template>
  <div>
    <el-tabs v-model="activeName">
      <el-tab-pane name="first" label="视频评论">
        <el-input :autosize="{ minRows: 4, maxRows: 8}" type="textarea" v-model="formValidate.comments" placeholder="请填写评论内容!"></el-input>
      </el-tab-pane>
    </el-tabs>
    <el-row>
      <el-col :span="20">&nbsp;</el-col>
      <el-col :span="4">
        <div class="comment-subBtn">
          <el-button type="warning">畅言一下</el-button>
        </div>
      </el-col>
    </el-row>
    <el-tabs v-model="activeName">
      <el-tab-pane name="first" label="评论">
        <div class="commentNum">共8条评论</div>
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
      <el-button v-if="true" type="text">查看更多评论>></el-button>
      <span v-if="false">已经没有更多评论可查看!</span>
    </div>
  </div>
</template>
<script>
/*当前组件必要引入*/

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
      return {
        activeName: 'first',
        formValidate:{
          types:this.types,
          resourceId:this.resourceId,
          comments:this.comments,
        },
        commentList:[
          {
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
          }
        ]
      }
    },
    methods: {
      //初始化请求列表数据
      init(){

      },

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
