<template>
  <!-- 课件 -->
  <el-row class="nFileTable">
    <el-form class="editForm" inline="" ref="item" v-for="(item,index) in planDtoList" :model="item" :rules="rules" label-width="100px"
      :key="index">
      <fieldset class="nPlanItem">
        <legend style="font-size:16px">&nbsp;&nbsp;第{{ indexText(index) }}节：{{ item.content || '未填写' }}&nbsp;&nbsp;</legend>
        <el-col>
          <el-form-item label="课前资料：">
            <el-button type="info" size="small" @click="uploadFile('before',index)">上传资料</el-button>
            <el-button type="primary" size="small" @click="selectFile('before',index)">选择资源</el-button>
          </el-form-item>
        </el-col>
        <el-table ref="singleTable" :data="item.wareDtoListTemp.before">
          <el-table-column type="index" label="序号" width="80">
          </el-table-column>
          <el-table-column property="title" label="操作" width="120" align="center">
            <template scope="scope">
              <el-button type="warning" size="mini" @click="showFile(scope.row)">预览</el-button>
              <el-button type="danger" size="mini" @click="removeFile('before',index,scope.$index)">删除</el-button>
            </template>
          </el-table-column>
          <el-table-column property="title" label="显示名称">
          </el-table-column>
          <el-table-column property="title" label="文件名称">
          </el-table-column>
          <el-table-column property="title" label="文件格式">
          </el-table-column>
          <el-table-column property="title" label="文件大小">
          </el-table-column>
          <el-table-column property="title" label="转化状态">
          </el-table-column>
        </el-table>
        <el-col>
          <el-form-item label="课中资料：">
            <el-button type="info" size="small" @click="uploadFile('in_progress',index)">上传资料</el-button>
            <el-button type="primary" size="small" @click="selectFile('in_progress',index)">选择资源</el-button>
          </el-form-item>
        </el-col>
        <el-table ref="singleTable" :data="item.wareDtoListTemp.in_progress">
          <el-table-column type="index" label="序号" width="80">
          </el-table-column>
          <el-table-column property="title" label="操作" width="120" align="center">
            <template scope="scope">
              <el-button type="warning" size="mini" @click="showFile(scope.row)">预览</el-button>
              <el-button type="danger" size="mini" @click="removeFile('in_progress',index,scope.$index)">删除</el-button>
            </template>
          </el-table-column>
          <el-table-column property="title" label="显示名称">
          </el-table-column>
          <el-table-column property="title" label="文件名称">
          </el-table-column>
          <el-table-column property="title" label="文件格式">
          </el-table-column>
          <el-table-column property="title" label="文件大小">
          </el-table-column>
          <el-table-column property="title" label="转化状态">
          </el-table-column>
        </el-table>
        <el-col>
          <el-form-item label="课后资料：">
            <el-button type="info" size="small" @click="uploadFile('after',index)">上传资料</el-button>
            <el-button type="primary" size="small" @click="selectFile('after',index)">选择资源</el-button>
          </el-form-item>
        </el-col>
        <el-table ref="singleTable" :data="item.wareDtoListTemp.after">
          <el-table-column type="index" label="序号" width="80">
          </el-table-column>
          <el-table-column property="title" label="操作" width="120" align="center">
            <template scope="scope">
              <el-button type="warning" size="mini" @click="showFile(scope.row)">预览</el-button>
              <el-button type="danger" size="mini" @click="removeFile('after',index,scope.$index)">删除</el-button>
            </template>
          </el-table-column>
          <el-table-column property="title" label="显示名称">
          </el-table-column>
          <el-table-column property="title" label="文件名称">
          </el-table-column>
          <el-table-column property="title" label="文件格式">
          </el-table-column>
          <el-table-column property="title" label="文件大小">
          </el-table-column>
          <el-table-column property="title" label="转化状态">
          </el-table-column>
        </el-table>
      </fieldset>
    </el-form>
  </el-row>
</template>

<script>
  // import {
  //   plan as rules
  // } from '../rules';
  export default {
    data() {
      return {
        rules: {}, // 验证输入规则
        planDtoList: {},
      }
    },
    methods: {
      // 初始化
      init() {
        this.planDtoList = this.$store.state.curriculum.data.planDtoList;
      },
      /******************************************** 按钮事件 ***************************************/
      // 上传
      uploadFile(type, planIndex) {
        this.$store.commit('curriculum/data/addWareDto', {
          type,
          planIndex,
          list: [{
            title: '测试' + planIndex
          }]
        })
      },
      // 选择
      selectFile(type, planIndex) {
        console.log(type, planIndex)
      },
      // 预览
      showFile(row) {
        console.log(row)
      },
      /** 
       * 删除
       * type 资料类型 课前|课中|课后
       * planIndex 第几节课索引
       * delIndex 需要删除的文件索引
       */
      removeFile(type, planIndex, delIndex) {
        this.$store.commit('curriculum/data/removeWareDtoList', {
          type,
          planIndex,
          delIndex
        })
      },
      /******************************************** 数据提交 ***************************************/
      // 保存
      saveToStore() {
        // if (!this.checkData()) {
        //   return false;
        // }
        return true
      },
      // 检测数据完整性
      checkData() {
        let flag = true;
        if (this.$refs.item) {
          for (let i = 0; i < this.$refs.item.length; i++) {
            this.$refs.item[i].validate((valid) => {
              if (!valid) {
                flag = false;
              }
            });
          }
        }
        return flag;
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
    },
    created() {
      this.init()
    },
  }

</script>

<style lang="scss">
  /* 课件 */

  .nFileTable {
    padding-left: 16px;
    .el-form-item {
      margin: 4px 0;
    }
  }

</style>
