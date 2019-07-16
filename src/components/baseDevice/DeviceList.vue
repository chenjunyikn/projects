<!-- html部分 -->
<template>
	<div style="width: 740px;margin: 0px auto;">
		<h1 style="margin: 25px auto;">设备信息</h1>
		<div style="text-align: left;margin-bottom: 20px;">
			<el-input style='width: 200px;' v-model="devname" placeholder="请输入设备名称"></el-input>
			<el-input style='width: 200px;margin-right: 10px;' v-model="devuser" placeholder="请输入责任人"></el-input>
			<el-button @click='search'>查询</el-button>
			<el-button @click='add'>增加</el-button>
			<el-button @click='exportToExcel'>导出</el-button>
		</div>
		<el-table :data="list" style="width: 740px;margin-bottom: 30px;">
			<el-table-column align='center' prop="devid" label="设备ID" width='70'></el-table-column>
			<el-table-column align='center' prop="devname" label="设备名称" width='120'></el-table-column>
			<el-table-column align='center' prop="baseDevtype.typename" label="设备类别" width='100'></el-table-column>
			<el-table-column align='center' prop="devdate" label="投入时间" width='100'></el-table-column>
			<el-table-column align='center' prop="devuser" label="责任人" width='80'></el-table-column>
			<el-table-column align='center' prop="baseCompany.compname" label="所属企业" width='100'></el-table-column>
			<el-table-column align='center' prop="weight" label="权重" width='70'></el-table-column>
			<el-table-column align='center' label="操作" width='100'>
				<template slot-scope="scope">
					<el-button :disabled="ispower" size='small' type="text" @click='edit(scope.row)'>编辑</el-button>
					<el-button :disabled="ispower" size='small' type="text" @click="del(scope.row.devid)">删除</el-button>
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
				devname: '',
				devuser: '',
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
					path: '/DeviceAdd'
				});
			},
			del(devid) {
				// 后端网址
				var url = this.baseUrl + "/baseDevice/delete"
				// 传递给后端的数据
				var data = {
					devid: devid
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
					name: 'DeviceEdit',
					params: {
						row: row.devid
					}
				});
			},
			search() {
				// 后端网址
				var url = this.baseUrl + "/baseDevice/searchByPage"
				// 传递给后端的数据
				var data = {
					devname: this.devname,
					devuser: this.devuser,
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
				location.href = this.baseUrl + "/baseDevice/exportToExcel?devname=" + this.devname + "&devuser=" + this.devuser;
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
