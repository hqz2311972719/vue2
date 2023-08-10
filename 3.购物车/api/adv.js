// 提供与广告相关的接口
import {mockRequest} from "@/request";
// 获取首页中轮播图的图片列表
export const  getFocusList = ()=> mockRequest("/adv/focus") ;

// 获取轮播图底部的今日推荐
export const getTopToday = ()=> mockRequest("/adv/topToday");