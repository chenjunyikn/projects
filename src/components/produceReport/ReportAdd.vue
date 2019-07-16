<!-- html部分 -->
<template>
	<div>
		<h1 style="margin: 25px auto 50px auto;">报岗添加页面</h1>
		<el-row style='margin-bottom: 20px;'>
			<el-col :span="12"><el-input style='width:45%' v-model='shipname' placeholder='请输入船队名称'></el-input></el-col>
			<el-col :span="12"><el-input style='width:45%' v-model='capacity' placeholder='请输入装载量(吨)'></el-input></el-col>
		</el-row>
		<el-row style='margin-bottom: 20px;'>
			<el-col :span="12"><el-date-picker type="datetime" style='width:45%' v-model='planjobtime' value-format='yyyy-MM-dd HH:mm:ss' placeholder='请输入预计到港时间'></el-date-picker></el-col>
			<el-col :span="12"><el-input style='width:45%' v-model='reportuser' placeholder='请输入报岗人'></el-input></el-col>
		</el-row>
		<el-row style='margin-bottom: 50px;'>
			<el-col :span="12">
				<el-select v-model='compid' style='width:45%' placeholder="请选择所属企业">
					<el-option v-for='obj in compArr' :key="obj.compid" :label='obj.compname' :value='obj.compid'></el-option>
				</el-select>
			</el-col>
		</el-row>
		<el-row>
			<el-col :span="24">
				<el-button @click='save'>添加</el-button>
				<el-button @click='cancel'>返回</el-button>
			</el-col>
		</el-row>
	</div>
</template>
<!-- js部分 -->
<script>
	export default {
		data() {
			return {
				shipname:'',
				capacity:'',
				planjobtime:'',
				reportuser:'',
				compid:'',
				compArr:[]
			};
		},
		methods:{
			save(){
				// 后端网址
				var url = this.baseUrl+"/produceReport/insert"
				// 传递给后端的数据
				var data = {shipname:this.shipname,capacity:this.capacity,planjobtime:this.planjobtime,reportuser:this.reportuser,compid:this.compid};
				this.$axios.post(url,this.$qs.stringify(data),{
					headers: {
						'Content-Type':'application/x-www-form-urlencoded; charset=UTF-8'
					}
				}).then(res=>{
					// res是后端的响应
					this.$message("添加成功");
					this.$router.push({path:'/ReportList'});
				})
			},
			cancel(){
				this.$router.go(-1);
			}
		},
		mounted:function(){
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
