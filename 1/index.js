import Vue from "vue";
import App from "@/App";
import router from "@/router";
import TypeNav from "@/components/TypeNav";

import "@/assets/css/reset.css";

Vue.component("TypeNav",TypeNav);
new Vue({
	el:"#app",
	router,
	render:h=>h(App)
})
