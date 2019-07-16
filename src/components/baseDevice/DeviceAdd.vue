<!-- html部分 -->
<template>
	<div>
		<h1 style="margin: 25px auto 50px auto;">设备信息添加页面</h1>
		<el-row style='margin-bottom: 20px;'>
			<el-col :span="12"><el-input style='width:45%' v-model='devname' placeholder='请输入设备名称'></el-input></el-col>
			<el-col :span="12">
				<el-select v-model='typeid' style='width:45%' placeholder="请选择设备类别">
					<el-option v-for='obj in typeArr' :key="obj.typeid" :label='obj.typename' :value='obj.typeid'></el-option>
				</el-select>
			</el-col>
		</el-row>
		<el-row style='margin-bottom: 20px;'>
			<el-col :span="12"><el-date-picker style='width:45%' v-model='devdate' value-format='yyyy-MM-dd' placeholder='请输入投入时间'></el-date-picker></el-col>
			<el-col :span="12"><el-input style='width:45%' v-model='devuser' placeholder='请输入责任人'></el-input></el-col>
		</el-row>
		<el-row style='margin-bottom: 50px;'>
			<el-col :span="12">
				<el-select v-model='compid' style='width:45%' placeholder="请选择所属企业">
					<el-option v-for='obj in compArr' :key="obj.compid" :label='obj.compname' :value='obj.compid'></el-option>
				</el-select>
			</el-col>
			<el-col :span="12">
				<el-select v-model='weight' style='width:45%' placeholder="请选择权重">
					<el-option v-for='obj of weightArr' :key="obj" :label='obj' :value='obj'></el-option>
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
				devname:'',
				typeid:'',
				devdate:'',
				devuser:'',
				compid:'',
				weight: "",
				typeArr:[],
				compArr:[],
				weightArr:["1.0","0.9","0.8","0.7","0.6","0.5","0.4","0.3","0.2","0.1","0"]
			};
		},
		methods:{
			save(){
				// 后端网址
				var url = this.baseUrl+"/baseDevice/insert"
				// 传递给后端的数据
				var data = {devname:this.devname,typeid:this.typeid,devdate:this.devdate,devuser:this.devuser,compid:this.compid,weight:this.weight};
				this.$axios.post(url,this.$qs.stringify(data),{
					headers: {
						'Content-Type':'application/x-www-form-urlencoded; charset=UTF-8'
					}
				}).then(res=>{
					// res是后端的响应
					this.$message("添加成功");
					this.$router.push({path:'/DeviceList'});
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
			// 后端网址
			var url1 = this.baseUrl+"/baseDevtype/list"
			this.$axios.post(url1,{
				headers: {
					'Content-Type':'application/x-www-form-urlencoded; charset=UTF-8'
				}
			}).then(res=>{
				this.typeArr = res.data;
			})
		}
	}
</script>
<!-- css部分 -->
<style>

</style>
