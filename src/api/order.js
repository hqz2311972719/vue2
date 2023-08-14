import {sphRequest} from "@/request";
// 获取交易页信息:/order/auth/trade get
export const getTradeList = ()=>sphRequest.get("/order/auth/trade");

// 提交订单：/order/auth/submitOrder?tradeNo={tradeNo} post
export const postSubmitOrder = body=>{
	return sphRequest.post(`/order/auth/submitOrder?tradeNo=${body.tradeNo}`,body)
}
