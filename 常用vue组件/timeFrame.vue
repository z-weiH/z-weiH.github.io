<template>
  <div class="time-frame">
    <el-form-item :prop="requiredName[0]"
      :rules="[
        {
          required : required === true ? true : 
                     required === false ? false :
                     required === 'single' ? ( !end && !start ? true : !end ? true : false) : 
                     required.length && required[0] ? required[0] : '', 
          message : required === 'single' ? 
                      (  !end && !start ? `请至少选择一个时间段` : `请输入${startPlaceholder}` ) : 
                      `请输入${startPlaceholder}`, 
          trigger: ['blur', 'change'],
        },
      ]"
    >
      <el-date-picker 
        type="date" style="width:144px;" 
        :placeholder="startPlaceholder" 
        v-model="start"
        :picker-options="pickerOptions1"
        value-format="yyyy-MM-dd"
      >
      </el-date-picker>
    </el-form-item>
    <span v-if="bar" class="mr-10 m-span">-</span>
    <el-form-item :prop="requiredName[1]"
      :rules="[
        {
          required : required === true ? true : 
                     required === false ? false :
                     required === 'single' ? ( !end && !start ? true : !start ? true : false) : 
                     required.length && required[1] ? required[1] : '', 
          message : required === 'single' ? 
                      (  !end && !start ? ` ` : `请输入${endPlaceholder}` ) : 
                      `请输入${endPlaceholder}`, 
          trigger: ['blur', 'change'],
        },
      ]"
    >
      <el-date-picker 
        type="date" style="width:144px;" 
        :placeholder="endPlaceholder" 
        v-model="end"
        :picker-options="pickerOptions2"
        value-format="yyyy-MM-dd"
      >
      </el-date-picker>
    </el-form-item>
  </div>
</template>

<script>
  export default {
    props : {
      /* 开始时间 */
      startDate : {
        required: true,
      },
      /* 结束时间 */
      endDate : {
        required: true,
      },
      startPlaceholder : {
        type : String,
        default : '起始时间',
      },
      endPlaceholder : {
        type : String,
        default : '结束时间',
      },
      // 是否显示 横杠
      bar : {
        type : Boolean,
        default : true,
      },
      // 是否必填 // true 全部必填 ， false 全部不必填 ， single 任意一个必填 , [true,false] 单独设置
      required : {
        default : false,
      },
      // 校验别名 (用于校验字段)
      requiredName : {
        type : Array,
        default : () => {
          return ['startDate','endDate']
        },
      },
    },
    watch : {
      start() {
        this.initTime();
      },
      end() {
        this.initTime2();
      },
      startDate(val) {
        this.start = val;
      },
      endDate(val) {
        this.end = val;
      },
    },
    data() {
      let _this = this;
      return {
        start : this.startDate,
        end : this.endDate,
        pickerOptions1 : {
          disabledDate(time) {
            if(_this.endDate){
              return time.getTime() > + new Date(_this.endDate);
            }
            return false;
          }
        },
        pickerOptions2 : {
          disabledDate(time) {
            if(_this.startDate){
              return time.getTime() < + new Date(_this.startDate) - (1000 * 3600 * 20);
            }
            return false;
          }
        },
      }
    },
    mounted() {},
    methods : {
      initTime() {
        this.$emit('update:startDate',this.start);
      },
      initTime2() {
        this.$emit('update:endDate',this.end);
      },
    },
  }
</script>

<style lang="scss">

.time-frame{
  display: inline-block;
  vertical-align: top;
  .el-form-item{
    vertical-align: middle;
  }
  .m-span{
    display: inline-block;
    vertical-align: top;
    margin-top: 15px;
  }
  .el-form-item.is-error .el-input__inner{
    border-color: #f56c6c!important;
  }
}

</style>