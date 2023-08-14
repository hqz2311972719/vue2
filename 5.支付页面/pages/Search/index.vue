<template>
    <!--list-content-->
    <div class="main">
        <div class="py-container">
            <!--bread-->
            <div class="bread" v-show="isSelector">
                <ul class="fl sui-breadcrumb">
                    <li>
                        <a href="#">全部结果</a>
                    </li>
                </ul>
                <ul class="fl sui-tag">
                    <!--  渲染类别名称 -->
                    <li v-if="$route.query.categoryName" class="with-x">
                        {{$route.query.categoryName}}<i @click="moveCategoryName">×</i>
                    </li>
                    <!--  关键词内容 -->
                    <li v-if="$route.query.keyword" class="with-x">
                        {{$route.query.keyword}}<i @click="moveKeyword">×</i>
                    </li>
                    <!--  品牌 -->
                    <li v-if="$route.query.trademark" class="with-x">
                        {{$route.query.trademark.split(":")[1]}}<i @click="moveTrademark">×</i>
                    </li>
                    <!-- 属性 -->
                    <li v-for="item in $route.query.props" class="with-x">
                        {{item.split(":")[1]}}<i @click="$router.goSearch({props:$route.query.props.filter(v=>v !== item)})">×</i>
                    </li>
                </ul>
            </div>
            <!--selector-->
            <SearchSelector></SearchSelector>
            <!--details-->
            <div class="details clearfix">
                <div class="sui-navbar">
                    <div class="navbar-inner filter">
                        <ul class="sui-nav">
                            <li @click.prevent="orderSearch(1)" :class="{active:type==1}">
                                <a href="#">综合<i v-show="type==1" :class="upOrDown"></i></a>
                            </li>
                            <li @click.prevent="orderSearch(2)" :class="{active:type==2}">
                                <a href="#">价格<i v-show="type==2" :class="upOrDown"></i></a>
                            </li>
                        </ul>
                    </div>
                </div>
                <div class="goods-list">
                    <ul class="yui3-g">
                        <li :key="item.id" v-for="item in $store.state.product.searchProductResult.goodsList" class="yui3-u-1-5">
                            <div class="list-wrap">
                                <div class="p-img">
                                    <router-link :to="'/detail/'+item.id+'.html'"><img :src="item.defaultImg" /></router-link>
                                </div>
                                <div class="price">
                                    <strong>
                                        <em>¥</em>
                                        <i>{{item.price}}</i>
                                    </strong>
                                </div>
                                <div class="attr">
                                    <a target="_blank" href="item.html"  :title="item.title" v-html="item.title"></a>
                                </div>
                                <div class="commit">
                                    <i class="command">已有<span>{{item.hotScore}}</span>人评价</i>
                                </div>
                                <div class="operate">
                                    <a @click.prevent="addCart(item.id)" href="success-cart.html" target="_blank" class="sui-btn btn-bordered btn-danger">加入购物车</a>
                                    <a href="javascript:void(0);" class="sui-btn btn-bordered">收藏</a>
                                </div>
                            </div>
                        </li>
                    </ul>
                </div>
                <!-- 分页组件-->
                <Pagination :continue="5"
                            @change-page-no="pageNo=>$router.goSearch({pageNo})"
                            :total="$store.state.product.searchProductResult.total"
                            :pageNo="$store.state.product.searchProductResult.pageNo"
                            :pageSize="$store.state.product.searchProductResult.pageSize"></Pagination>


            </div>
        </div>
    </div>
</template>

<script>
import SearchSelector from "@/pages/Search/SearchSelector";
export default {
    name: "Search",
    components: {SearchSelector},
    data(){
        const [type,flag]= (this.$route.query.order || "1:desc").split(":");
        return {
            type:type/1,// 综合
            flag
        }
    },
    methods:{
        // 加入购物车
        async addCart(skuId){
            // 获取商品详情
            await this.$store.dispatch("product/getProductInfoByIdAsync",skuId)
            // 将商品详情放置storage中
            sessionStorage.setItem("addCartInfo",JSON.stringify({
                buyNum:1,
                attrList:this.$store.state.product.productInfo.spuSaleAttrList,
                ...this.$store.state.product.productInfo.skuInfo
            }));
            // 加入购物车
            await this.$store.dispatch("cart/postAddToCartAsync",{
                skuId,
                skuNum:1
            })
            // 跳转至加入购物车成功页面
            this.$router.push("/addCartSuccess")
        },
        // changePageNo(pageNo){
        //     this.$router.goSearch({pageNo});
        // },
        orderSearch(type){
            console.log(222,this.type,type);
            // 当前的排序类别与选中的类别是否相同
            if(this.type === type){
                console.log(11111,this.flag);
                this.flag = this.flag==="desc"?"asc":"desc";
            }else{
                this.type = type;
                this.flag = "desc";
            }
            this.$router.goSearch({order:this.type+":"+this.flag});
        },
        // 移除类别标签
        moveCategoryName(){
            // 1- category3Id=249&categoryName=台灯
            this.$router.goSearch({
                categoryName:undefined,
                category3Id:undefined,
                category2Id:undefined,
                category1Id:undefined
            });
        },
        moveKeyword(){
            this.$router.goSearch({
                keyword:undefined
            })
            this.$bus.$emit("clearKeyword");
        },
        moveTrademark(){
            this.$router.goSearch({trademark:undefined});
        }
    },
    watch:{
        "$route.query":{
            handler(query){
                const {pageNo,pageSize} = this.$store.state.product.searchProductResult;
                if(query.props && (typeof query.props === "string")){
                    query.props = [query.props];
                }
                this.$store.dispatch("product/postProductListAsync",{
                    pageNo,
                    pageSize,
                    ...query
                })
            },
            immediate:true
        }
    },
    beforeDestroy() {
        this.$bus.$emit("clearKeyword");
    },
    computed:{
        upOrDown(){
           return this.flag === "desc"?"iconfont icon-icon_down":"iconfont icon-icon_up"
        },
        isSelector(){
            const query = {...this.$route.query};
            delete query.pageNo;
            if(query.props && query.props.length===0)
                delete query.props;
            return Object.values(query).filter(v=>{
                // v的值是undefined,key的属性名为pageNo
                return v;
            }).length>0;
        }
    }
}
</script>

<style lang="less" scoped>
h3{
    padding:50px;
    background: yellow;
}
.main{
    margin: 10px 0;
    .py-container{
        width: 1200px;
        margin: 0 auto;
        .bread{
            margin-bottom: 5px;
            overflow: hidden;
            .sui-breadcrumb{
                padding: 3px 15px;
                margin: 0;
                font-weight: 400;
                border-radius: 3px;
                float:left;
                li{
                    display: inline-block;
                    line-height: 18px;
                    a{
                        color: #666;
                        text-decoration: none;
                        &:hover{
                            color: #4cb9fc;
                        }
                    }
                }
            }
            .sui-tag{
                margin-top: -5px;
                list-style: none;
                font-size: 0;
                line-height: 0;
                padding: 5px 0 0;
                margin-bottom: 18px;
                float: left;
                .with-x{
                    font-size: 12px;
                    margin: 0 5px 5px 0;
                    display: inline-block;
                    overflow: hidden;
                    color: #000;
                    background: #f7f7f7;
                    padding: 0 7px;
                    height: 20px;
                    line-height: 20px;
                    border: 1px solid #dedede;
                    white-space: nowrap;
                    transition:color 400ms;
                    cursor: pointer;
                    i{
                        margin-left: 10px;
                        cursor: pointer;
                        font: 400 14px tahoma;
                        display: inline-block;
                        height: 100%;
                        vertical-align: middle;
                    }
                    &:hover{
                        color: #28a3ef;
                    }
                }
            }
        }

        .details{
            margin-bottom: 5px;
            .sui-navbar{
                overflow: visible;
                margin-bottom: 0;
                .filter{
                    min-height: 40px;
                    padding-right: 20px;
                    background: #fbfbfb;
                    border: 1px solid #e2e2e2;
                    padding-left: 0;
                    border-radius: 0;
                    box-shadow: 0 1px 4px rgba(0, 0, 0, 0.065);
                    .sui-nav{
                        position: relative;
                        left: 0;
                        display: block;
                        float: left;
                        margin: 0 10px 0 0;
                        li{
                            float: left;
                            line-height: 18px;
                            a{
                                display: block;
                                cursor: pointer;
                                padding: 11px 15px;
                                color: #777;
                                text-decoration: none;
                            }
                            &.active{
                                a{
                                    background: #e1251b;
                                    color: #fff;
                                }
                            }
                        }
                    }
                }
            }
            .goods-list{
                margin: 20px 0;
                ul{
                    display:flex;
                    flex-wrap:wrap;
                    li{
                        height: 100%;
                        width: 20%;
                        margin-top: 10px;
                        line-height: 28px;
                        .list-wrap{
                            .p-img{
                                padding-left: 15px;
                                width: 215px;
                                height: 255px;
                                a{
                                    color: #666;
                                    img{
                                        max-width: 100%;
                                        height: auto;
                                        vertical-align: middle;
                                    }
                                }
                            }
                            .price{
                                padding-left: 15px;
                                font-size: 18px;
                                color: #c81623;
                                strong{
                                    font-weight: 700;
                                    i{
                                        //margin-left: -5px;
                                    }
                                }
                            }
                            .attr{
                                padding-left: 15px;
                                width: 85%;
                                overflow: hidden;
                                margin-bottom: 8px;
                                min-height: 38px;
                                cursor: pointer;
                                line-height: 1.8;
                                display: -webkit-box;
                                -webkit-box-orient: vertical;
                                -webkit-line-clamp: 2;
                                a{
                                    color: #333;
                                    text-decoration: none;
                                }
                            }
                            .commit{
                                padding-left: 15px;
                                height: 22px;
                                font-size: 13px;
                                color: #a7a7a7;
                                span{
                                    font-weight: 700;
                                    color: #646fb0;
                                }
                            }
                            .operate{
                                padding: 12px 15px;
                                .sui-btn{
                                    display: inline-block;
                                    padding: 2px 14px;
                                    box-sizing: border-box;
                                    margin-bottom: 0;
                                    font-size: 12px;
                                    line-height: 18px;
                                    text-align: center;
                                    vertical-align: middle;
                                    cursor: pointer;
                                    border-radius: 0;
                                    background-color: transparent;
                                    margin-right: 15px;
                                }
                                .btn-bordered{
                                    min-width: 85px;
                                    background-color: transparent;
                                    border: 1px solid #8c8c8c;
                                    color: #8c8c8c;
                                    &:hover{
                                        border: 1px solid #666;
                                        color: #fff!important;
                                        background-color: #666;
                                        text-decoration: none;
                                    }
                                }
                                .btn-danger{
                                    border: 1px solid #e1251b;
                                    color: #e1251b;
                                    &:hover{
                                        border: 1px solid #e1251b;
                                        background-color: #e1251b;
                                        color:white!important;
                                        text-decoration: none;

                                    }
                                }
                            }
                        }
                    }
                }
            }

        }
    }
}
</style>