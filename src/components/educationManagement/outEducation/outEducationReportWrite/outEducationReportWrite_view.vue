<!--
****--@name     ${*}
****--@role     ${*}
****--@date     2017/9/6
****--@author   yc
-->
<template>
  <div>
    <h1 align="center">{{ hospitalName }}外出进修情况汇报</h1>
    <table class="el-table oerwInputTable">
      <tbody>
      <tr>
        <td width="150" align="center">
          <div class="cell">姓名</div>
        </td>
        <td>
          <div class="cell">{{ showData.userName }}</div>
        </td>
        <td width="150" align="center">
          <div class="cell">科室</div>
        </td>
        <td>
          <div class="cell">{{ showData.direction }}</div>
        </td>
      </tr>
      <tr>
        <td width="150" align="center">
          <div class="cell">外派进修单位</div>
        </td>
        <td>
          <div class="cell">{{ showData.hospital }}</div>
        </td>
        <td width="150" align="center">
          <div class="cell">进修科目</div>
        </td>
        <td>
          <div class="cell">{{ showData.deptName }}</div>
        </td>
      </tr>
      <tr>
        <td align="center">
          <div class="cell">进修时间</div>
        </td>
        <td colspan="3">
          <div class="cell">
            {{ showData.startTime }} 至 {{ showData.endTime }}
          </div>
        </td>
      </tr>
      <tr>
        <td align="center">
          <div class="cell"><p class="tdTitle">进修情况总结</p></div>
        </td>
        <td colspan="3">
          <div class="cell">
            {{ showData.summed }}
          </div>
        </td>
      </tr>
      <tr>
        <td colspan="4">
          <div class="cell">
            <p class="suggest">需要说明的情况或建议：</p>
            <div>{{ showData.suggest }}</div>
          </div>
        </td>
      </tr>
      <tr>
        <td>
          <div class="cell">附件</div>
        </td>
        <td colspan="3">
          <div class="cell">
            <div class="cell upFileBox">
              <upload-file :uploadFiles="files" :show="true"></upload-file>
            </div>
          </div>
        </td>
      </tr>
      </tbody>
    </table>
    <!-- 申请上报审核结果 -->
    <el-form labelWidth="100px" style="margin-top: 20px;" v-if="['6','7'].indexOf(showData.status) > -1">
      <el-form-item label="审核意见：">
        {{ showData.remark || '——' }}
      </el-form-item>
      <el-form-item label="审核状态：">
        {{ showData.status | outEducationAntragWriteStatus }}
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
  /*当前组件必要引入*/
  import api from '../outEducationAntragWrite/api';
  import uploadFile from '../../../common/uploadFile.vue';
  //当前组件引入全局的util
  let Util = null;
  export default {
    props: ['operailityData'],
    data() {
      return {
        hospitalName: '',
        files: [],
        showData: {
          userName: "", // 进修人姓名
          direction: "", // 主要研究方向
          hospital: "", // 申请进修医院
          deptName: "", // 进修科目名称
          startTime: "", // 进修开始时间
          endTime: "", // 进修截止时间
          summed: '', // 总结
          suggest: '', // 情况与建议
          remark: '', // 暂无审核意见字段
          status: '', // 状态,
        },
      }
    },
    methods: {
      //初始化请求列表数据
      init() {
        this.hospitalName = this.$store.state.envPath.hospitalName;
        //给当前组件注入全局util
        Util = this.$util;
        this.getShowData();
      },
      // 获取编辑数据
      getShowData() {
        let opt = {
          ajaxSuccess: "getShowDataSuccess",
          ajaxParams: {
            url: api.get.path + this.operailityData.id,
            method: api.get.method
          }
        };
        this.ajax(opt)
      },
      // 初始化编辑数据
      getShowDataSuccess(res) {
        if (!res.data || !res.data.id) {
          return
        }

        for (let key in this.showData) {
          if (res.data[key]) {
            this.showData[key] = res.data[key]
          }
        }

        // 附件
        (res.data.files || []).map(item => {
          this.files.push({
            fileId: item.id,
            fileName: item.oldName,
            filePath: '/api/file/download/' + item.id
          });
        });
      },
    },
    created() {
      this.init();
    },
    mounted() {
    },
    components: {
      uploadFile
    }
  }

</script>
