<!-- html部分 -->
<template>
	<div>
		<span>能耗综合分析平台</span>
		<div class="div">{{compname}}</div>
		<div class="div">
			<el-dropdown :hide-on-click="false">
				<span class="el-dropdown-link">{{cname}}<i class="el-icon-arrow-down el-icon--right"></i></span>
				<el-dropdown-menu slot="dropdown">
					<el-dropdown-item>修改密码</el-dropdown-item>
					<el-dropdown-item @click.native='fn'>退出登录</el-dropdown-item>
				</el-dropdown-menu>
			</el-dropdown>
		</div>
	</div>
</template>
<!-- js部分 -->
<script>
	export default {
		data() {
			return {
				cname:'',
				compname:''
			};
		},
		methods:{
			fn(){
				this.$router.push({path:'/Login'});
				this.$store.commit('resetTag');
			}
		},
		mounted:function(){
			//接收路由器传递的参数
			var obj = this.$route.params.obj;
			this.cname = obj.cname;
			this.compname = obj.baseCompany.compname;
		}
	}
</script>
<!-- css部分 -->
<style>
.el-dropdown-link {
	cursor: pointer;
	color: white;
}
.el-icon-arrow-down {
	font-size: 12px;
}
.div{
	display: inline-block;
	margin: 0px 15px;
	float: right;
}
</style>
