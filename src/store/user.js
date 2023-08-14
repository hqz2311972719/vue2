import {findUserAddressList, getLogout, getSendCode, getUserInfo, postLogin, postRegister} from "@/api/user";
import {Message} from "element-ui";
import router from "@/router";
import {removeTOken, saveToken} from "@/utils/auth";
const state = {
	userInfo:null,
	addressList:[]
}
const mutations = {
	SAVE_ADDRESS_LIST(state,payload){
		state.addressList = payload;
	},
	// 根据ID更改默认地址
	CHANGE_ADDRESS_DEFAULT_BY_ID(state,id){
		// 1- 先将之前选中的移除
		// 2- 将当前选中的增加上样式
		state.addressList = state.addressList.map(item=>{
			if(item.id === id) item.isDefault ='1'
			else item.isDefault = '0';
			return item;
		})
	},
	SAVE_USER_INFO(state,userInfo){
		state.userInfo = userInfo;
	},
	OUT_LOG(){
		state.userInfo = null;
		removeTOken();
		router.push("/login");
	}
}
const actions = {
	// 获取地址列表
	async findUserAddressListAsync({commit}){
		const {data} = await findUserAddressList();
		commit("SAVE_ADDRESS_LIST",data);
	},
	async getLogOutAsync({commit}){
	    await getLogout();
		commit("OUT_LOG");
	},
	async getSendCodeAsync(content,phone){
		const result = await getSendCode(phone);
		return result.data;
	},
	async postRegisterAsync(content,body){
		const result = await postRegister(body);
		return result;
	},
	// 1
	async postLoginAsync({dispatch},body){
		const {code,data} = await postLogin(body);
		if(code === 200){
			Message.success("恭喜您，登陆成功！");
			saveToken(data.token);
			const {cb} = router.history.current.query;
			if(cb) router.push(cb);
			else router.push("/");// 跳转至首页

		}else{
			Message.error("账号或密码错误！");
		}
	},
	// 获取个人信息
	async getUserInfoAsync({commit}){
		const result = await getUserInfo();
		commit("SAVE_USER_INFO",result.data);
	}
}
const getters = {
	addressDefault(state){
		return state.addressList.find(v=>v.isDefault==='1') || {}
	}
}
export default {
	namespaced:true,
	actions,
	state,
	mutations,
	getters
}