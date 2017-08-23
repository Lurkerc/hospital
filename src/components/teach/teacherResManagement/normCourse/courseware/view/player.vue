<template>
  <!-- 课件播放 -->
  <div>
    <!-- 课件选择 -->
    <el-row>
      <el-col>
        <el-select v-model="selectObj.planIndex" placeholder="请选择" @change="getCWData">
          <el-option v-for="(item,index) in planDtoList" :key="item.id" :label="'第'+indexText(index)+'节'" :value="index">
          </el-option>
        </el-select>
        <el-select v-model="selectObj.types" placeholder="请选择" @change="getCWData">
          <el-option v-for="item in theCWTypes" :key="item.value" :label="item.label" :value="item.value">
          </el-option>
        </el-select>
      </el-col>
      <el-col v-if="cwSelectList.length">
        <el-tabs v-model="activeName" @tab-click="handleClick">
          <el-tab-pane v-for="(item,index) in cwSelectList" :key="index" :label="item.title" :name="index+''"></el-tab-pane>
        </el-tabs>
      </el-col>
    </el-row>
    <div class="cmPlayerBox" v-if="cwSelectList.length">
      <video-view v-if="resourceType === 'video'" :filePath="viewData.filePath" :videoType="viewData.videoType"></video-view>
      <pdf-view v-if="resourceType === 'pdf'" :pdfSrc="viewData.pdfSrc"></pdf-view>
      <!-- <atlas-view v-if="resourceType === 'atlas'" :operaility-data="viewData"></atlas-view> -->
      <p v-if="resourceType === 'error'" class="coursewareViewError">该课件不支持预览</p>
    </div>
    <p v-else class="noCoursewareTips">暂无课件</p>
  </div>
</template>

<script>
  import videoView from '../../../../../common/video';
  import pdfView from '../../../../../study/common/view_pdf'; // pdf
  import atlasView from '../../../../teacherResManagement/resMedicalAtlas/resMedicalAtlas_view'; // 图谱
  export default {
    props: ['cwData'],
    data() {
      return {
        theCWTypes: [{
          value: 'before',
          label: '课前'
        }, {
          value: 'inProgress',
          label: '课中'
        }, {
          value: 'after',
          label: '课后'
        }],
        activeName: '0', // 课件索引
        planDtoList: [],
        cwSelectList: [],
        selectCWObj: {},
        selectObj: {
          planIndex: 0, // 教学计划索引
          types: 'before', // 上课类型
        },

        // 查看数据
        viewData: {},
        resourceType: '', // 查看资源类型
        playerType: ['video', 'pdf', 'atlas'], // 预览类型
        playerRules: [ // 文件后缀对应的预览类型
          ["mp4", "ogg", "webm"],
          ['pdf'],
        ],
      }
    },
    methods: {
      // 初始化
      init() {
        this.planDtoList = this.$store.state.curriculum.look.planDtoList;
        if (this.cwData.planIndex instanceof Array) {
          this.selectObj.planIndex = this.cwData.planIndex;
          this.selectObj.types = this.cwData.types === "IN_PROGRESS" ? 'inProgress' : this.cwData.types;
          this.activeName = this.cwData.viewIndex.toString();
        }
        console.log(this.cwData)
        this.getCWData()
      },
      // 选择资源
      handleClick() {
        this.showFile(this.cwSelectList[this.activeName])
      },
      // 预览
      showFile(row) {
        let fileType = '';
        if (row.filePath) { // 根据文件路径的后缀获取预览类型
          this.resourceType = '';
          fileType = row.filePath.split('.').pop();
          fileType = fileType ? fileType.toLocaleLowerCase() : null;
          console.log(fileType)
          for (let i in this.playerRules) {
            if (this.playerRules[i].indexOf(fileType) > -1) {
              this.resourceType = this.playerType[i];
              break;
            }
          }
          if (!this.resourceType) { // 检测是否支持预览
            this.resourceType = 'error';
          } else { // 根据类型进行预览数据初始化
            switch (this.resourceType) {
              case "video":
                this.viewData = {
                  filePath: this.getPath(row.filePath),
                  videoType: fileType
                };
                break;
              case "pdf":
                this.viewData = {
                  pdfSrc: this.getPath(row.filePath)
                };
                break;
              default:
                this.viewData = {}
            }
          }
        } else if (row.resourceType === 'ATLAS') { // 是否是医学图谱
          // this.resourceType = 'atlas';
          // this.viewData = {
          //   id: row.resourceId
          // };
          // this.openModel('show');
        } else {
          this.resourceType = 'error';
        }
      },
      // 索引数字转换
      indexText(index) {
        index += 1;
        let text = ['一', '二', '三', '四', '五', '六', '七', '八', '九', '十'];
        let str = [];
        let bit = index % 10; // 个位
        let ten = (index - bit) / 10; // 十位
        ten > 1 && (str[0] = text[ten - 1]);
        index > 9 && (str[1] = text[9]);
        str[2] = (text[bit - 1]) || '';
        return str.join('')
      },
      // 获取课件
      getCWData() {
        this.cwSelectList = this.planDtoList[this.selectObj.planIndex].wareDtoList[this.selectObj.types] || [];
        if (this.cwSelectList.length) {
          this.showFile(this.cwSelectList[0])
        }
      },
      // 获取路径
      getPath(staticUrl) {
        return staticUrl ? (this.$store.state.envPath.http + staticUrl) : staticUrl;
      },
    },
    watch: {
      // selectCWObj(val) {
      //   console.log('加载对应的播放器')
      // }
    },
    components: {
      videoView,
      pdfView,
      atlasView,
    },
    created() {
      this.init();
    },
  }

</script>

<style>
  /* 课件播放 */

  .cmPlayerBox {
    height: 420px;
  }

  .noCoursewareTips,
  .coursewareViewError {
    line-height: 300px;
    text-align: center;
  }

</style>
