// 购物车模块
import {
	deleteCartListBatch,
	deleteCartListById,
	getCartIsCheckedById,
	getCartList,
	postAddToCart,
	postBatchCheckCart
} from "@/api/cart";

const state = {
	// 购物车列表
	cartList: []
};
const mutations = {
	// 根据商品ID删除购物车中的商品
	DELETE_CART_LIST_BY_ID(state, skuId) {
		state.cartList = state.cartList.filter(v => v.skuId !== skuId);
	},
	SAVE_CART_LIST(state, cartList) {
		state.cartList = cartList;
	},
	UP_CAART_LIST_CHECKED_BY_ID(state, {skuID, isChecked}) {
		// 根据商品ID，找到购物车信息。然后将购物车信息中的选中状态更改为isChecked
		const info = state.cartList.find(v => v.skuId === skuID);
		if (info) info.isChecked = isChecked;
	}
};
const actions = {
	// 切换全选状态
	async postBatchCheckCartAsync({getters,state,dispatch}) {
		// isChecked:要切换的状态.
		const isChecked = getters.getIsAll ? 0 : 1;
		// 方案一:抽取要修改的数据 skuIdList:要切换状态的商品ID,类型是数组,数组中的每一个元素是商品ID
		// const skuIdList = state.cartList.filter(v=>v.isChecked===(getters.getIsAll?1:0)).map(v=>v.skuId);
		// 方案二:抽取所有数据的id
		const skuIdList = state.cartList.map(item=>item.skuId);
		await postBatchCheckCart(isChecked,skuIdList);
		await dispatch("getCartListAsync");
	},
	async getCartIsCheckedByIdAsync({commit}, {skuID, isChecked}) {
		const res = await getCartIsCheckedById(skuID, isChecked);
		if (res.code === 200) {
			commit("UP_CAART_LIST_CHECKED_BY_ID", {skuID, isChecked})
		} else {
			alert("异常:" + res.message)
		}
	},
	async deleteCartListByIdAsync({dispatch, commit}, skuId) {
		// 根据商品ID删除购物车信息
		await deleteCartListById(skuId);
		// 方案一：更新购物车列表
		// await dispatch("getCartListAsync");
		// 方案二：
		commit("DELETE_CART_LIST_BY_ID", skuId);
	},
	async deleteCartListBatchAsync({dispatch, state}) {
		if (window.confirm("您确定要删除选中的数据吗")) {
			// console.log(state.cartList.filter(v=>v.isChecked===1).map(item=>item.skuId));
			await deleteCartListBatch(state.cartList.filter(v => v.isChecked === 1).map(item => item.skuId));
			await dispatch("getCartListAsync");
		}
		
	},
	async getCartListAsync({commit}) {
		const {data} = await getCartList();
		commit("SAVE_CART_LIST", data[0] ? data[0].cartInfoList : []);
	},
	async postAddToCartAsync(content, {skuId, skuNum}) {
		const res = await postAddToCart(skuId, skuNum);
		// console.log(res);
	}
}
const getters = {
	// 生成是否全选
	getIsAll({cartList}) {
		if(cartList.length===0) return false;
		return cartList.every(v => v.isChecked === 1);
	},
	getCountResult({cartList}) {
		let checkedNum = 0;
		let checkedPrice = 0;
		// console.log("cartList", cartList)
		cartList.forEach(item => {
			if (item.isChecked === 1) {
				checkedNum++;
				checkedPrice += item.skuPrice * item.skuNum
			}
		})
		// console.log(checkedNum, checkedPrice);
		return {
			checkedNum,
			checkedPrice
		}
	}
}
export default {
	namespaced: true,
	state,
	mutations,
	actions,
	getters
}