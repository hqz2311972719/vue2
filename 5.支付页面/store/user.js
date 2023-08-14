import {getSendCode, postLogin, postRegister, getUserInfo, getLogOut} from "@/api/user";

import { Message } from "element-ui";
import router from "@/router";
import { saveToken ,removeToken} from "@/utils/auth";
const state={
    userInfo:null
}

const mutations={
    SAVE_USER_INFO(state,userInfo){
        state.userInfo =userInfo
    },
    OUT_LOG(){
        state.userInfo =null;
        // 清除token
        removeToken();
        router.push("/login")
    }
}

const actions={
    async getLogOutAsync({commit}){
        await getLogOut();
        commit("OUT_LOG");

    },

    async getSendCodeAsync(content,phone){
        const result =await getSendCode(phone);
        return result.data;
    },

    async postRegisterAsync(content,body){
        const result = await postRegister(body)
        return result;
    },

    async postLoginAsync({dispatch},body){
        const {code,data} =await postLogin(body);
        if(code === 200){
			Message.success("恭喜您，登陆成功！");
            // localStorage.setItem("token",data.token);
            saveToken(data.token);
            // await dispatch("getUserInfoAsync");
            const {cb} =router.history.current.query;
            if(cb) router.push(cb);

			else router.push("/");// 跳转至首页

		}else{
			Message.error("账号或密码错误！");
		}
    },
    // 获取个人信息
    async getUserInfoAsync({commit}){
        const result = await getUserInfo();
        // console.log(result)
        commit("SAVE_USER_INFO",result.data)
    }
}

export default {
    namespaced:true,
    actions,
    state,
    mutations
}