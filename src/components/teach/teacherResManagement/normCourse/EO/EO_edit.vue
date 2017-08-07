<template>
  <!-- 评测与作业 -->
  <el-row class="nTestTable">
    <el-form class="editForm" inline ref="item" v-for="(item,index) in planDtoList" :model="item" :rules="rules" :key="index">
      <fieldset class="nPlanItem">
        <legend style="font-size:16px">&nbsp;&nbsp;第{{ indexText(index) }}节：{{ item.content || '未填写' }}&nbsp;&nbsp;</legend>
        <el-col :span="4">
          <el-form-item label="课前评测"></el-form-item>
        </el-col>
        <el-col :span="20" align="right">
          <el-form-item label="达标分数：">
            <el-input class="tdlbScoreInput" size="small" v-model="item.testingDtoListTemp.before.score"></el-input>
            <span>(系统可自动根据试题数量折算满分100)</span>
          </el-form-item>
        </el-col>
        <el-col>
          <el-form-item>
            <el-button size="small" type="success" @click="addTestingDto('before',index)">添加试题</el-button>
            <el-button size="small" type="danger" @click="removeTestingDto('before',index)">删除试题</el-button>
            <el-button size="small" type="warning" @click="importTestingDto('before',index)">导入试题</el-button>
            <el-button size="small" type="info" @click="exportTestingDto('before',index)">导出试题</el-button>
            <el-button size="small" type="primary" @click="showTestingDto('before',index)">整体预览</el-button>
          </el-form-item>
        </el-col>
        <el-table ref="singleTable" :data="item.testingDtoListTemp.before.questionsDtoList" @selection-change="handleSelectionChangeBefore">
          <el-table-column type="selection" width="55"></el-table-column>
          <el-table-column type="index" label="序号" width="68">
          </el-table-column>
          <el-table-column property="types" label="试题类型">
            <template scope="scope">
              <el-select v-model="scope.row.types" size="small">
                <el-option v-for="item in testTypeOption" v-if="item.value" :key="item.value" :label="item.label" :value="item.value"></el-option>
              </el-select>
            </template>
          </el-table-column>
          <el-table-column property="subject" label="题干">
            <template scope="scope">
              <el-tooltip effect="light" content="题干内容" placement="bottom">
                <el-button size="small">编辑</el-button>
              </el-tooltip>
            </template>
          </el-table-column>
          <el-table-column property="optionsDtoList" label="候选项">
            <template scope="scope">
              <el-tooltip effect="light" placement="bottom">
                <div slot="content">
                  <p>A.选项1</p>
                  <p>B.选项2</p>
                  <p>C.选项3</p>
                </div>
                <el-button size="small">编辑</el-button>
              </el-tooltip>
            </template>
          </el-table-column>
          <el-table-column property="options" label="正确答案">
            <template scope="scope">
              <el-tooltip effect="light" content="A" placement="bottom">
                <el-button size="small">编辑</el-button>
              </el-tooltip>
            </template>
          </el-table-column>
          <el-table-column property="answerExplain" label="答案解析">
            <template scope="scope">
              <el-button size="small">编辑</el-button>
            </template>
          </el-table-column>
          <el-table-column property="title" label="分数">
            <template scope="scope">
              <el-button size="small">编辑</el-button>
            </template>
          </el-table-column>
        </el-table>

        <!-- 课中 -->
        <el-col :span="4">
          <el-form-item label="课前评测"></el-form-item>
        </el-col>
        <el-col :span="20" align="right">
          <el-form-item label="达标分数：">
            <el-input class="tdlbScoreInput" size="small" v-model="item.testingDtoListTemp.in_progress.score"></el-input>
            <span>(系统可自动根据试题数量折算满分100)</span>
          </el-form-item>
        </el-col>
        <el-col>
          <el-form-item>
            <el-button size="small" type="success" @click="addTestingDto('in_progress',index)">添加试题</el-button>
            <el-button size="small" type="danger" @click="removeTestingDto('in_progress',index)">删除试题</el-button>
            <el-button size="small" type="warning" @click="importTestingDto('in_progress',index)">导入试题</el-button>
            <el-button size="small" type="info" @click="exportTestingDto('in_progress',index)">导出试题</el-button>
            <el-button size="small" type="primary" @click="showTestingDto('in_progress',index)">整体预览</el-button>
          </el-form-item>
        </el-col>
        <el-table ref="singleTable" :data="item.testingDtoListTemp.in_progress.questionsDtoList" @selection-change="handleSelectionChangeIn_progress">
          <el-table-column type="selection" width="55"></el-table-column>
          <el-table-column type="index" label="序号" width="68">
          </el-table-column>
          <el-table-column property="types" label="试题类型">
            <template scope="scope">
              <el-select v-model="scope.row.types" size="small">
                <el-option v-for="item in testTypeOption" v-if="item.value" :key="item.value" :label="item.label" :value="item.value"></el-option>
              </el-select>
            </template>
          </el-table-column>
          <el-table-column property="subject" label="题干">
            <template scope="scope">
              <el-tooltip effect="light" content="题干内容" placement="bottom">
                <el-button size="small">编辑</el-button>
              </el-tooltip>
            </template>
          </el-table-column>
          <el-table-column property="optionsDtoList" label="候选项">
            <template scope="scope">
              <el-button size="small">编辑</el-button>
            </template>
          </el-table-column>
          <el-table-column property="options" label="正确答案">
            <template scope="scope">
              <el-button size="small">编辑</el-button>
            </template>
          </el-table-column>
          <el-table-column property="answerExplain" label="答案解析">
            <template scope="scope">
              <el-button size="small">编辑</el-button>
            </template>
          </el-table-column>
          <el-table-column property="title" label="分数">
            <template scope="scope">
              <el-button size="small">编辑</el-button>
            </template>
          </el-table-column>
        </el-table>

        <!-- 课后 -->
        <el-col :span="4">
          <el-form-item label="课前评测"></el-form-item>
        </el-col>
        <el-col :span="20" align="right">
          <el-form-item label="达标分数：">
            <el-input class="tdlbScoreInput" size="small" v-model="item.testingDtoListTemp.after.score"></el-input>
            <span>(系统可自动根据试题数量折算满分100)</span>
          </el-form-item>
        </el-col>
        <el-col>
          <el-form-item>
            <el-button size="small" type="success" @click="addTestingDto('after',index)">添加试题</el-button>
            <el-button size="small" type="danger" @click="removeTestingDto('after',index)">删除试题</el-button>
            <el-button size="small" type="warning" @click="importTestingDto('after',index)">导入试题</el-button>
            <el-button size="small" type="info" @click="exportTestingDto('after',index)">导出试题</el-button>
            <el-button size="small" type="primary" @click="showTestingDto('after',index)">整体预览</el-button>
          </el-form-item>
        </el-col>
        <el-table ref="singleTable" :data="item.testingDtoListTemp.after.questionsDtoList" @selection-change="handleSelectionChangeAfter">
          <el-table-column type="selection" width="55"></el-table-column>
          <el-table-column type="index" label="序号" width="68">
          </el-table-column>
          <el-table-column property="types" label="试题类型">
            <template scope="scope">
              <el-select v-model="scope.row.types" size="small">
                <el-option v-for="item in testTypeOption" v-if="item.value" :key="item.value" :label="item.label" :value="item.value"></el-option>
              </el-select>
            </template>
          </el-table-column>
          <el-table-column property="subject" label="题干">
            <template scope="scope">
              <el-tooltip effect="light" content="题干内容" placement="bottom">
                <el-button size="small">编辑</el-button>
              </el-tooltip>
            </template>
          </el-table-column>
          <el-table-column property="optionsDtoList" label="候选项">
            <template scope="scope">
              <el-button size="small">编辑</el-button>
            </template>
          </el-table-column>
          <el-table-column property="options" label="正确答案">
            <template scope="scope">
              <el-button size="small">编辑</el-button>
            </template>
          </el-table-column>
          <el-table-column property="answerExplain" label="答案解析">
            <template scope="scope">
              <el-button size="small">编辑</el-button>
            </template>
          </el-table-column>
          <el-table-column property="title" label="分数">
            <template scope="scope">
              <el-button size="small">编辑</el-button>
            </template>
          </el-table-column>
        </el-table>
      </fieldset>
    </el-form>
  </el-row>
</template>

<script>
  import {
    plan as rules
  } from '../rules';
  import testTypeOption from './testTypeOption';
  export default {
    data() {
      return {
        rules, // 验证输入规则
        testTypeOption, // 试题类型
        multipleSelection: [],
        planDtoList: {},
      }
    },
    methods: {
      // 初始化
      init() {
        this.planDtoList = this.$store.state.curriculum.data.planDtoList;
      },
      /******************************************** 按钮事件 ***************************************/
      /*
       * checkbox 选择后触发事件
       * @param val Array 存在所有的选择每一个行数据
       */
      handleSelectionChangeBefore(val) {
        this.multipleSelection = val;
      },
      handleSelectionChangeIn_progress(val) {
        this.multipleSelection = val;
      },
      handleSelectionChangeAfter(val) {
        this.multipleSelection = val;
      },
      /**
       * 添加试题
       * type 课题类型
       * planIndex 第几节课索引
       */
      addTestingDto(type, planIndex) {
        this.$store.commit('curriculum/data/addTestingDto', {
          type,
          planIndex
        })
      },
      /**
       * 删除试题
       */
      removeTestingDto(type, planIndex) {
        if (!this.multipleSelection.length) {
          this.errorMess('请选择需要删除的试题');
          return
        }
        let delTheId = []; // 待删除的索引集
        this.multipleSelection.map(item => delTheId.push(item.theId));
        this.$store.commit('curriculum/data/removeQuestionsDtoList', {
          type,
          planIndex,
          delTheId
        })
        console.log('删除试题：', type, planIndex)
      },
      // 导入试题
      importTestingDto(type, planIndex) {
        console.log('倒入试题：', type, planIndex)
      },
      // 导出试题
      exportTestingDto(type, planIndex) {
        console.log('倒出试题：', type, planIndex)
      },
      // 整体预览
      showTestingDto(type, planIndex) {
        console.log('整体预览：', type, planIndex)
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
  /* 评测与作业 */

  .nTestTable {
    padding-left: 16px;
    .el-form-item {
      margin: 4px 0;
    }
  }

  .tdlbScoreInput {
    width: 100px;
    &~span {
      margin-left: 6px;
      color: red;
    }
  }

</style>
