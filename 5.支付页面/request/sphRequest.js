import axios from "axios";
import nprogress from "nprogress";
import "nprogress/nprogress.css";
import {getUserTempId} from "@/utils/auth";
import { getToken } from "@/utils/auth";
import store from "@/store";
import {Message} from "element-ui";

const sphRequest = axios.create({
	baseURL: "/api",
	timeout: 5000
	
});
// 请求拦截
sphRequest.interceptors.request.use(config => {
	nprogress.start();// 开启进度条
	config.headers.userTempId = getUserTempId();
	// 请求头携带token
	const token = getToken();
	if(token)
		config.headers.token = token;
	return config;
});
// 响应拦截
sphRequest.interceptors.response.use(response => {
	nprogress.done();// 结束进度条
	// return response.data;// 返回响应体
// 	token异常
	if(response.data.code ===208){
	// 	清空token
	// 	跳转至登录页面
		store.commit("user/OUT_LOG");
		Message.error("token异常，请重新登录")
		return new Promise(()=>{})

	}
	if(response.data.code ===200){
		return  response.data  //返回响应体
	}
	Message.error("异常："+response.data.message);
	return new Promise(()=>{})
}, (err) => {
	nprogress.done();// 结束进度条
	alert(err);
	return new Promise(() => {
	});// 返回一个状态为pending的Promise
});
export default sphRequest;
