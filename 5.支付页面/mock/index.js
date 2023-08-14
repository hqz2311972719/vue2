import Mock from "mockjs";
import focusList from "./focus.json";
import floorList from "./floor.json";
import rankList from "./rank.json";
import tejia from "./tejia.json";
import xinpin from "./xinpin.json";
import remai from "./remai.json";
import likeList from "./likeList.json";
// 获取首页中轮播图的图片列表
// 请求方式：get
// 请求地址：http://mock.com/adv/focus
// http://mock.com/adv/focus
Mock.mock("http://mock.com/adv/focus","get",{
	ok:200,
	data:focusList
})
// 获取轮播图底部的广告推荐商品
Mock.mock("http://mock.com/adv/topToday","get",{
	ok:200,
	data:[
		{
			id:1,
			imgUrl:"https://img14.360buyimg.com/n7/jfs/t1/160926/36/39154/42521/64cb95fbF17e9f5e2/46825eec5d36a9ac.jpg"
		},
		{
			id:2,
			imgUrl:"https://img12.360buyimg.com/n7/jfs/t1/114451/20/35763/328474/64cc52aeF75e02e83/a679d35a86500c90.png"
		},
		{
			id:3,
			imgUrl:"https://img10.360buyimg.com/n7/jfs/t1/118684/21/39853/31096/649182eaF26d07904/02445a2475df50e1.jpg"
		},{
			id:4,
			imgUrl:"https://img11.360buyimg.com/n7/jfs/t1/131081/19/39374/78410/64c77f21F7c291b6a/cb18f952320466fd.jpg"
		}
		
	]
})

// 楼层数据
Mock.mock("http://mock.com/product/floorList","get",{
	ok:200,
	data:floorList
})
// 排行数据
Mock.mock("http://mock.com/product/rankList","get",{
	ok:200,
	data:rankList
});

// 热卖排行
//                        /product/remai
Mock.mock("http://mock.com/product/remai","get",{
	ok:200,
	data:remai
});
// 新品排行
Mock.mock("http://mock.com/product/xinpin","get",{
	ok:200,
	data:xinpin
});
// 特价排行
Mock.mock("http://mock.com/product/tejia","get",{
	ok:200,
	data:tejia
});

// 猜你喜欢
Mock.mock("http://mock.com/product/likeList","get",{
	ok:200,
	data:likeList
})