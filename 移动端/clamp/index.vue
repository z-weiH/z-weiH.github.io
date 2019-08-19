<template>
  <div class="clamp-wrap" ref="content">
    {{text}}
  </div>
</template>

<script>
  import clamp from './clamp'
  export default {
    props : {
      clamp : {
        type : Number,
        default : 3,
      },
      text : '',
      truncationHTML : {
        type : String,
        default : '<span class="clamp-spot">...</span>查看更多',
      },
    },
    data() {
      return {
        random : (Math.random() + '').slice(2,10),
      }
    },
    watch : {
      text() {
        this.init();
      },
    },
    mounted() {
      this.$nextTick(() => {
        this.init();
      });
    },
    methods : {
      init() {
        clamp(this.$refs.content, {
          clamp : this.clamp,
          useNativeClamp: false,
          truncationChar: '&#8197;',
          truncationHTML: `<span class="clamp-more ${'clamp-more' + this.random}">${this.truncationHTML}</span>`
        });
        document.querySelector(`.clamp-more${this.random}`).addEventListener('click', () => {
          this.$refs.content.innerHTML = this.text;
        });
      },
    },
  }
</script>

<style lang="less">

.clamp-wrap{
  .clamp-spot{

  }
}

</style>