<!--
****--@name     外出进修申请审核
****--@role     科主任、教育处、分管院长
****--@date     2017/9/6
****--@author   yc
-->
<template>
    <div>
      <show :operailityData="operailityData"></show>

      <!--<el-form labelWidth="100px" :model="formValidate" ref="formValidate" :rules="rules" style="margin-top: 20px;">-->
        <!--<el-form-item label="审核意见：">-->
          <!--<el-input type="textarea" :autosize="{ minRows: 4, maxRows: 6}" placeholder="请输入内容" v-model="formValidate.remark"></el-input>-->
        <!--</el-form-item>-->
      <!--</el-form>-->

      <!-- 操作按钮 -->
      <el-row style="margin-top: 20px;">
        <el-col :span="6" :offset="6" align="center">
          <el-button type="info" @click="save(3)">通过</el-button>
        </el-col>
        <el-col :span="6" align="center">
          <el-button type="success" @click="save(2)">驳回</el-button>
        </el-col>
      </el-row>
    </div>
</template>
<script>
    /*当前组件必要引入*/
    import api from '../outEducationAntragWrite/api';
    import show from '../outEducationAntragWrite/outEducationAntragWrite_view.vue';
    import { outEducationAntragAudit as rules } from '../../rules';
    //当前组件引入全局的util
    let Util = null;
    export default {
        props:['operailityData'],
        data() {
            return {
              rules,
              formValidate:{
                ids: this.operailityData.id,
                status:'',
                remark:'',
              },
              //当前组件提交(add)数据时,ajax处理的 基础信息设置
              addMessTitle: {
                type: 'add',
                successTitle: '审核通过成功!',
                errorTitle: '审核通过失败!',
                ajaxSuccess: 'ajaxSuccess',
                ajaxError: 'ajaxError',
                ajaxParams: {
                  url: api.audit.path,
                  method: api.audit.method
                }
              },
            }
        },
        methods: {
            //初始化请求列表数据
            init() {
              //给当前组件注入全局util
              Util = this.$util;
            },
          /*
           * 点击提交按钮 监听是否提交数据
           * @param isLoadingFun boolean  form表单验证是否通过
           * */
          save(type) {
//            let isSubmit = this.submitForm("formValidate");
            if (true) {
              this.formValidate.status = type;
              if (type === 2) {
                this.addMessTitle.successTitle = '审核驳回成功！';
                this.addMessTitle.errorTitle = '审核驳回失败！';
              }
              this.addMessTitle.ajaxParams.data = this.getFormData(this.formValidate);
              this.ajax(this.addMessTitle)
            }
          },
          /*
           * 点击提交按钮 监听是否验证通过
           * @param formName string  form表单v-model数据对象名称
           * @return flag boolean   form表单验证是否通过
           * */
          submitForm(formName) {
            let flag = false;
            this.$refs[formName].validate((valid) => {
              if (valid) {
                flag = true;
              }
            });
            return flag;
          },
          /*
           * 获取表单数据
           * @return string  格式:id=0&name=aa
           * */
          getFormData(data) {
            let myData = Util._.defaultsDeep({}, data);
            return myData;
          },
        },
        created() {
            this.init();
        },
        mounted() {
        },
        components: {
          show
        }
    }

</script>
