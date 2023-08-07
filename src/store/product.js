import {
	getBaseCategoryList,
	getFloorList,
	getRankList,
	getRemaiList,
	getTeJiaList,
	getXinPinList,
	postProductList
} from "@/api/product";

const state = {
	// 首页分类列表
	categoryList:[],
	floorList:[],// 楼层数据信息
	rankList:[],
	rankList2:[],// 第二种方案
	// 搜索的结果
	searchProductResult:{
		trademarkList:[]
	}
}
const mutations = {
	// 保存搜索结果
	SAVE_SEARCH_PRODUCT_RESULT(state,result){
		state.searchProductResult = result;
	},
	// 更新首页分类列表
	UP_CATEGORY_LIST(state,categoryList){
		state.categoryList = categoryList;
	},
	SAVE_FLOOR_LIST(state,floorList){
		state.floorList = floorList;
	},
	SAVE_RANK_LIST(state,rankList){
		state.rankList = rankList;
	},
	SAVE_RANK_LIST2(state,rankList){
		state.rankList2 = rankList;
	}
}
const actions = {
	async postProductListAsync({commit},body){
		const {data} = await postProductList(body);
		commit("SAVE_SEARCH_PRODUCT_RESULT",data);
	},
	async getBaseCategoryListAsync({commit},num=1){
		const {data} = await getBaseCategoryList();
		commit("UP_CATEGORY_LIST",data.splice(0,num));
	},
	async getFloorListAsync({commit}){
		const {data} = await getFloorList();
		commit("SAVE_FLOOR_LIST",data);
	},
	async getRankListAsync({commit}){
		const {data} = await getRankList();
		commit("SAVE_RANK_LIST",data);
	},
	async getRankList2Async({commit},type){
		// type：0-remai  1- tejia  2-xinpin
		// console.log(1111,type);
		let data;
		if(type === 0)
			({data} = await getRemaiList());
		else if(type === 1)
			({data} = await getTeJiaList());
		else
			({data} = await getXinPinList());
		// console.log(3333,data);
		commit("SAVE_RANK_LIST2",data);
	},
}
export default {
	namespaced:true,
	state,
	mutations,
	actions
}