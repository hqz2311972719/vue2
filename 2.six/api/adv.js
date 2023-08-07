// 提供与广告相关的接口,调用防撞好的axios
import { mockRequest } from "@/request";
export const getFocusList =()=>mockRequest("/adv/focus")
