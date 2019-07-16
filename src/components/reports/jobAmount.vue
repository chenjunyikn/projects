<!-- html部分 -->
<template>
	<div>
		<h1>全年的数据</h1>
		<div style="text-align: left;margin-bottom: 20px;">
			年份：<el-date-picker v-model="value" type="year" value-format='yyyy' placeholder="请选择年份" style='width:200px;margin-right: 10px;'></el-date-picker>
			<el-button @click='search'>查询</el-button>
			<el-button @click="changeType">切换图表类型</el-button>
		</div>
		<h1>流程作业量对比图</h1>
		<ve-chart :data="chartData" :settings="chartSettings"></ve-chart>
		<h1>设备类别作业量对比图</h1>
		<ve-chart :data="chartData1" :settings="chartSettings"></ve-chart>
		<h1>设备作业量对比图</h1>
		<ve-chart :data="chartData2" :settings="chartSettings"></ve-chart>
	</div>
</template>
<!-- js部分 -->
<script>
	export default {
		data() {
			this.typeArr = ['line','histogram','pie','bar','ring','waterfall','funnel','radar']
			this.index = 0
			return {
				chartData: {},
				chartData1: {},
				chartData2: {},
				value: '2018',
				chartSettings: {type: this.typeArr[this.index]}
			}
		},
		methods: {
			search() {
				// 后端网址
				var url = this.baseUrl + "/jobAmount/flowAmount"
				// 传递给后端的数据
				var data = {
					year: this.value
				};
				this.$axios.post(url, this.$qs.stringify(data), {
					headers: {
						'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
					}
				}).then(res => {
					this.chartData = res.data;
				})
				// 后端网址
				var url1 = this.baseUrl + "/jobAmount/devTypeAmount"
				// 传递给后端的数据
				var data = {
					year: this.value
				};
				this.$axios.post(url1, this.$qs.stringify(data), {
					headers: {
						'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
					}
				}).then(res => {
					this.chartData1 = res.data;
				})
				// 后端网址
				var url2 = this.baseUrl + "/jobAmount/devAmount"
				// 传递给后端的数据
				var data = {
					year: this.value
				};
				this.$axios.post(url2, this.$qs.stringify(data), {
					headers: {
						'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
					}
				}).then(res => {
					this.chartData2 = res.data;
				})
			},
			changeType() {
				this.index++;
				if (this.index >= this.typeArr.length) {
					this.index = 0;
				}
				this.chartSettings = {type: this.typeArr[this.index]};
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
