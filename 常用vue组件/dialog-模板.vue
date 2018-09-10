<template>
  <div class="demo-dialog">
    <el-dialog
      title="分配案件"
      :visible.sync="dialogVisible"
      width="580px"
      @close="handleClose"
			ref="dialog"
    >
      <div class="m-conetnt">
        <el-form ref="ruleForm" :model="ruleForm" :rules="rules" label-width="100px">
          
					<el-form-item label="辅导费" prop="demo">
						<el-input style="width:400px;" v-model.trim="ruleForm.demo" placeholder="请输入"></el-input>
					</el-form-item>

					<el-form-item label="账龄" prop="accountPeriodType">
            <el-select clearable style="width:200px;" v-model="ruleForm.accountPeriodType" placeholder="请选择账龄">
              <el-option :label="item.label" :value="item.value" v-for="(item,index) in productOptions" :key="index"></el-option>
            </el-select>
          </el-form-item>

					<el-form-item label="时间" prop="time">
						<el-date-picker 
							type="date" style="width:144px;" 
							v-model="ruleForm.time"
							value-format="yyyy-MM-dd"
						>
						</el-date-picker>
					</el-form-item>

        </el-form>
      </div>

      <span slot="footer" class="dialog-footer">
        <el-button :disabled="submitDisabled" type="primary" @click="handleSubmit">确 定</el-button>
        <el-button @click="dialogVisible = false">取 消</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        dialogVisible : false,
        // 提交按钮禁用状态
        submitDisabled : false,

        ruleForm : {

        },
        rules : {
          demo : [
            {required : true , message : '请选择互金企业' , trigger : 'change'},
          ],
        },

        // 产品 options
        productOptions : [
          {label : '产品1' , value : '产品1'}
        ],
      }
    },
    mounted() {

    },
    methods : {
      show(type,data) {
				this.dialogVisible = true;
				// dialog 返回顶部
        this.$nextTick(() => {
          this.$refs.dialog.$el.scrollTop = 0;
        });
      },

      // 关闭浮层
      handleClose() {
        this.dialogVisible = false;
        // 取消按钮禁用
        setTimeout(() => {
          this.submitDisabled = false;
				},500);
				// 重置表单数据
        this.$refs.ruleForm.resetFields();
      },
      // 点击提交
      handleSubmit(submitType) {
        this.$refs.ruleForm.validate((valid) => {
          if(valid) {
						// 提交数据
						this.submitDisabled = true;
						this.$http({
              method : 'post',
              url : '/preCaseLib/distributeCaseByDistributeCaseQuery.htm',
              data : data,
            }).then((res) => {
              this.$message.success('分配成功');
            }).catch(() => {
              this.submitDisabled = false;
            });
          }
        });
      },
    },
  }
</script>

<style scoped lang="scss">

.demo-dialog{

}

</style>
