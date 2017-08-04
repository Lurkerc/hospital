<template>
  <div>
    <el-row class="roomViewItem">
      <el-col :span="2" :offset="2" align="right">房间号：</el-col>
      <el-col :span="6">{{ viewData.roomNum }}</el-col>
      <el-col :span="2" :offset="2" align="right">使用类型：</el-col>
      <el-col :span="6">{{ viewData.employType | typeText }}</el-col>
    </el-row>
    <el-row class="roomViewItem">
      <el-col :span="2" :offset="2" align="right">开始时间：</el-col>
      <el-col :span="6">{{ viewData.startTime }}</el-col>
      <el-col :span="2" :offset="2" align="right">结束时间：</el-col>
      <el-col :span="6">{{ viewData.endTime }}</el-col>
    </el-row>
    <el-row class="roomViewItem">
      <el-col :span="2" :offset="2" align="right">使用时长：</el-col>
      <el-col :span="16">{{ viewData.timeLength }}</el-col>
    </el-row>
    <el-row class="roomViewItem">
      <el-col :span="2" :offset="2" align="right">用途：</el-col>
      <el-col :span="16">{{ viewData.purpose }}</el-col>
    </el-row>
    <el-row class="roomViewItem">
      <el-col :span="2" :offset="2" align="right">房间图片：</el-col>
      <el-col :span="16">
        <!--<template v-if="viewData.fileList.length">
          <img v-for="item in viewData.fileList" :src="staticPath + item.path + item.name" class="classViewImg" />
        </template>-->
        <upload-file v-if="fileList.length" :fileList="fileList" :show="true"></upload-file>
        <template v-else>暂无图片</template>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  import api from './api';
  import uploadFile from '../uploadFile';
  export default {
    props: {
      id: {
        type: [String, Number],
        required: true
      },
    },
    data() {
      return {
        staticPath: '',
        fileList: [],
        viewData: {
          // "id": "1",
          roomNum: "-",
          employType: "-",
          startTime: "-",
          endTime: "-",
          timeLength: "-",
          purpose: "-",
          imageList: []
        }
      }
    },
    methods: {
      getDataForServer() {
        console.log(this.id);
        let roomId = this.id,
          urlParams = this.urlParams; // props
        this.ajax({
          ajaxSuccess: 'getDataSuccess',
          ajaxParams: {
            url: api.get.path + roomId,
            method: api.get.method
          }
        })
      },
      getDataSuccess(res) {
        this.viewData = res.data; // 初始化编辑数据
        for (let i = 0, list = res.data.fileList, l = list.length; i < l; i++) {
          this.fileList.push({
            name: list[i].id,
            url: api.down.path + list[i].id,
          })
        }
      }
    },
    created() {
      this.staticPath = this.$store.getters.getEnvPath.http;
      this.getDataForServer()
    },
    components: {
      uploadFile
    },
  }

</script>

<style lang="scss">
  .roomViewItem {
    padding: 10px 0;
  }

  .classViewImg {
    width: 148px;
    height: 148px;
    border: 1px dashed #c0ccda;
    border-radius: 6px;
    overflow: hidden;
    margin: 0 22px 22px 0;
  }

</style>
