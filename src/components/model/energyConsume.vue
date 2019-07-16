<!-- html部分 -->
<template>
	<div>
		<h1>全年的数据</h1>
		<div style="text-align: left;margin-bottom: 20px;">
			年份：<el-date-picker v-model="value" type="year" value-format='yyyy' placeholder="请选择年份" style='width:200px;margin-right: 10px;'></el-date-picker>
			<el-button @click='search'>查询</el-button>
			<el-button @click="changeType">切换图表类型</el-button>
		</div>
		<h1>流程能耗对比图</h1>
		<ve-chart :data="chartData" :settings="chartSettings"></ve-chart>
		<h1>设备类别能耗对比图</h1>
		<ve-chart :data="chartData1" :settings="chartSettings"></ve-chart>
		<h1>设备能耗对比图</h1>
		<ve-chart :data="chartData2" :settings="chartSettings"></ve-chart>
		<h1>设备单位作业量耗电量对比图</h1>
		<ve-chart :data="chartData3" :settings="chartSettings"></ve-chart>
		<h1>设备单位作业量耗水量对比图</h1>
		<ve-chart :data="chartData4" :settings="chartSettings"></ve-chart>
		<h1>设备单位作业量耗油量对比图</h1>
		<ve-chart :data="chartData5" :settings="chartSettings"></ve-chart>
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
				chartData3: {},
				chartData4: {},
				chartData5: {},
				value:'2018',
				chartSettings: {type: this.typeArr[this.index]}
			}
		},
		methods: {
			search() {
				// 后端网址
				var url = this.baseUrl + "/energyConsume/flowConsume"
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
				var url1 = this.baseUrl + "/energyConsume/devTypeConsume"
				// 传递给后端的数据
				var data = {year:this.value};
				this.$axios.post(url1, this.$qs.stringify(data), {
					headers: {
						'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
					}
				}).then(res => {
					this.chartData1 = res.data;
				})
				// 后端网址
				var url2 = this.baseUrl + "/energyConsume/devConsume"
				// 传递给后端的数据
				var data = {year:this.value};
				this.$axios.post(url2, this.$qs.stringify(data), {
					headers: {
						'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
					}
				}).then(res => {
					this.chartData2 = res.data;
				})
				// 后端网址
				var url3 = this.baseUrl + "/energyConsume/electricConsume"
				// 传递给后端的数据
				var data = {year:this.value};
				this.$axios.post(url3, this.$qs.stringify(data), {
					headers: {
						'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
					}
				}).then(res => {
					this.chartData3 = res.data;
				})
				// 后端网址
				var url4 = this.baseUrl + "/energyConsume/waterConsume"
				// 传递给后端的数据
				var data = {year:this.value};
				this.$axios.post(url4, this.$qs.stringify(data), {
					headers: {
						'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
					}
				}).then(res => {
					this.chartData4 = res.data;
				})
				// 后端网址
				var url5 = this.baseUrl + "/energyConsume/oilConsume"
				// 传递给后端的数据
				var data = {year:this.value};
				this.$axios.post(url5, this.$qs.stringify(data), {
					headers: {
						'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
					}
				}).then(res => {
					this.chartData5 = res.data;
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
