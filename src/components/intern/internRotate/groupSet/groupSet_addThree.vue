<!----------------------------------
****--分组设置(groupSet_add)
****--@date     2017/7/3
****--@author   zyc<332533011@qq.com
----------------------------------->
<template>
  <div>
    <br />
    <br />
    <el-row>
      <el-col :span="4"><el-button type="primary" @click="showAndHideGroup(true)">添加分组</el-button></el-col>
      <el-col :span="5" v-show="isShowGroup">
        小组名称：<el-input v-model="currGroupName" placeholder="请输入内容" style="width: 120px;"></el-input>
      </el-col>
      <el-col :span="4" v-show="isShowGroup">
        <el-button type="primary" @click="addGroup">确定</el-button> <el-button type="primary" @click="showAndHideGroup(false)">取消</el-button>
      </el-col>
    </el-row>
    <br />
    <el-row :gutter="10" class="myCard">
      <el-col style="margin: 10px 0;" :span="12" v-for="(o, index) in groupData" :key="o">
        <el-card :body-style="{ padding: '0px', margin:'0 auto' }">
          <div slot="header" class="clearfix">
            <div class="headerBox">
              <span style="line-height: 36px;">{{o.groupName}}</span>
              <div class="headerRemove">
                <el-button type="danger" size="mini" icon="close" @click="removeGroup"></el-button>
              </div>
            </div>
          </div>
          <div style="padding: 14px;">
            <el-row>
              <el-col :span="16">
                <el-input readonly></el-input>
              </el-col>
              <el-col :span="4" :push="1">
                <el-tooltip content="点击添加人员" placement="top">
                <el-button type="primary" icon="plus" @click="addUser(index)"></el-button>
                </el-tooltip>
              </el-col>
            </el-row>

            <div class="el-form selectUserBox">
              <fieldset style="height:90px;">
                <legend style="font-size:16px">&nbsp;&nbsp;已选人员&nbsp;</legend>
                <div style="height:40px;overflow:auto;" v-if="o.groupUserNames.length>0">
                  <el-tag style="margin: 2px;" v-for="(item,idx) in o.groupUserNames" :key="idx" :closable="true" type="success" @close="handleMClose(index,idx)">
                    {{item}}
                  </el-tag>
                </div>
                <p v-else>请选择组员</p>
              </fieldset>
            </div>
          </div>
        </el-card>
      </el-col>
    </el-row>
    <!--选择人员-->
    <Modal
      width="890"
      v-model="selectUserModal"
      title="新建教学活动"
      class-name="vertical-center-modal">
      <modal-header slot="header" :content="selectUserId"></modal-header>
      <select-user v-if="selectUserModal" @cancel="closeUserModal"  @setUsers="setUsers" :initUser="users"></select-user>
      <div slot="footer"></div>
    </Modal>
  </div>
</template>
<script>
  /*当前组件必要引入*/
  //引入当前组件字典api
  import api from "../api.js";
  //当前组件引入全局的util
  let Util = null;
  export default{
    props:["schoolData"],
    data() {
      return {
        //当前操作的选择人员的已选人员
        users:[],
        selectUserModal:false,
        //选择人员
        selectUserId:{
          id:"selectUserId",
          title:"选择人员",
          usersData:''
        },

        //当前添加组的名称
        currGroupName:"",
        currGropuIdx:"",

        //显示隐藏小组名称添加
        isShowGroup:false,

        //组的数据
        groupData:[],
      }
    },
    methods: {
      //初始化请求列表数据
      init(){
        Util = this.$util;
      },
      /**
       * 是否显示添加组的信息
        * @param flag  {boolean}  true为显示,false为隐藏
       */
      showAndHideGroup(flag){
          this.isShowGroup = flag;
      },


      /**
       * 添加人员
       * @param index {number}  当前组的索引
       */
      addUser(index){
        this.currGropuIdx = index;
        for(var i=0,item,idItem;i<this.groupData[index]["groupUserNames"].length;i++){
          item = this.groupData[index]["groupUserNames"][i];
          idItem = this.groupData[index]["groupUserIds"][i];

        }
        this.openModel('selectUser');
      },


      /**
       * 获取选择人员的人员信息并赋值
       * @param users [{key:'10204',label:'内科01'},{}]  已选人员信息
       * */
      setUsers(users){
        this.users = users;
        this.setGroupPeople(users);
        this.closeUserModal();
      },


      /**
       * 当前选择人员框的已选人员给组(group)bind数据
       * @param users [{key:'10204',label:'内科01'},{}]  已选人员信息
       * */
      setGroupPeople(users){
        let index = this.currGropuIdx;
        this.groupData[index]["groupUserIds"] = [];
        this.groupData[index]["groupUserNames"] = [];
        for(var i=0;i<users.length;i++){
          this.groupData[index]["groupUserIds"].push(users[i]["key"]);
          this.groupData[index]["groupUserNames"].push(users[i]["label"]);
        }
      },


      //关闭选择人员弹窗
      closeUserModal(){
        this.selectUserModal = false;
      },


      /**
       * 打开指定的模态窗体
       * @param options string 当前指定的模态:"add"、"edit"
       * */
      openModel(options){
        this[options+'Modal'] = true;
      },


      //添加分组
      addGroup(){
        let template = this.addDataTemplate();
        this.groupData.push(template);
        this.isAddGroup();
      },


      //通知父组件是否有小组被添加
      isAddGroup(){
        let flag = false;
        if(this.groupData.length>0){
          flag = true;
        }
        this.$emit("isHashGroup",flag);
      },


      /**
       * 删除组
       * @param idx  {number}  当前组索引
       */
      removeGroup(idx){
        this.groupData.splice(idx,1);
        this.isAddGroup();
      },

      /**
       * 删除已选择的参考人员
       * @param index  {number}   当前组索引
       * @param idx    {number}   当前人员split(',')后的索引
       */
      handleMClose(index,idx) {
        this.groupData[index]["groupUserIds"].splice(idx, 1);
        this.groupData[index]["groupUserNames"].splice(idx, 1);
      },

      //添加分组绑定数据模板
      addDataTemplate(){
          let template = {
            "groupId":"",
            "groupName":this.currGroupName,
            "groupIndexId":"",
            "schoolId":"",
            "outlineId":"",
            "schoolName":"",
            "groupUserIds":[],   //后台需要数据 "1,2,3"
            "groupUserNames":[],  //后台需要数据 "张三,李四,王五"
          }
          template = Object.assign(template,this.schoolData)
          return template;
      }



    },
    created(){
      this.init();
    },
    mounted(){
    },
    components: {}
  }
</script>
