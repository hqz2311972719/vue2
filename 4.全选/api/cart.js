import { sphRequest } from "@/request";
// 获取购物车列表:/api/cart/cartList  get
export const getCartList = ()=>sphRequest("/cart/cartList ")

// 添加到购物车（对已有物品进行数量改动）
//   /api/cart/addToCart/{skuId}/{skuNum} post
// 调用接口，发送参数获取数据
export const postAddToCart=(skuId,skuNum)=>sphRequest.post(
    `/cart/addToCart/${skuId}/${skuNum}`
    )

    // 调用接口修改选中的状态，本地数据未更改。解决方案一：修改完成后，重新调用购物车列表相关的接口
    // 优点：简洁，程序少
    // 缺点：需要重新发送请求，如果操作频率高会对服务器造成压力。

  // 切换商品选中状态 /api/cart/checkCart/{skuID}/{isChecked}  get

//   skuID：商品ID
// isChecked:商品选中状态 0 代表取消选中 | 1代表选中
export const getCartIsCheckedById =(skuID,isChecked)=>sphRequest.get(`/cart/checkCart/${skuID}/${isChecked} `)

// 删除购物车商品: /api/cart/deleteCart/{skuId} delete
export const deleteCartListById  =(skuId)=>sphRequest.delete(`/cart/deleteCart/${skuId}`)

// 删除选中购物车商品
// 批量删除购物车  /api/cart/batchDeleteCart  post
// 参数：skuIdList  数组  代表修改的商品id列表     请求体参数
export const deleteCartListBatch = (data)=>sphRequest.post(`/cart/batchDeleteCart`,data)


// 批量选中购物车   /api/cart/batchCheckCart/{isChecked}  post
// skuIdList  数组  代表修改的商品id列表     请求体参数
export const postBatchCheckCart =(isChecked,skuidList)=>sphRequest.post(`/cart/batchCheckCart/${isChecked}`,skuidList)
