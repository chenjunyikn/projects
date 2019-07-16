// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import Vuex from 'vuex'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import VCharts from 'v-charts'
import store from './vuex/store'
import axios from 'axios'
//把axios挂载到vue的原型中，在vue中每个组件都可以使用axios发送请求
Vue.prototype.$axios = axios
axios.defaults.withCredentials = true
//设置后端的网址
Vue.prototype.baseUrl = 'http://47.100.205.249:3670'
import qs from 'qs'
Vue.prototype.$qs = qs

Vue.config.productionTip = false
Vue.use(ElementUI)
Vue.use(Vuex)
Vue.use(VCharts)

//门卫拦截login页面
router.beforeEach((to, from, next) => {
	if (to.name == 'Login' || store.state.loginFlag) {
		next();
	} else {
		next('/Login');
	}
})

/* eslint-disable no-new */
new Vue({
	el: '#app',
	router,
	store,
	components: {
		App
	},
	template: '<App/>'
})
