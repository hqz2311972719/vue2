// mockjs可以帮助前端程序员快速创建API，模拟数据。
// mock的基本使用

import Mock from "mockjs";
import focusList from "./focus.json"
// 执行之后，那么在你发送ajax请求时会被拦截。
// 拦截的条件：
// 1.请求地址为/my
// 2.请求方式为get
// 注意：
// 1.mock接收的第一个参数是地址，第二个参数是请求方式，第三个参数是内容，配置好的内容体，比如data
// 2.被拦截下来的ajax请求（xhr,fetch)在网络中是无法查看的




// 完成接口
Mock.mock("http://mock.com/adv/focus","get",{
    ok:1,
    data:focusList
})