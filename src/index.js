import Vue from "vue";
import App from "@/App";
import router from "@/router";
import store from "@/store";
import filters from "@/filters";
import Pagination from "@/components/Pagination";
import {Button, Message, Row} from 'element-ui';
import "@/mock";
import "@/assets/css/reset.css";
import "@/assets/iconfont/iconfont.css";
// import 'element-ui/lib/theme-chalk/index.css';
// 设置为 false 以阻止 vue 在启动时生成生产提示
Vue.config.productionTip = false;
console.log(Button.name);
// Vue.component(Button.name, Button);
// Vue.component(Row.name, Row);
// 或者
Vue.use(Button);
Vue.use(Row);
Vue.prototype.$message = Message;
new Vue({
	el:"#app",
	router,
	store,
	beforeCreate() {
		// 全局过滤器
		for(let key in filters){
			Vue.filter(key,filters[key]);
		}
		// 全局组件
		Vue.component("Pagination",Pagination);
		// 全局事件总线
		Vue.prototype.$bus = this;
	},
	render:h=>h(App)
})

