import Vue from "vue";
import VueRouter from "vue-router";
import {enVueRouter} from "@/utils/enhance";
import Home from "@/pages/Home";
import Login from "@/pages/Login";
import Register from "@/pages/Register";
import Search from "@/pages/Search";
import Detail from "@/pages/Detail"
Vue.use(VueRouter);

enVueRouter("push");
enVueRouter("replace");


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
	},
	{
		// params是可以传递对象，：ID是占位符
		path:"/detail/:id.html",
		component:Detail,
		meta:{
			// 是否使用导航
			isTypeNav:true
		}
	},
	{
		// 成功加入购物车界面
			path:"/addCartSuccess",
			component:AddCartSuccess
	}
];
const router = new VueRouter({
	mode:"history",
	routes,
	// 返回的结果是什么，答：一个对象，对象可以觉得滚动条的位置。
	scrollBehavior(to,from){
		if(!to.meta.noScroll){
			return{
				x:0, //横向
				y:0 //纵向
			}
		}


	}
});
export default router;