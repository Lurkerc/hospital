<template>
  <!-- 考生考核表信息 -->
  <div class="modalContent">
    <div class="leftCon">
      <img :src="getPhotoPath(studentData.userPhotoPath) || 'http://iph.href.lu/120x180'" alt="">
      <p class="infoItem bottom">考生姓名：{{ studentData.userName || '-' }}</p>
      <p class="infoItem bottom">总分：{{ studentData.sumMark || '0'}}</p>
      <p class="infoItem bottom">排名：{{ studentData.ranking || '0'}}</p>
      <p class="infoItem">标准分：{{ studentData.standMark || '0'}}</p>
    </div>
    <div class="contentMain">
      <el-form :inline="true" align="right">
        <el-form-item label="考站名称：" style="margin:10px 10px 10px 0;">
          <el-input v-model="listFilterData.stationName" placeholder="输入考站名称进行筛选"></el-input>
        </el-form-item>
        <el-form-item label="内容名称：" style="margin:10px 0;">
          <el-input v-model="listFilterData.contentName" placeholder="输入内容名称进行筛选"></el-input>
        </el-form-item>
        <!--<el-button style="margin:10px 0;" type="info" @click="">筛选</el-button>-->
      </el-form>

      <el-table align="center" :height="dynamicHt" :context="self" :data="filterMarkList()" tooltip-effect="dark" class="tableShowMoreInfo"
        style="width: 100%;">
        <el-table-column label="操作" width="80">
          <template scope="scope">
            <el-button size="small" type="success" :disabled="!scope.row.markId" @click="showInfo(scope.row)">详情</el-button>
          </template>
        </el-table-column>
        <el-table-column label="分站名称" prop="stationName" show-overflow-tooltip>
          <template scope="scope">
            {{ scope.row.stationName || '-' }}
          </template>
        </el-table-column>
        <el-table-column label="考核内容" prop="contentName" show-overflow-tooltip>
          <template scope="scope">
            {{ scope.row.contentName || '-' }}
          </template>
        </el-table-column>
        <el-table-column label="最终得分" prop="totalMark" show-overflow-tooltip>
          <template scope="scope">
            {{ scope.row.totalMark || '0' }}
          </template>
        </el-table-column>
        <el-table-column label="最高分" width="120" prop="maxMark" show-overflow-tooltip>
          <template scope="scope">
            {{ scope.row.maxMark || '0' }}
          </template>
        </el-table-column>
        <el-table-column label="最低分" width="120" prop="minMark" show-overflow-tooltip>
          <template scope="scope">
            {{ scope.row.minMark || '0' }}
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!-- 考生信息 -->
    <!-- 模态框 查看（view） -->
    <Modal :mask-closable="false" v-model="studentInfoModal" height="200" title="对话框标题" class-name="vertical-center-modal" :loading="true"
      :width="1200" @on-cancel="cancel">
      <modal-header slot="header" :parent="self" :content="contentHeader.studentInfoId"></modal-header>
      <student-info v-if="studentInfoModal" @cancel="cancel" @edit="subCallback" :sceneId="sceneId" :studentId="userId" :markId="markId"
        :stationId="stationId" :arrangementId="arrangementId"></student-info>
      <div slot="footer"></div>
    </Modal>
  </div>
</template>

<script>
  let Util = null;

  import api from './api';
  import studentInfo from './scoreQuery_studentInfo';

  export default {
    props: ['userId', 'sceneId'],
    data() {
      return {
        self: this,
        markId: 0,
        stationId: 0,
        arrangementId: 0,
        dynamicHt: 400,
        studentInfoModal: false,
        listFilterData: {
          stationName: '',
          contentName: ''
        },
        totalCount: 0,
        studentData: {},
        contentHeader: {
          studentInfoId: {
            id: 'studentInfoId',
            title: '考生分数详情'
          }
        }
      }
    },
    methods: { /************************** 基本逻辑 ******************************/
      //初始化请求列表数据
      init() {
        Util = this.$util;

        //ajax请求参数设置
        this.myPages = Util.pageInitPrams;

        this.queryQptions = {
          url: api.examUserGet.path + '/' + this.userId,
          method: api.examUserGet.method,
          params: {}
        }
        this.setTableData();
      },
      /************************* 表格逻辑 *********************************/
      /*
       * 设置表格数据
       * @param isLoading Boolean 是否加载
       */
      setTableData() {
        Object.assign(this.queryQptions.params, {
          id: this.userId,
          sceneId: this.sceneId
        });
        this.ajax({
          ajaxSuccess: 'listDataSuccess',
          ajaxParams: this.queryQptions
        })
      },
      // 数据请求成功回调
      listDataSuccess(res, m, loading) {
        if (res.data) {
          this.totalCount = res.totalCount;
          this.studentData = res.data;
        }
      },
      // 筛选
      filterMarkList() {
        let arr = [];
        if (!this.listFilterData.stationName && !this.listFilterData.contentName) {
          arr = this.studentData.markList
        } else {
          let markList = this.studentData.markList;
          markList && markList.map(item => {
            if ((item.stationName.indexOf(this.listFilterData.stationName) > -1) && (item.contentName && item.contentName
                .indexOf(this.listFilterData
                  .contentName) > -1)) {
              arr.push(item)
            }
          })
        }
        return arr
      },
      // 查看更多信息
      showInfo(row) {
        this.markId = row.markId;
        this.stationId = row.stationId;
        this.arrangementId = row.arrangementId;
        this.openModel('studentInfo');
      },
      // 取消
      cancel(targer) {
        this[targer + 'Modal'] = false;
        this.setTableData()
      },
      /*
       * 打开指定的模态窗体
       * @param options string 当前指定的模态:"add"、"edit"
       * */
      openModel(options) {
        this[options + 'Modal'] = true;
      },
      // 回调
      subCallback(target, title, updata) {
        this.cancel(target);
        if (title) {
          this.successMess(title);
        }
        if (!updata) {
          this.setTableData();
        }
      },
      // 获取头像地址
      getPhotoPath(path) {
        return path && this.$store.getters.getEnvPath.http + path || ''
      },
    },
    components: {
      studentInfo
    },
    created() {
      this.init();
    },
  }

</script>

<style lang="scss">
  $boderColor:#dfe6ec; // 边框颜色
  .modalContent {
    margin: -16px;
    margin-right: 0;
    position: relative;
    .leftCon {
      width: 25%;
      position: absolute;
      left: 0;
      top: 0;
      bottom: 0;
      border-right: 1px solid $boderColor;
      img {
        width: 60%;
        max-width: 120px;
        display: block;
        margin: 10px auto;
      }
      .infoItem {
        line-height: 40px;
        padding-left: 16px;
        &.top {
          border-top: 1px solid $boderColor;
        }
        &.bottom {
          border-bottom: 1px solid $boderColor;
        }
      }
    }
    .contentMain {
      min-height: 450px;
      margin-left: 25%;
      .stationList {
        padding: 10px;
        padding-right: 0;
        overflow: hidden;
      }
    }
  }

</style>
