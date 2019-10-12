<template>
  <div class="popup-wrap" v-show="visible">
    <div
      @click="handleMaskClick"
      class="mask popup-ani"
      :class="[changeStatus ? 'opacity0' : 'opacity1']"
    ></div>
    <div
      class="content popup-ani"
      :class="[
        changeStatus ? `position-${position}-ani` : '',
        `position-${position}`,
      ]"
    >
      <slot></slot>
    </div>
  </div>
</template>

<script>
import ModalHelper2 from "./ModalHelper2.js";
export default {
  props: {
    visible: {
      type: Boolean
    },
    position: {
      type: String,
      default: "bottom"
    },
    "close-on-click-overlay": {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      // 用于动画渐变
      changeStatus: !this.visible,
      ModalHelper: ModalHelper2()
    };
  },
  watch: {
    visible(val) {
      window.setTimeout(() => {
        this.changeStatus = !val;
      }, 300);
      if (val === true) {
        this.ModalHelper.open();
      } else {
        this.ModalHelper.close();
      }
    }
  },
  methods: {
    close() {
      this.changeStatus = this.visible;
      window.setTimeout(() => {
        this.$emit("update:visible", false);
      }, 300);
    },
    handleMaskClick() {
      if (this.closeOnClickOverlay === false) {
        return;
      } else {
        this.close();
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.popup-wrap {
  .mask {
    position: fixed;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.7);
    width: 100%;
    height: 100%;
    z-index: 100;
  }
  .content {
    position: fixed;
    background-color: #fff;
    overflow: auto;
    z-index:101;
  }
  .popup-ani {
    transition-timing-function: ease-out;
    transition-duration: 0.3s;
  }
  .opacity0 {
    opacity: 0;
  }
  .opacity1 {
    opacity: 1;
  }

  .position-bottom {
    bottom: 0;
    left: 0;
    right: 0;
  }
  .position-bottom-ani {
    transform: translateY(100%);
  }
  .position-right {
    right: 0;
    top: 0;
    bottom: 0;
  }
  .position-right-ani {
    transform: translateX(100%);
  }
  .position-top {
    top: 0;
    left: 0;
    right: 0;
  }
  .position-top-ani {
    transform: translateY(-100%);
  }
  .position-left {
    left: 0;
    top: 0;
    bottom: 0;
  }
  .position-left-ani {
    transform: translateX(-100%);
  }
}
</style>