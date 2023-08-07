// axios的二次封装
import axios from "axios";
import nProgress from "nprogress";
import "nprogress/nprogress.css";

const sphRequest = axios.create({
    baseURL:"/api",
    timeout:5000
});
// 请求拦截
sphRequest.interceptors.request.use(config=>{
    nProgress.start(); //开启进度条
    return config
});
// 响应拦截
sphRequest.interceptors.response.use(response=>{
    nProgress.done(); //结束进度条
    return response.data; //返回响应头

},(err)=>{
    nProgress.done //结束进度条
    alert(err);
    return new Promise(()=>{}); //返回一个状态为pending的promis
});
export default sphRequest;