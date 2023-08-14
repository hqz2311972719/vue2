import {sphRequest} from "@/request";
// 获取验证码 /api/user/passport/sendCode/{phone}
export const getSendCode = phone => sphRequest(`/user/passport/sendCode/${phone}`);

// 注册用户  /api/user/passport/register  post
export const postRegister = body =>sphRequest.post(`/user/passport/register`,body);

// 登陆  /api/user/passport/login post
export const postLogin = body =>sphRequest.post("/user/passport/login",body);

// 根据token获取用户信息 /api/user/passport/auth/getUserInfo  GET
export const getUserInfo = ()=>sphRequest("/user/passport/auth/getUserInfo");

// 退出登陆 /api/user/passport/logout
export const getLogout = ()=> sphRequest("/user/passport/logout");

// 获取用户地址信息 /user/userAddress/auth/findUserAddressList
export const findUserAddressList = ()=>sphRequest("/user/userAddress/auth/findUserAddressList");
