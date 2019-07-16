import Vue from 'vue'
import Vuex from 'vuex'
import { Message } from 'element-ui'
Vue.use(Vuex)
// state对象用来存储数据
var state = {
	tags: [{
		name: '首页',
		type: 'warning',
		url: '/Welcome',
		index: '101'
	}],
	defaultIndex: '101',
	loginFlag: false
}
// mutations对象用来存储方法
var mutations = {
	//添加tag标签
	addTag(state, obj) {
		//先清除被选中的样式warning
		for (var item of state.tags) {
			item.type = 'info';
		}
		//重复的不再添加
		for (var item of state.tags) {
			if (item.name == obj.name) {
				item.type = 'warning';
				return;
			}
		}
		//tag标签长度超过10个不在添加
		if(state.tags.length==10){
			Message("最多打开10个标签");
		}else{
			state.tags.push(obj);
		}
	},
	//点击更新tag标签
	updateTag(state, index) {
		//将所有type设置为空
		for (var item of state.tags) {
			item.type = 'info';
		}
		//选中时改变样式为warning
		state.tags[index].type = 'warning';
	},
	//删除tag标签
	delTag(state, index) {
		state.tags.splice(index, 1);
	},
	//重置tag标签
	resetTag(state) {
		state.tags = [{
			name: '首页',
			type: 'warning',
			url: '/Welcome',
			index: '101'
		}]
	}
}
// 创建一个store对象,并暴露出去 store对象有两个属性,state和mutations
export default new Vuex.Store({
	state,
	mutations
})
