<template>
  <div
    class="ac-dropdown-item"
    :class="{'ac-dropdown-item-active' : itemVisible === true}"
    @click="handleItem"
  >
    <template v-if="title">
      <div class="item-title">
        {{title}}
        <i class="arrow" :class="{'arrow-down' : itemVisible === true}"></i>
      </div>
    </template>
    <template v-else>
      <slot></slot>
    </template>

    <div
      class="popup-wrap ani"
      :class="[itemVisible === true ? 'scaleY1' : 'scaleY0']"
      @click.stop="() => {}"
    >
      <template v-if="option.length > 0">
        <div
          v-for="(item, index) in option"
          :key="index"
          class="ac-cell"
          :class="{'ac-cell-active' : item.value === cellActiveIndex}"
          @click="handleCell(item.value)"
        >{{item.text}}</div>
      </template>
      <template v-else>
        <slot name="popup"></slot>
      </template>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    option: {
      type: Array,
      default: () => []
    },
    title: {
      type: String,
      default: ""
    },
    value: {}
  },
  data() {
    return {
      // 展开状态
      itemVisible: false,
      // 菜单选中状态
      cellActiveIndex: ""
    };
  },
  watch: {
    value: {
      handler(val) {
        if (val !== void 0) {
          this.cellActiveIndex = val;
        }
      },
      immediate: true
    }
  },
  methods: {
    close() {
      this.$parent.overlayHide();
      this.itemVisible = false;
    },
    handleItem() {
      // 改变当前点击的显影状态
      this.$parent.$children.map((v, k) => {
        if (this === v) {
          if (this.itemVisible === false) {
            this.$parent.overlayShow();
            this.itemVisible = true;
            this.$parent.index = k;
          } else {
            this.close();
          }
        } else {
          v.itemVisible = false;
        }
      });
    },
    handleCell(val) {
      this.$emit("input", val);
      this.close();
    }
  }
};
</script>

<style lang="less" scoped>
.ac-dropdown-item {
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  .popup-wrap {
    position: absolute;
    top: 100%;
    left: 0;
    z-index: 51;
    background-color: #fff;
    width: 100%;
  }
  &.ac-dropdown-item-active {
    .item-title {
      color: #1989fa;
    }
  }
  .arrow {
    display: inline-block;
    vertical-align: middle;
    margin-top: -5px;
    margin-left: 10px;
    border: 3px solid;
    border-color: transparent transparent currentColor currentColor;
    -webkit-transform: rotate(-45deg);
    transform: rotate(-45deg);
    opacity: 0.8;
  }
  .arrow-down {
    margin-top: -1px;
    -webkit-transform: rotate(135deg);
    transform: rotate(135deg);
  }
  .ac-cell {
    padding: 10px 16px;
  }
  .ac-cell-active {
    color: #1989fa;
  }

  /* 动画 */
  .ani {
    transition-timing-function: ease-out;
    transition-duration: 0.2s;
    transform-origin: center top;
  }
  .scaleY1 {
    transform: scaleY(1);
  }
  .scaleY0 {
    transform: scaleY(0);
  }
}

/* 1px 解决方案 */
.ac-cell {
  position: relative;
}
.ac-cell::after {
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