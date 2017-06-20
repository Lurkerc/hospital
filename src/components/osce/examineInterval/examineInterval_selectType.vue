<template>
  <!-- 添加考站选择类型 -->
  <div>
    <template v-for="item in typeOption">
      <el-radio class="radio" v-model="radio" v-if="item.value" :label="item.value">{{ item.label }}</el-radio>
    </template>
    <div align="center" style="margin-top:20px;">
      <el-button type="primary" @click="selectType">确定</el-button>
    </div>
  </div>
</template>

<script>
  // 类型
  import typeOption from './examineTypeOption';

  export default {
    data() {
      return {
        typeOption,
        radio: '', // 选择的考核类型
      }
    },
    methods: {
      selectType() {
        if (!this.radio) {
          this.showMess("请选择考核类型!");
          return
        }
        this.$emit('select', this.radio);
      }
    }
  }

</script>
