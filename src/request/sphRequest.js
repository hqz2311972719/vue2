import axios from "axios";
import nprogress from "nprogress";
import store from "@/store";
import {getToken, getUserTempId} from "@/utils/auth";
import "nprogress/nprogress.css";
import {Message} from "element-ui";

const sphRequest = axios.create({
	baseURL: "/api",
	timeout: 5000
	
});
// 请求拦截
sphRequest.interceptors.request.use(config => {
	nprogress.start();// 开启进度条
	config.headers.userTempId = getUserTempId()
	const token = getToken();
	if(token)
		config.headers.token = token;
	return config;
});
// 响应拦截
sphRequest.interceptors.response.use(response => {
	nprogress.done();// 结束进度条
	// token异常
	if(response.data.code === 208){
		// 清空token
		// 跳转至登陆界面
		store.commit("user/OUT_LOG");
		Message.error("token超时，请重新登陆")
		return new Promise(()=>{});
	}
	if(response.data.code === 200 ||response.data.code ===205){
		// console.log(response.data,111)
		return response.data;// 返回响应体



	}
	// console.log(response.data.message)
	Message.error("异常："+response.data.message);

	return new Promise(()=>{});

}, (err) => {
	nprogress.done();// 结束进度条
	alert(err);
	return new Promise(() => {
	});// 返回一个状态为pending的Promise痊
});
export default sphRequest;
