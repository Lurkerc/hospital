<template>

  <div >
    <el-form :model="formValidate" ref="formValidate" :rules="rules" class="demo-form-inline" label-width="110px" >

      <el-row >
        <el-col :span="10" :offset="2">
          <el-form-item label="科室编号：" prop="code" >
            <el-input v-model="formValidate.code" placeholder="请输入"></el-input>
          </el-form-item>
        </el-col >

        <el-col :span="10" >
          <el-form-item label="科室名称：" prop="name" >
            <el-input v-model="formValidate.name" placeholder="请输入"></el-input>
          </el-form-item>
        </el-col >
      </el-row >

      <el-row >
        <el-col :span="10" :offset="2">
          <el-form-item label="上级科室：">
            {{formValidate.parentName}}
          </el-form-item>
        </el-col >

        <el-col :span="8" >

          <el-form-item label="科室主任：" prop="director" >
            <el-input :readonly="true" @focus="addUser('director')" v-model="formValidate.director" placeholder="请输入"></el-input>
          </el-form-item>
        </el-col >
        <el-col :span="1" :offset="1">
          <i class="el-icon-plus" @click="addUser('director')"></i>
        </el-col >
      </el-row >
      <el-row >
        <el-col :span="8" :offset="2">
          <el-form-item label="教学秘书：" prop="secretary" >
            <el-input :readonly="true" @focus="addUser('secretary')" v-model="formValidate.secretary" placeholder="请输入"></el-input>
          </el-form-item>
        </el-col >
        <el-col :span="1" :offset="1">
          <i class="el-icon-plus" @click="addUser('secretary')"></i>
        </el-col >
        <el-col :span="8">
          <el-form-item label="护士长：" prop="nurse" >
            <el-input :readonly="true" @focus="addUser('nurse')" v-model="formValidate.nurse" placeholder="请输入"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="1" :offset="1">
          <i class="el-icon-plus" @click="addUser('nurse')"></i>
        </el-col >
      </el-row >

      <div class="itemLayout">
        <fieldset>
          <legend style="font-size:16px">&nbsp;&nbsp;科室最大承载量&nbsp;&nbsp;</legend>
          <el-row >
            <el-col :span="10" :offset="1">
              <el-form-item label="实习生：" prop="ssyCapacity" >
                <el-input v-model="formValidate.ssyCapacity" placeholder="请输入"></el-input>
              </el-form-item>
            </el-col >

            <el-col :span="10" >
              <el-form-item label="研究生：" prop="yjsCapacity" >
                <el-input v-model="formValidate.yjsCapacity" placeholder="请输入"></el-input>
              </el-form-item>
            </el-col >
          </el-row >
          <el-row >
            <el-col :span="10" :offset="1">
              <el-form-item label="住院医：" prop="zyyCapacity" >
                <el-input v-model="formValidate.zyyCapacity" placeholder="请输入"></el-input>
              </el-form-item>
            </el-col >

            <el-col :span="10" >
              <el-form-item label="进修生：" prop="jxsCapacity" >
                <el-input v-model="formValidate.jxsCapacity" placeholder="请输入"></el-input>
              </el-form-item>
            </el-col >
          </el-row >
        </fieldset>
      </div>
    </el-form>
    <br />
    <el-row >
      <el-col :span="10" :offset="10">
        <load-btn @listenSubEvent="listenSubEvent" :btnData="loadBtn"></load-btn>
        <el-button  @click="cancel">取消</el-button>
      </el-col>
    </el-row >

    <!--选择人员-->
    <Modal
      width="890"
      v-model="selectUserModal"
      title="新建教学活动"
      class-name="vertical-center-modal">
      <modal-header slot="header" :content="selectUserId"></modal-header>
      <select-user v-if="selectUserModal" @cancel="closeUserModal" @setUsers="setUsers" :initUser="initUser"></select-user>
      <div slot="footer"></div>
    </Modal>
  </div>
</template>
<script>
  import {nosocomial as rules} from '../../rules'
  import selectUser from "../../../../common/selectUser.vue"
  //当前组件引入全局的util
  let Util=null;
  export default {
    //props接收父组件传递过来的数据
    props: ['operailityData'],
    data (){
      return{
        rules,
        courses: [{
          type: '',
          bizDict: ''
        }],
        //保存按钮基本信息
        loadBtn:{title:'提交',callParEvent:'listenSubEvent'},
        countDate:0,
        //form表单bind数据
        formValidate: {
          "name":"",
          "code":"",
          "directorId":"",
          "director":"",
          "secretaryId":"",
          "secretary":"",
          "nurseId":"",
          "nurse":"",
          "zyyCapacity":"",
          "ssyCapacity":"",
          "yjsCapacity":"",
          "jxsCapacity":"",
          "path":this.operailityData.path,   //深度路径
          "depth":this.operailityData.depth,  //深度级别
          "parentId":this.operailityData.parentId,
          "parentName":this.operailityData.parentName,
        },


        //当前操作的选择人员
        currSltUserName:"",
        //选择人员
        selectUserId:{
          id:"selectUserId",
          title:"选择人员",
          usersData:''
        },
        //给选择人员框传递的已选人员信息
        initUser:[],

        //当前组件提交(add)数据时,ajax处理的 基础信息设置
        addMessTitle:{
          type:'add',
          successTitle:'添加成功!',
          errorTitle:'添加失败!',
          ajaxSuccess:'ajaxSuccess',
          ajaxError:'ajaxError',
          ajaxParams:{
            url:'/hospital/dept/add',
            method:'post',
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
      //this.init();
    },
    methods:{

      /*
       * 组件初始化入口
       * */
      init(){
        //默认请求加载数据

      },


      //添加人员
      addUser(itmeName){
        this.currSltUserName = itmeName;
        this.initUser=[];
        if(this.formValidate[this.currSltUserName]!="") {
          let names = this.formValidate[this.currSltUserName].split(",");
          let ids = this.formValidate[this.currSltUserName + "Id"].split(",");

          for(var i=0;i<names.length;i++){
            if(names[i]!=""){
              this.initUser.push({
                key:ids[i],
                label:names[i],
                description: '人员id---' + ids[i] + '的描述信息',
                disabled: false
              })
            }
          }
        }
        this.openModel('selectUser');
      },


      //关闭选择人员弹窗
      closeUserModal(){
        this.selectUserModal = false;
      },


      /*
       * 获取选择人员的人员信息并赋值
       * @param users [{id:'',name:''},{}]  已选人员信息
       * */
      setUsers(users){
        let namesArr = []
        let idsArr = [];
        for(var i=0;i<users.length;i++){
          namesArr.push(users[i].label);
          idsArr.push(users[i].key);
        }
        this.formValidate[this.currSltUserName] = namesArr.join(",");
        this.formValidate[this.currSltUserName+"Id"] = idsArr.join(",");
        this.closeUserModal();
      },


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
          this.addMessTitle.ajaxParams.data = this.getFormData(this.formValidate);
          this.ajax(this.addMessTitle, isLoadingFun)
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
       * 当前组件发送事件给父组件
       * 发送关闭(cancel)模态事件给父组件,请求关闭当前模态窗
       * */
      cancel(){
        this.$emit('cancel','add');
      },


      /*
       * 打开指定的模态窗体
       * @param options string 当前指定的模态:"add"、"edit"
       * */
      openModel(options){
        this[options+'Modal'] = true;
      },


      /*
       * 获取表单数据
       * @return string  格式:id=0&name=aa
       * */
      getFormData(data){
        let myData = Util._.defaultsDeep({},data);
        return myData;
      },
    },
    components:{
      selectUser
    }
  }
</script>
<style>
</style>
