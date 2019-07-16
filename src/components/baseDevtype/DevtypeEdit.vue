<!-- html部分 -->
<template>
	<div>
		<h1 style="margin: 25px auto 50px auto;">设备类别编辑页面</h1>
		<el-row style='margin-bottom: 50px;'>
			<el-col :span="12"><el-input style='width:45%' v-model='typename' placeholder='请输入类别名称'></el-input></el-col>
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
				typeid:'',
				typename:''
			};
		},
		methods:{
			onclick(){
				// 后端网址
				var url = this.baseUrl+"/baseDevtype/update"
				// 传递给后端的数据
				var data = {typeid:this.typeid,typename:this.typename};
				this.$axios.post(url,this.$qs.stringify(data),{
					headers: {
						'Content-Type':'application/x-www-form-urlencoded; charset=UTF-8'
					}
				}).then(res=>{
					// res是后端的响应
					this.$message("更新成功");
					this.$router.push({path:'/DevtypeList'});
				})
			},
			cancel(){
				this.$router.go(-1);
			}
		},
		mounted:function(){
			var row = this.$route.params.row;
			this.typeid = row.typeid;
			this.typename = row.typename;
		}
	}
</script>
<!-- css部分 -->
<style>

</style>
