
import Vue from "vue";
import VueRouter from "vue-router";
import Home from "@/pages/Home";
import Login from "@/pages/Login";
import Register from "@/pages/Register";
import Search from "@/pages/Search";
Vue.use(VueRouter);


// 解决编程式导航问题（点击两次报错）
// 实现加强(为优化)
// 1.先将要加强的方法备份
const nativePush = VueRouter.prototype.push;
const nativeReplace = VueRouter.prototype.replace;

// 2.重写方法，在重写的方法中调用备份方法
VueRouter.prototype.push = function(location,onComplete,onAbort){
  return nativePush.call(this,location,onComplete,()=>{})
}
VueRouter.prototype.replace = function(location, onComplete, onAbort){
	return nativeReplace.call(this,location, onComplete, ()=>{})
}

const routes = [
	{
		path:"/",
		component:Home,
    meta:{
         // 是否使用导航
      isTypeNav:true
    }
	},
	{
		path:"/login",
		component:Login
	},
	{
		path:"/Register",
		component:Register
	},
	{
		path:"/search",
		component:Search,
    meta:{
      // 是否使用导航
      isTypeNav:true
    }
	}
];
const router = new VueRouter({
	mode:"history",
	routes
});
export default router;
