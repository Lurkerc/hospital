<template>
  <!-- 评测与作业 - 查看 -->
  <div>
    <el-row>
      <el-col v-for="(item,index) in planDtoList" :key="index">
        <h3>第{{ indexText(index) }}节：{{ item.content }}</h3>
        <el-collapse v-model="EQActive" accordion class="eqViewItem">
          <el-collapse-item>
            <template slot="title">
              <span>课前评测</span>
              <el-button size="small" type="success" @click.stop="gotoTest(index,'before',item)" class="eqTestBtn">前往测验</el-button>
            </template>
            <el-col>
              <el-form>
                <el-form-item label="截止时间：">
                  {{ item.testingDtoList.before.expiredTime }}（超过截止时间再提交分数不再计分）
                </el-form-item>
                <el-form-item label="有效分数：">
                  {{ item.testingDtoList.before.validityScore }}/{{ item.testingDtoList.before.totalScore }}（你的每一次提交分数系统都会给你计分，并提取最高分作为你的分数）
                </el-form-item>
                <el-form-item label="有效提交次数：">
                  {{ item.testingDtoList.before.validitySubmits }}/{{ item.testingDtoList.before.totalSubmits }}
                </el-form-item>
              </el-form>
            </el-col>
          </el-collapse-item>
          <el-collapse-item>
            <template slot="title">
              <span>课中评测</span>
              <el-button size="small" type="success" @click.stop="gotoTest(index,'inProgress',item)" class="eqTestBtn">前往测验</el-button>
            </template>
            <el-col>
              <el-form>
                <el-form-item label="截止时间：">
                  {{ item.testingDtoList.inProgress.expiredTime }}（超过截止时间再提交分数不再计分）
                </el-form-item>
                <el-form-item label="有效分数：">
                  {{ item.testingDtoList.inProgress.validityScore }}/{{ item.testingDtoList.inProgress.totalScore }}（你的每一次提交分数系统都会给你计分，并提取最高分作为你的分数）
                </el-form-item>
                <el-form-item label="有效提交次数：">
                  {{ item.testingDtoList.inProgress.validitySubmits }}/{{ item.testingDtoList.inProgress.totalSubmits }}
                </el-form-item>
              </el-form>
            </el-col>
          </el-collapse-item>
          <el-collapse-item>
            <template slot="title">
              <span>课后评测</span>
              <el-button size="small" type="success" @click.stop="gotoTest(index,'after',item)" class="eqTestBtn">前往测验</el-button>
            </template>
            <el-col>
              <el-form>
                <el-form-item label="截止时间：">
                  {{ item.testingDtoList.after.expiredTime }}（超过截止时间再提交分数不再计分）
                </el-form-item>
                <el-form-item label="有效分数：">
                  {{ item.testingDtoList.after.validityScore }}/{{ item.testingDtoList.after.totalScore }}（你的每一次提交分数系统都会给你计分，并提取最高分作为你的分数）
                </el-form-item>
                <el-form-item label="有效提交次数：">
                  {{ item.testingDtoList.after.validitySubmits }}/{{ item.testingDtoList.after.totalSubmits }}
                </el-form-item>
              </el-form>
            </el-col>
          </el-collapse-item>
        </el-collapse>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        EQActive: 0,
        planDtoList: [],
      }
    },
    methods: {
      // 初始化
      init() {
        this.planDtoList = this.$store.state.curriculum.look.planDtoList;
      },
      // 前往检测
      gotoTest(index, type, itemData) {
        this.$emit('show', 'subject', {
          type,
          itemData
        })
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
    }
  }

</script>

<style>
  /* 评测与作业 - 查看 */

  .eqViewItem {
    margin: 10px 0 20px 0;
  }

  .eqTestBtn {
    float: right;
    margin: 6px;
  }

</style>
