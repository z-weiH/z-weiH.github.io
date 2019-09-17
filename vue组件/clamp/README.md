
## 解决移动端多行省略问题，还可以实现...查看更多问题

## 依赖clamp库

## 存在的问题：

  1. 文字样式最好设置line-height属性，不然clamp会不准
  2. truncationChar是设置元素末尾的字符 可以通过设置 &#8197; 来去除
  3. 空格相关文章  https://blog.csdn.net/lendq/article/details/78556079

## 使用：

  <clamp :text="'我是文字内容'"></clamp>