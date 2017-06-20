<template>
  <!-- 新增广播任务 -->
  <div class="editForm">
    <el-form :model="formValidate" ref="formValidate" :rules="this.$store.state.rules" label-width="90px">
      <el-row>

        <el-col :span="8" :offset="2">
          <el-form-item label="任务名称：">
            <el-input v-model="formValidate.name"></el-input>
          </el-form-item>
        </el-col>

        <el-col :span="8" :offset="2">
          <el-form-item label="发送模式：">
            <el-select v-model="formValidate.sendMode" placeholder="请选择">
              <el-option v-for="item in sendMode" v-if="item.value !== ''" :key="item.value" :label="item.label" :value="item.value"></el-option>
            </el-select>
          </el-form-item>
        </el-col>

        <el-col :span="18" :offset="2">
          <el-form-item label="播放模式：">
            <el-radio-group v-model="formValidate.playMode">
              <el-radio label="WHENLONG">播放时长
                <el-select v-model="formValidate.hour" style="width:60px;">
                  <el-option :key="0" :label="0" :value="0"></el-option>
                  <el-option v-for="item in 12" :key="item" :label="item" :value="item"></el-option>
                </el-select> 小时
                <el-select v-model="formValidate.minute" style="width:65px;">
                  <el-option :key="0" :label="0" :value="0"></el-option>
                  <el-option v-for="item in 60" :key="item" :label="item" :value="item"></el-option>
                </el-select> 分钟
                <el-select v-model="formValidate.second" style="width:65px;">
                  <el-option :key="0" :label="0" :value="0"></el-option>
                  <el-option v-for="item in 60" :key="item" :label="item" :value="item"></el-option>
                </el-select> 秒
              </el-radio>
              <el-radio label="FREQUENCY">播放次数：
                <el-input v-model.number="formValidate.frequency" placeholder="0为循环播放" :maxLength="4" style="width:158px;"></el-input>
              </el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col>

        <el-col :span="18" :offset="2">
          <el-form-item label="定时执行：">
            <el-checkbox v-model="formValidate.isTiming" trueLabel="YES" falseLabel="NO"></el-checkbox>
          </el-form-item>
        </el-col>

        <el-col :span="8" :offset="2">
          <el-form-item label="开始时间：">
            <el-date-picker v-model="formValidate.startTime" :editable="false" type="datetime" placeholder="选择日期时间"></el-date-picker>
          </el-form-item>
        </el-col>

        <el-col :span="8" :offset="2">
          <el-form-item label="开始日期：">
            <el-date-picker v-model="formValidate.startDate" type="date" placeholder="选择日期">
            </el-date-picker>
          </el-form-item>
        </el-col>

        <el-col :span="8" :offset="2">
          <el-form-item label="结束日期：">
            <el-date-picker v-model="formValidate.endDate" type="date" placeholder="选择日期">
            </el-date-picker>
          </el-form-item>
        </el-col>

        <el-col :span="8" :offset="2">
          <el-form-item label="循环周期：">
            <el-checkbox v-model="cycleEveryDay" label="每天" trueLabel="true" falseLabel="false" @chang="changeCycle"></el-checkbox>
            <el-checkbox-group v-model="cycle" class="audioDebugCheckBox">
              <el-checkbox label="周一" value="1"></el-checkbox>
              <el-checkbox label="周二" value="2"></el-checkbox>
              <el-checkbox label="周三" value="3"></el-checkbox>
              <el-checkbox label="周四" value="4"></el-checkbox>
              <el-checkbox label="周五" value="5"></el-checkbox>
              <el-checkbox label="周六" value="6"></el-checkbox>
              <el-checkbox label="周日" value="7"></el-checkbox>
            </el-checkbox-group>
            </el-date-picker>
          </el-form-item>
        </el-col>

        <el-col :span="8" :offset="2">
          <el-form-item label="播放音频：">
            <el-input v-model="formValidate.path"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <el-row>
      <el-col align="center">
        <load-btn @listenSubEvent="listenSubEvent" :btnData="loadBtn"></load-btn>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  let Util = null;
  import api from '../api';
  import sendMode from './sendMode'; // 播放模式
  export default {
    data() {
      return {
        sendMode,

        cycleEveryDay: false, // 周期
        cycle: [],
        formValidate: {
          name: '', // 任务名称
          playMode: 'FREQUENCY', // 播放模式 WHENLONG按时长|FREQUENCY按次数
          hour: '', // 时
          minute: '', // 分
          second: '', // 秒
          frequency: '', // 次数
          sendMode: '', // 发送模式 UNICAST单播|MULTICAST组播
          isTiming: '', // 是否定时 YES是|NO否
          startTime: '', // 开始时间 YYYY-MM-dd hh:mm:ss
          startDate: '', // 开始日期 YYYY-MM-DD
          endDate: '', // 结束日期 YYYY-MM-DD
          cycle: '', // 周期
          path: '', // 要播放文件地址
        },
        //保存按钮基本信息
        loadBtn: {
          title: '提交',
          callParEvent: 'listenSubEvent'
        },
        // 增加
        addMessTitle: {
          type: 'add',
          successTitle: '添加成功!',
          errorTitle: '添加失败!',
          ajaxSuccess: 'ajaxSuccess',
          ajaxError: 'ajaxError',
          ajaxParams: {
            url: api.taskAdd.path,
            method: api.taskAdd.method
          }
        },
      }
    },
    methods: {
      /*
       * 点击提交按钮 监听是否提交数据
       * @param isLoadingFun boolean  form表单验证是否通过
       * */
      listenSubEvent(isLoadingFun) {
        let isSubmit = this.submitForm("formValidate");
        if (true) {
          if (!isLoadingFun) isLoadingFun = function () {};
          isLoadingFun(true);
          this.formValidate = this.cycle.join(',');
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
       * 获取表单数据
       * @return string  格式:id=0&name=aa
       * */
      getFormData(data) {
        let myData = Util._.defaultsDeep({}, data);
        return myData;
      },
      /**
       * 周期为每天
       **/
      changeCycle() {
        this.cycleEveryDay = !this.cycleEveryDay;
        if (this.cycleEveryDay) {
          this.cycle = [1, 2, 3, 4, 5, 6, 7]
        } else {
          this.cycle = []
        }
      }
    },
    created() {
      Util = this.$util;
    }
  }

</script>

<style lang="scss">
  @import'../../../../../assets/ambuf/css/manage_v1.0/editForm';
  .audioDebugCheckBox {
    .el-checkbox:nth-child(3n+1) {
      margin-left: 0;
    }
  }

</style>
