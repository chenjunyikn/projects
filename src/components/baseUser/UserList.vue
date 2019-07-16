<!-- html部分 -->
<template>
	<div style="width: 870px;margin: 0px auto;">
		<h1 style="margin: 25px auto;">人员信息</h1>
		<div style="text-align: left;margin-bottom: 20px;">
			<el-input style='width: 200px;' v-model="cname" placeholder="请输入姓名"></el-input>
			<el-input style='width: 200px;margin-right: 10px;' v-model="username" placeholder="请输入用户名"></el-input>
			<el-button @click='search'>查询</el-button>
			<el-button @click='add'>增加</el-button>
		</div>
		<el-table :data="list" style='width: 870px;margin-bottom: 30px;'>
			<el-table-column align='center' prop="userid" label="用户ID" width='70'></el-table-column>
			<el-table-column align='center' prop="cname" label="姓名" width='80'></el-table-column>
			<el-table-column align='center' prop="username" label="用户名" width='80'></el-table-column>
			<el-table-column align='center' prop="password" label="密码" width='80'></el-table-column>
			<el-table-column align='center' prop="telno" label="手机号" width='120'></el-table-column>
			<el-table-column align='center' prop="email" label="邮箱" width='180'></el-table-column>
			<el-table-column align='center' prop="sex" label="性别" width='80'></el-table-column>
			<el-table-column align='center' prop="baseCompany.compname" label="所属企业" width='80'></el-table-column>
			<el-table-column align='center' label="操作" width='100'>
				<template slot-scope="scope">
					<el-button :disabled="baseUser.compid==0?false:baseUser.userid==scope.row.userid?false:true" size='small' type="text" @click='edit(scope.row)'>编辑</el-button>
					<el-button :disabled="ispower" size='small' type="text" @click="del(scope.row.userid)">删除</el-button>
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
				compid: '',
				cname: '',
				username: '',
				list: [],
				currentPage: 1, //默认开始页面
				pageSize: 6, //每页的数据条数
				total: 0, //默认数据总数
				ispagehide:true,
				ispower: true,
				baseUser: {}
			};
		},
		methods: {
			add() {
				//路由跳转
				this.$router.push({
					path: '/UserAdd'
				});
			},
			del(userid) {
				// 后端网址
				var url = this.baseUrl + "/baseUser/delete"
				// 传递给后端的数据
				var data = {
					userid: userid
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
					name: 'UserEdit',
					params: {
						row: row.userid
					}
				});
			},
			search() {
				// 后端网址
				var url = this.baseUrl + "/baseUser/searchByPage"
				// 传递给后端的数据
				var data = {
					compid: this.compid,
					username: this.username,
					cname: this.cname,
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
			setPower() {
				// 后端网址
				var url = this.baseUrl + "/baseUser/getUserInfo"
				this.$axios.post(url,{
					headers: {
						'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
					}
				}).then(res => {
					this.baseUser = res.data;
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
