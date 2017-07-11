<!--
****--结业鉴定(dd)
****--@date     2017/7/3
****--@author   gx
-->
<template>
  <div class="graduationAppraisalBox">
    <div class="graduationAppraisal">
      <h2 class="graduationAppraisalTitle">毕业实习总鉴定</h2>
      <div class="gaMain">
        <div class="gaSubject">共实习科目：
          <p>科目1</p>
        </div>
        <div class="gaTimes">
          <div class="gaSumTime">共缺时间：30天</div>
          <div class="gaTimeItem">
            <p>其中病假20天；</p>
            <p>其中病假20天；</p>
            <p>其中病假20天</p>
          </div>
        </div>
        <div class="gaContent">
          <p class="gacTitle">自我鉴定：</p>
          <el-input type="textarea" :autosize="{ minRows: 4}"></el-input>
          <p class="gacSignature">本人签名：</p>
          <p class="gacDay">
            <span>年</span>
            <span>月</span>
            <span>日</span>
          </p>
        </div>
        <div class="gaContent">
          <p class="gacTitle">自我鉴定：</p>
          <p class="gacText"></p>
          <!--<el-input type="textarea" :autosize="{ minRows: 4}"></el-input>-->
          <p class="gacSignature">本人签名：</p>
          <p class="gacDay">
            <span>年</span>
            <span>月</span>
            <span>日</span>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  /*当前组件必要引入*/

  //当前组件引入全局的util
  let Util = null;
  export default {
    data() {
      return {}
    },
    methods: {
      //初始化请求列表数据
      init() {

      },

    },
    created() {
      this.init();
    },
    mounted() {},
    components: {}
  }

</script>

<style lang="scss">
  @import'../../../../assets/ambuf/css/graduationAppraisal_v1.0/content';

</style>
