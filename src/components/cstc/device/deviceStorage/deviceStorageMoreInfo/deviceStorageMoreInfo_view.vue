<template>
  <el-row>
    <el-form :model="formValidate" ref="formValidate" label-width="124px">
      <el-col :span="9" :offset="2">
        <el-form-item label="购买时间：" prop="purchaseTime">
          {{ formValidate.purchaseTime }}
        </el-form-item>
      </el-col>
      <el-col :span="9" :offset="2">
        <el-form-item label="使用次数：" prop="useTime">
          {{ formValidate.useTime || '0' }}
        </el-form-item>
      </el-col>
      <el-col :span="9" :offset="2">
        <el-form-item label="单价：" prop="price">
          {{ formValidate.price | money }}
        </el-form-item>
      </el-col>
      <el-col :span="9" :offset="2">
        <el-form-item label="维修电话：" prop="servicingPhone">
          {{ formValidate.servicingPhone }}
        </el-form-item>
      </el-col>
      <el-col :span="9" :offset="2">
        <el-form-item label="厂商电话：" prop="manufacturerPhone">
          {{ formValidate.manufacturerPhone }}
        </el-form-item>
      </el-col>
      <el-col :span="9" :offset="2">
        <el-form-item label="购买地址：" prop="buyAdderss">
          {{ formValidate.buyAdderss }}
        </el-form-item>
      </el-col>
      <el-col :span="9" :offset="2">
        <el-form-item label="存放地点：" prop="storageLocation">
          {{ formValidate.storageLocation }}
        </el-form-item>
      </el-col>
      <el-col :span="9" :offset="2">
        <el-form-item label="设备编号：" prop="deviceIdentifier">
          {{ formValidate.deviceIdentifier }}
        </el-form-item>
      </el-col>
      <el-col :span="9" :offset="2">
        <el-form-item label="生产日期：" prop="manufactureDate">
          {{ formValidate.manufactureDate }}
        </el-form-item>
      </el-col>
      <el-col :span="9" :offset="2">
        <el-form-item label="保修截止日期：" prop="guaranteeDate">
          {{ formValidate.guaranteeDate }}
        </el-form-item>
      </el-col>
      <el-col :span="9" :offset="2">
        <el-form-item label="设备状态：" prop="status">
          {{ formValidate.status | typeText }}
        </el-form-item>
      </el-col>
      <el-col :span="20" :offset="2">
        <el-form-item label="设备描述：" prop="describes">{{ formValidate.describes }}</el-form-item>
      </el-col>
    </el-form>
  </el-row>
</template>

<script>
  import api from './api';
  export default {
    props: {
      id: {
        type: [Number, String],
        require: true
      },
      // urlParams: { // 编辑
      //   type: Object,
      //   require: true
      // }
      // operailityData: {
      //   type: Object,
      //   required: true
      // }
    },
    data() {
      return {
        // 表单数据
        formValidate: {
          deviceTypeName: "-",
          deviceIdentifier: "-", // 设备编号
          price: "-", // 单价
          useTime: 0, // 使用次数 无
          purchaseTime: "-", // 购买时间
          manufacturerPhone: "-", // 厂商电话
          servicingPhone: "-", // 维修电话
          storageLocation: "-", // 存放地点
          buyAdderss: "-", // 购买地点
          manufactureDate: "-", // 生产日期
          guaranteeDate: "-", // 保修截止日期
          status: "-", // 状态
          describes: "-" // 描述
        }
      }
    },
    methods: {
      /**************************** 从服务器获取编辑的数据 *****************************************/
      getDataForServer() {
        this.ajax({
          ajaxSuccess: 'ajaxSuccess',
          ajaxParams: {
            url: api.get.path + this.id,
            method: api.get.method
          }
        })
      },
      ajaxSuccess(res) {
        this.formValidate = res.data // 初始化编辑数据
      },
      /*
       * 组件初始化入口
       * */
      init() {
        // 获取编辑数据
        this.getDataForServer();
      },
    },
    created() {
      // this.formValidate = this.operailityData
      this.init();
    }
  }

</script>
