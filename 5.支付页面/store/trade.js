import {reqAddressInfo} from "@/api/user";
import  {reqOrderInfo} from "@/api/user"
import  {postSubmitOrder} from "@/api/user"


const state={
    address:[],
    orderInfo:{},
    submitOrder:{}
};
const mutations={
    GETUSERADDRESS(state,address){
        state.address=address;
    },
    GETORDERINFO(state,orderInfo){
        state.orderInfo = orderInfo
    },
    SUBMIT_ORDER(state,submitOrder){
        state.submitOrder=submitOrder
    }
};
const actions={
    // 获取提交的订单
    async postSubmitOrderAsync({commit},data){
        let result =await  postSubmitOrder();
        commit("SUBMIT_ORDER",result.data)
    },



    //获取用户地址信息
     async getUserAddress({commit}){
      let result= await  reqAddressInfo();
      if(result.code ===200){
          commit("GETUSERADDRESS",result.data)

      }

    },

    // 获取商品清单数据
    async getOrderInfo({commit}){
       let result= await reqOrderInfo();
       if(result.code ===200){
           commit("GETORDERINFO",result.data)

       }
    }
};
const getters={};

export default{
    state,
    mutations,
    actions,
    getters
}