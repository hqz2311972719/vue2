import {mockRequest, sphRequest} from "@/request";
// 首页三级分类 get   /api/product/getBaseCategoryList
export const getBaseCategoryList = ()=>sphRequest("/product/getBaseCategoryList");
// 获取楼层信息
export const getFloorList = ()=>mockRequest("/product/floorList");
// 获取商品排行数据
export const getRankList = ()=>mockRequest("/product/rankList");
export const getRemaiList = ()=>{
	// console.log(2222)
	return mockRequest("/product/remai");
}
export const getTeJiaList = ()=>mockRequest("/product/tejia");
export const getXinPinList = ()=>mockRequest("/product/xinpin");
// 搜索商品,body请求体数据
export const postProductList = (body)=>{
	// body.order = "2:desc";
	return sphRequest.post("/list",body);
}
// 根据商品ID获取商品详情： /api/item/{ skuId }
export const getProductInfoById = skuId =>sphRequest.get(`/item/${skuId}`);