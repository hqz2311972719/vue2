
import VueRouter from "vue-router";

// 对路由的加强
export const enVueRouter = function(props){
	const nativeFn = VueRouter.prototype[props];
	VueRouter.prototype[props] = function(location, onComplete, onAbort){
		return nativeFn.call(this,location, onComplete, ()=>{})
	}
}