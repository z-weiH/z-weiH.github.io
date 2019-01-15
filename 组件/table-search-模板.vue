<template>
	<div class="demo-box">
		<div class="item-search">
      <el-form :inline="true" ref="ruleForm" :model="ruleForm" label-width="0px">
        <el-form-item label=" " prop="keyWords">
          <el-input v-model.trim="ruleForm.keyWords" placeholder="请输入"></el-input>
        </el-form-item>

        <el-form-item label=" " prop="accountAge">
          <el-select clearable v-model="ruleForm.accountAge" placeholder="请选择账龄">
            <el-option label="1~30天" value="M1"></el-option>
            <el-option label="31~60天" value="M2"></el-option>
          </el-select>
        </el-form-item>

				<timeFrame
          :startDate.sync="ruleForm.startDate"
          :endDate.sync="ruleForm.endDate"
          startPlaceholder="预审开始"
          endPlaceholder="预审结束"
        >
        </timeFrame>

        <el-button @click="handleSearch" type="warning">查询</el-button>
      </el-form>
    </div>

		<div class="item-table">
      <el-table
        :data="tableData"
        border
      >
        <el-table-column prop="date" label="序号" width="50px">
          <template slot-scope="scope">
            {{scope.$index + 1}}
          </template>
        </el-table-column>
				<el-table-column prop="respondents" label="被申请人"></el-table-column>
        <el-table-column prop="platName" label="互金企业" align="center">
          <template slot-scope="scope">
            <el-tooltip :content="scope.row.platName" placement="top-start">
              <span class="ellipsis" style="max-width:130px;">{{scope.row.platName}}</span>
            </el-tooltip>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页 -->
      <el-pagination
        class="mt-10 mb-10"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[10, 20, 30, 40]"
        :page-size="10"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total">
      </el-pagination>

    </div>
	</div>
</template>

<script>
	import timeFrame from '@/components/timeFrame.vue'
	export default {
		components : {
			timeFrame,
		},
		data() {
			return {
				ruleForm : {
					// 关键字
					keyWords : '',
					// 开始时间
					startDate : '',
					// 结束时间
					endDate : '',
				},
				rules : {},

				// 表格数据
        tableData : [],
        // 数据总数
        total : 11,
        // 当前页数
        currentPage : 1,
        // 每页数量
				pageSize : 10,
				
			}
    },
    mounted() {
      this.initTableList();
    },
		methods : {
			// 点击搜索
			handleSearch() {
				this.currentPage = 1;
        this.initTableList();
			},

			// 表格相关 start

      // 初始化 表格数据
      initTableList() {
        return this.$http({
          url : '/preCaseLib/queryCaseListByCondition.htm',
          method : 'post',
          data : {
            pageSize : this.pageSize,
            currentNum : this.currentPage,

            ...this.ruleForm,
          },
        }).then((res) => {
          this.total = res.result.count;
          this.tableData = res.result.list;
        });
      },
      // 页数 change
      handleSizeChange(val) {
        this.pageSize = val;
        this.currentPage = 1;
        this.initTableList();
      },
      // 分页 change
      handleCurrentChange(val) {
        this.currentPage = val; 
        this.initTableList();
      },

      // 表格相关 end
		},
	}
</script>

<style lang="scss" scoped>

.demo-box{
	
}

</style>

<style lang="scss">

.demo-box{
  .item-search{
    .el-form-item{
      margin-bottom: 0;
    }
  }
}

</style>