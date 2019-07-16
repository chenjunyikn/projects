<!-- html部分 -->
<template>
	<div style="height: 100%;">
		<el-container>
			<el-header>
				<Header></Header>
			</el-header>
			<el-container>
				<el-aside width="200px">
					<Meau></Meau>
				</el-aside>
				<el-main>
					<Main></Main>
				</el-main>
			</el-container>
		</el-container>
	</div>
</template>
<!-- js部分 -->
<script>
	import Meau from './Meau'
	import Header from './Header'
	import Main from './Main'
	export default {
		components:{Meau,Header,Main},
		data() {
			return {
				
			};
		}
	}
</script>
<!-- css部分 -->
<style>
.el-header {
	background-color: #52bab5;
	color: white;
	font-size: 20px;
	line-height: 60px;
}

.el-aside {
	background-color: #f4f4f4;
	color: #333;
	text-align: left;
	line-height: 200px;
}

.el-main {
	background-color: white;
	color: #333;
	text-align: center;
}

.el-container.is-vertical{
	height: 100%;
}
</style>
