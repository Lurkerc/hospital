<!--
****--@name     ${*}
****--@role     ${*}
****--@date     2017/9/6
****--@author   yc
-->
<template>
  <div>
    <el-row>
      <el-form label-width="120px">
        <el-col>
          <el-form-item label="资金库名称：" prop="fundName">
            {{ formValidate.fundName }}
          </el-form-item>
        </el-col>
        <el-col>
          <el-form-item label="备注：" prop="remarks">
            {{ formValidate.remarks || '-' }}
          </el-form-item>
        </el-col>
      </el-form>
    </el-row>
  </div>
</template>
<script>
  /*当前组件必要引入*/
  import api from './api';
  //当前组件引入全局的util
  let Util = null;
  export default {
    props: ['operailityData'],
    data() {
      return {
        formValidate: {
          fundId: "",
          fundName: "",
          remarks: "",
        },
      }
    },
    methods: {
      //初始化请求列表数据
      init() {
        if (this.operailityData) {
          this.getViewData();
        }
      },
      // 获取编辑数据
      getViewData() {
        let opt = {
          ajaxSuccess: res => {
            for (let key in this.formValidate) {
              this.formValidate[key] = res.data[key]
            }
          },
          ajaxError: () => this.errorMess('获取资金库资料失败'),
          ajaxParams: {
            url: api.get.path + this.operailityData.fundId,
            method: api.get.method
          }
        };
        this.ajax(opt)
      },
    },
    created() {
      this.init();
    },
    mounted() {
    },
    components: {}
  }

</script>
