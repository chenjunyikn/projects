<!-- html部分 -->
<template>
	<div>
		<h1 style="margin: 25px auto 50px auto;">企业信息添加页面</h1>
		<el-row style='margin-bottom: 20px;'>
			<el-col :span="12"><el-input style='width:45%' v-model='compname' placeholder='请输入公司名称'></el-input></el-col>
			<el-col :span="12"><el-input style='width:45%' v-model='contacts' placeholder='请输入联系人'></el-input></el-col>
		</el-row>
		<el-row style='margin-bottom: 20px;'>
			<el-col :span="12"><el-input style='width:45%' v-model='comptel' placeholder='请输入联系电话'></el-input></el-col>
			<el-col :span="12"><el-input style='width:45%' v-model='industry' placeholder='请输入行业'></el-input></el-col>
		</el-row>
		<el-row style='margin-bottom: 50px;'>
			<el-col :span="12"><el-input style='width:45%' v-model='address' placeholder='请输入地址'></el-input></el-col>
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
				compname:'',
				contacts:'',
				comptel:'',
				industry:'',
				address:''
			};
		},
		methods:{
			save(){
				// 后端网址
				var url = this.baseUrl+"/baseCompany/insert"
				// 传递给后端的数据
				var data = {compname:this.compname,contacts:this.contacts,comptel:this.comptel,industry:this.industry,address:this.address};
				this.$axios.post(url,this.$qs.stringify(data),{
					headers: {
						'Content-Type':'application/x-www-form-urlencoded; charset=UTF-8'
					}
				}).then(res=>{
					// res是后端的响应
					this.$message("添加成功");
					this.$router.push({path:'/CompList'});
				})
			},
			cancel(){
				this.$router.go(-1);
			}
		}
	}
</script>
<!-- css部分 -->
<style>

</style>
