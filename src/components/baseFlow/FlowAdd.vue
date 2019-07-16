<!-- html部分 -->
<template>
	<div>
		<h1 style="margin: 25px auto 50px auto;">流程信息添加页面</h1>
		<el-row style='margin-bottom: 20px;'>
			<el-col :span="12"><el-input style='width:45%' v-model='flowname' placeholder='请输入流程名称'></el-input></el-col>
			<el-col :span="12">
				<el-select v-model='dljid' style='width:45%' placeholder="请选择斗轮机">
					<el-option v-for='obj in dljArr' :key="obj.devid" :label='obj.devname' :value='obj.devid'></el-option>
				</el-select>
			</el-col>
		</el-row>
		<el-row style='margin-bottom: 50px;'>
			<el-col :span="12">
				<el-select v-model='zcjid' style='width:45%' placeholder="请选择装船机">
					<el-option v-for='obj in zcjArr' :key="obj.devid" :label='obj.devname' :value='obj.devid'></el-option>
				</el-select>
			</el-col>
			<el-col :span="12">
				<el-select v-model='pdjid' style='width:45%' placeholder="请选择皮带机">
					<el-option v-for='obj in pdjArr' :key="obj.devid" :label='obj.devname' :value='obj.devid'></el-option>
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
				flowname:'',
				dljid:'',
				zcjid:'',
				pdjid:'',
				dljArr:[],
				zcjArr:[],
				pdjArr:[]
			};
		},
		methods:{
			save(){
				// 后端网址
				var url = this.baseUrl+"/baseFlow/insert"
				// 传递给后端的数据
				var data = {flowname:this.flowname,dljid:this.dljid,zcjid:this.zcjid,pdjid:this.pdjid};
				this.$axios.post(url,this.$qs.stringify(data),{
					headers: {
						'Content-Type':'application/x-www-form-urlencoded; charset=UTF-8'
					}
				}).then(res=>{
					// res是后端的响应
					this.$message("添加成功");
					this.$router.push({path:'/FlowList'});
				})
			},
			cancel(){
				this.$router.go(-1);
			}
		},
		mounted:function(){
			// 后端网址
			var url = this.baseUrl+"/baseDevice/findDljByCompid"
			this.$axios.post(url,{
				headers: {
					'Content-Type':'application/x-www-form-urlencoded; charset=UTF-8'
				}
			}).then(res=>{
				this.dljArr = res.data;
			})
			// 后端网址
			var url1 = this.baseUrl+"/baseDevice/findCzjByCompid"
			this.$axios.post(url1,{
				headers: {
					'Content-Type':'application/x-www-form-urlencoded; charset=UTF-8'
				}
			}).then(res=>{
				this.zcjArr = res.data;
			})
			// 后端网址
			var url2 = this.baseUrl+"/baseDevice/findPdjByCompid"
			this.$axios.post(url2,{
				headers: {
					'Content-Type':'application/x-www-form-urlencoded; charset=UTF-8'
				}
			}).then(res=>{
				this.pdjArr = res.data;
			})
		}
	}
</script>
<!-- css部分 -->
<style>

</style>
