import { sphRequest } from "@/request";
// 获取验证码 /api/user/passport/sendCode/{phone}
export const getSendCode = phone=>sphRequest(`/user/passport/sendCode/${phone}`)

// 注册用户   /api/user/passport/register  post
export const postRegister = body=>sphRequest.post(`/user/passport/register`,body)

// 登陆  /api/user/passport/login post
export const postLogin=body=>sphRequest.post('/user/passport/login',body);

// 根据token获取用户信息 /api/user/passport/auth/getUserInfo  GET
export const getUserInfo =()=>sphRequest("/user/passport/auth/getUserInfo");

// 退出登录  /api/user/passport/logout
export const getLogOut =()=>sphRequest("/user/passport/logout")

//获取用户信息地址
///api/user/userAddress/auth/findUserAddressList GET
export const reqAddressInfo =()=>sphRequest({url: '/user/userAddress/auth/findUserAddressList'})

//10.获取交易页信息
// 10.1请求地址
// /api/order/auth/trade
// 10.2请求方式
// GET
export const reqOrderInfo=()=>sphRequest({url:"/order/auth/trade"})

//提交订单的接口  /api/order/auth/submitOrder?tradeNo={tradeNo} POST
export const postSubmitOrder=(tradeNo,data)=>sphRequest.post(`/order/auth/submitOrder?tradeNo=${tradeNo}`,data)
