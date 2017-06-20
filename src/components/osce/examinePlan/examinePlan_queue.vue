<template>
  <!-- 抽签 -->
  <div>
    <el-row style="margin-bottom:16px;">
      <el-col :span="4">
        <img src="http://iph.href.lu/120x120" alt="">
      </el-col>
      <el-col :span="18">
        <el-form labelWidth="86px">
          <el-col :span="10">
            <el-form-item label="考生姓名：">
              <el-input v-model="queryData.userName"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="10" :offset="4">
            <el-form-item label="考生编号：">
              <el-input v-model="queryData.userNum"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="10">
            <el-form-item label="身份证号：">
              <el-input v-model="queryData.idCard"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="10" :offset="4">
            <el-button type="info" @click="queryStudent">查询</el-button>
          </el-col>
        </el-form>
      </el-col>
    </el-row>
    <!-- 抽签列表 -->
    <template v-if="!hasSrawList()">
      <el-tabs v-model="queueActive" type="card" style="height:300px;">
        <el-tab-pane :label="'抽签组' + index" :name="index.toString()" v-for="(item,index) in queueData.drawList" :key="index" style="overflow:auto;">
          <queue-room v-for="(cItem,cIndex) in item" :option="{hasAdd:false,hasRemove:false}" :initData="{index:index,cIndex:cIndex,name:cItem.stationName}"
            :key="index+'-'+cIndex" style="width:80px;margin-right:20px;"></queue-room>
        </el-tab-pane>
      </el-tabs>
    </template>
    <p v-else style="line-height:300px;text-align:center;">暂无数据</p>
    <p align="center">
      <load-btn @listenSubEvent="listenSubEvent" :btnData="loadBtn"></load-btn>
    </p>
  </div>
</template>

<script>
  import api from './api';
  import queueRoom from '../examineInterval/examineInterval_room'; // 考站
  export default {
    props: ['sceneId'],
    data() {
      return {
        queueActive: '',
        queueData: {
          userId: "",
          userName: "",
          userNum: "",
          idCard: "",
          drawList: {}
        },
        queryData: { // 查询信息
          sceneId: this.sceneId,
          userName: '',
          userNum: '',
          idCard: ''
        },
        // 抽签所需数据
        queueSubData: {
          sceneId: this.sceneId,
          userId: -1,
          // drawNum: -1, 改用queueActive
        },
        //保存按钮基本信息
        loadBtn: {
          title: '抽签',
          callParEvent: 'listenSubEvent'
        },
        //当前组件提交(add)数据时,ajax处理的 基础信息设置
        addMessTitle: {
          type: 'planQueue',
          successTitle: '抽签成功!',
          errorTitle: '抽签失败!',
          ajaxError: 'ajaxError',
          ajaxSuccess: 'planQueueSuccess',
          ajaxParams: {
            url: api.station.path,
            method: api.station.method
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
        let isSubmit = this.canSubmit();
        if (isSubmit) {
          if (!isLoadingFun) isLoadingFun = function () {};
          isLoadingFun(true);
          this.addMessTitle.ajaxParams.data = this.$util.getFormData(this.queueSubData);
          Object.assign(this.addMessTitle.ajaxParams.data, {
            drawNum: this.queueActive
          });
          this.ajax(this.addMessTitle, isLoadingFun)
        }
      },
      // 是否可以进行抽签
      canSubmit() {
        let tag = true;
        if (this.queueSubData.userId === -1) {
          this.$message.warning('请查询需要抽签的考生');
          tag = false;
        } else if (!this.queueActive) {
          this.$message.warning('请选择需要抽签的抽签组');
          tag = false;
        }
        return tag
      },
      // 获取抽签组数据
      getQueueData() {
        let opt = {
          successTitle: '查询成功!',
          errorTitle: '查询失败!',
          ajaxError: 'ajaxError',
          ajaxSuccess: res => {
            this.queueSubData.userId = res.data.userId || -1;
            this.queueActive = '';
            this.queueData = res.data;
            for (let item in res.data.drawList) {
              if (!this.queueActive) {
                this.queueActive = item;
              } else {
                return
              }
            }
          },
          ajaxParams: {
            url: api.stationGet.path,
            method: api.stationGet.method
          }
        };
        opt.ajaxParams.params = this.queryData;
        this.ajax(opt)
      },
      // 查询
      queryStudent() {
        this.getQueueData()
      },
      // 是否有值
      hasSrawList() {
        var t;
        for (t in this.queueData.drawList) return !1;
        return !0
      },
      // 抽签成功
      planQueueSuccess() {
        this.$emit('planQueue', this.addMessTitle.type, this.addMessTitle.successTitle)
      }
    },
    components: {
      queueRoom
    },
    created() {
      // this.getQueueData()
    }
  }

</script>

<style>


</style>
