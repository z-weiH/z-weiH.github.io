<template>
  <!-- 绑定所有属性 以及 事件 -->
  <el-upload v-bind="$attrs" v-on="$listeners">
    <!-- 默认插槽 -->
    <slot></slot>
    <!-- 其他任意插槽 例如：trigger,tip -->
    <template v-if="key !== 'default'" :slot="key" v-for="(item,key) in $slots">
      <slot :name="key"></slot>
    </template>
  </el-upload>
</template>

<script>
  export default {
    mounted() {
      console.log(this);
    },
  }
</script>

<style scoped>

</style>