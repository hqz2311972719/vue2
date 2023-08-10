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
export default router;