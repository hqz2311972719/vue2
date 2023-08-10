import Vue from "vue";
import Vuex from "vuex";
import product from "@/store/product";
import adv from "@/store/adv";
Vue.use(Vuex);
const store = new Vuex.Store({
	modules:{
		product,
		adv
	}
});
export default store;