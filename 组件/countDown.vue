<template>
  <div>
    <slot
      v-if="hours !== null" 
      :hours="hours < 10 ? '0' + hours : hours" 
      :minutes="minutes < 10 ? '0' + minutes : minutes" 
      :seconds="seconds < 10 ? '0' + seconds : seconds" 
    ></slot>
  </div>
</template>

<script>
  /* 
    <countDown :time="10000">
      <template v-slot="timeData">
        {{ timeData.hours }}&thinsp;:&thinsp;{{ timeData.minutes }}&thinsp;:&thinsp;{{ timeData.seconds }}
      </template>
    </countDown>
  */
  export default {
    props: {
      // 单位：秒
      time: {
        type: Number,
      },
    },
    data() {
      return {
        hours: null,
        minutes: '',
        seconds: '',

        timerId: '',
      }
    },
    watch: {
      time: {
        handler() {
          this.stop();
          this.countDown(this.time < 0 ? 0 : this.time);
        },
        immediate: true,
      },
    },
    methods: {
      countDown(t) {
        let computeTime = (time) => {
          this.hours = time >= 3600 ? Math.floor(time / 3600) : 0;
          this.minutes = time - this.hours * 3600 >= 60 ? Math.floor((time - this.hours * 3600) / 60) : 0;
          this.seconds = time - this.hours * 3600 - this.minutes * 60 || 0;
        }
        let time = t || this.hours * 3600 + this.minutes * 60 + this.seconds;
        computeTime(time);
        
        this.timerId = window.setInterval(() => {
          if (this.hours === 0 && this.minutes === 0 && this.seconds === 0) {
            window.clearInterval(this.timerId);
            return;
          }
          time -= 1;
          computeTime(time);
        }, 1000)
      },
      start() {
        this.stop();
        this.countDown();
      },
      stop() {
        this.timerId && window.clearInterval(this.timerId);
      },
    },
  }
</script>

<style lang="scss" scoped>

</style>