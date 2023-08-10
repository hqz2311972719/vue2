import cart from "@/pages/Cart"
import { getCartList,postAddToCart } from "@/api/cart"
// 在Vuex中，state是一个对象，它存储了应用程序的状态数据。state对象中的属性可以被组件访问和修改，通过这种方式实现了数据的共享和响应式更新
const state ={
    // 购物车列表
    // 接收cartList
    cartList:[]
};

const mutations={
    // 修改后的数据复制给状态state.cartList
    SAVE_CART_LIST(state,cartList){
        state.cartList = cartList
    },

    // 根据商品ID删除购物车中的商品
    DELETE_CART_LIST_BY_ID(state,skuId){
        state.cartList =state.cartList.filter(v=>v.skuId !==skuId)
    }
};

const actions={
    async getCartListAsync ({commit}){
        // 从后台获取响应回来的数据,赋值给res.data
        const res =await getCartList();
        // 对响应回来的数据res.data通过mutaitons调用commit进行修改
        commit ("SAVE_CART_LIST",res.data)
    },
    async postAddToCartAsync(context,{skuId,skuNum}){
        const res =await postAddToCart(skuId,skuNum);
    },
    async getCartIsCheckedByIdAsync({dispatch},{skuID,isChecked}){
        // 调用封装好的api接口，从后台获取数据
        const res = await getCartIsCheckedById(skuID,isChecked);
        if(res.code ===200){
            // 重新获取购物车列表
            dispatch("getCartListAsync");

        }else{
            alert("异常"+res)
        }
    },
    async deleteCartListByIdAsync ({dispatch,commit},skuId){
        // 根据商品ID删除购物车信息
        await deleteCartListById(skuId);
        // 更新购物车列表
        await dispatch("getCartListAsync")
    }
}

export default{
    namespaced:true,
    state,
    mutations,
    actions
}