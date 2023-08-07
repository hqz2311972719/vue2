import {sphRequest} from "@/request";
// 首页三级分类 get   /api/product/getBaseCategoryList
export const getBaseCategoryList = ()=>sphRequest("/product/getBaseCategoryList");

// 搜索商品，body请求体数据
export const postProductList = (body)=>sphRequest.post("/list",body)