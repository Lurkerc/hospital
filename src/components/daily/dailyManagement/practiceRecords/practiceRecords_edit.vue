<template>

  <div >
    <el-form   ref="formValidate"   class="demo-form-inline"  label-width="100px" >

      <el-row >
        <el-col :span="13" :offset="1">
          <el-form-item label="姓名" prop="name" >
            <!--todo 如果为教育处角色弹出选择人员   学生角色为当前登录人姓名-->
            <!--<el-input @focus="selectUser"  placeholder="请输入"></el-input>-->
            {{name}}
          </el-form-item>
        </el-col>
        </el-col >

        <el-col :span="9">
          <el-form-item label="科室"   prop="school">
            <el-select v-model="data.depId" placeholder="请选择">
              <select-option ></select-option>
            </el-select>
          </el-form-item>
        </el-col >
      </el-row >

      <el-row >
        <el-col :span="13" :offset="1">
          <el-form-item label="发生时间">
            <el-date-picker
              v-model="data.occurrenceTime"
              type="date"
              placeholder="选择日期"
            >
            </el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="9" >
          <el-form-item label="奖惩类型">
            <el-radio-group v-model="data.rewardAndPunishmentType">
              <el-radio label="0">奖励</el-radio>
              <el-radio label="1">惩罚</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col>
      </el-row >

      <el-row >
        <el-col :span="22" :offset="1">
          <el-form-item label="事项描述"  >
            <el-input v-model="data.rewardAndPunishmentDescribe" type="textarea"  resize="none" :rows="8"></el-input>
          </el-form-item>
        </el-col>
      </el-row >

      <!--todo   以下两个是教育处全可填，并且状态改为通过 ， 如果是本科生则没有，状态变为DSH     接口上有上传文件，但是ue没有，属于需求目前没有以后可能会实现     5.10 -->
      <el-row >
        <el-col :span="22" :offset="1">
          <el-form-item label="教育处意见"  >
            <el-input v-model="data.opinion" type="textarea"  resize="none" :rows="8"></el-input>
          </el-form-item>
        </el-col>
      </el-row >

      <el-row >
        <el-col :span="22" :offset="1">
          <el-form-item label="处理办法"  >
            <el-input v-model="data.treatmentMethod" type="textarea"  resize="none" :rows="8"></el-input>
          </el-form-item>
        </el-col>
      </el-row >
    </el-form>
    <el-row >
      <el-col :span="4" :offset="20">
        <load-btn @listenSubEvent="listenSubEvent" :btnData="loadBtn"></load-btn>
        <el-button  @click="cancel">取消</el-button>
      </el-col>
    </el-row >
    <!--选择人员弹窗-->
    <Modal
      width="1000"
      v-model="selectUserModal"
      title="查看档案管理弹窗"
      class-name="vertical-center-modal"
    >
      <modal-header slot="header" :content="selectUserId"></modal-header>
      <select-user v-if="selectUserModal" @cancel="selecrUserCancel" @selectUser="subCallback" :operaility-data="operailityData"></select-user>
      <div slot="footer"></div>
    </Modal>
  </div>
</template>
<script >
  //当前组件引入全局的util
  let Util=null;
  export default {
    props: ['operailityData'],
    data (){
      return{

        name:'',
        //获取的数据，
        "data":{
          "id":1,
          "userId":"1",
          "depId":"2",
          "depName":"内科",
          "rewardAndPunishmentType":"0",
          "rewardAndPunishmentDescribe":"测试",
          "opinion":"测试",
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

        options:[{
          value: '0',
          label: '待审核'
        }, {
          value: '1',
          label: '审核通过'
        }, {
          value: '2',
          label: '未审核'
        }],

        //保存按钮基本信息
        loadBtn:{title:'确定',callParEvent:'listenSubEvent'},
        show:{},
        radio:'',

        selectUserId:{id:'selectUserId',title:'选择人员'},
        selectUserModal:false,

        //当前组件提交(edit)数据时,ajax处理的 基础信息设置
        editMessTitle:{
          type:'edit',
          successTitle:'修改成功',
          errorTitle:'修改失败',
          ajaxSuccess:'ajaxSuccess',
          ajaxParams:{
            url:'rewardAndPunishment/modify/'+this.operailityData.id,
            method:'put'
          }
        },
        //当前组件默认请求(list)数据时,ajax处理的 基础信息设置
        listMessTitle:{
          paramsData:'listUrl',
          ajaxSuccess:'SuccessGetCurrData',
          ajaxParams:{
            url:'rewardAndPunishment/get/'+this.operailityData.id,
          }
        }
      }
    },
    watch:{

    },
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
    created(){
      //给当前组件注入全局util
      Util = this.$util;
    },
    mounted(){
      //初始化
      //暂时没有初始化,预留初始化入口  todo 获取的当前登录人
      let userInfo = this.$store.getters.getUserInfo;
      this.data.userId = userInfo.id;
      this.name = userInfo.name;
      this.init();
    },
    methods:{
      /*
       * 点击提交按钮 监听是否提交数据
       * @param isLoadingFun boolean  form表单验证是否通过
       * */
      listenSubEvent(isLoadingFun){

        let isSubmit = this.submitForm("formValidate");
        if(isSubmit) {
          if (!isLoadingFun) isLoadingFun = function () {
          };
          isLoadingFun(true)

          this.editMessTitle.ajaxParams.data=this.formDate(this.getFormData(this.data),['occurrenceTime'],this.yearMonthData);
          this.editMessTitle.ajaxParams.data.rewardAndPunishmentStatus = 'WSB';
          this.ajax(this.editMessTitle, isLoadingFun)
        }
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
        this.data =responseData.data;
      },
      /*
       * 当前组件发送事件给父组件
       * 发送关闭(cancel)模态事件给父组件,请求关闭当前模态窗
       * */
      cancel(){
        this.$emit('cancel','edit');
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


      selecrUserCancel(){
        this.selectUserModal = false;
      },


      //点击选择人员输入时调用
      selectUser(){
        this.selectUserModal = true;
      },


      //确定选择人员调用
      subCallback(target,title,updata){
        this.cancel(target);
        if(title){
          this.successMess(title);
        }
//          if(!updata){
//            this.setTableData();
//          }
      },


    }


  }
</script>
