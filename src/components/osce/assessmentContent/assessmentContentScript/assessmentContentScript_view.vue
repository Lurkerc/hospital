<template>
  <!-- 查看剧本 -->
  <el-form :model="formValidate" ref="formValidate">
    <el-row>

      <el-col :span="8" :offset="8" align="center">
        <el-form-item>{{ formValidate.scriptName }}</el-form-item>
      </el-col>
      <el-col>
        <el-form-item label="剧本附件：">
          <template v-if="formValidate.filelist.length > 0" v-for="item in formValidate.filelist">
            {{ item.name }}
          </template>
          <p v-else>暂无剧本附件</p>
        </el-form-item>
      </el-col>

      <el-col>
        <el-form-item label="剧本简介：">{{ formValidate.scriptContent }}</el-form-item>
      </el-col>

      <el-col>
        <el-form-item label="病情要点：">{{ formValidate.illnessPoints }}</el-form-item>
      </el-col>

      <el-col>
        <el-form-item label="表演要点：">{{ formValidate.performPoints }}</el-form-item>
      </el-col>

    </el-row>
  </el-form>
</template>

<script>
  export default {
    props: {
      urlParams: { // api对象
        type: Object,
        required: true
      },
      id: {
        type: Number,
        default: 0
      }
    },
    data() {
      return {
        formValidate: {
          scriptName: "-",
          scriptContent: "-",
          illnessPoints: "-",
          performPoints: "-",
          fileList: []
        }
      }
    },
    methods: {
      /**************************** 从服务器获取编辑的数据 *****************************************/
      getDataForServer() {
        this.ajax({
          ajaxSuccess: 'ajaxSuccess',
          ajaxParams: {
            url: `${this.urlParams.path}/${this.id}`,
            method: this.urlParams.method
          }
        })
      },
      ajaxSuccess(res) {
        this.formValidate = res.data // 初始化编辑数据
      },
      /*
       * 组件初始化入口
       * */
      init() {
        // 获取编辑数据
        this.getDataForServer();
      },
    },
    created() {
      this.init();
      // console.log(this.id);
    }
  }

</script>
