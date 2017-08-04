<template>
  <!-- 课程基本信息 -->
  <el-row>
    <el-form class="editForm" :model="course" ref="course" :rules="rules" label-width="120px">
      <el-col :span="19">
        <el-form-item label="课程名称：" prop="title">
          <el-input v-model="course.title"></el-input>
        </el-form-item>
        <el-form-item label="标签：" prop="tags">
          <el-input v-model="course.tags"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="4" :offset="1">
        <img src="//iph.href.lu/180x180" class="nBasicImg">
      </el-col>
      <el-col>
        <el-form-item label="应用方向说明：" prop="direction">
          <el-input v-model="course.direction" type="textarea" :autosize="{ minRows: 4, maxRows: 6}"></el-input>
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
  export default {
    data() {
      return {
        rules, // 验证输入规则
        course: {
          title: "", //课程名称
          tags: "", //标签，多个|分割
          direction: "", //应用方向说明
          logo: "", //缩略图
          createUser: "", // 创建人
          createTime: "", // 创建时间
          auditStatus: "NOT_SUBMIT", //审核状态：保存草稿用NOT_SUBMIT，提交审核用NOT_AUDIT
        }
      }
    },
    methods: {
      // 初始化
      init() {
        let state = this.$store.state;
        // 只取有用的字段
        for (let key in this.course) {
          this.course[key] = state.curriculum.data.course[key]
        }

        !this.course.createUser && (this.course.createUser = state.userInfo.name); // 创建人
        !this.course.createTime && (this.course.createTime = this.conductDate(new Date(), 'yyyy-MM-dd HH:mm')); // 创建时间
      },
      // 保存数据
      saveToStore() {
        if (!this.checkData()) {
          return false;
        }
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

</style>
