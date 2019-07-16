<!-- html部分 -->
<template>
	<div style="width: 730px;margin: 0px auto;">
		<h1 style="margin: 25px auto;">流程信息</h1>
		<div style="text-align: left;margin-bottom: 20px;">
			<el-input style='width: 200px;margin-right: 10px;' v-model="flowname" placeholder="请输入流程名称"></el-input>
			<el-button @click='search'>查询</el-button>
			<el-button @click='add'>增加</el-button>
			<el-button @click='exportToExcel'>导出</el-button>
		</div>
		<el-table :data="list" style="width: 730px;margin-bottom: 30px;">
			<el-table-column align='center' prop="flowid" label="流程ID" width='70'></el-table-column>
			<el-table-column align='center' prop="flowname" label="流程名称" width='100'></el-table-column>
			<el-table-column align='center' prop="dljname" label="斗轮机" width='120'></el-table-column>
			<el-table-column align='center' prop="zcjname" label="装船机" width='120'></el-table-column>
			<el-table-column align='center' prop="pdjname" label="皮带机" width='120'></el-table-column>
			<el-table-column align='center' prop="compname" label="所属企业" width='100'></el-table-column>
			<el-table-column align='center' label="操作" width='100'>
				<template slot-scope="scope">
					<el-button :disabled="ispower" size='small' type="text" @click='edit(scope.row)'>编辑</el-button>
					<el-button :disabled="ispower" size='small' type="text" @click="del(scope.row.flowid)">删除</el-button>
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
				flowname: '',
				currentPage: 1, //默认开始页面
				pageSize: 6, //每页的数据条数
				total: 0, //默认数据总数
				ispagehide:true,
				list: [],
				ispower: true
			};
		},
		methods: {
			add() {
				//路由跳转
				this.$router.push({
					path: '/FlowAdd'
				});
			},
			del(flowid) {
				// 后端网址
				var url = this.baseUrl + "/baseFlow/delete"
				// 传递给后端的数据
				var data = {
					flowid: flowid
				};
				this.$axios.post(url, this.$qs.stringify(data), {
					headers: {
						'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
					}
				}).then(res => {
					// res是后端的响应
					this.$message("删除成功");
					this.search();
				})
			},
			edit(row) {
				//路由跳转
				this.$router.push({
					name: 'FlowEdit',
					params: {
						row: row.flowid
					}
				});
			},
			search() {
				// 后端网址
				var url = this.baseUrl + "/baseFlow/searchByPage"
				// 传递给后端的数据
				var data = {
					flowname: this.flowname,
					currentPage: this.currentPage,
					pageSize: this.pageSize
				};
				this.$axios.post(url, this.$qs.stringify(data), {
					headers: {
						'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
					}
				}).then(res => {
					this.currentPage = res.data.paging.currentPage;
					this.pageSize = res.data.paging.pageSize;
					this.total = res.data.paging.total;
					this.list = res.data.tableData;
					this.ispagehide = this.total>this.pageSize;
				})
			},
			currentChange() {
				this.search();
			},
			exportToExcel() {
				location.href = this.baseUrl + "/baseFlow/exportToExcel?flowname=" + this.flowname;
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
		mounted: function() {
			this.search();
			this.setPower();
		}
	}
</script>
<!-- css部分 -->
<style>

</style>
