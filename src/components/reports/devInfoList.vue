<!-- html部分 -->
<template>
	<div style="width: 480px;margin: 0px auto;">
		<h1 style="margin: 25px auto;">成本核算信息</h1>
		<div style="text-align: left;margin-bottom: 20px;">
			年份：<el-date-picker v-model="value" type="year" value-format='yyyy' placeholder="请选择年份" style='width:200px;margin-right: 10px;'></el-date-picker>
			<el-button @click='search'>查询</el-button>
		</div>
		<el-table :data="list" style="width: 480px;margin-bottom: 30px;">
			<el-table-column align='center' prop="devname" label="设备名称" width='120'></el-table-column>
			<el-table-column align='center' prop="amount" label="作业量" width='120'></el-table-column>
			<el-table-column align='center' prop="consume" label="能耗(折标煤)" width='140'></el-table-column>
			<el-table-column align='center' prop="cost" label="维修成本" width='100'></el-table-column>
		</el-table>
		<el-pagination v-show="ispagehide" background layout="prev, pager, next" :page-size="pageSize" :total="total" :current-page.sync="currentPage" @current-change='currentChange()'></el-pagination>
	</div>
</template>
<!-- js部分 -->
<script>
	export default {
		data() {
			return {
				value:'2018',
				currentPage:1,//默认开始页面
				pageSize:6,//每页的数据条数
				total:0,//默认数据总数
				ispagehide:true,
				list:[]
			};
		},
		methods:{
			search(){
				// 后端网址
				var url = this.baseUrl+"/devInfo/costByPage"
				// 传递给后端的数据
				var data = {year:this.value,currentPage:this.currentPage,pageSize:this.pageSize};
				this.$axios.post(url,this.$qs.stringify(data),{
					headers: {
						'Content-Type':'application/x-www-form-urlencoded; charset=UTF-8'
					}
				}).then(res=>{
					this.currentPage=res.data.paging.currentPage;
					this.pageSize=res.data.paging.pageSize;
					this.total=res.data.paging.total;
					this.list=res.data.tableData;
					this.ispagehide = this.total>this.pageSize;
				})
			},
			currentChange(){
				this.search();
			}
		},
		mounted:function(){
			this.search();
		}
	}
</script>
<!-- css部分 -->
<style>
	
</style>
