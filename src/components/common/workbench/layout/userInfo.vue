<template>
  <!-- 用户资料 -->
  <div>
    <div class="uwUserInfo">
      <div class="userHeadPic"><img :src="userInfo.headPhoto"></div>
      <p class="userInfoName">{{ userInfo.name }}（{{ userInfo.roleList[0].name }}）</p>
      <div class="userInfoTodoBtn">
        <el-button type="text" @click="eidtArchives">个人档案</el-button>
        <el-button type="text" @click="eidtPass">修改密码</el-button>
      </div>
    </div>
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
  import edit from "../../../teach/archivesManagement/archivesManagement/archivesManagement_edit";
  import pwd from "../../password";
  export default {
    data() {
      return {
        userInfo: {},
        operailityData: [],
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
        }
      }
    },
    created() {
      this.userInfo = this.$store.getters.getUserInfo;
      this.operailityData = this.userInfo;
      let info = this.userInfo;
      // 帐号状态检测
      if (info.auditStatus) {
        if (info.auditStatus !== "AUDIT_SUCCESS") {
          this.eidtArchives()
        }

        if (info.auditStatus === "NOT_SUBMIT") { //未提交
          this.currAuditStatus = "您的档案未提交,请先完善个人档案!";
        } else if (info.auditStatus === "NOT_AUDIT") { //未审核
          this.currAuditStatus = "您的档案审核中,请等待!";
        } else { //AUDIT_FAILURE  审核拒绝
          this.currAuditStatus = "您的档案审核拒绝,请检查并重新填写!";
        }
      }
    },
    methods: {
      //打开完善档案弹窗
      eidtPass() {
        this.passwordModal = true;
      },

      //打开完善档案弹窗
      eidtArchives() {
        this.editModal = true;
      },

      //模态窗操作完成后的回调
      subCallback(target, title, updata) {
        this.cancel(target);
        if (title) {
          this.successMess(title);
        };
        // 每次修改档案都获取最新的档案信息
        this.$store.commit('setUserInfo', this)
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
