<!--直播管理-->
<template>
  <!-- 直播 -->
  <div>
    <!--<div style="font-size: 18px;text-align: center"><el-button v-if="hasLive==1">正在上课时间</el-button><el-button v-if="hasLive==2">非授课时间</el-button></div>-->
    <!--有直播-->
    <liveBase v-if="hasLive==1" @sendMes="getList"  :courseId="courseId" :liveData="getData"  :isManagement="true"  style="height:510px;">
      <div slot="left" >
        <div style="height:320px;">
          <videojsLive v-if="getData.liveStream" :liveUrl="'http://ivi.bupt.edu.cn/hls/cctv1hd.m3u8'" ></videojsLive>
        </div>
      </div>

      <div slot="right">
        <msgList ref="msgList" style="height:510px;" :courseId="courseId" :liveData="getData"></msgList>
      </div>
    </liveBase>
    <no-live style="height:510px;" v-else="hasLive==2"  :courseId="courseId"></no-live>
    <div v-else style="line-height: 100px;font-size: 25px;text-align: center">
      加载中
    </div>
  </div>
</template>

<script>
  import videojsLive from '../../../../common/videojsLive.vue';//直播列表
  import noLive from './noLive.vue';   //无直播
  import api from './api'
  import msgList from './liveVideo_msgList.vue' //消息列表
  import liveBase from './liveVideo_layout.vue';//直播布局
  export default {
    data() {
      return {
        courseId:'', //courseId
        listMessTitle:{
          ajaxSuccess: 'updateListData',
          ajaxParams: {
            url: api.get.path,
            params: {
              courseId:this.courseId,
            }
          }
        },
        hasLive:'',  //当前是否有直播 1 有 2 没有
        getData:{},
      }
    },
    methods: {
      //初始化请求列表数据
      init(){
        let id =  this.$store.state.curriculum.look.course.id;
        this.courseId = id;
        this.listMessTitle.ajaxParams.courseId = this.$store.state.curriculum.look.course.id;
        this.ajax(this.listMessTitle);
//        this.updateListData();
      },

      updateListData(res){
          let data = res.data;

        if(!data) return;
        if(data.hasLive){
          this.hasLive = '1';
        }else {
          this.hasLive = '2';
        }
        if(data.live){
          this.getData =data.live;
        }

      },

      //获取聊天列表数据
      getList(){

//        this.$refs.msgList.getData()
      }

    },
    created(){
      this.init();
    },
    mounted(){
    },

    components: {
      liveBase,msgList,videojsLive,noLive
    },
  }

</script>

<style>
  /* 直播 */

</style>
