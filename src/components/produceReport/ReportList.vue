<!-- html部分 -->
<template>
	<div style="width: 1210px;margin: 0px auto;">
		<h1 style="margin: 25px auto;">报岗</h1>
		<div style="text-align: left;margin-bottom: 20px;">
			<el-input style='width: 200px;' v-model="reportuser" placeholder="请输入报岗人"></el-input>
			<el-select style='width: 200px;margin-right: 10px;' v-model="compid" clearable placeholder="请选择所属企业">
				<el-option v-for='obj in compArr' :key="obj.compid" :label='obj.compname' :value='obj.compid'></el-option>
			</el-select>
			<el-button @click='search'>查询</el-button>
			<el-button @click='add'>增加</el-button>
		</div>
		<el-table :data="list" style='width: 1210px;margin-bottom: 30px;'>
			<el-table-column align='center' prop="reportid" label="报岗ID" width='70'></el-table-column>
			<el-table-column align='center' prop="shipname" label="船队名称" width='100'></el-table-column>
			<el-table-column align='center' prop="capacity" label="装载量(吨)" width='100'></el-table-column>
			<el-table-column align='center' prop="planjobtime" label="预计到港时间" width='180'></el-table-column>
			<el-table-column align='center' prop="startjobtime" label="实际到港时间" width='180'></el-table-column>
			<el-table-column align='center' prop="completetime" label="完成时间" width='180'></el-table-column>
			<el-table-column align='center' prop="flowname" label="流程" width='100'></el-table-column>
			<el-table-column align='center' prop="reportuser" label="报岗人" width='100'></el-table-column>
			<el-table-column align='center' prop="compname" label="所属企业" width='100'></el-table-column>
			<el-table-column align='center' label="操作" width='100'>
				<template slot-scope="scope">
					<el-button :disabled="ispower" size='small' type="text" @click='edit(scope.row)'>编辑</el-button>
					<el-button :disabled="ispower" size='small' type="text" @click="del(scope.row.reportid)">删除</el-button>
				</template>
			</el-table-column>
		</el-table>
		<el-pagination v-show="ispagehide" background layout="prev, pager, next" :page-size="pageSize" :total="total" :current-page.sync="currentPage" @current-change='currentChange()'></el-pagination>
	</div>
</template>
<!-- js部分 -->
<script>
	export default {
		data() {
			return {
				reportuser:'',
				currentPage:1,//默认开始页面
				pageSize:6,//每页的数据条数
				total:0,//默认数据总数
				ispagehide:true,
				list:[],
				compid:'',
				compArr:[],
				ispower: true
			};
		},
		methods:{
			add(){
				//路由跳转
				this.$router.push({path:'/ReportAdd'});
			},
			del(reportid){
				// 后端网址
				var url = this.baseUrl+"/produceReport/delete"
				// 传递给后端的数据
				var data = {reportid:reportid};
				this.$axios.post(url,this.$qs.stringify(data),{
					headers: {
						'Content-Type':'application/x-www-form-urlencoded; charset=UTF-8'
					}
				}).then(res=>{
					// res是后端的响应
					this.$message("删除成功");
					this.search();
				})
			},
			edit(row){
				//路由跳转
				this.$router.push({name:'ReportEdit',params:{row:row.reportid}});
			},
			search(){
				// 后端网址
				var url = this.baseUrl+"/produceReport/searchByPage"
				// 传递给后端的数据
				var data = {reportuser:this.reportuser,compid:this.compid,currentPage:this.currentPage,pageSize:this.pageSize};
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
			setPower() {
				// 后端网址
				var url = this.baseUrl + "/baseUser/getUserInfo"
				this.$axios.post(url, {
					headers: {
						'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
					}
				}).then(res => {
					if (res.data != null && res.data.compid == 0) {
						this.ispower = false;
					}
				})
			}
		},
		mounted:function(){
			this.search();
			this.setPower();
			// 后端网址
			var url = this.baseUrl+"/baseCompany/list"
			this.$axios.post(url,{
				headers: {
					'Content-Type':'application/x-www-form-urlencoded; charset=UTF-8'
				}
			}).then(res=>{
				this.compArr = res.data;
			})
		}
	}
</script>
<!-- css部分 -->
<style>
	
</style>
