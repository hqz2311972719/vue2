import {v4 as uuidV4} from "uuid"

export const getUserTempId = function(){
    let userTempId = localStorage.getItem("userTempId");
    if(!userTempId){
        userTempId = uuidV4();
        localStorage.setItem("userTempId",userTempId);

    }
    return userTempId
}