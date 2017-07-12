<template>
  <!-- 出科考核补考申请 -->
  <div>
    <h3 align="center">出科考核补考申请</h3>
    <el-row>
      <el-form :inline="true" label-width="110px">
        <el-col :span="10" :offset="2">
          <el-form-item label="姓名：">
            {{ showData.userName }}
          </el-form-item>
        </el-col>
        <el-col :span="10" :offset="2">
          <el-form-item label="科室：">
            {{ showData.depName }}
          </el-form-item>
        </el-col>
        <el-col :span="10" :offset="2">
          <el-form-item label="入科时间：">
            {{ showData.rotaryBeginTime }}
          </el-form-item>
        </el-col>
        <el-col :span="10" :offset="2">
          <el-form-item label="出科时间：">
            {{ showData.rotaryEndTime }}
          </el-form-item>
        </el-col>
        <el-col :span="10" :offset="2">
          <el-form-item label="周期：">
            {{ showData.ts || 0 }} {{ showData.podType === 'SXS' ? '周' : '月' }}
          </el-form-item>
        </el-col>
        <el-col :span="10" :offset="2">
          <el-form-item label="技能成绩：" prop="mark">{{ showData.mark }}</el-form-item>
        </el-col>
      </el-form>
      <el-col :span="20" :offset="2">
        <div>视频区域</div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  import api from './api';
  export default {
    props: ['operailityData'],
    data() {
      return {
        showData: {},
      }
    },
    methods: {
      //初始化请求列表数据
      init() {
        this.getInfo()
      },
      // 获取结业资料
      getInfo() {
        this.ajax({
          ajaxSuccess: res => {
            this.showData = res.data;
          },
          ajaxParams: {
            url: api.get.path + this.operailityData.id
          }
        })
      },
    },
    created() {
      this.init();
    },
  }

</script>

<style>
  /* 出科考核补考申请 */

</style>
