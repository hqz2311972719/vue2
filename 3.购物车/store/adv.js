import {getFocusList, getTopToday} from "@/api/adv";

const state = {
	// 首页轮播图信息
	focusList: [],
	// 今日推荐
	topTodayList:[],
};
const mutations = {
	SAVE_FOCUS_LIST(state,focusList){
		state.focusList = focusList;
	},
	SAVE_TOP_TODAY_LIST(state,topTodayList){
		state.topTodayList = topTodayList;
	}
};
const actions = {
	async getFocusListAsync({commit}){
		const {data} = await getFocusList();
		commit("SAVE_FOCUS_LIST",data);
	},
	async getTopTodayAsync({commit}){
		const {data} = await getTopToday();
		commit("SAVE_TOP_TODAY_LIST",data);
	}
}
export default {
	namespaced:true,
	state,
	mutations,
	actions
}