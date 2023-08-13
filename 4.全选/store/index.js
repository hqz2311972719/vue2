import Vue from "vue";
import Vuex from "vuex";
import product from "@/store/product";
import adv from "@/store/adv";
import cart from "@/store/cart"
Vue.use(Vuex);
const store = new Vuex.Store({
	modules:{
		product,
		adv,
		cart
	}
});
export default store;