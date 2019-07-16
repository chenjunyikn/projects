<!-- html部分 -->
<template>
	<div style="width: 470px;margin: 0px auto;">
		<h1 style="margin: 25px auto;">设备类别</h1>
		<div style="text-align: left;margin-bottom: 20px;">
			<el-input style='width: 200px;margin-right: 10px;' v-model="typename" placeholder="请输入类别名称"></el-input>
			<el-button @click='search'>查询</el-button>
			<el-button :disabled="ispower" @click='add'>增加</el-button>
		</div>
		<el-table :data="list" style="width: 370px;">
			<el-table-column align='center' prop="typeid" label="类别ID" width='100'></el-table-column>
			<el-table-column align='center' prop="typename" label="类别名称" width='120'></el-table-column>
			<el-table-column align='center' label="操作" width='150'>
				<template slot-scope="scope">
					<el-button :disabled="ispower" size='small' type="text" @click='edit(scope.row)'>编辑</el-button>
					<el-button :disabled="ispower" size='small' type="text" @click="del(scope.row.typeid)">删除</el-button>
				</template>
			</el-table-column>
		</el-table>
	</div>
</template>
<!-- js部分 -->
<script>
	export default {
		data() {
			return {
				typename: '',
				list: [],
				ispower: true
			};
		},
		methods: {
			add() {
				//路由跳转
				this.$router.push({
					path: '/DevtypeAdd'
				});
			},
			del(typeid) {
				// 后端网址
				var url = this.baseUrl + "/baseDevtype/delete"
				// 传递给后端的数据
				var data = {
					typeid: typeid
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
					name: 'DevtypeEdit',
					params: {
						row: row
					}
				});
			},
			search() {
				// 后端网址
				var url = this.baseUrl + "/baseDevtype/search"
				// 传递给后端的数据
				var data = {
					typename: this.typename
				};
				this.$axios.post(url, this.$qs.stringify(data), {
					headers: {
						'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
					}
				}).then(res => {
					this.list = res.data;
				})
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
