import Vue from "vue";
import VueRouter from "vue-router";
import {enVueRouter} from "@/utils/enhance";
// import Home from "@/pages/Home";
// import Login from "@/pages/Login";
// import Register from "@/pages/Register";
// import Search from "@/pages/Search";
// import Detail from "@/pages/Detail";
// import AddCartSuccess from "@/pages/AddCartSuccess";
// import Cart from "@/pages/Cart";
import store from "@/store";
import {getToken} from "@/utils/auth";
// import Trade from "@/pages/Trade";
// import Pay from "@/pages/Pay";
// import PaySuccess from "@/pages/PaySuccess";


const Home =()=>import("@/pages/Home")
const Login =()=>import("@/pages/Login")
const Register =()=>import("@/pages/Register")
const Search =()=>import("@/pages/Search")
const AddCartSuccess =()=>import("@/pages/AddCartSuccess")
const Trade =()=>import("@/pages/Trade")
const Pay  =()=>import("@/pages/Pay")
const Cart =()=>import("@/pages/Cart")
const Detail =()=>import("@/pages/Detail")
const PaySuccess =()=>import("@/pages/PaySuccess")
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
		path:"/pay/:orderId.html",
		component:Pay,

	},{
		path:"/paysuccess",
		component:PaySuccess,

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
router.beforeEach(async function(to,from,next){
	if(getToken() && !store.state.user.userInfo)
		await store.dispatch("user/getUserInfoAsync");
	// 判断路由是否需要登陆
	if(to.meta.isAuth){
		if(getToken()) next();
		else next({
			path:"/login",
			query:{
				cb:to.path
			}
		})
	}else{
		next();
	}
	
})
export default router;