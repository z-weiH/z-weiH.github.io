// 解决点透 通用方法
/**
 *
 * @param {*} scrollElement 滚动元素默认body
 * @param {*} keepScroll 是否需要记录滚动状态
 * @param {*} bodyCls 添加的className
 */
export default function(
  scrollElement,
  keepScroll = true,
  bodyCls = "dialog-open"
) {
  // scrollWrap 滚动容器，默认为html
  let scrollTop, scrollWrap;
  if (scrollElement === void 0) {
    scrollElement = document.body;
    scrollWrap = document.scrollingElement;
  } else {
    scrollWrap = scrollElement;
  }
  return {
    open: function() {
      scrollTop = scrollWrap.scrollTop;
      scrollElement.classList.add(bodyCls);
      if (keepScroll === true) {
        scrollElement.style.top = -scrollTop + "px";
      }
    },
    close: function() {
      scrollElement.classList.remove(bodyCls);
      // scrollTop lost after set position:fixed, restore it back.
      if (keepScroll === true) {
        scrollWrap.scrollTop = scrollTop;
      }
    }
  };
}

/*
  <style lang="scss">
  .dialog-open {
    position: fixed;
    overflow: hidden;
  }
  </style>
*/
