<!-- html部分 -->
<template>
	<div style="width: 815px;margin: 0px auto;">
		<h1 style="margin: 25px auto;">作业信息</h1>
		<div style="text-align: left;margin-bottom: 20px;">
			<el-select style='width: 200px;margin-right: 10px;' v-model="devid" clearable placeholder="请选择设备名称">
				<el-option v-for='obj in devArr' :key="obj.devid" :label='obj.devname' :value='obj.devid'></el-option>
			</el-select>
			<el-button @click='search'>查询</el-button>
		</div>
		<el-table :data="list" style='width: 815px;margin-bottom: 30px;'>
			<el-table-column align='center' prop="jobid" label="作业信息ID" width='95'></el-table-column>
			<el-table-column align='center' prop="devname" label="设备名称" width='120'></el-table-column>
			<el-table-column align='center' prop="starttime" label="开始作业时间" width='180'></el-table-column>
			<el-table-column align='center' prop="completetime" label="结束作业时间" width='180'></el-table-column>
			<el-table-column align='center' prop="duration" label="运行时长" width='80'></el-table-column>
			<el-table-column align='center' prop="amount" label="作业量" width='80'></el-table-column>
			<el-table-column align='center' prop="reportid" label="报岗id" width='80'></el-table-column>
		</el-table>
		<el-pagination v-show="ispagehide" background layout="prev, pager, next" :page-size="pageSize" :total="total" :current-page.sync="currentPage" @current-change='currentChange()'></el-pagination>
	</div>
</template>
<!-- js部分 -->
<script>
	export default {
		data() {
			return {
				devid:'',
				currentPage:1,//默认开始页面
				pageSize:6,//每页的数据条数
				total:0,//默认数据总数
				ispagehide:true,
				list:[],
				devArr:[]
			};
		},
		methods:{
			search(){
				// 后端网址
				var url = this.baseUrl+"/produceJob/searchByPage"
				// 传递给后端的数据
				var data = {devid:this.devid,currentPage:this.currentPage,pageSize:this.pageSize};
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
			// 后端网址
			var url = this.baseUrl+"/baseDevice/list"
			this.$axios.post(url,{
				headers: {
					'Content-Type':'application/x-www-form-urlencoded; charset=UTF-8'
				}
			}).then(res=>{
				this.devArr = res.data;
			})
		}
	}
</script>
<!-- css部分 -->
<style>
	
</style>
