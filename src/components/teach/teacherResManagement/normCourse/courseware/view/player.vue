<template>
  <!-- 课件播放 -->
  <div>
    <!-- 课件选择 -->
    <el-row>
      <el-col>
        <el-select v-model="formValidate.planId" placeholder="请选择" @change="getCWData">
          <el-option v-for="(item,index) in planDtoList" :key="item.id" :label="'第'+indexText(index)+'节'" :value="item.id">
          </el-option>
        </el-select>
        <el-select v-model="formValidate.types" placeholder="请选择" @change="getCWData">
          <el-option v-for="item in theCWTypes" :key="item.value" :label="item.label" :value="item.value">
          </el-option>
        </el-select>
      </el-col>
      <el-col>
        <el-tabs v-model="activeName" @tab-click="handleClick">
          <el-tab-pane v-for="(item,index) in cwSelectList" :key="index" :label="item.title+'（' + item.progress + '%）'" :name="index+''"></el-tab-pane>
        </el-tabs>
      </el-col>
    </el-row>
    <div class="cmPlayerBox">
      <video-player></video-player>
    </div>
  </div>
</template>

<script>
  import videoPlayer from '../../../../../common/video';
  export default {
    props: ['cwData'],
    data() {
      return {
        theCWTypes: [{
          value: 'BEFORE',
          label: '课前'
        }, {
          value: 'IN_PROGRESS',
          label: '课中'
        }, {
          value: 'AFTER',
          label: '课后'
        }],
        activeName: '0',
        planDtoList: [],
        cwSelectList: [],
        selectCWObj: {},
        formValidate: {
          courseId: '', // 标准课程ID
          planId: '', // 教学计划ID（每节课对应的ID）
          types: '', // 上课类型
        },
        playerTypes: '',
      }
    },
    methods: {
      // 初始化
      init() {
        this.planDtoList = this.$store.state.curriculum.look.planDtoList;
        this.formValidate.courseId = this.$store.state.curriculum.look.course.id;
        if (this.cwData.planId) {
          this.formValidate.planId = this.cwData.planId;
          this.formValidate.types = this.cwData.types;
        } else {
          this.formValidate.planId = this.planDtoList[0].id;
          this.formValidate.types = 'BEFORE';
        }
        this.getCWData()
      },
      // 选择资源
      handleClick(val) {
        this.selectCWObj = this.cwSelectList[val];
        console.log('选择资源')
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
        let opt = {
          ajaxSuccess: res => this.cwSelectList = res.data,
          ajaxParams: {
            url: '/criterionCourseWare/query',
            params: this.formValidate,
          }
        };
        // this.ajax(opt)
        this.cwSelectList = [{
          "id": 2,
          "title": "课件1",
          "types": "FLV",
          "fileSize": 1024,
          "filePath": "/attached/2017/08/01/20170801202541536.FLV",
          "progress": 20,
          "length": 100
        }];
      },
    },
    watch: {
      selectCWObj(val) {
        console.log('加载对应的播放器')
      }
    },
    components: {
      videoPlayer
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

</style>
