import {sphRequest} from "@/request";
// 获取购物车列表:/api/cart/cartList  get
export const getCartList = ()=>sphRequest.get("/cart/cartList");
// 添加到购物车(对已有物品进行数量改动) /api/cart/addToCart/{skuId}/{skuNum} post
export const postAddToCart = (skuId,skuNum)=>sphRequest.post(`/cart/addToCart/${skuId}/${skuNum}`);
// 切换商品选中状态 /api/cart/checkCart/{skuID}/{isChecked}  get
// skuID:商品ID
// isChecked:商品选中状态 0代表取消选中 | 1代表选中
export const getCartIsCheckedById = (skuID,isChecked)=>sphRequest.get(`/cart/checkCart/${skuID}/${isChecked}`)
// 删除购物车商品: /api/cart/deleteCart/{skuId} delete
export const deleteCartListById = (skuId)=>sphRequest.delete(`/cart/deleteCart/${skuId}`)
// 批量删除购物车  /api/cart/batchDeleteCart  post
// 参数：skuIdList  数组  代表修改的商品id列表     请求体参数
export const deleteCartListBatch = (data)=>sphRequest.post(`/cart/batchDeleteCart`,data)

// 批量选中购物车  /api/cart/batchCheckCart/{isChecked}  post
// skuIdList  数组  代表修改的商品id列表     请求体参数
export const postBatchCheckCart = (isChecked,skuIdList)=>sphRequest.post(`/cart/batchCheckCart/${isChecked}`,skuIdList)
