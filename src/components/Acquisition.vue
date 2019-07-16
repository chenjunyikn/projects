<!-- html部分 -->
<template>
	<div style="width: 680px;margin: 0px auto;">
		<h1 style="margin: 25px auto;">数据采集</h1>
		<div style="text-align: left;margin-bottom: 20px;">
			<el-button @click='kettle'>数据同步</el-button>
		</div>
		<el-table :data="list" style='width: 680px;margin-bottom: 30px;'>
			<el-table-column align='center' prop="synchroId" label="ID" width='70'></el-table-column>
			<el-table-column align='center' prop="synchroTb" label="同步表名" width='150'></el-table-column>
			<el-table-column align='center' prop="synchroRows" label="同步数据条数" width='150'></el-table-column>
			<el-table-column align='center' prop="synchroDate" label="同步时间" width='180'></el-table-column>
			<el-table-column align='center' prop="cname" label="同步人" width='130'></el-table-column>
		</el-table>
		<el-pagination v-show="ispagehide" background layout="prev, pager, next" :page-size="pageSize" :total="total" :current-page.sync="currentPage" @current-change='currentChange()'></el-pagination>
	</div>
</template>
<!-- js部分 -->
<script>
	export default {
		data() {
			return {
				synchroTb:'',
				synchroRows:'',
				synchroDate:'',
				synchroUser:'',
				currentPage:1,//默认开始页面
				pageSize:6,//每页的数据条数
				total:0,//默认数据总数
				ispagehide:true,
				list:[],
				compid:'',
				compArr:[]
			};
		},
		methods:{
			search(){
				// 后端网址
				var url = this.baseUrl+"/synchro/searchByPage"
				// 传递给后端的数据
				var data = {synchroTb:this.synchroTb,synchroRows:this.synchroRows,synchroDate:this.synchroDate,synchroUser:this.synchroUser,currentPage:this.currentPage,pageSize:this.pageSize};
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
			},
			kettle(){
				// 后端网址
				var url = this.baseUrl+"/synchro/kettleSynchro"
				// 传递给后端的数据
				var data = {synchroTb:this.synchroTb,synchroRows:this.synchroRows,synchroDate:this.synchroDate,synchroUser:this.synchroUser,currentPage:this.currentPage,pageSize:this.pageSize};
				this.$axios.post(url,this.$qs.stringify(data),{
					headers: {
						'Content-Type':'application/x-www-form-urlencoded; charset=UTF-8'
					}
				}).then(res=>{
					this.list=res.data.tableData;
					this.$message("同步成功");
				})
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
