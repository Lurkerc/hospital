<!----------------------------------
****--医学图谱(medicalAtlas_list)
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
              placeholder="请输入图谱名称"
              icon="search"
              v-model="formValidate.name"
              :on-icon-click="handleIconClick">
            </el-input>
          </el-col>
        </el-row>
      </div>
    </div>
    <el-tabs v-model="activeName">
      <el-tab-pane name="first" label="心内科">
        <div class="all-work-list">
          <div class="work-list-box">
            <div class="card-box" v-for="item in 5">
              <div class="card-img">
                <a @click="showImgListItem" href="javascript:void(0)" class="card-img-hover" target="_blank" z-st="home_main_card_cover">
                  <img src="http://img.zcool.cn/community/00b25c598a6f9f0000002129acd2f0.jpg@260w_195h_1c_1e_1o_100sh.jpg" />
                </a>
              </div>
              <div class="card-info">
                <p class="card-info-title">
                  <a @click="showImgListItem" href="javascript:void(0)" title="【何文通每日一画】七天第四十四辑  " class="title-content" target="_blank" z-st="home_main_card_title" style="width: 228px;">【何文通每日一画】七天第四十四辑  </a>
                </p>
                <p class="card-info-item">
                  <span class="statistics-view">标签1</span>
                  <span class="statistics-comment">标签2</span>
                  <span class="statistics-tuijian">标签3</span>
                </p>
              </div>
              <div class="card-item">
        <span class="user-avatar showMemberCard">
            <a href="javascript:void(0)" title="何文通设计豆" target="_blank" z-st="home_main_card_user">何文通设计豆</a>
            <div class="author-info-card hide" data-id="769799"></div>
        </span>

                <span class="time" title="审核通过时间：2017-08-09 10:13:56；创建时间：2017-08-09 10:13:56">5小时前</span>
              </div>
            </div>
          </div>
        </div>
      </el-tab-pane>
    </el-tabs>
    <el-tabs v-model="activeName">
      <el-tab-pane name="first" label="心内科">
        <div class="all-work-list">
          <div class="work-list-box">
            <div class="card-box" v-for="item in 5">
              <div class="card-img">
                <a href="javascript:void(0)" class="card-img-hover" target="_blank" z-st="home_main_card_cover">
                  <img src="http://img.zcool.cn/community/00b25c598a6f9f0000002129acd2f0.jpg@260w_195h_1c_1e_1o_100sh.jpg" />
                </a>
              </div>
              <div class="card-info">
                <p class="card-info-title">
                  <a href="javascript:void(0)" title="【何文通每日一画】七天第四十四辑  " class="title-content" target="_blank" z-st="home_main_card_title" style="width: 228px;">【何文通每日一画】七天第四十四辑  </a>
                </p>
                <p class="card-info-item">
                  <span class="statistics-view">标签1</span>
                  <span class="statistics-comment">标签2</span>
                  <span class="statistics-tuijian">标签3</span>
                </p>
              </div>
              <div class="card-item">
        <span class="user-avatar showMemberCard">
            <a href="javascript:void(0)" title="何文通设计豆" target="_blank" z-st="home_main_card_user">何文通设计豆</a>
            <div class="author-info-card hide" data-id="769799"></div>
        </span>

                <span class="time" title="审核通过时间：2017-08-09 10:13:56；创建时间：2017-08-09 10:13:56">5小时前</span>
              </div>
            </div>
          </div>
        </div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
  /*当前组件必要引入*/
  //当前组件引入全局的util
  let Util = null;
  export default{
    data() {
      return {
        activeName: 'first',
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
      showImgListItem(){
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
