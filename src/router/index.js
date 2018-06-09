import Vue from 'vue'
import Router from 'vue-router'
/**
 * [异步组件加载函数]
 * @param {[string]} name [组件名称]
 * @return {[promise]}      [组件]
 */
const asyncComponent = (name) => {
	return resolve => require([`@/page/${name}`], resolve);
}

const Home = asyncComponent('home'),
		Link = asyncComponent('link'),
		Login = asyncComponent('login'),
		ChaoosePlat = asyncComponent('choose'),		//	打包分拣系统选择
		Main = asyncComponent('main'),		//	打包系统
		Dish = asyncComponent('dish'),		//  打包详情
		Sorting = asyncComponent('sorting'),	//	分拣系统
		Order = asyncComponent('sortingOrder'),
		Area = asyncComponent('arerOrder')

Vue.use(Router)

export default new Router({
	routes: [
		{
			path: '/',
			name: 'Home',
			component: Home,
			meta : {
				keepAlive : false
			}
		},
		{
			path : '/Link',
			name : 'Link',
			component : Link,
			meta : {
				keepAlive : false
			}
		},
		{
			path : '/Login',
			name : 'Login',
			component : Login,
			meta : {
				keepAlive : false
			}
		},
		{
			path : '/ChaoosePlat',
			name : 'ChaoosePlat',
			component : ChaoosePlat,
			meta : {
				keepAlive : false,
				isLogin : true
			}
		},
		{
			path : '/Main',
			name : 'Main',
			component : Main,
			meta : {
				keepAlive : true,
				isLogin : true
			}
		},
		{
			path : '/Sorting',
			name : 'Sorting',
			component : Sorting,
			meta : {
				keepAlive : false,
				isLogin : true
			}
		},
		{
			path : '/Order/:orderId',
			name : 'Order',
			component : Order,
			meta : {
				keepAlive : false,
				isLogin : true
			}
		},
		{
			path : '/Dish/:id/:sn/:pack/:pack_finish',
			name : 'Dish',
			component : Dish,
			meta : {
				keepAlive : false,
				isLogin : true
			}
		},
		{
			path : '/Area',
			name : 'Area',
			component : Area,
			meta : {
				keepAlive : false,
				isLogin : true
			}
		},
		{
			path : '*',
			redirect: '/'
		}
	]
})
