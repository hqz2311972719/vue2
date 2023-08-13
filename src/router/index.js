import Vue from "vue";
import VueRouter from "vue-router";
import {enVueRouter} from "@/utils/enhance";
import Home from "@/pages/Home";
import Login from "@/pages/Login";
import Register from "@/pages/Register";
import Search from "@/pages/Search";
import Detail from "@/pages/Detail";
import AddCartSuccess from "@/pages/AddCartSuccess";
import Cart from "@/pages/Cart";
import store from "@/store"
import { getToken } from "@/utils/auth";
import Trade from "@/pages/Trade/index.vue";
import  Pay from "@/pages/Pay"

Vue.use(VueRouter);

enVueRouter("push");
enVueRouter("replace");
// 接收参数query
VueRouter.prototype.goSearch=function(query){
	this.push({
		path:"/search",
		query:{
			...this.history.current.query,
			pageNo:1,
			...query
		}
	})
}


const routes = [
	{
		path:"/",
		component:Home,
		name:"home",
		meta:{
			// 是否使用导航
			isTypeNav:true
		}
	},
	{
		path:"/login",
		component:Login,
		meta:{
			// 是否隐藏底部信息
			isHideFooter:true
		}
	},
	{
		path:"/Register",
		component:Register,
		meta:{
			// 是否隐藏底部信息
			isHideFooter:true
		}
	},
	{
		path:"/search",
		component:Search,
		meta:{
			// 是否使用导航
			isTypeNav:true,
			noScroll:true
		}
	},{
		path:"/detail/:id.html",
		component:Detail,
		meta:{
			isTypeNav: true
		}
	},{
		// 成功加入购物车界面
		path:"/addCartSuccess",
		component:AddCartSuccess
	},{
		path:"/cart",
		component:Cart,
		meta:{
			isTypeNav: true
		}
	},{
	path:"/trade",
		component:Trade,
		meta:{
		isAuth:true
		}

},{
		path:"/pay",
		component:Pay,
		meta:{
			isAuth:true
		}

	}
];
const router = new VueRouter({
	mode:"history",
	routes,
	// 1- 什么时候执行？答：切换路由时执行。
	// 2- 接收什么参数？答：to:去哪个路由，from:来自哪个路由
	// 3- 返回的结果是什么？答：一个对象，对象可以决定滚动条的位置。
	scrollBehavior(to,from){
		if(!to.meta.noScroll){
			// console.log("scrollBehavior->to",to);
			// console.log("scrollBehavior->from",from);
			return {
				x:0,// 横向
				y:0// 纵向
			}
		}
	
	}
});


// 路由前置守卫可以解决刷新个人信息丢失的问题，是因为它可以在路由导航之前执行必要的操作，包括从服务器加载个人信息并保存在应用程序的状态中。 
 
// 当用户刷新页面时，应用程序的状态会重置，包括个人信息的丢失。通过在路由前置守卫中执行逻辑，我们可以在每次导航之前检查应用程序的状态是否包含个人信息。如果个人信息不存在，前置守卫可以触发一个异步操作，例如从服务器加载个人信息。一旦个人信息加载完成，守卫可以将其保存在应用程序的状态中，确保在刷新后仍然可以访问。 
 
// 使用路由前置守卫的好处是，它可以在用户导航到需要个人信息的路由之前，自动处理个人信息的加载和保存。这样，无论用户是首次进入应用还是刷新页面，都可以确保个人信息的持久性和一致性。
router.beforeEach(async function(to,from,next){
	if(getToken()&&!store.state.user.userInfo)
	  await store.dispatch("user/getUserInfoAsync")
	// 判断路由是否登录
	if(to.meta.isAuth){
		if(getToken()) 	next()

		else next({
			path:"/login",
			query: {
				cb: to.path
			}
			})
		}else{
			next();
		}
})
export default router;