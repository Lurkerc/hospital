<template>

  <div class="showWrapper leaveManagement-show">

      <el-row class="lose-margin2" >
        <el-col :span="11" :offset="10">
          {{data.title}}
        </el-col >
      </el-row >

    <el-row v-for="item in data.voteResultList" :key="item"  >
      <el-col :span="20" :offset="2">
        投票规则 ：

      </el-col >
    </el-row >

    <el-row v-for="item in data.voteResultList" :key="item" class="lose-margin2" >
      <el-col :span="20" :offset="2">

        <el-input
          type="textarea"
          :rows="5"
          readonly
          resize="none"
          v-model="data.voteRule">
        </el-input>

      </el-col >
    </el-row >


      <el-row v-for="item in data.voteResultList" :key="item" class="lose-margin2" >
        <el-col :span="20" :offset="2">
          <div style="width: 50px;height: 50px;background: #000"></div>
          {{item.userName}}
          <i style="margin: 0 25px; font-size: 16px" :class="{'el-icon-star-off':formValidate.userId != item.userId,'el-icon-star-on':formValidate.userId == item.userId}" @click="cote(item)"></i>
          <div style="margin:0 25px;display: inline-block;background: palegreen;height: 20px; vertical-align: middle" :style="{width:item.voteNum*3+'px'}"></div> {{item.voteNum}}
        </el-col >
      </el-row >

    <el-row>
      <el-col :span="10" :offset="2">
        <div style="margin-left: 100px">
          <load-btn @listenSubEvent="listenSubEvent" :btnData="loadBtn"></load-btn>
          <el-button  @click="cancel">取消</el-button>
        </div>
      </el-col>
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



        options: [{
          value: '选项1',
          label: '所有人'
        }, {
          value: '选项2',
          label: '本科教育'
        }, {
          value: '选项3',
          label: '实习生'
        }, {
          value: '选项4',
          label: '研究生'
        }, {
          value: '选项5',
          label: '住院医师'
        }, {
          value: '选项5',
          label: '进修生'
        }],
        //保存按钮基本信息
        loadBtn:{title:'确定',callParEvent:'listenSubEvent'},
        //form表单bind数据
        formValidate: {
          voterId:'10000',      //投票人id
          userId:'',      //被投票人id
          resultId:'',      //投票结果id
          voteId:this.operailityData.id,      //投票项目id
        },

        //投票数据
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
        voteResult:'',    //保存投中的
        //当前组件提交(edit)数据时,ajax处理的 基础信息设置
        voteMessTitle:{
            type:'vote',
            successTitle:'修改成功',
            errorTitle:'修改失败',
            ajaxSuccess:'ajaxSuccess',
            ajaxParams:{
              url:'appraising/vote/project/vote',
              method:'post',
            }
        },
        //当前组件默认请求(list)数据时,ajax处理的 基础信息设置
        listMessTitle:{
          paramsData:'listUrl',
          ajaxSuccess:'SuccessGetCurrData',
          ajaxParams:{
            url:'appraising/vote/project/getMyResult/'+this.operailityData.id,
          }
        }
      }
    },
    created(){
      //给当前组件注入全局util
      Util = this.$util;
    },
    mounted(){
      //设置投票人id
      let userInfo = this.$store.getters.getUserInfo;
      this.formValidate.voterId = userInfo.id;
      //初始化
      this.init();
    },
    methods:{
      cote(item){
          if(item.userId == this.voteResult) return;
          item.voteNum++;
          this.formValidate.userId = item.userId;
          this.formValidate.resultId = item.resultId;
          if(this.voteResult) this.voteResult.voteNum--;
          this.voteResult = item;
      },


      /*
       * 点击提交按钮 监听是否提交数据
       * @param isLoadingFun boolean  form表单验证是否通过
       * */
      listenSubEvent(isLoadingFun){
          if(!this.voteResult){   //如果没有投票
            this.errorMess('请投票');
            return;
          }
          if (!isLoadingFun) isLoadingFun = function () {};
          isLoadingFun(true)
          this.voteMessTitle.ajaxParams.data = this.getFormData(this.formValidate);
          this.ajax(this.voteMessTitle, isLoadingFun)
      },


      /*
       * 点击提交按钮 监听是否验证通过
       * @param formName string  form表单v-model数据对象名称
       * @return flag boolean   form表单验证是否通过
       * */
      submitForm(formName){
        let flag = false;
        this.$refs[formName].validate((valid) => {
          if (valid) {
            flag= true;
          }
        });
        return flag;
      },


      /*
       * 默认组件第一次请求数据
       * @param res JSON  数据请求成功后返回的数据
       * */
      SuccessGetCurrData(responseData){
           this.addIsVote(responseData.voteResultList);
           this.data = responseData;
      },


      /*
      * 添加投票状态
      * */
      addIsVote(data){
          for(let i=0;i<data.length;i++){
              data[i].isVote = false;
          }
      },

      /*
       * 当前组件发送事件给父组件
       * 发送关闭(cancel)模态事件给父组件,请求关闭当前模态窗
       * */
      cancel(){
        this.$emit('cancel','vote');
      },
      /*
       * 获取表单数据
       * @return string  格式:id=0&name=aa
       * */
      getFormData(data){
        let myData = Util._.defaultsDeep({},data);
        return myData;
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

