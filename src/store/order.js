import {getTradeList, postSubmitOrder} from "@/api/order";
const state = {
	tradeInfo:{
		orderDetailVoList:[
			{
				orderDetailList:[]
			}
		]
	}
}
const mutations = {
	SAVE_TRADE_INFO(state,payload){
		state.tradeInfo = payload;
	}
}
const actions = {
	// 提交订单
	async postSubmitOrderAsync(context,body){
		const result = await postSubmitOrder(body);
		return result;
	},
	async getTradeListAsync({commit}){
		const result = await getTradeList();
		commit("SAVE_TRADE_INFO",result.data);
		// console.log(result);
	}
}
export default {
	namespaced:true,
	actions,
	state,
	mutations
}