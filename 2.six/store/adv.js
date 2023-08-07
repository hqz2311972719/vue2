import { getFocusList } from "@/api/adv";

const state={
    getFocusList:[]
};
const mutations ={
    SAVE_FOCUS_LIST(state,focusList){
        state.focusList = focusList

    }
};
const actions={
    async getFocusListAsync ({commit}){
        const {data} =await getFocusList();
        commit("SAVE_FOCUS_LIST",data)
    }
}

export default{
    namespaced:true,
    state,
    mutations,
    actions
}