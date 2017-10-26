<!--
****--@name     ${*}
****--@role     ${*}
****--@date     2017/9/6
****--@author   yc
-->
<template>
  <el-row>
    <el-form label-width="100px">
      <el-col :span="12">
        <el-form-item label="经费名称:" prop="accountingName">{{ formValidate.accountingName }}</el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="资金库:" prop="fundName">{{ formValidate.fundName }}</el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="记录类型:" prop="accountingType">
          {{ formValidate.accountingType | dictionary(self, 'ACCOUNTING_TYPE') }}
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="出账或入账:" prop="outOrEnter" style="height: 37px;">{{ formValidate.outOrEnter | typeText }}
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="报销人:" prop="userName">{{ formValidate.userName }}</el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="部门:" prop="depName">{{ formValidate.depName }}</el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="报销总额:" prop="accountingMoney">{{ formValidate.accountingMoney }}</el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="报销时间:" prop="expenseTime">{{ formValidate.expenseTime }}</el-form-item>
      </el-col>
      <el-col>
        <el-form-item label="经费描述:" prop="explains">{{ formValidate.explains }}</el-form-item>
      </el-col>
    </el-form>
    <h3>明细列表</h3>
    <el-table align="center" :data="formValidate.fundAccountingDetialList" show-summary
              :summary-method="getSummaries" tooltip-effect="dark">
      <el-table-column prop="projectName" label="项目名称" show-overflow-tooltip></el-table-column>
      <el-table-column prop="invoiceQuantity" label="单据数量" show-overflow-tooltip></el-table-column>
      <el-table-column prop="money" label="金额" show-overflow-tooltip></el-table-column>
      <el-table-column prop="detatilExplain" label="备注" show-overflow-tooltip></el-table-column>
    </el-table>
    <el-col style="margin-top: 20px;">
      <el-form>
        <el-form-item label="附件:">
          <upload-file :uploadFiles="formValidate.fileList" :show="true"></upload-file>
        </el-form-item>
      </el-form>
    </el-col>
  </el-row>
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
        self: this,
        user: [], // 已选择的人员
        formValidate: {
          "accountingId": "", // 出入账记录id
          "fundId": "", // 经费库id
          "fundName": "", // 经费库名称
          "accountingName": "", // 经费名称
          "accountingType": "", // 记录类型
          "depId": "", // 部门id
          "depName": "", // 部门名称
          "outOrEnter": "OUT", // 出账或入账 OUT/ENTER
          "explains": "", // 经费描述
          "userId": "", // 报销人Id
          "userName": "", // 报销人名称
          "expenseTime": "", // 报销时间2017-10-16 12:00:00
          "accountingMoney": "", // 报销总额10000.2
          "fileIds": "", // 附件id字符串1,2
          "fileList": [ // 附件文件列表
//            {
//              "fileId":"1",
//              "filePath":"",
//            }
          ], // 附件列表
          "fundAccountingDetialList": [ // 明细列表
            {
              "projectName": "", // 项目名称
              "invoiceQuantity": "", // 单据数量
              "money": "", // 金额
              "detatilExplain": "" // 备注
            }
          ]
        },
        isEdit: false,
      }
    },
    methods: {
      //初始化请求列表数据
      init() {
        this.getEditData();
      },
      /****************** 表格相关 *****************/
      // 求和
      getSummaries(param) {
        const {columns, data} = param;
        const sums = [];
        columns.forEach((column, index) => {
          if (index === 0 || index === 3 || index === 4) {
            sums[index] = index === 0 ? '合计' : '';
            return;
          }
          const values = data.map(item => Number(item[column.property]));
          if (!values.every(value => isNaN(value))) {
            sums[index] = values.reduce((prev, curr) => {
              const value = Number(curr);
              if (!isNaN(value)) {
                return prev + curr;
              } else {
                return prev;
              }
            }, 0);
          } else {
            sums[index] = '该列存在无效数值';
          }
        });
        this.formValidate.accountingMoney = sums[2];
        return sums;
      },
      /******************* 其他逻辑 ********************/
      // 获取编辑数据
      getEditData() {
        let opt = {
          ajaxSuccess: res => {
            let selectUser = {
              key: res.data.userId,
              label: res.data.userName,
              data: {
                dept: {
                  id: res.data.depId,
                  name: res.data.depName
                }
              }
            };
            // 还原选择的人员信息
            this.user[0] = selectUser;
            for (let key in this.formValidate) {
              this.formValidate[key] = res.data[key];
            }
          },
          ajaxError: () => this.errorMess('获取资金库资料失败'),
          ajaxParams: {
            url: api.get.path + this.operailityData.accountingId,
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
