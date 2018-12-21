/**
 * 节流函数
 * @param {*} fn 调用方法
 * @param {*} delay 毫秒数
 */
function throttle(fn, delay) {
  var timer = null;
  return function() {
      var context = this,
          args = arguments;
      clearTimeout(timer);
      timer = setTimeout(function() {
          fn.apply(context, args);
      }, delay);
  };
}

