<template>

  <div class="leaveManagement-show practiceRecords-view view">
    <p class="headline">南京鼓楼医院奖惩记录登记表</p>
    <el-row >
      <el-col :span="9" :offset="2">
        <p class="center"><span class="name">姓名</span><span>{{data.userName}}</span></p>
      </el-col>
      </el-col >

      <el-col :span="9">
        <p class="center"><span class="name">科室</span><span>{{data.depName}}</span></p>

      </el-col >
    </el-row >

    <el-row >
      <el-col :span="9" :offset="2">
        <p class="center">
          <span class="name">发生时间</span>
          <span  >{{data.occurrenceTime}}</span>
        </p>
      </el-col >
      <el-col :span="9" >
        <p class="center">
          <span class="name">奖惩类型</span>
          {{data.rewardAndPunishmentType? '惩罚' : '奖励'}}
        </p>
      </el-col >
    </el-row >

    <el-row  class="division">
      <el-col :span="18" :offset="2">
        <div class="center">
          <span class="shiy-text">事项描述</span>
          <div class="shiy">{{data.rewardAndPunishmentDescribe}}</div>
        </div>
      </el-col >
    </el-row >

    <el-row class="division">
      <el-col :span="18" :offset="2">
        <div class="center">
          <span class="shiy-text">教育处意见</span>
          <div class="shiy">{{data.opinion}}</div>
        </div>
      </el-col >
    </el-row >

    <el-row class="division">
      <el-col :span="18" :offset="2">
        <div class="center">
          <span class="shiy-text">处理办法</span>
          <div class="shiy">{{data.treatmentMethod}}</div>
        </div>
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
    data (){
      return{

        "data":{
          "id":1,
          "userId":"1",
          "depId":"2",
          "depName":"内科",
          "rewardAndPunishmentType":"0",
          "rewardAndPunishmentDescribe":"测试",
          "opinion":"测试",
          occurrenceTime:'',
          "treatmentMethod":"处理办法",
          "rewardAndPunishmentStatus":"WSB",
          "approvalOpinion":"",
          "fileList":[
            {
              "fileId":"2",
              "fileName":"文件名称",
              "fileType":"txt"
            }
          ]
        },
        //当前组件默认请求(list)数据时,ajax处理的 基础信息设置
        listMessTitle:{
          ajaxSuccess:'SuccessGetCurrData',
          ajaxParams:{
            url:'rewardAndPunishment/get/'+this.operailityData.id,
          }
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

        this.data =responseData.data
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

      //转换
      converterLeaveType(leaveType){
        switch (leaveType){
          case 'SHI' : leaveType = '事假';
            break;
          case 'BING' : leaveType = '病假';
            break;
          case 'SANG' : leaveType = '丧假';
            break;
          case 'CHAN' : leaveType = '产假';
            break;
          case 'TAN' : leaveType = '探亲假';
            break;
          case 'HUN' : leaveType = '婚假';
            break;
          case 'OTHER' : leaveType = '其他';
            break;

        }
        return leaveType
      },
//转换请假条状态
      converterStatus(status){
        switch (status){
          case 'WSB' : status = '未上报';
            break;
          case 'DSH' : status = '审核中(待审)';
            break;
          case 'TG' : status = '通过';
            break;
          case 'BTG' : status = '不通过';
            break;
          case 'BH' : status = '驳回修改';
            break;
        }
        return status
      },

      /*
       * 获取表单数据
       * @return string  格式:id=0&name=aa
       * */
      getFormData(data){
        let myData = Util._.defaultsDeep({},data);
        return myData;
      },
    }
  }
</script>
