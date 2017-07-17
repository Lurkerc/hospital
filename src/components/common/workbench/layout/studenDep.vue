<template>
  <!-- 学生科室情况 -->
  <div>
    <div slot="title" class="uwStudent">
      <h3 class="userOperate left">培训进度</h3>
      <p class="right"><span>当前轮转科室：</span><span class="userOperate">{{ studentData.rotaryIng.depName }}[{{ studentData.rotaryIng.rotaryBeginTime }} 至 {{ studentData.rotaryIng.rotaryEndTime }}]</span></p>
    </div>
    <div class="uwStudentConItem">
      <!-- 入科提示 -->
      <div class="uwscTips" v-if="!isReport">
        <p>您现在需要在<strong>{{ studentData.rotaryIng.depName }}</strong>进行轮转，并填写培训手册；</p>
        <p>轮转时间<strong>{{ studentData.rotaryIng.rotaryBeginTime }} 至 {{ studentData.rotaryIng.rotaryEndTime }}</strong>；</p>
        <p>请于<strong>6月30日</strong>找带教干事进行入科报道到；</p>
        <p>入科报到后方可填写培训手册。</p>
        <div align="right">
          <el-button type="info" @click="studentReport">科室信息</el-button>
        </div>
      </div>
      <!-- 科室情况 -->
      <div class="uwDep" v-else>
        <el-row>
          <el-col :span="8" align="center">
            <p>病种完成情况</p>
            <div id="entity" class="myChars"></div>
            <el-button type="text" @click="entity">快速填写</el-button>
          </el-col>
          <el-col :span="8" align="center">
            <p>技能完成情况</p>
            <div id="skill" class="myChars"></div>
            <el-button type="text" @click="skill">快速填写</el-button>
          </el-col>
          <el-col :span="8" align="center">
            <p>完整病历书写</p>
            <div id="largeCase" class="myChars"></div>
            <el-button type="text" @click="largeCase">快速填写</el-button>
          </el-col>
        </el-row>
        <!-- 提示 -->
        <h3 class="tips">请按科室要求填写培训手册内容</h3>
        <h3 class="tips">培训手册全部按要求完成方可申请出科</h3>
        <!-- 按钮 -->
        <div align="center" class="todoBtn">
          <el-button type="danger" @click="rotary">出科申请</el-button>
          <el-button type="info" @click="depInfo">科室要求</el-button>
        </div>
      </div>
    </div>
    <!-- 出科 -->
    <Modal :mask-closable="false" v-model="rotaryModal" height="200" class-name="vertical-center-modal" :width="900">
      <modal-header slot="header" :content="contentHeader.rotaryId"></modal-header>
      <rotary v-if="rotaryModal" @cancel="cancel('rotary')" @rotary="subCallback('rotary')" :operaility-data="operailityData"></rotary>
      <div slot="footer"></div>
    </Modal>
    <!-- 科室要求 -->
    <Modal close-on-click-modal="false" width="1000" v-model="depInfoModal" class-name="vertical-center-modal" :loading="loading">
      <modal-header slot="header" :content="contentHeader.depInfoId"></modal-header>
      <dep-info v-if="depInfoModal" @cancel="cancel('depInfo')" :operaility-data="operailityData"></dep-info>
      <div slot="footer"></div>
    </Modal>
    <!--病种-->
    <Modal close-on-click-modal="false" width="1000" v-model="entityModal" class-name="vertical-center-modal" :loading="loading">
      <modal-header slot="header" :content="contentHeader.entityId"></modal-header>
      <entity v-if="entityModal" :podId="studentData.rotaryIng.podId" @cancel="cancel('entity')" @add="subCallback('entity')" :url="depApi"></entity>
      <div slot="footer"></div>
    </Modal>
    <!--技能-->
    <Modal close-on-click-modal="false" width="1000" v-model="skillModal" class-name="vertical-center-modal" :loading="loading">
      <modal-header slot="header" :content="contentHeader.skillId"></modal-header>
      <skill v-if="skillModal" :podId="studentData.rotaryIng.podId" @cancel="cancel('skill')" @add="subCallback('skill')" :url="depApi"></skill>
      <div slot="footer"></div>
    </Modal>
    <!--病例-->
    <Modal close-on-click-modal="false" width="1400" v-model="largeCaseModal" class-name="vertical-center-modal" :loading="loading">
      <modal-header slot="header" :content="contentHeader.largeCaseId"></modal-header>
      <large-case v-if="largeCaseModal" :initData="caseData" @cancel="cancel('largeCase')" @add="subCallback('largeCase')" :url="depApi"></large-case>
      <div slot="footer"></div>
    </Modal>
  </div>
</template>

<script>
  import echarts from 'echarts/lib/echarts'; // 图表
  // 引入柱状图
  require('echarts/lib/chart/pie');
  // 引入提示框和标题组件
  require('echarts/lib/component/tooltip');
  require('echarts/lib/component/title');
  import depApi from '../../../rotateManagement/rotateRecordWrite/api';
  import rotary from '../../../rotateManagement/rotateRecordWrite/givenTheApplication/givenTheApplication_rotary'; // 出科申请
  import depInfo from '../../../intern/internBasisData/deptRequireSet/deptRequireSet_info'; // 科室基本要求
  import entity from '../../../rotateManagement/rotateRecordWrite/entityWrite/entityWrite_add'; // 病种填写
  import skill from '../../../rotateManagement/rotateRecordWrite/skillWrite/skillWrite_add'; // 技能填写
  import largeCase from '../../../rotateManagement/rotateRecordWrite/largeCaseWrite/largeCaseWrite_add.vue'; // 大病列
  export default {
    data() {
      return {
        depApi,
        loading: false,
        operailityData: [],
        caseData: {
          podId: "",
          depName: "",
          depId: ""
        },
        studentData: {
          rotaryIng: {
            podId: "",
            rdId: "",
            depName: "",
            depId: "",
            ts: "-",
            rotaryBeginTime: "",
            rotaryEndTime: "",
            bz_wcqk: {
              allCount: 0,
              wcCount: 0
            },
            jn_wcqk: {
              allCount: 0,
              wcCount: 0
            },
            dbl_wcqk: {
              allCount: 0,
              wcCount: 0
            }
          },
          rotaryNext: {
            podId: "",
            rdId: "",
            depName: "",
            depId: "",
            ts: "-",
            rotaryBeginTime: "",
            rotaryEndTime: ""
          }
        }, // 学生数据
        isReport: false, // 已经报到
        rotaryModal: false,
        depInfoModal: false,
        entityModal: false,
        skillModal: false,
        largeCaseModal: false,

        depInfoModal: false,
        contentHeader: {
          rotaryId: {
            id: 'rotaryId',
            title: '出科申请'
          },
          depInfoId: {
            id: 'depInfoId',
            title: '科室要求'
          },
          entityId: {
            id: "entityId",
            title: "病种填写",
          },
          skillId: {
            id: "skillId",
            title: "技能填写",
          },
          largeCaseId: {
            id: "largeCaseId",
            title: "大病例填写"
          },
        }
      }
    },
    methods: {
      /**************************** 按钮事件 ***********************/
      // 学生科室报到
      studentReport() {
        this.isReport = true;
        this.initCharts();
      },
      //  病种填写
      entity() {
        this.openModel('entity')
      },
      //  技能填写
      skill() {
        this.openModel('skill')
      },
      //  病例填写
      largeCase() {
        let {
          podId,
          depName,
          depId
        } = this.studentData.rotaryIng;
        this.caseData = {
          podId,
          depName,
          depId
        };
        this.openModel('largeCase')
      },
      //  出科
      rotary() {
        this.operailityData = {
          podId: this.studentData.rotaryIng.podId
        };
        this.openModel('rotary')
      },
      //  科室要求
      depInfo() {
        this.operailityData = {
          depId: this.studentData.rotaryIng.depId,
          podId: this.studentData.rotaryIng.podId,
          depOutlineId: this.studentData.rotaryIng.rdId
        };
        this.openModel('depInfo')
      },

      /******************************* 模态窗 *****************************/
      /*
       * 监听子组件通讯的方法
       * 作用:根据不同的参数关闭对应的模态
       * @param targer string example:"add"、"edit"
       * */
      cancel(targer) {
        this[targer + 'Modal'] = false;
      },
      /*
       * 监听子组件通讯的方法
       * @param udata boolean 默认false  是否不需要刷新当前表格数据
       * */
      subCallback(type) {
        return (type, title, updata) => {
          this.cancel(type);
          if (title) {
            this.successMess(title);
          }
          if (!updata) {
            this.getStudentDep();
          }
        }
      },
      /*
       * 打开指定的模态窗体
       * @param options string 当前指定的模态:"add"、"edit"
       * */
      openModel(options) {
        this[options + 'Modal'] = true;
      },
      /************************** 数据获取 ****************************/
      // 获取学生科室信息
      getStudentDep() {
        this.ajax({
          ajaxSuccess: "getStudentDepSuccess",
          ajaxParams: {
            url: "/traineeRotary/arrangeRotary/getUserRotaryProgress"
          }
        })
      },
      // 配置数据
      getStudentDepSuccess(res) {
        if (res.data.rotaryIng) {
          this.studentData = res.data;
          this.isReport && this.initCharts();
        }
      },

      // 初始化图表
      initCharts() {
        this.$nextTick(() => {
          this.initChart('entity', this.studentData.rotaryIng.bz_wcqk.wcCount || 0, this.studentData.rotaryIng
            .bz_wcqk.allCount ||
            0, '病种')
          this.initChart('skill', this.studentData.rotaryIng.jn_wcqk.wcCount || 0, this.studentData.rotaryIng.jn_wcqk
            .allCount ||
            0, '技能')
          this.initChart('largeCase', this.studentData.rotaryIng.dbl_wcqk.wcCount || 0, this.studentData.rotaryIng
            .dbl_wcqk
            .allCount ||
            0, '完整病例')
        })
      },
      /**
       * 配置图表
       * dom 图表所在dom
       * dNum 完成数量
       * sumNum 总数
       * title 标题
       * */
      initChart(dom, dNum, sumNum, title) {
        let myChart = echarts.init(document.getElementById(dom));
        let data = [{
          value: (sumNum - dNum) < 0 ? 0 : sumNum - dNum,
          name: '未完成'
        }];
        if (dNum) {
          data.push({
            value: dNum,
            name: '已完成'
          })
        }
        myChart.setOption({
          color: [
            "#3fb1e3",
            "#6be6c1",
            "#626c91",
            "#a0a7e6",
            "#c4ebad",
            "#96dee8"
          ],
          tooltip: {
            formatter: "{b} : {c} ({d}%)"
          },
          series: [{
            name: title,
            type: 'pie',
            radius: '55%',
            center: ['50%', '60%'],
            data,
            itemStyle: {
              emphasis: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            }
          }]
        })
      }
    },
    created() {
      this.getStudentDep()
    },
    components: {
      rotary,
      depInfo,
      entity,
      skill,
      largeCase,
    },
  }

</script>

<style>
  /* 学生科室情况 */

</style>
