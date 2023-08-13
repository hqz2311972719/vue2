import { getUserTempId } from "@/utils/auth";
import axios from "axios";
import nprogress from "nprogress";
import "nprogress/nprogress.css";
const sphRequest = axios.create({
	baseURL:"/api",
	timeout:5000
});
// 请求拦截
sphRequest.interceptors.request.use(config=>{
	nprogress.start();// 开启进度条
	config.headers.userTempId = getUserTempId()
	return config;
});
// 响应拦截
sphRequest.interceptors.response.use(response=>{
	nprogress.done();// 结束进度条
	return response.data;// 返回响应体
},(err)=>{
	nprogress.done();// 结束进度条
	alert(err);
	return new Promise(()=>{});// 返回一个状态为pending的Promise痊
});
export default sphRequest;
