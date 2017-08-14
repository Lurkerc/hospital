<template>
  <!-- 课程基本信息 -->
  <el-row>
    <el-form class="editForm" :model="course" ref="course" :rules="rules" label-width="120px">
      <el-col :span="19">
        <el-form-item label="课程名称：" prop="title">
          <el-input v-model="course.title" :readonly="isReadOnly"></el-input>
        </el-form-item>
        <el-form-item label="标签：" prop="tags">
          <el-tag :key="tag" v-for="tag in dynamicTags" :closable="true" :close-transition="false" @close="handleClose(tag)" class="tagItem">
            {{tag}}
          </el-tag>
          <el-input v-if="inputVisible" v-model="inputValue" ref="saveTagInput" size="mini" @keyup.enter.native="handleInputConfirm" @blur="handleInputConfirm" class="tagInput"></el-input>
          <el-button v-else @click="showInput" size="mini">创建标签</el-button>
        </el-form-item>
      </el-col>
      <el-col :span="4" :offset="1">
        <img :src="course.logo" class="nBasicImg" v-if="isReadOnly">
        <upload-header v-else @upladSuccess="upladSuccess" :img-file="course.logo" class="uploadBookLogo"></upload-header>
      </el-col>
      <el-col>
        <el-form-item label="应用方向说明：" prop="direction">
          <el-input v-model="course.direction" type="textarea" :autosize="{ minRows: 4, maxRows: 6}" :readonly="isReadOnly"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="创建人：">{{ course.createUser }}</el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="创建时间：" label-width="90px">{{ course.createTime }}</el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="课程状态：">{{ course.auditStatus | curriculum }}</el-form-item>
      </el-col>
    </el-form>
  </el-row>
</template>

<script>
  import {
    basic as rules
  } from '../rules';
  import uploadHeader from '../../../../common/uploadHeader';
  export default {
    props: ['readOnly'],
    data() {
      return {
        rules, // 验证输入规则
        isReadOnly: false, // 只读
        dynamicTags: [],
        course: {
          title: "", //课程名称
          tags: "", //标签，多个|分割
          direction: "", //应用方向说明
          logo: "", //缩略图
          createUser: "", // 创建人
          createTime: "", // 创建时间
          auditStatus: "NOT_SUBMIT", //审核状态：保存草稿用NOT_SUBMIT，提交审核用NOT_AUDIT
        },
        splStr: '|', // 分隔符
        inputVisible: false,
        inputValue: '',
      }
    },
    methods: {
      // 初始化
      init() {
        let state = this.$store.state;
        this.isReadOnly = this.readOnly !== undefined;
        // 只取有用的字段
        for (let key in this.course) {
          this.course[key] = state.curriculum.data.course[key]
        }

        if (this.course.tags) {
          this.dynamicTags = this.course.tags.split(this.splStr);
        }

        !this.course.createUser && (this.course.createUser = state.userInfo.name); // 创建人
        !this.course.createTime && (this.course.createTime = this.conductDate(new Date(), 'yyyy-MM-dd HH:mm')); // 创建时间
      },
      // 保存数据
      saveToStore() {
        if (!this.checkData()) {
          return false;
        }

        this.course.tags = this.dynamicTags.join(this.splStr);

        this.$store.commit('curriculum/data/updateCourse', this.course);
        return true
      },
      // 检测数据完整性
      checkData() {
        let flag = false;
        this.$refs.course.validate((valid) => {
          if (valid) {
            flag = true;
          }
        });
        return flag;
      },
      // 移除tag
      handleClose(tag) {
        this.dynamicTags.splice(this.dynamicTags.indexOf(tag), 1);
      },
      // 显示tag输入框
      showInput() {
        this.inputVisible = true;
        this.$nextTick(_ => {
          this.$refs.saveTagInput.$refs.input.focus();
        });
      },
      // 输入数组追加到tag数组中
      handleInputConfirm() {
        let inputValue = this.inputValue;
        if (inputValue) {
          this.dynamicTags.push(inputValue);
        }
        this.inputVisible = false;
        this.inputValue = '';
      },
      // 上传封面
      upladSuccess(res, url) {
        this.course.logo = url
      },
    },
    components: {
      uploadHeader
    },
    created() {
      this.init()
    },
  }

</script>

<style lang="scss">
  /* 课程基本信息 */

  @import"../../../../../assets/ambuf/css/manage_v1.0/editForm";
  .nBasicImg {
    width: 96px;
    height: 96px;
    margin: 0 auto;
    display: block;
  }

  .tagItem {
    margin-right: 10px;
  }

  .tagInput {
    width: 100px;
  }

  .uploadBookLogo {
    margin: 0 auto;
    &,
    .avatar,
    .avatar-uploader-icon {
      width: 96px;
      height: 96px;
    }
    .avatar-uploader-icon {
      line-height: 96px;
    }
  }

</style>
