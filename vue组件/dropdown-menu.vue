<template>
  <div class="ac-dropdown-menu ac-box" ref="wrap">
    <div
      class="ac-overlay ani"
      :style="{top: top + 'px'}"
      :class="[visible ? 'opacity1' : 'opacity0']"
      ref="overlay"
      @click="handleClose"
      v-if="showStatus === true"
    ></div>
    <slot></slot>
  </div>
</template>

<script>
import ModalHelper from "./ModalHelper2.js";
export default {
  data() {
    return {
      top: 0,
      visible: false,
      showStatus: false,
      // 当前高亮的 item
      index: 0,
      ModalHelper: ""
    };
  },
  mounted() {
    this.$nextTick(() => {
      this.top = this.$refs.wrap.offsetTop + this.$refs.wrap.clientHeight;
      this.ModalHelper = ModalHelper();
    });
  },
  methods: {
    handleClose() {
      this.overlayHide();
      this.$children[this.index].itemVisible = false;
    },
    overlayShow() {
      this.ModalHelper.open();
      this.showStatus = true;
      window.setTimeout(() => {
        this.visible = true;
      }, 0);
    },
    overlayHide() {
      this.ModalHelper.close();
      this.visible = false;
      window.setTimeout(() => {
        this.showStatus = false;
      }, 200);
    }
  }
};
</script>

<style lang="less" scoped>
.ac-dropdown-menu {
  position: relative;
  display: flex;
  height: 50px;
  background-color: #fff;
  width: 100vw;
  .ac-overlay {
    position: fixed;
    right: 0;
    left: 0;
    bottom: 0;
    overflow: hidden;
    background-color: rgba(0, 0, 0, 0.7);
    z-index: 50;
  }

  /* 动画 */
  .ani {
    transition-timing-function: ease-out;
    transition-duration: 0.2s;
  }
  .opacity0 {
    opacity: 0;
  }
  .opacity1 {
    opacity: 1;
  }
}

/* 1px 解决方案 */
.ac-box {
  position: relative;
}
.ac-box::after {
  position: absolute;
  box-sizing: border-box;
  content: " ";
  pointer-events: none;
  bottom: 0;
  left: 0;
  right: 0;
  border-bottom: 1px solid #ebedf0;
  -webkit-transform: scaleY(0.5);
  transform: scaleY(0.5);
}
</style>