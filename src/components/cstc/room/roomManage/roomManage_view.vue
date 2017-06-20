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
        <template v-if="viewData.fileList && viewData.fileList.length > 0">
          <img v-for="item in viewData.fileList" :src="item.path" class="classViewImg" />
        </template>
        <template v-else>暂无图片</template>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  export default {
    props: {
      id: { // 房间id
        type: [String, Number],
        required: true
      },
      urlParams: { // 获取房间信息url
        type: Object,
        required: true
      }
    },
    data() {
      return {
        viewData: {
          // "id": "1",
          roomNum: "-",
          roomName: "-",
          floor: '-',
          address: "-",
          summary: "-",
          fileList: [ // 
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
        console.log(this.id);
        let roomId = this.id,
          urlParams = this.urlParams; // props
        this.ajax({
          ajaxSuccess: 'ajaxSuccess',
          ajaxParams: {
            url: `${urlParams.path}/${roomId}`,
            method: urlParams.method
          }
        })
      },
      ajaxSuccess(res) {
        this.viewData = res.data // 初始化编辑数据
      }
    },
    created() {
      this.getDataForServer()
    }
  }

</script>

<style>
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
