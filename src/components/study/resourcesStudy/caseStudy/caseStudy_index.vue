<!----------------------------------
****--病例学习(caseStudy_list)
****--@date     2017/8/7
****--@author   zyc<332533011@qq.com
----------------------------------->
<template>
  <div>
    <div class="video-type-box">
      <div class="video-title-left">
        <a class="videoHome-type">
          分类
          <div class="videoHome-type-content">
            <ul class="videoHome-type-content-list">
              <li>
                内科<i class="el-icon-arrow-right arrow-right"></i>
                <div class="videoHome-type-subContent">
                  <div class="videoHome-type-subContent-title">
                    内科
                  </div>
                  <div class="videoHome-type-subContent-typesBox">
                    <dl class="videoHome-type-subContent-types">
                      <dd @click="searchByDep">心血管内科</dd>
                      <dd>心血管内科</dd>
                      <dd>心血管内科</dd>
                      <dd>心血管内科</dd>
                      <dd>心血管内科</dd>
                      <dd>心血管内科</dd>
                    </dl>
                  </div>
                </div>
              </li>
              <li>外科<i class="el-icon-arrow-right arrow-right"></i></li>
              <li>儿科<i class="el-icon-arrow-right arrow-right"></i></li>
              <li>妇产科<i class="el-icon-arrow-right arrow-right"></i></li>
              <li>保健<i class="el-icon-arrow-right arrow-right"></i></li>
            </ul>
          </div>
        </a>
      </div>
      <div class="video-title-right" style="width: 400px">
        <el-row >
          <el-col :span="24">
            <el-input
              style="width: 100%;"
              placeholder="请输入病理学名称"
              icon="search"
              v-model="formValidate.name"
              :on-icon-click="handleIconClick">
            </el-input>
          </el-col>
        </el-row>
      </div>
    </div>
    <div>

    </div>
  </div>
</template>
<script>
  /*当前组件必要引入*/
  //当前组件引入全局的util
  let Util = null;
  export default{
    data() {
      return {
        formValidate: {
          name: "",
        },
      }
    },
    methods: {
      //初始化请求列表数据
      init(){

      },
      handleIconClick(ev) {
        console.log(ev);
      },
      //分类查询
      searchByDep(){

      },
      showDoc(){
        this.$emit('show', 'show',{});
      }
    },
    created(){
      this.init();
    },
    mounted(){
    },
    components: {}
  }
</script>
<style>
  @import "../../../../assets/ambuf/css/videoStudy/default.css";
</style>
