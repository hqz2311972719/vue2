import Vue from "vue";
import App from "@/App";
import router from "@/router";
import store from "@/store";
import filters from "@/filters"
import "@/assets/css/reset.css";
import  "@/mock"
// 设置为 false 以阻止 vue 在启动时生成生产提示
Vue.config.productionTip = false;

// 全局过滤器
for(let key in filters){
	Vue.filter(key,filters[key]);
}
new Vue({
	el:"#app",
	router,
	store,
	
	render:h=>h(App)
})
