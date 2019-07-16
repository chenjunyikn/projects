<!-- html部分 -->
<template>
	<div>
		<h1 style="margin: 25px auto 50px auto;">折标煤系数添加页面</h1>
		<el-row style='margin-bottom: 50px;'>
			<el-col :span="12"><el-input style='width:45%' v-model='energetype' placeholder='请输入能源类别'></el-input></el-col>
			<el-col :span="12"><el-input style='width:45%' v-model='ratio' placeholder='请输入系数'></el-input></el-col>
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
				energetype:'',
				ratio:''
			};
		},
		methods:{
			save(){
				// 后端网址
				var url = this.baseUrl+"/energyStandradcoal/insert"
				// 传递给后端的数据
				var data = {energetype:this.energetype,ratio:this.ratio};
				this.$axios.post(url,this.$qs.stringify(data),{
					headers: {
						'Content-Type':'application/x-www-form-urlencoded; charset=UTF-8'
					}
				}).then(res=>{
					// res是后端的响应
					this.$message("添加成功");
					this.$router.push({path:'/StandradcoalList'});
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
