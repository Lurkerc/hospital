<template>
  <!-- 分类菜单 -->
  <div class="classMenuBox">
    <div class="classMenuName">
      课程分类
    </div>
    <!-- 一级菜单 -->
    <div class="classMenuContent">
      <div class="classMenuSwriper">
        <div class="classMenuItem" v-for="(item,i) in 3" :key="i">
          <div class="classMenuText">
            <p class="overflow-txt1">菜单{{ item }}</p>
            <i class="el-icon-arrow-right"></i>
          </div>
          <!-- 二级菜单 -->
          <div class="classMenuChirld">
            <div class="classMenuChirldTitle">
              <p>内科学{{ i }}</p>
            </div>
            <el-row class="classMenuChirldBox">
              <template v-for="(citem,index) in 30">
                <el-col :span="8" :key="index" v-if="(index + 1) % 3 === 0">
                  <p class="overflow-txt1 classMenuChirldItem">菜单{{ citem }}</p>
                </el-col>
                <el-col :span="7" :key="index" :offset="1" v-else>
                  <p class="overflow-txt1 classMenuChirldItem">菜单{{ citem }}</p>
                </el-col>
              </template>
            </el-row>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {

  }

</script>

<style lang="scss">
  /* 分类菜单 */

  $classMenuNameHeight:36px;
  $classMenuWidth: 218px;
  $classMenuHeight: 250px;
  $paddingLeft:60px;
  $borderColor:#bfcbd9;
  $classMenuChirldWidth:475px;
  $classMenuChirldHeight:246px;
  $classMenuChirldPadding:16px;
  $classMenuChirldTitlePadding:48px;

  .classMenuBox {
    width: $classMenuWidth;
    position: relative;
    z-index: 3;
  }

  .classMenuName {
    width: 100%;
    height: $classMenuNameHeight;
    line-height: $classMenuNameHeight;
    font-size: 20px;
    color: #fff;
    padding-left: $paddingLeft;
    background: url(~@/assets/ambuf/css/videoStudy/images/type.png) #2e3b4d 17px 8px no-repeat;
  }

  .classMenuContent {
    width: 100%;
    height: $classMenuHeight;
    border: 1px solid $borderColor;
    overflow: hidden;
  }

  .classMenuSwriper {
    height: 100%;
    width: $classMenuWidth + $classMenuChirldPadding; // padding-right: $classMenuChirldPadding;
    padding-right: $classMenuChirldPadding;
    overflow-y: auto;
  }

  .classMenuItem {
    width: $classMenuWidth - 1;
    font-size: 16px;
    line-height: 20px;
    padding: 10px 36px 10px $paddingLeft;
    border-bottom: 1px solid $borderColor;
    &:hover {
      background-color: #20A0FF;
      .classMenuText {
        color: #fff;
      }
      .classMenuChirld {
        display: block;
      }
    }
  }

  .classMenuText {
    color: #1F2D3D;
    cursor: pointer;
    position: relative;
    .el-icon-arrow-right {
      position: absolute;
      top: 1px;
      right: -20px;
    }
  }

  .classMenuChirld {
    width: $classMenuChirldWidth;
    height: $classMenuChirldHeight + $classMenuNameHeight + 4;
    padding: $classMenuChirldPadding;
    border: 1px solid $borderColor;
    background-color: #fff;
    position: absolute;
    right: -$classMenuChirldWidth + 1;
    top: 0;
    display: none;
  }

  .classMenuChirldTitle {
    padding-left: $classMenuChirldTitlePadding;
    background: url(~@/assets/ambuf/css/videoStudy/images/childrenIcon.png) 8px 1px no-repeat;
    p {
      padding-bottom: 10px;
      border-bottom: 1px solid $borderColor;
    }
  }

  .classMenuChirldBox {
    position: absolute;
    top: 43px;
    right: 0;
    bottom: 0;
    left: $classMenuChirldTitlePadding;
    overflow-y: auto;
  }

  .classMenuChirldItem {
    cursor: pointer;
    font-size: 14px;
    height: 20px;
    line-height: 20px;
    margin: 6px 0;
  }

</style>
