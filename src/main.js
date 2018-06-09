// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import 'element-ui/lib/theme-chalk/index.css';
import App from './App'
import router from './router'
import store from '@/store';

import 'amfe-flexible'
import '@/assets/style/reset.css'

import Element from 'element-ui';
Vue.use(Element, { size: 'medium' });

// base64
import { Base64 } from 'js-base64'
Vue.prototype.$Base64 = Base64

// 手势滑动
// import './utils/vTouch'
import './utils/websocket'

// Vue.config.productionTip = false
window.addEventListener('resize', ()=> {
	window.location.reload();
})
document.addEventListener('keydown',e => {
	if (e.keyCode == 27) {
		window.history.back(-1);
	}
})
// 登录24小时过期设置
const nowTime = new Date().getTime(),
	  loginTime = window.localStorage.loginTime || 0;
if (nowTime - loginTime >= 60*60*24*1000) {
	window.localStorage.userInfo_system = "";
}

router.beforeEach((to, from, next) => {
	if (to.meta.isLogin) {
		if (window.localStorage.userInfo_system) {
			next();
		} else {
			next({
				path: '/'
			})
		}
	} else {
		next()
	}
})

/* eslint-disable no-new */
new Vue({
	el: '#app',
	router,
	// components: { App },
	// template: '<App/>',
	store,
	render: h => h(App)
})
