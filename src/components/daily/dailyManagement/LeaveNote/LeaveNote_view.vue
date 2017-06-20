<!--请假条 查看-->
<template>
  <div class="leaveNote_view">
 	<div>
       <div>
         <div  class="headline"><span class="headline-text">1</span><span> . &nbsp;科室ID</span></div>
       </div>
       <div class="content-wrap">
         <p class="content"  prop="depId">&nbsp;</p>
       </div>
    </div>
 	<div>
       <div>
         <div  class="headline"><span class="headline-text">2</span><span> . &nbsp;请假人ID</span></div>
       </div>
       <div class="content-wrap">
         <p class="content"  prop="applicantId">&nbsp;</p>
       </div>
    </div>
 	<div>
       <div>
         <div  class="headline"><span class="headline-text">3</span><span> . &nbsp;请假类型（枚举：SHI.事假、BING.病假、SANG.丧假、CHAN产假、TAN探亲假、HUN婚假、OTHER其他...）</span></div>
       </div>
       <div class="content-wrap">
         <p class="content"  prop="leaveType">&nbsp;</p>
       </div>
    </div>
 	<div>
       <div>
         <div  class="headline"><span class="headline-text">4</span><span> . &nbsp;开始时间</span></div>
       </div>
       <div class="content-wrap">
         <p class="content"  prop="beginDate">&nbsp;</p>
       </div>
    </div>
 	<div>
       <div>
         <div  class="headline"><span class="headline-text">5</span><span> . &nbsp;结束时间</span></div>
       </div>
       <div class="content-wrap">
         <p class="content"  prop="endDate">&nbsp;</p>
       </div>
    </div>
 	<div>
       <div>
         <div  class="headline"><span class="headline-text">6</span><span> . &nbsp;小时</span></div>
       </div>
       <div class="content-wrap">
         <p class="content"  prop="timeLength">&nbsp;</p>
       </div>
    </div>
 	<div>
       <div>
         <div  class="headline"><span class="headline-text">7</span><span> . &nbsp;请假事由</span></div>
       </div>
       <div class="content-wrap">
         <p class="content"  prop="explains">&nbsp;</p>
       </div>
    </div>
 	<div>
       <div>
         <div  class="headline"><span class="headline-text">8</span><span> . &nbsp;WSB.未上报、DSH.审核中(待审)、TG.通过、BTG.不通过、BH.驳回修改</span></div>
       </div>
       <div class="content-wrap">
         <p class="content"  prop="status">&nbsp;</p>
       </div>
    </div>
 	<div>
       <div>
         <div  class="headline"><span class="headline-text">9</span><span> . &nbsp;创建时间</span></div>
       </div>
       <div class="content-wrap">
         <p class="content"  prop="createTime">&nbsp;</p>
       </div>
    </div>
 	<div>
       <div>
         <div  class="headline"><span class="headline-text">10</span><span> . &nbsp;修改时间</span></div>
       </div>
       <div class="content-wrap">
         <p class="content"  prop="updateTime">&nbsp;</p>
       </div>
    </div>
 	<div>
       <div>
         <div  class="headline"><span class="headline-text">11</span><span> . &nbsp;0.没有，1有</span></div>
       </div>
       <div class="content-wrap">
         <p class="content"  prop="isAttachment">&nbsp;</p>
       </div>
    </div>
 	<div>
       <div>
         <div  class="headline"><span class="headline-text">12</span><span> . &nbsp;SXS实习生、YJS研究生、ZYY住院医、JXS进修生</span></div>
       </div>
       <div class="content-wrap">
         <p class="content"  prop="userType">&nbsp;</p>
       </div>
    </div>
 	<div>
       <div>
         <div  class="headline"><span class="headline-text">13</span><span> . &nbsp;0未删除，1删除</span></div>
       </div>
       <div class="content-wrap">
         <p class="content"  prop="isDelete">&nbsp;</p>
       </div>
    </div>
    <el-row  class="btn">
    <el-col :span="5" :offset="16">
      <Button type="primary" @click="confirm()">确定</Button>
    </el-col >
  </el-row >
  </div>
</template>
<script >
  import util from "../../../../libs/util";
  const getList = util.getList;
  const url = 'data1.json'
  export default {
    props: ['showData','parent'],
    data (){
      return{
        formValidate: {
          name: '',
          school: '',
          status: ''
        },
        show:{},
        tableData:[{
          'name':'张莎',
            'gender':'女',
          'phone':'13223222222'
        },
        {
          'name':'黎明',
          'gender':'男',
         'phone':'13223222222'
        }]
      }
    },
 /*   watch:{
      showData(){
        let that = this;
        let parm = this.showData;
        let response = getList(url,parm);
        response.then(function (res) {
          let responseData = res.data;
          if (_.isObject(responseData["status"]) && responseData["status"]["code"] == 0) {
            that.show = responseData.data[0];
            that.$emit('loading')

          }
        })
          .catch(function (err) {
            //捕获错误异常
            console.log("err"
              , err);
          });
      }
    },*/
    computed:{
      countDate(){
        if(!this.show.beginTime)return
        let beginTime = this.show.beginTime;
        let endTime = this.show.endTime;
        beginTime =  Date.parse(new Date(beginTime))
        endTime =  Date.parse(new Date(endTime))
        if(endTime+1<beginTime)return;
        let time = endTime- beginTime;
        var time2 = time/86400000+1;
        return time2
      }
    },
    methods:{
      confirm(){
        this.$emit('show')
      }
    }

  }
</script>
