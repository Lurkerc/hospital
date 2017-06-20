<template>

  <div class="showWrapper leaveManagement-show">

      <el-row class="lose-margin2" >
        <el-col :span="11" :offset="10">
          {{data.title}}
        </el-col >
      </el-row >


      <el-row v-for="item in data.voteResultList" :key="item" class="lose-margin2" >
        <el-col :span="20" :offset="2">
          <div style="width: 50px;height: 50px;background: #000"></div></br>
          {{item.userName}}
          <i style="margin: 0 25px; font-size: 16px" :class="{'el-icon-star-off':data.voteUserId!=item.userId,'el-icon-star-on':data.voteUserId==item.userId}" ></i>
          <!--投票人id为数组的时候用，，可以给多个人投票，目前只能给一个人-->
          <!--<i style="margin: 0 25px; font-size: 16px" :class="{'el-icon-star-off':!~voteUserId.indexOf(item.id),'el-icon-star-on':~voteUserId.indexOf(item.id)}" ></i>-->
          <div  style="margin:0 25px;display: inline-block;background: palegreen;height: 20px; vertical-align: middle" :style="{width:item.voteNum*3+'px'}" ></div> {{item.voteNum}}
        </el-col >
      </el-row >

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
          //投票数据
        "data":{
          "voteId":"",         //投票项目id
          "title":"",       //标题
          "voteRule":"",    //规则
          "voteResultList":[    //投票结果列表
            {
              "id":"",         //投票结果id
              "userId":"",     //被投票人id
              "userName":"", //被投票人姓名
              "voteNum":""    //得票数
            }
          ],
          "voteUserId":""      //我投票的被投票人id
        },

        //当前组件默认请求(list)数据时,ajax处理的 基础信息设置
        //获取我的投票结果
        listMessTitle:{
          ajaxSuccess:'SuccessGetCurrData',
          ajaxParams:{
            url:'appraising/vote/project/getMyResult/'+this.operailityData.id,
            params:{}
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
      cote(item){
        item.click=!item.click
      },

      /*
       * 默认组件第一次请求数据
       * @param res JSON  数据请求成功后返回的数据
       * */
      SuccessGetCurrData(responseData){
        let data = responseData.data;
        this.data = data;
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
