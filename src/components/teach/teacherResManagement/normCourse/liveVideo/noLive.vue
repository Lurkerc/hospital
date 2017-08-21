<!----------------------------------
****--@name     无直播
****--@role     ${*}
****--@date     2017/8/18
****--@author   gx
----------------------------------->
<template>
  <div class="live-container">
    <div class="live-left" style="height:100%;">
      <!--todo 点播的路径-->
      <myVideo v-if="isShowVideo" style="height:100%;" :poster="picture" :filePath="clickHistoryData.id||'  '"></myVideo>
      <!--<myVideo ></myVideo>-->
    </div>
    <div class="live-right">
      <div class="nolive-container" >
        <div class="right-commonality" >
          最近直播
        </div>
        <!--聊天列表-->
        <div v-if="nextPlayData!=0" class="msg-list-wrap">
          <div class="msg-list" v-for="(item,index) in nextPlayData" :key="index">
            <div>
              <span style="float: left;font-size: 14px"><strong>{{item.date}}</strong></span>
              <div style="clear: both;padding-top: 5px" v-for="(timeData,i) in item.timeList">
                <span style="float: left">{{timeData.startTime}}--{{timeData.endTime}} </span>
                <span style="line-height: 25px;float: right" class="overflow-txt1">{{timeData.title}}</span>
                <div style="clear: both"></div>
              </div>
            </div>
          </div>
        </div>
        <p v-else   style="font-size: 24px;text-align: center;line-height: 200px">暂无直播</p>
      </div>


      <div class="nolive-container">
        <div class="right-commonality" >
          历史点播
        </div>
        <!--聊天列表-->
        <div class="msg-list-wrap"  v-if="historyPlay!=0">
            <div @click="changeHistory(timeData,i)" class="history-list" :class="{'history-list-bac':index==i }" style="clear: both;padding-top: 5px;cursor: pointer;" v-for="(timeData,i) in historyPlay">
              <span style="float: left">{{timeData.startTime}}--{{timeData.endTime}} </span>
              <span style="line-height: 18px;float: right" class="overflow-txt1">{{timeData.content}}</span>
              <div style="clear: both"></div>
            </div>
        </div>
        <p v-else  style="font-size: 24px;text-align: center;line-height: 200px">暂无点播</p>
      </div>



    </div>
  </div>
</template>
<script>
  /*当前组件必要引入*/
  import myVideo from '../../../../common/video.vue';
  import api from './api'
  //当前组件引入全局的util
  let Util = null;
  export default{
    props:['courseId'],
    data() {
      return {
        nextPlayData:[],
        historyPlay:[],
        index:0,
        clickHistoryData:{},
//        picture:'http://pic1.ooopic.cn/uploadfilepic/ziku/2008-08-12/OOOPIC_vipvip4_200808121222168b83104fc4bfa31c143.jpg"',
        picture:'',
        isShowVideo:true,
        historyPlayMessTitle:{   //历史点播
          ajaxSuccess: 'updateListData',
          ajaxParams: {
            url: api.historyPlay.path,
            params: {
              courseId:this.courseId,
            }
          }
        },
        listMessTitle:{   //最近直播
          ajaxSuccess: 'nextPlayListData',
          ajaxParams: {
            url: api.nextPlay.path,
            params: {
              courseId:this.courseId,
            }
          }
        },

      }
    },
    methods: {
      //初始化请求列表数据
      init(){
        this.ajax(this.historyPlayMessTitle); //历史点播
        this.ajax(this.listMessTitle);//最近直播
      },


      //历史点播
      updateListData(res){
        let data = res.data;
        if(!data||data==0)return;
        this.historyPlay = data;
        this.clickHistoryData = data[0]||{};
        this.picture = '';
        this.change();
      },


      //最近直播
      nextPlayListData(res){
        let data = res.data;
        if(!data||data==0)return;
        this.nextPlayData = data;
      },

      //点击历史点播
      changeHistory(item,index){

        if(index==this.index)return;
        this.index = index;
        this.clickHistoryData = item;
        this.change();
      },

      //
      change(){
        this.isShowVideo = false;
        this.$nextTick(function () {
          this.isShowVideo = true;
        })
      }
    },
    created(){
      this.init();
    },
    mounted(){
    },
    components: {myVideo}
  }
</script>
<style>
  .nolive-container{
    position: relative;
    height: 50%;
  }
  .live-left{
    width: 66%;
    height: 100%;
  }
  .live-right{
    position: absolute;
    left:  67%;
    top: 0;
    right: 0;
    bottom:0;
    border: 1px solid #535353;
    overflow: hidden
  }
  .right-commonality{
    height: 40px;
    background: #c9c9c9;
    text-align: center;
    line-height: 40px;
    font-size: 24px;
    /*border-bottom: 1px solid #535353 ;*/
  }

  .msg-list{
    padding: 10px 25px 10px 10px;
  }

  .msg-list-wrap{
    position: absolute;
    left: 0;
    top: 42px;
    right: -13px;
    bottom:0;
    /*border: 1px solid #535353;*/
    overflow: auto;
  }

  .history-list{
    padding: 10px 25px 10px 10px;
  }

  .history-list-bac{
    background: #c0fff1;
    color: #fff;
  }

</style>
