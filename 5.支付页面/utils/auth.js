import {v4 as uuidV4} from "uuid"

export const getUserTempId = function () {
	let userTempId = localStorage.getItem("userTempId");
	if(!userTempId){
		userTempId = uuidV4();
		localStorage.setItem("userTempId", userTempId);
	}
	return userTempId
}

// 封装token
// 获取token
export const getToken=()=>localStorage.getItem("token");

// 保存token
export const saveToken=token=>localStorage.setItem("token",token)

// 删除token
export const removeToken =()=>localStorage.removeItem("token");
