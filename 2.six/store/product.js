import {getBaseCategoryList} from "@/api/product";
import { postProductList } from "@/api/product";

const state = {
	// 首页分类列表
	categoryList:[],

	// 商品列表
	searchProductResult:[]
}
const mutations = {
	// 更新首页分类列表
	UP_CATEGORY_LIST(state,categoryList){
		state.categoryList = categoryList;
	},
	SAVE_SEARCH_PRODUCT_RESULT(state,result){
		state.searchProductResult = result;
	}
}
const actions = {
	async getBaseCategoryListAsync({commit},num=1){
		const {data} = await getBaseCategoryList();
		commit("UP_CATEGORY_LIST",data.splice(0,num));
	},
	async postProductListAsync({commit},body){
		const {data} = await postProductList(body);
		// console.log(1111,data);
		commit("SAVE_SEARCH_PRODUCT_RESULT",data)
	}
}
export default {
	namespaced:true,
	state,
	mutations,
	actions
}