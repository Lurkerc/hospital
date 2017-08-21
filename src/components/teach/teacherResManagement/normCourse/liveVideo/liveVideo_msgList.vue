<!----------------------------------
****--@name     ${*}
****--@role     ${*}
****--@date     2017/8/18
****--@author   gx
----------------------------------->
<template>
    <div class="msg-right" >
      <div class="right-commonality" >
        公共聊天
      </div>
      <!--聊天列表-->
      <div v-if="tableData!=0" class="msg-list-wrap">
        <div class="msg-list" v-for="(item,index) in tableData" :key="index">
          <div>
            <span style="float: left;">{{item.name}}</span>
            <span style="float: right;">{{item.times | formatDate('yy-MM-dd HH:mm:ss')}}</span>
            <div style="clear: both;padding-top: 15px">
              {{item.msg}}
            </div>
          </div>
        </div>
      </div>
        <p  v-else style="font-size: 24px;text-align: center;line-height: 200px">暂无聊天</p>
    </div>
</template>
<script>
    /*当前组件必要引入*/
    import api from './api'
    //当前组件引入全局的util
    let Util = null;
    export default{
        props:['courseId','liveData'],
        data() {
            return {
              tableData:[],
              unBeforeDestroy:true,
              lastTime:0,
              setTime:'',
            }
        },
        methods: {
            //初始化请求列表数据
            init(){
              Util  = this.$util;
              this.getData()
            },

          getData(){
            let that = this;
            //处理服务数据
            let myPromise = this.$util.queryData({
              url: api.queryMsg.path,
              params: {
                courseId:this.courseId,
                planId:this.liveData.id,
                lastTime:this.lastTime,
              }
            })();
            myPromise.then(function (res) {
              let responseData = res.data;
              if(that.$util._.isObject(responseData["status"])&&responseData["status"]["code"]==0){
                that.updateListData(responseData)
              }else {
                let flag = that.$util.handleAjaxError(that, responseData["status"]["code"], responseData["status"]["msg"]);
                if (!flag) {
                  that.errorMess('获取数据异常,重新获取');
//                  that.setTime = setTimeout(()=>{
//                    this.getData()
//                  },1000)
                  if(that.unBeforeDestroy){
                    this.getData()
                  }
                }
              }
            }).catch(function(error){
              if (error.response) {
                // The request was made and the server responded with a status code
                // that falls out of the range of 2xx
                that.$util.handleAjaxError(that,error.response.status+'');
              } else if (error.request) {
                // The request was made but no response was received
                // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
                // http.ClientRequest in node.js
                that.errorMess(error.request);
              } else {
                // Something happened in setting up the request that triggered an Error
                that.errorMess(error.message);
              }
            })
          },


          updateListData(res){
            let data = res.data;
            if(!data)return ;
            this.lastTime = data.lastTime;
            this.tableData = data.msgList;
            if(this.unBeforeDestroy){
              this.getData()
            }
          }
        },
        beforeDestroy(){
          this.unBeforeDestroy = false;
          clearTimeout(this.setTime);
        },
        created(){
            this.init();
        },
        mounted(){
        },
        components: {}
    }
</script>
<style>
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
    border-bottom: 1px solid #c9c9c9 ;
  }
  .msg-right{
    height:100%;
    /*position: absolute;*/
    /*left: 0;*/
    /*top: 0;*/
    /*right: 0;*/
    /*bottom:0;*/
    /*!*border: 1px solid #535353;*!*/
    /*border-top:none;*/
    /*overflow: hidden;*/
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
</style>
