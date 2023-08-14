import  {sphRequest} from "@/request";

// 获取订单支付信息：/payment/weixin/createNative/{orderId}
export const getCreateNative = (orderId) =>sphRequest(`/payment/weixin/createNative/${orderId}`);

//  查询订单的支付状态: /payment/weixin/queryPayStatus/{orderId}
export  const getQueryPayStatus = orderId=>sphRequest(`/payment/weixin/queryPayStatus/${orderId}`)
