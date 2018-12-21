<template>
  <div class="scroll-y-box">
    <i class="el-icon-caret-left" @mouseup="stop" @mousedown="handleLeft"></i>

    <div class="m-container" :style="{maxWidth : maxWidth + 'px'}">
      <ul :style="{left : position + 'px'}" ref="list" class="m-list">
        <template v-for="(item,index) in moptions">
          <li :class="{active : item.active}" :Key="index" @click="handleClick(item,index)">{{item[label]}}</li>
        </template>
      </ul>
    </div>

    <i class="el-icon-caret-right" @mouseup="stop" @mousedown="handleRight"></i>
  </div>
</template>

<script>
  /*
  <scroll-y @handleClick="handleClick" :options="list" :defaultWidth="500" label="name"></scroll-y>
    this.list = [
      {name : '1-'},
      {name : '2-1'},
      {name : '张三啦啦啦-2'},
      {name : '张三啦啦啦-'},
    ]
  */
  import $ from 'jquery'
  // 深度 copy
  var objDeepCopy = function (source) {
      var sourceCopy = source instanceof Array ? [] : {};
      for (var item in source) {
          sourceCopy[item] = typeof source[item] === 'object' ? objDeepCopy(source[item]) : source[item];
      }
      return sourceCopy;
  }
  export default {
    props : {
      /* 列表数据 */
      options : {
        type : Array,
        default : v => [],
      },
      /* 显示的 width */
      defaultWidth : {
        type : Number,
        default : 500,
      },
      /* 显示名称 对应的字段 */
      label : {
        type : String,
        default : 'name',
      },
    },
    data() {
      return {
        // 容器 width
        width : 0,
        // 容器 最大 width
        maxWidth : 500,
        // 当前位置
        position : 0,
        // 定时器
        timer : '',
        // 组件内 options
        moptions : [],
        // 组件是否能 滚动
        isRoll : true,
      }
    },
    watch : {
      moptions() {
        this.$nextTick(() => {
          // 获得元素 width
          let w = 0;
          $('.m-list li').each((k,v) => {
            w += $(v).width();
          });
          // 判断是否需要滚动
          let isRoll = w > this.maxWidth ? true : false;
          this.isRoll = isRoll;
          if(isRoll === false){
            this.maxWidth = Math.abs(Math.ceil(w) + ( $('.m-list li').length - 1 ) * 20);;
            return;
          }
          // 计算 容器 width
          this.width = Math.abs(Math.ceil(w) - this.maxWidth + ( $('.m-list li').length - 1 ) * 20);
        });
      },
      options() {
        this.$nextTick(() => {
          this.position = 0;
          this.isRoll = true;
          this.maxWidth = this.defaultWidth;
          // 赋值
          this.moptions = objDeepCopy(this.options);
          this.$nextTick(() => {
            // 设置第一个高亮
            this.$set(this.moptions[0],'active',true);
            this.handleClick(this.options[0],0);
          });
        });
      },
    },
    updated() {

    },
    mounted() {
      this.$options.watch.options.call(this);
    },
    methods : {

      stop() {
        clearInterval(this.timer);
      },
      timerFn(type) {
        let step = 15;
        this.timer = setInterval(() => {
          if(!this.isRoll){
            return;
          }

          if(type === 'left'){
            if(Math.abs(this.position) >= this.width){
              return;
            }
            this.position -= step;
          }else{
            if(this.position >= 0){
              return;
            }
            this.position += step;
          }

        },50);
      },
      handleLeft() {
        this.timerFn('right');
      },
      handleRight() {
        this.timerFn('left');
      },
      handleClick(row,index) {
        this.moptions = this.moptions.map((v,k) => {
          let active = k === index ? true : false;
          v.active = active;
          return v;
        });
        let R = {...row};
        delete R.active;
        this.$emit('handleClick',R);
      },
    },
  }
</script>

<style lang="scss" scoped>

.scroll-y-box{
  display: inline-block;
  .m-container{
    overflow: hidden;
    float: left;
  }
  .m-list{
    width: 100vw;
    position: relative;
    overflow: hidden;

    li{
      float: left;
      margin-right: 20px;
      cursor: pointer;
    }
    li:last-child{
      margin-right: 0;
    }
    .active::after{
      content: '';
      width: 100%;
      height: 2px;
      background-color: #13397D;
      display: inline-block;
      position: relative;
      top: -5px;
    }
  }

  .el-icon-caret-left , .el-icon-caret-right{
    font-size: 20px;
    cursor: pointer;
    color: #666;
    float: left;
    margin-top: -3px;

  }
  .el-icon-caret-left{
    margin-right: 5px;
  }
  .el-icon-caret-right{
    margin-left: 5px;
  }
}

</style>
