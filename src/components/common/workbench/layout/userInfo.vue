<template>
  <!-- 用户资料 -->
  <div>
    <div class="uwUserInfo">
      <div class="userHeadPic"><img :src="userInfo.headPhoto"></div>
      <p class="userInfoName" v-if="userInfo.roleList">{{ userInfo.name }}（{{ userInfo.roleList[0].name }}）</p>
      <div class="userInfoTodoBtn">
        <el-button type="text" @click="eidtArchives">个人档案</el-button>
        <el-button type="text" @click="eidtPass">修改密码</el-button>
      </div>
    </div>
    <!--未审核提示信息-->
    <Modal :mask-closable="false" v-model="archivesModal" height="200" title="对话框标题" class-name="vertical-center-modal" :width="460">
      <modal-header slot="header" :content="contentHeader.archivesId"></modal-header>
      <div>
        <el-row>
          <el-col :span="24">
            <el-alert title="友情提示" type="info" :closable="false" :description="'尊敬的用户'+userInfo.name+','+currAuditStatus" show-icon>
            </el-alert>

          </el-col>
        </el-row>
        <br />
        <el-row>
          <el-col :span="4">&nbsp;</el-col>
          <el-col :span="8" style="text-align: center;">
            <el-button type="text" @click="eidtArchives">去完善个人档案</el-button>
          </el-col>
          <el-col :span="8" style="text-align: center;">
            <el-button type="text" @click="eidtPass">去修改密码</el-button>
          </el-col>
          <el-col :span="4">&nbsp;</el-col>
        </el-row>
      </div>
      <div slot="footer"></div>

    </Modal>
    <!--修改档案-->
    <Modal :mask-closable="false" v-model="editModal" height="200" class-name="vertical-center-modal" :width="1100">
      <modal-header slot="header" :content="contentHeader.editId"></modal-header>
      <edit v-if="editModal" @cancel="cancel" @edit="subCallback" :operaility-data="operailityData"></edit>
      <div slot="footer"></div>
    </Modal>
    <!--修改密码-->
    <Modal :mask-closable="false" v-model="passwordModal" height="200" class-name="vertical-center-modal" :width="460">
      <modal-header slot="header" :content="contentHeader.passwordId"></modal-header>
      <pwd v-if="passwordModal" @cancel="cancel" @password="subCallback" :operaility-data="operailityData"></pwd>
      <div slot="footer"></div>
    </Modal>
  </div>
</template>

<script>
  /*当前组件必要引入*/
  //import edit from "../../../teach/archivesManagement/archivesManagement/archivesManagement_edit";
  import edit from "../../archivesManagement/archivesManagement_edit.vue";
  import pwd from "../../password";
  let Util = null;
  export default {
    data() {
      return {
        isOnce: true,
        operailityData: [],

        //档案审核
        archivesModal: false,
        currAuditStatus: "",

        passwordModal: false,
        contentHeader: {
          editId: {
            id: "editId",
            title: "档案修改"
          },
          passwordId: {
            id: 'password',
            title: '修改密码'
          },
          archivesId: {
            id: 'add',
            title: '提示'
          },
        }
      }
    },
    created() {
      Util = this.$util;
    },
    methods: {
      //打开完善档案弹窗
      eidtPass() {
        this.operailityData = this.userInfo;
        this.passwordModal = true;
      },

      //打开完善档案弹窗
      eidtArchives() {
        this.operailityData = this.userInfo;
        this.editModal = true;
      },

      //模态窗操作完成后的回调
      subCallback(target, title, updata) {
        this.cancel(target);
        if (title) {
          this.successMess(title);
        }
      },

      /*
       * 监听子组件通讯的方法
       * 作用:根据不同的参数关闭对应的模态
       * @param targer string example:"add"、"edit"
       * */
      cancel(targer) {
        this[targer + 'Modal'] = false;
      },
    },
    computed:{
      userInfo(){
        let info = this.$store.getters.getUserInfo || {};
        if (!Util.isEmptyObject(info)) {
          this.operailityData = info;
          if (this.isOnce) {
            if (!!info.auditStatus) {
              if (info.auditStatus != "AUDIT_SUCCESS") {
                this.archivesModal = true;
              }

              if (info.auditStatus == "NOT_SUBMIT") { //未提交
                this.currAuditStatus = "您的档案未提交,请先完善个人档案!";
              } else if (info.auditStatus == "NOT_AUDIT") { //未审核
                this.currAuditStatus = "您的档案审核中,请等待!";
              } else { //AUDIT_FAILURE  审核拒绝
                this.currAuditStatus = "您的档案审核拒绝,请检查并重新填写!";
              }
            }
          }
        }
        return info;
      }
    },
    components: {
      edit,
      pwd
    }
  }

</script>

<style lang="scss">
  /* 用户资料 */

  @import"../../../../assets/ambuf/css/workbench_v1.0/userInfo";

</style>
