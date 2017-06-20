<template>
  <!--事项编辑-->
  <div>
    <el-form :module="formValidate" ref="formValidate" :rules="this.$store.state.rules.authority" class="demo-form-inline" label-width="90px">
      <el-row>
        <el-col :span="10" :offset="1">
          <el-form-item label="事项名称" prop="name">
            <el-input size="small" v-model="formValidate.name" placeholder="请输入"></el-input>
          </el-form-item>
        </el-col>
  
        <el-col :span="10" :offset="2">
          <el-form-item label="事项类型" prop="type">
            <el-select size="small" placeholder="事项类型" v-model="formValidate.type">
              <el-option v-for="item in typeOption" :key="item.value" :label="item.label" :value="item.value"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="10" :offset="1">
          <el-form-item label="参加人数" prop="num">
            <el-input size="small" v-model="formValidate.num" placeholder="请输入"></el-input>
          </el-form-item>
        </el-col>
  
        <el-col :span="10" :offset="2">
          <el-form-item label="联系人" prop="contacts">
            <el-input size="small" v-model="formValidate.contacts" placeholder="请输入"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
  
      <el-row>
        <el-col :span="10" :offset="1">
          <el-form-item label="班级" prop="class">
            <el-input size="small" v-model="formValidate.class" placeholder="请输入"></el-input>
          </el-form-item>
        </el-col>
  
        <el-col :span="10" :offset="2">
          <el-form-item label="指导老师" prop="teacher">
            <el-input size="small" v-model="formValidate.teacher" placeholder="请输入"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
  
      <el-row>
        <el-col :span="10" :offset="1">
          <el-form-item label="开始时间" prop="startTime">
            <el-input size="small" v-model="formValidate.startTime" placeholder="请输入"></el-input>
          </el-form-item>
        </el-col>
  
        <el-col :span="10" :offset="2">
          <el-form-item label="结束时间" prop="endTime">
            <el-input size="small" v-model="formValidate.endTime" placeholder="请输入"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
  
      <el-row>
        <el-col :span="10" :offset="1">
          <el-form-item label="附件" prop="file">
            <el-upload class="upload-demo" action="https://jsonplaceholder.typicode.com/posts/" :show-file-list="false">
              <el-button size="small" type="primary">点击上传</el-button>
            </el-upload>
          </el-form-item>
        </el-col>
      </el-row>
  
      <el-row>
        <el-col :span="22" :offset="1">
          <el-form-item label="事项描述" prop="info">
            <el-input type="textarea" autosize placeholder="请输入内容" v-model="formValidate.info">
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
        <el-button @click="cancel">取消</el-button>
      </el-col>
    </el-row>
  </div>
</template>
<script>
//当前组件引入全局的util
let Util = null;

import typeOption from './typeOption.js'; // 事项类型

export default {
  data() {
    return {
      //保存按钮基本信息
      loadBtn: { title: '提交', callParEvent: 'listenSubEvent' },
      countDate: 0,
      //form表单bind数据
      formValidate: {
        name: '事项名称', // 事项名称
        type: '', // 事项类型
        num: '10', // 参加人数
        contacts: '张三', // 联系人
        class: '初级班', // 班级
        teacher: '', // 老师
        startTime: '', // 开始时间
        endTime: '', // 结束时间
        info: '事项描述信息' // 描述信息
      },
      typeOption, // 事项类型
      //当前组件提交(add)数据时,ajax处理的 基础信息设置
      addMessTitle: {
        type: 'edit',
        successTitle: '添加成功!',
        errorTitle: '添加失败!',
        ajaxSuccess: 'ajaxSuccess',
        ajaxError: 'ajaxError',
        ajaxParams: {
          url: '/role/add',
          method: 'post'
        }
      },
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
        if (!isLoadingFun) isLoadingFun = function () { };
        isLoadingFun(true);
        this.addMessTitle.ajaxParams.data = this.getFormData(this.formValidate);
        this.ajax(this.addMessTitle, isLoadingFun)
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
     * 默认组件第一次请求数据
     * @param res JSON  数据请求成功后返回的数据
     * 注:当前为添加页面暂时未用到,属于预留
     * */
    oneDataSuccess(res) {
      /*let responseData = res.data;
      if(this.$util._.isObject(responseData["status"])&&responseData["status"]["code"]==0) {
        let type = [];
        let data = responseData.data;
        type.push(data.type+"");
        this.formValidate = data;
        this.formValidate.type = type;
      }*/
    },
    /*
     * 当前组件发送事件给父组件
     * 发送关闭(cancel)模态事件给父组件,请求关闭当前模态窗
     * */
    cancel() {
      this.$emit('cancel', this.addMessTitle.type);
    },
    /*
     * 获取表单数据
     * @return string  格式:id=0&name=aa
     * */
    getFormData(data) {
      let myData = Util._.defaultsDeep({}, data);
      myData.type = data.type.join(",");
      return myData;
    },
    /*
     * 组件初始化入口
     * */
    init() {
      //this.ajax(this.listMessTitle)
    },
  }
}
</script>
<style scoped>
.date {
  line-height: 25px;
}

.date .countDate {
  display: inline-block;
  width: 70px;
  text-align: center;
  border-bottom: 1px solid;
}

.el-select {
  display: block;
}

.btnBox {
  text-align: center
}
</style>
