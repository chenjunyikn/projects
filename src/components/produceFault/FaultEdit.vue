<!-- html部分 -->
<template>
	<div>
		<h1 style="margin: 25px auto 50px auto;">故障记录编辑页面</h1>
		<el-row style='margin-bottom: 20px;'>
			<el-col :span="12">
				<el-select v-model='devid' style='width:45%' placeholder="请选择设备名称">
					<el-option v-for='obj in devArr' :key="obj.devid" :label='obj.devname' :value='obj.devid'></el-option>
				</el-select>
			</el-col>
			<el-col :span="12"><el-input style='width:45%' v-model='cause' placeholder='请输入故障原因'></el-input></el-col>
		</el-row>
		<el-row style='margin-bottom: 50px;'>
			<el-col :span="12"><el-input style='width:45%' v-model='faultuser' placeholder='请输入报告人'></el-input></el-col>
			<el-col :span="12"><el-input style='width:45%' v-model='faulttime' placeholder='请输入故障时间(分钟)'></el-input></el-col>
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
				faultId:'',
				cause:'',
				devid:'',
				faultuser:'',
				faulttime:'',
				devArr:[]
			};
		},
		methods:{
			onclick(){
				// 后端网址
				var url = this.baseUrl+"/produceFault/update"
				// 传递给后端的数据
				var data = {faultId:this.faultId,cause:this.cause,devid:this.devid,faultuser:this.faultuser,faulttime:this.faulttime};
				this.$axios.post(url,this.$qs.stringify(data),{
					headers: {
						'Content-Type':'application/x-www-form-urlencoded; charset=UTF-8'
					}
				}).then(res=>{
					// res是后端的响应
					this.$message("更新成功");
					this.$router.push({path:'/FaultList'});
				})
			},
			cancel(){
				this.$router.go(-1);
			}
		},
		mounted:function(){
			// 后端网址
			var url = this.baseUrl+"/baseDevice/list"
			this.$axios.post(url,{
				headers: {
					'Content-Type':'application/x-www-form-urlencoded; charset=UTF-8'
				}
			}).then(res=>{
				this.devArr = res.data;
			})
			//接收路由传递的数据
			var faultId = this.$route.params.row;
			// 后端网址
			var url1 = this.baseUrl+"/produceFault/load"
			// 传递给后端的数据
			var data = {faultId:faultId};
			this.$axios.post(url1,this.$qs.stringify(data),{
				headers: {
					'Content-Type':'application/x-www-form-urlencoded; charset=UTF-8'
				}
			}).then(res=>{
				var obj = res.data;
				this.faultId = obj.faultId;
				this.cause = obj.cause;
				this.devid = obj.devid;
				this.faultuser = obj.faultuser;
				this.faulttime = obj.faulttime;
			})
		}
	}
</script>
<!-- css部分 -->
<style>

</style>
