<template>
  <!-- 布局基础 -->
  <div class="tvmInfoMain" ref="tvmInfoMain">
    <div class="tvmInfoBox" :style="{'height':tvmInfoBoxHeight + 'px'}">
      <div class="tvmInfoMenu">
        <slot name="menu"></slot>
      </div>
      <div class="tvmInfoContent">
        <slot></slot>
      </div>
    </div>
    <div class="tvmInfoFooter" ref="tvmInfoFooter">
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
        tvmInfoBoxHeight: 0,
      }
    },
    methods: {
      setTvmInfoBoxHeight() {
        let main = this.$refs.tvmInfoMain.offsetHeight;
        let footer = this.$refs.tvmInfoFooter.offsetHeight;
        this.tvmInfoBoxHeight = main - footer
      },
    },
    mounted() {
      //页面dom稳定后调用
      this.$nextTick(function () {
        //初始表格高度及分页位置
        this.setTvmInfoBoxHeight();
        //为窗体绑定改变大小事件
        let Event = this.$util.events;
        Event.addHandler(window, "resize", this.setTvmInfoBoxHeight);
      })
    },
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
    height: 100%; // min-height: 500px;
    overflow: hidden;
    position: relative;
    &::before {
      content: ' ';
      width: 1px;
      height: 100%;
      background-color: $borderColor;
      position: absolute;
      left: $menuWidth - 1;
      top: 0;
      bottom: 0;
      z-index: 2;
    }
    &::after {
      content: ' ';
      clear: both;
    }
  }

  .tvmInfoMenu {
    width: $menuWidth; // float: left;
    border-right: 1px solid $borderColor;
    position: absolute;
    left: 0;
    top: 0;
  }

  .tvmInfoContent {
    height: 100%;
    overflow: hidden;
    overflow-y: auto;
    padding: $padding;
    padding-left: $menuWidth; // float: left;
  }

  .tvmInfoFooter {
    padding: $padding;
    border-top: 1px solid $borderColor;
  }

</style>
