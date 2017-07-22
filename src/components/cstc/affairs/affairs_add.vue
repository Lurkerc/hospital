<template>
  <!--事项增加-->
  <div class="editForm">
    <el-form :model="formValidate" ref="formValidate" :rules="rules" class="demo-form-inline" label-width="130px">

      <el-row>
        <el-col :span="10" :offset="1">
          <el-form-item label="日期：" prop="registerDate">
            <el-date-picker name="end" v-model="formValidate.registerDate" :editable="false" type="date" placeholder="选择日期"></el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="10" :offset="2">
          <el-form-item label="日期：" prop="timeInterval">
            <el-time-select v-model="formValidate.timeInterval" :editable="false" :picker-options="{start: '06:00',step: '00:05', end: '22:30' }"
              placeholder="选择时间">
            </el-time-select>
          </el-form-item>
        </el-col>

        <el-col :span="10" :offset="1">
          <el-form-item label="类型：" prop="affairType">
            <el-select placeholder="请选择类型" v-model="formValidate.affairType">
              <el-option v-for="item in typeOption" v-if="item.value" :key="item.value" :label="item.label" :value="item.value"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="10" :offset="2">
          <el-form-item label="课时：" prop="classhour">
            <el-input v-model="formValidate.classhour" placeholder="请输入"></el-input>
          </el-form-item>
        </el-col>

        <el-col :span="10" :offset="1">
          <el-form-item label="人次：" prop="peopleNum">
            <el-input v-model="formValidate.peopleNum" placeholder="请输入"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="10" :offset="2">
          <el-form-item label="教师/考官：" prop="teacher">
            <el-input v-model="formValidate.teacher" placeholder="请输入"></el-input>
          </el-form-item>
        </el-col>

        <el-col :span="10" :offset="1">
          <el-form-item label="登记人：" prop="creater">
            <el-input v-model="formValidate.creater" :readonly="true"></el-input>
          </el-form-item>
        </el-col>

        <el-col :span="21" :offset="1">
          <el-form-item label="培训地点：" required>
            <span style="display:inline;">{{ roomNums.join('，') }}</span>
            <el-button type="info" @click="selectRoom">选择房间</el-button>
          </el-form-item>
        </el-col>

        <el-col :span="21" :offset="1">
          <el-form-item label="培训/考核对象：" required>
            <span v-for="(item,index) in users" :key="index">{{ item.userName }}</span>
            <el-button type="info" @click="selectUser">选择人员</el-button>
          </el-form-item>
        </el-col>
        <el-col :span="10" :offset="1">
          <el-form-item label="使用部门：">
            <span>{{ formValidate.department }}</span>
            <el-button type="info">选择部门</el-button>
          </el-form-item>
        </el-col>

        <el-col :span="22" :offset="1">
          <el-form-item label="培训/考核内容：">
            <el-input type="textarea" v-model="formValidate.trainingContent" :autosize="{ minRows: 4, maxRows: 6}" placeholder="请输入内容">
            </el-input>
          </el-form-item>
        </el-col>
        <el-col :span="22" :offset="1">
          <el-form-item label="备注：">
            <el-input type="textarea" v-model="formValidate.remark" :autosize="{ minRows: 4, maxRows: 6}" placeholder="请输入内容">
            </el-input>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>

    <el-row type="flex" class="row-bg" justify="center">
      <el-col :span="4" class="btnBox">
        <load-btn @listenSubEvent="listenSubEvent" :btnData="loadBtn"></load-btn>
      </el-col>
      <el-col :span="4" class="btnBox" :offset="2">
        <el-button @click="cancelAdd">取消</el-button>
      </el-col>
    </el-row>
    <!--选择房间-->
    <Modal :mask-closable="false" v-model="selectRoomModal" height="200" class-name="vertical-center-modal" :width="960">
      <modal-header slot="header" :content="headerContent.selectRoomId"></modal-header>
      <select-room v-if="selectRoomModal" @cancel="cancel" @select="selectRoomCallback" :select="roomIds"></select-room>
      <div slot="footer"></div>
    </Modal>
    <!--选择人员-->
    <Modal width="890" v-model="selectUserModal" title="新建教学活动" class-name="vertical-center-modal">
      <modal-header slot="header" :content="headerContent.selectUserId"></modal-header>
      <select-user v-if="selectUserModal" @cancel="cancel" @setUsers="setUsers" :initUser="users"></select-user>
      <div slot="footer"></div>
    </Modal>
  </div>
</template>
<script>
  //当前组件引入全局的util
  let Util = null;

  import typeOption from './typeOption'; // 事项类型

  import selectRoom from '../../common/selectRoom'; // 选择房间

  import {
    affairs as rules
  } from '../rules'; // 验证规则
  export default {
    data() {
      return {
        rules,
        //保存按钮基本信息
        loadBtn: {
          title: '提交',
          callParEvent: 'listenSubEvent'
        },
        countDate: 0,
        users: [],
        roomIds: [],
        roomNums: [],
        //form表单bind数据
        formValidate: {
          registerDate: "2017-01-02",
          timeInterval: "14:00",
          classhour: "1",
          affairType: "",
          trainingObject: "住院医",
          peopleNum: "50",
          teacher: "张三",
          trainingObject: "培训对象",
          department: "教育处",
          creater: "李四",
          trainingContent: "考核内容",
          remark: "备注",
          roomList: [{
            "roomId": "1",
            "roomNum": "101"
          }],
          userList: [{
            userId: 1,
            userName: '666'
          }]
        },
        typeOption, // 事项类型
        //当前组件提交(add)数据时,ajax处理的 基础信息设置
        addMessTitle: {
          type: 'add',
          successTitle: '添加成功!',
          errorTitle: '添加失败!',
          ajaxSuccess: 'ajaxSuccess',
          ajaxError: 'ajaxError',
          ajaxParams: {
            url: '/role/add',
            method: 'post'
          }
        },
        selectRoomModal: false,
        selectUserModal: false,
        headerContent: {
          selectRoomId: {
            id: "selectRoomId",
            title: "选择房间"
          },
          selectUserId: {
            id: "selectUserId",
            title: "选择人员"
          }
        }
      }
    },
    created() {
      //给当前组件注入全局util
      Util = this.$util;
    },
    mounted() {
      //暂时没有初始化,预留初始化入口
      //this.init();
    },
    methods: {
      /*
       * 点击提交按钮 监听是否提交数据
       * @param isLoadingFun boolean  form表单验证是否通过
       * */
      listenSubEvent(isLoadingFun) {
        let isSubmit = this.submitForm("formValidate");
        if (isSubmit) {
          if (!isLoadingFun) isLoadingFun = function () {};
          isLoadingFun(true);
          this.addMessTitle.ajaxParams.data = this.getFormData(this.formValidate);
          let data = this.addMessTitle.ajaxParams.data;
          data.roomIds = this.roomIds.join(',');
          data.roomNums = this.roomNums.join(',');
          console.log(this.addMessTitle.ajaxParams.data)
          // this.ajax(this.addMessTitle, isLoadingFun)
        }
      },
      /*
       * 点击提交按钮 监听是否验证通过
       * @param formName string  form表单v-model数据对象名称
       * @return flag boolean   form表单验证是否通过
       * */
      submitForm(formName) {
        let flag = false;
        this.$refs[formName].validate((valid) => {
          if (valid) {
            flag = true;
          }
        });
        return flag;
      },
      /*
       * 当前组件发送事件给父组件
       * 发送关闭(cancel)模态事件给父组件,请求关闭当前模态窗
       * */
      cancelAdd() {
        this.$emit('cancel', this.addMessTitle.type);
      },
      /*
       * 获取表单数据
       * @return string  格式:id=0&name=aa
       * */
      getFormData(data) {
        let myData = Util._.defaultsDeep({}, data);
        return myData;
      },
      /*
       * 组件初始化入口
       * */
      init() {
        //this.ajax(this.listMessTitle)
      },
      /********************************* 按钮事件 *****************************/
      // 选择房间
      selectRoom() {
        this.openModel('selectRoom')
      },
      // 选择人员
      selectUser() {
        this.openModel('selectUser')
      },
      /********************************* 弹窗相关 *****************************/
      // 取消
      cancel(targer) {
        this[targer + 'Modal'] = false;
      },
      /*
       * 打开指定的模态窗体
       * @param options string 当前指定的模态:"add"、"edit"
       * */
      openModel(options) {
        this[options + 'Modal'] = true;
      },
      /********************************* 弹窗回调 *****************************/
      // 选择房间
      selectRoomCallback(res) {
        this.roomIds.length = 0;
        this.roomNums.length = 0;
        res.map(item => {
          this.roomIds.push(item.id);
          this.roomNums.push(item.roomNum)
        });
        this.cancel('selectRoom')
      },
      // 选择人员
      setUsers(res) {
        this.users = res;
        console.log(res)
        this.cancel('selectUser')
        // let tempArr = [];
        // for (var i = 0, item; i < this.users.length; i++) {
        //   item = this.users[i];
        //   tempArr.push(item.label);
        //   this.formValidate.managerList.push({
        //     id: item.key,
        //     name: item.label,
        //   })
        // }
        // this.userNames = tempArr.join(",");
      },
    },
    components: {
      selectRoom
    }
  }

</script>
<style lang="scss">
  @import '../../../assets/ambuf/css/manage_v1.0/editForm';

</style>
