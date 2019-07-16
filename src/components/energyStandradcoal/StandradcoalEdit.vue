<!-- html部分 -->
<template>
	<div>
		<h1 style="margin: 25px auto 50px auto;">折标煤系数编辑页面</h1>
		<el-row style='margin-bottom: 50px;'>
			<el-col :span="12"><el-input style='width:45%' v-model='energetype' placeholder='请输入能源类别'></el-input></el-col>
			<el-col :span="12"><el-input style='width:45%' v-model='ratio' placeholder='请输入系数'></el-input></el-col>
		</el-row>
		<el-row>
			<el-col :span="24">
				<el-button @click='onclick'>确认</el-button>
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
				sid:'',
				energetype:'',
				ratio:''
			};
		},
		methods:{
			onclick(){
				// 后端网址
				var url = this.baseUrl+"/energyStandradcoal/update"
				// 传递给后端的数据
				var data = {sid:this.sid,energetype:this.energetype,ratio:this.ratio};
				this.$axios.post(url,this.$qs.stringify(data),{
					headers: {
						'Content-Type':'application/x-www-form-urlencoded; charset=UTF-8'
					}
				}).then(res=>{
					// res是后端的响应
					this.$message("更新成功");
					this.$router.push({path:'/StandradcoalList'});
				})
			},
			cancel(){
				this.$router.go(-1);
			}
		},
		mounted:function(){
			//接收路由传递的数据
			var sid = this.$route.params.row;
			// 后端网址
			var url = this.baseUrl+"/energyStandradcoal/load"
			// 传递给后端的数据
			var data = {sid:sid};
			this.$axios.post(url,this.$qs.stringify(data),{
				headers: {
					'Content-Type':'application/x-www-form-urlencoded; charset=UTF-8'
				}
			}).then(res=>{
				var obj = res.data;
				this.sid = obj.sid;
				this.energetype = obj.energetype;
				this.ratio = obj.ratio;
			})
		}
	}
</script>
<!-- css部分 -->
<style>

</style>
