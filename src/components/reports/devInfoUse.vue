<!-- html部分 -->
<template>
	<div>
		<h1>全年的数据</h1>
		<div style="text-align: left;margin-bottom: 20px;">
			年份：<el-date-picker v-model="value" type="year" value-format='yyyy' placeholder="请选择年份" style='width:200px;margin-right: 10px;'></el-date-picker>
			<el-button @click='search'>查询</el-button>
		</div>
		<h1>港口间设备利用率对比</h1>
		<ve-line :data="chartData" :settings="chartSettings"></ve-line>
		<h1>港口间设备完好率对比</h1>
		<ve-line :data="chartData1" :settings="chartSettings"></ve-line>
	</div>
</template>
<!-- js部分 -->
<script>
	export default {
		data() {
			this.chartSettings = {
				yAxisType: ['0.000%']
			}
			return {
				chartData: {},
				chartData1: {},
				value:'2018'
			}
		},
		methods: {
			search() {
				// 后端网址
				var url = this.baseUrl + "/devInfo/usage"
				// 传递给后端的数据
				var data = {year:this.value};
				this.$axios.post(url, this.$qs.stringify(data), {
					headers: {
						'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
					}
				}).then(res => {
					this.chartData = res.data;
				})
				// 后端网址
				var url1 = this.baseUrl + "/devInfo/intactRatio"
				// 传递给后端的数据
				var data = {year:this.value};
				this.$axios.post(url1, this.$qs.stringify(data), {
					headers: {
						'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
					}
				}).then(res => {
					this.chartData1 = res.data;
				})
			}
		},
		mounted: function() {
			this.search();
		}
	}
</script>
<!-- css部分 -->
<style>

</style>
