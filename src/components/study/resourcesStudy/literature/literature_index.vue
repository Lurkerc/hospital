<!----------------------------------
****--文档文献-首页列表(literature_index)
****--@date     2017/8/8
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
            placeholder="视频资源名称"
            icon="search"
            v-model="formValidate.name"
            :on-icon-click="handleIconClick">
          </el-input>
        </el-col>
      </el-row>
    </div>
  </div>
  <div class="c-container">
    <h3 class="t">
      <span class="c-icon c-icon-xls c-gap-icon-right-small"></span><a @click="showDoc('xls')" class="docTitleA" href="javascript:void(0)">参考文献 文档_百度文库</a>
    </h3>
    <div class="c-abstract overflow-txt">
      <span class=" newTimeFactor_before_abs m">2014年12月25日&nbsp;-&nbsp;</span>在线互动式<em>文档</em>分享平台,在这里,您可以和千万网友分享自己手中的<em>文档</em>,全文阅读其他用户的<em>文档</em>,同时,也可以利用分享<em>文档</em>获取的积分下载<em>文档</em>
      <span class=" newTimeFactor_before_abs m">2014年12月25日&nbsp;-&nbsp;</span>在线互动式<em>文档</em>分享平台,在这里,您可以和千万网友分享自己手中的<em>文档</em>,全文阅读其他用户的<em>文档</em>,同时,也可以利用分享<em>文档</em>获取的积分下载<em>文档</em>
      <span class=" newTimeFactor_before_abs m">2014年12月25日&nbsp;-&nbsp;</span>在线互动式<em>文档</em>分享平台,在这里,您可以和千万网友分享自己手中的<em>文档</em>,全文阅读其他用户的<em>文档</em>,同时,也可以利用分享<em>文档</em>获取的积分下载<em>文档</em>
      <span class=" newTimeFactor_before_abs m">2014年12月25日&nbsp;-&nbsp;</span>在线互动式<em>文档</em>分享平台,在这里,您可以和千万网友分享自己手中的<em>文档</em>,全文阅读其他用户的<em>文档</em>,同时,也可以利用分享<em>文档</em>获取的积分下载<em>文档</em>
    </div>
    <div class="f13">
      <em>2017-05-01</em> | <em>共18页</em> | <em>61次下载</em> | <em>贡献者：czk0370</em>
    </div>
  </div>
  <div class="c-container">
    <h3 class="t">
      <span class="c-icon c-icon-doc c-gap-icon-right-small"></span><a class="docTitleA" href="javascript:void(0)">参考文献 文档_百度文库</a>
    </h3>
    <div class="c-abstract overflow-txt">
      <span class=" newTimeFactor_before_abs m">2014年12月25日&nbsp;-&nbsp;</span>在线互动式<em>文档</em>分享平台,在这里,您可以和千万网友分享自己手中的<em>文档</em>,全文阅读其他用户的<em>文档</em>,同时,也可以利用分享<em>文档</em>获取的积分下载<em>文档</em>
      <span class=" newTimeFactor_before_abs m">2014年12月25日&nbsp;-&nbsp;</span>在线互动式<em>文档</em>分享平台,在这里,您可以和千万网友分享自己手中的<em>文档</em>,全文阅读其他用户的<em>文档</em>,同时,也可以利用分享<em>文档</em>获取的积分下载<em>文档</em>
      <span class=" newTimeFactor_before_abs m">2014年12月25日&nbsp;-&nbsp;</span>在线互动式<em>文档</em>分享平台,在这里,您可以和千万网友分享自己手中的<em>文档</em>,全文阅读其他用户的<em>文档</em>,同时,也可以利用分享<em>文档</em>获取的积分下载<em>文档</em>
      <span class=" newTimeFactor_before_abs m">2014年12月25日&nbsp;-&nbsp;</span>在线互动式<em>文档</em>分享平台,在这里,您可以和千万网友分享自己手中的<em>文档</em>,全文阅读其他用户的<em>文档</em>,同时,也可以利用分享<em>文档</em>获取的积分下载<em>文档</em>
    </div>
    <div class="f13">
      <em>2017-05-01</em> | <em>共18页</em> | <em>61次下载</em> | <em>贡献者：czk0370</em>
    </div>
  </div>
  <div class="c-container">
    <h3 class="t">
      <span class="c-icon c-icon-ppt c-gap-icon-right-small"></span><a class="docTitleA" href="javascript:void(0)">参考文献 文档_百度文库</a>
    </h3>
    <div class="c-abstract overflow-txt">
      <span class=" newTimeFactor_before_abs m">2014年12月25日&nbsp;-&nbsp;</span>在线互动式<em>文档</em>分享平台,在这里,您可以和千万网友分享自己手中的<em>文档</em>,全文阅读其他用户的<em>文档</em>,同时,也可以利用分享<em>文档</em>获取的积分下载<em>文档</em>
      <span class=" newTimeFactor_before_abs m">2014年12月25日&nbsp;-&nbsp;</span>在线互动式<em>文档</em>分享平台,在这里,您可以和千万网友分享自己手中的<em>文档</em>,全文阅读其他用户的<em>文档</em>,同时,也可以利用分享<em>文档</em>获取的积分下载<em>文档</em>
      <span class=" newTimeFactor_before_abs m">2014年12月25日&nbsp;-&nbsp;</span>在线互动式<em>文档</em>分享平台,在这里,您可以和千万网友分享自己手中的<em>文档</em>,全文阅读其他用户的<em>文档</em>,同时,也可以利用分享<em>文档</em>获取的积分下载<em>文档</em>
      <span class=" newTimeFactor_before_abs m">2014年12月25日&nbsp;-&nbsp;</span>在线互动式<em>文档</em>分享平台,在这里,您可以和千万网友分享自己手中的<em>文档</em>,全文阅读其他用户的<em>文档</em>,同时,也可以利用分享<em>文档</em>获取的积分下载<em>文档</em>
    </div>
    <div class="f13">
      <em>2017-05-01</em> | <em>共18页</em> | <em>61次下载</em> | <em>贡献者：czk0370</em>
    </div>
  </div>
  <div class="c-container">
    <h3 class="t">
      <span class="c-icon c-icon-pdf c-gap-icon-right-small"></span><a class="docTitleA" href="javascript:void(0)">参考文献 文档_百度文库</a>
    </h3>
    <div class="c-abstract overflow-txt">
      <span class=" newTimeFactor_before_abs m">2014年12月25日&nbsp;-&nbsp;</span>在线互动式<em>文档</em>分享平台,在这里,您可以和千万网友分享自己手中的<em>文档</em>,全文阅读其他用户的<em>文档</em>,同时,也可以利用分享<em>文档</em>获取的积分下载<em>文档</em>
      <span class=" newTimeFactor_before_abs m">2014年12月25日&nbsp;-&nbsp;</span>在线互动式<em>文档</em>分享平台,在这里,您可以和千万网友分享自己手中的<em>文档</em>,全文阅读其他用户的<em>文档</em>,同时,也可以利用分享<em>文档</em>获取的积分下载<em>文档</em>
      <span class=" newTimeFactor_before_abs m">2014年12月25日&nbsp;-&nbsp;</span>在线互动式<em>文档</em>分享平台,在这里,您可以和千万网友分享自己手中的<em>文档</em>,全文阅读其他用户的<em>文档</em>,同时,也可以利用分享<em>文档</em>获取的积分下载<em>文档</em>
      <span class=" newTimeFactor_before_abs m">2014年12月25日&nbsp;-&nbsp;</span>在线互动式<em>文档</em>分享平台,在这里,您可以和千万网友分享自己手中的<em>文档</em>,全文阅读其他用户的<em>文档</em>,同时,也可以利用分享<em>文档</em>获取的积分下载<em>文档</em>
    </div>
    <div class="f13">
      <em>2017-05-01</em> | <em>共18页</em> | <em>61次下载</em> | <em>贡献者：czk0370</em>
    </div>
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
