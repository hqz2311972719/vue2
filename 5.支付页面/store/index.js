import Vue from "vue";
import Vuex from "vuex";
import product from "@/store/product";
import adv from "@/store/adv";
import cart from "@/store/cart";
import user from "@/store/user"
import trade from "@/store/trade";

Vue.use(Vuex);
const store = new Vuex.Store({
	modules:{
		product,
		adv,
		cart,
		user,
		trade

	}
});
export default store;