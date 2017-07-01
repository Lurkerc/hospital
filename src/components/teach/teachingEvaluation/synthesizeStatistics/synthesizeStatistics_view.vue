<template>
  <!-- 查看分析策略 -->
  <div>
    <el-form :inline="true" :model="formValidate" ref="formValidate">
      <el-form-item label="策略名称：" prop="title">
        {{ formValidate.title }}
      </el-form-item>
      <fieldset>
        <legend style="font-size:16px">&nbsp;&nbsp;分析对象设置&nbsp;&nbsp;</legend>
        <el-form-item label="分析对象：">
          {{ formValidate.objType | synthesizeStatistics }}
        </el-form-item>
        <p></p>
        <el-form-item label="分析报告基本信息展示：">
          {{ formValidate.viewContent }}
        </el-form-item>
        <p></p>
        <el-form-item label="分析报告数据查询内容：">
          {{ formValidate.queryContent }}
        </el-form-item>
      </fieldset>
      <fieldset style="margin-top:20px">
        <legend style="font-size:16px">&nbsp;&nbsp;分析数据来源&nbsp;&nbsp;</legend>
        <el-table align="center" :context="self" :data="tableData" tooltip-effect="dark" style="width: 100%;margin-top:10px;">
          <el-table-column label="名称" prop="activityName" show-overflow-tooltip></el-table-column>
          <el-table-column label="评价时间" prop="timeText" show-overflow-tooltip>
            <template scope="scope">
              {{ getTimeText(scope.row) }}
            </template>
          </el-table-column>
          <el-table-column label="评价人" prop="appraiser" show-overflow-tooltip>
            <template scope="scope">
              {{ scope.row.appraiser && scope.row.appraiser.split('=')[1] }}
            </template>
          </el-table-column>
          <el-table-column label="被评价人" prop="evaluated" show-overflow-tooltip>
            <template scope="scope">
              {{ scope.row.evaluated && scope.row.evaluated.split('=')[1] }}
            </template>
          </el-table-column>
          <el-table-column label="权重" prop="weight"></el-table-column>
        </el-table>
      </fieldset>
    </el-form>
  </div>
</template>

<script>
  let Util;
  import api from './api';
  export default {
    props: ['operailityData'],
    data() {
      return {
        viewContent: [], // 分析报告基本信息展示
        queryContent: [], // 分析报告数据查询内容
        //form表单bind数据
        formValidate: {
          "title": "",
          "objType": "",
          "obj": "",
          "viewContent": "",
          "queryContent": "",
          "strategyResourceDtoList": [
            // {
            //   "activityId": 2,
            //   "weight": 1
            // },
            // {
            //   "activityId": 2,
            //   "weight": 3
            // }
          ]
        },
        // 表格
        self: this,
        tableData: [], // 表格数据
        scoreSelectData: [], // 评分项

      }
    },
    methods: {
      // 获取评价时间描述文本
      getTimeText(res) {
        let dateType = (res.dateType || 0) - 1; // 时间类型
        let startDay = res.startDay; // 开始
        let endDay = res.endDay; // 截止
        let week = {
          1: '一',
          2: '二',
          3: '三',
          4: '四',
          5: '五',
          6: '六',
          7: '日'
        };
        let dateText = [{
            start: `出科前${startDay}天`,
            end: `后${endDay}天`
          },
          {
            start: `每周${week[startDay]}`,
            end: `周${week[endDay]}`
          },
          {
            start: `每月${startDay}日`,
            end: `${endDay}日`
          },
          {
            start: `${res.startDate}`,
            end: `${res.endDate}`
          },
          '每天',
          '每季度',
          '每半年',
          '每年'
        ];
        let text = '';
        if (dateType > -1) {
          if (dateType > 3) {
            text = dateText[dateType]
          } else {
            text = dateText[dateType].start;
            endDay && (text += ' - ' + dateText[dateType].end)
          }
        }
        return text
      },
      // 从服务器获取数据
      getDataForServer() {
        let opt = {
          ajaxSuccess: 'getDataForServerSuccess',
          ajaxParams: {
            url: api.get.path + this.operailityData.id,
            method: api.get.method,
          }
        };
        this.ajax(opt)
      },
      // 成功获取数据
      getDataForServerSuccess(res) {
        this.viewContent = (res.data.viewContent || '').split(',');
        this.queryContent = (res.data.queryContent || '').split(',');
        this.formValidate = res.data;
        this.tableData = res.data.strategyResourceDtoList;
      },
      /*
       * 组件初始化入口
       * */
      init() {
        Util = this.$util;
        this.getDataForServer();
      },
    },
    created() {
      this.init()
    }
  }

</script>

<style>
  /* 编辑分析策略 */

</style>
