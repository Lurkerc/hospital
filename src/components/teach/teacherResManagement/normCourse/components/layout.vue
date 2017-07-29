<template>
  <!-- 布局基础 -->
  <div class="tvmInfoMain">
    <div class="tvmInfoBox">
      <div class="tvmInfoMenu">
        <slot name="menu"></slot>
      </div>
      <div class="tvmInfoContent">
        <slot></slot>
      </div>
    </div>
    <div class="tvmInfoFooter">
      <slot name="footer"></slot>
    </div>
  </div>
</template>

<script>
  /**
   * 属性 displayfooter 不显示底部
   */
  export default {
    data() {
      return {

      }
    }
  }

</script>

<style lang="scss">
  /* 布局基础 */

  $menuWidth:180px;
  $borderColor:#d1dbe5;
  $padding:16px;
  .tvmInfoMain {
    margin: -$padding;
    &[displayfooter] .tvmInfoFooter {
      display: none;
    }
  }

  .tvmInfoBox {
    width: 100%;
    overflow: hidden;
    position: relative;
    &::before {
      content: ' ';
      width: 1px;
      height: 100%;
      background-color: $borderColor;
      position: absolute;
      left: $menuWidth;
      top: 0;
      bottom: 0;
    }
  }

  .tvmInfoMenu {
    width: $menuWidth;
    float: left;
  }

  .tvmInfoContent {
    padding: $padding;
    float: left;
  }

  .tvmInfoFooter {
    padding: $padding;
    border-top: 1px solid $borderColor;
  }

</style>
