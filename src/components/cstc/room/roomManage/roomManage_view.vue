<template>
  <div>
    <el-row class="roomViewItem">
      <el-col :span="2" :offset="2" align="right">房间号：</el-col>
      <el-col :span="6">{{ viewData.roomNum }}</el-col>
      <el-col :span="2" :offset="2" align="right">房间名称：</el-col>
      <el-col :span="6">{{ viewData.roomName }}</el-col>
    </el-row>
    <el-row class="roomViewItem">
      <el-col :span="2" :offset="2" align="right">房间简介：</el-col>
      <el-col :span="16">{{ viewData.summary }}</el-col>
    </el-row>
    <el-row class="roomViewItem">
      <el-col :span="2" :offset="2" align="right">所在楼层：</el-col>
      <el-col :span="16">{{ viewData.floor }}</el-col>
    </el-row>
    <el-row class="roomViewItem">
      <el-col :span="2" :offset="2" align="right">房间地址：</el-col>
      <el-col :span="16">{{ viewData.address }}</el-col>
    </el-row>
    <el-row class="roomViewItem">
      <el-col :span="2" :offset="2" align="right">房间图片：</el-col>
      <el-col :span="16">
        <!--<template v-if="viewData.imageList && viewData.imageList.length > 0">
          <img v-for="item in viewData.imageList" :src="staticPath + item.path + item.name" class="classViewImg" />
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
      id: { // 房间id
        type: [String, Number],
        required: true
      }
    },
    data() {
      return {
        fileList: [],
        staticPath: '', // 静态资源
        viewData: {
          // "id": "1",
          roomNum: "-",
          roomName: "-",
          floor: '-',
          address: "-",
          summary: "-",
          imageList: [ //
            // {
            //   "imageId": "1",
            //   "imageType": "jpg",
            //   "imagePath": "**/**.jpg",
            // }
          ]
        }
      }
    },
    methods: {
      getDataForServer() {
        // return
        let roomId = this.id; // props
        this.ajax({
          ajaxSuccess: 'getDataSuccess',
          ajaxParams: {
            url: api.get.path + roomId,
            method: api.get.method
          }
        })
      },
      getDataSuccess(res) {
        this.staticPath = this.$store.getters.getEnvPath.http;
        this.viewData = res.data; // 初始化编辑数据
        this.fileList = [];
        for (let i = 0, list = res.data.imageList, l = list.length; i < l; i++) {
          this.fileList.push({
            name: list[i].id,
            url: api.down.path + list[i].id,
          })
        }
      }
    },
    created() {
      // this.staticPath = this.$store.getters.getEnvPath.http;
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
  /*.classViewImg {
    width: 148px;
    height: 148px;
    border: 1px dashed #c0ccda;
    border-radius: 6px;
    overflow: hidden;
    margin: 0 22px 22px 0;
  }*/

  // .onlyShowUploadPic {
  //   .el-upload,
  //   .el-upload-list__item-actions span.el-upload-list__item-delete {
  //     display: none;
  //   }
  // }

</style>
