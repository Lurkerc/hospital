<template>
  <!-- 技能考核 - 补考 - 实习生 -->
  <div>
    <h3 align="center">出科考核补考申请</h3>
    <el-row style="margin-top:20px;">
      <el-form label-width="120px">
        <el-col :span="10" :offset="2">
          <el-form-item label="姓名：">
            {{ viewData.userName }}
          </el-form-item>
        </el-col>
        <el-col :span="10">
          <el-form-item label="科室：">
            {{ viewData.depName }}
          </el-form-item>
        </el-col>
        <el-col :span="10" :offset="2">
          <el-form-item label="入科时间：">
            {{ viewData.rotaryBeginTime }}
          </el-form-item>
        </el-col>
        <el-col :span="10">
          <el-form-item label="出科时间：">
            {{ viewData.rotaryEndTime }}
          </el-form-item>
        </el-col>
        <el-col :span="10" :offset="2">
          <el-form-item label="周期：">
            {{ viewData.makeupTs }}周
          </el-form-item>
        </el-col>
        <el-col :span="10">
          <el-form-item label="技能成绩：">
            {{ viewData.skillExamScore }}
          </el-form-item>
        </el-col>
        <el-col :span="20" :offset="2">
          <el-form-item label="技能操作视频：">
            <uploadFile @setUploadFiles="setUploadFiles" :uploadFiles="uploadFiles" :size="100*1024" accept="mp4"></uploadFile>
          </el-form-item>
        </el-col>
      </el-form>
      <div style="padding-top:16px;clear:both;">
        <el-col :span="6" :offset="6" align="center">
          <load-btn @listenSubEvent="listenSubEvent" :btnData="loadBtn"></load-btn>
        </el-col>
        <el-col :span="6" align="center">
          <el-button @click="cancel">取消</el-button>
        </el-col>
      </div>
    </el-row>
  </div>
</template>

<script>
  import api from './api';
  export default {
    props: ['operailityData'],
    data() {
      return {
        self: this,
        viewData: [],
        uploadFiles: [],
        fileIds: '',
        //保存按钮基本信息
        loadBtn: {
          title: '提交',
          callParEvent: 'listenSubEvent'
        },
      }
    },
    methods: {
      // 初始化
      init() {
        this.getViewData()
      },

      // 获取预览数据
      getViewData() {
        this.ajax({
          ajaxSuccess: 'getDataSuccess',
          ajaxParams: {
            url: api.get.path + this.operailityData.depExaminationId,
            method: api.get.method
          }
        })
      },

      // 获取数据成功
      getDataSuccess(res) {
        this.viewData = res.data;
        // let fileIds = [];
        // this.uploadFiles.length = 0;
        // res.data.summaryFileList.map(item => {
        //   fileIds.push(item.id);
        //   this.uploadFiles.push({
        //     fileId: item.id,
        //     fileName: item.fileName,
        //     filePath: '/api/file/download/' + item.id
        //   })
        // });
        // this.fileIds = fileIds.join(',')
      },

      // 上传附件
      setUploadFiles(ids) {
        this.fileIds = ids;
      },

      // 取消
      cancel() {
        this.$emit('cancel', 'skill')
      },

      // 提交
      listenSubEvent() {
        // this.ajax({
        //   ajaxSuccess: 'getDataSuccess',
        //   ajaxParams: {
        //     url: api.get.path + this.operailityData.depExaminationId,
        //     method: api.get.method
        //   }
        // })
      },
    },
    components: {},
    created() {
      this.init()
    },
  }

</script>

<style>
  /* 技能考核 - 补考 */

</style>
