<template>
    <!--list-content-->
    <div class="main">
        <div class="py-container">
            <!--bread-->
          <BreadSelector></BreadSelector>
            <!--selector-->
            <SearchSelector></SearchSelector>
            <!--details-->
            <div class="details clearfix">
                <div class="sui-navbar">
                    <div class="navbar-inner filter">
                        <ul class="sui-nav">
                            <li @click.prevent="orderSearch(1)" :class="{active:type ==1}">
                                <a href="#">综合<i  v-show="type==1"  :class="upOrDown"></i></a>
                            </li>
                           
                            <!-- <li>
                                <a href="#">价格⬆</a>
                            </li> -->
                            <li @click.prevent="orderSearch(2)" :class="{active:type ==2}">
                                <a href="#">价格<i v-show="type==2"  :class="upOrDown"></i></a>
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
                                    <a href="success-cart.html" target="_blank" class="sui-btn btn-bordered btn-danger">加入购物车</a>
                                    <a href="javascript:void(0);" class="sui-btn btn-bordered">收藏</a>
                                </div>
                            </div>
                        </li>
                    </ul>
                </div>
                <!-- 分页组件  定义好连续页，总页数等-->
               <Pagination :continue="5" :total="103" :pageNo ="16" :pageSize="5" ></Pagination>
            </div>
            <!--hotsale-->
         <HotSale></HotSale>
        </div>
    </div>
</template>

<script>
import SearchSelector from "@/pages/Search/SearchSelector";
import BreadSelector from "@/pages/Search/BreadSelector"
import HotSale from "@/pages/Search/HotSale"
export default {
    name: "Search",
    components: {SearchSelector,BreadSelector,HotSale},
    data(){
        // 转化为数组
        const [type,flag] =(this.$route.query.order ||"1:desc").split(":");

        return{
            // 排序方式
            // 排序类型（type） 1:综合 2.价格
            // 排序标识： asc:升序  dsec:降序
            // 示例：“1：desc”
            type,
            flag
        }
    },
    methods:{

        orderSearch(type){
            // 当前排序类别与选中的类别是否相同,如果
            if(this.type ===type){
                this.flag =this.flag ==="desc"?"asc":"desc";

            }else{
                this.type =type;
                this.flag ="desc";

            }
            this.$router.push({
                path:"/search",
                query:{
                    ...this.$route.query,
                    order:this.type+":"+this.flag
                }
            })

        },

        // 移除属性
        moveProps(prop){
            this.$route.push({
                path:"/search",
                query:{
                    ...this.$route.query,
                    props:this.$route.query.props.filter(v=>v !== prop)
                }
            })
        },



        // 移除类别标签
        moveCategoryName(){
            // 1- category3Id=249&categoryName=台灯
            // const query = {...this.$route.query};
            // delete query.categoryName;
            // delete query.category3Id;
            // delete query.category2Id;
            // delete query.category1Id;
            // // console.log(this.$route.query)
            // this.$router.push({
            //     path:"/search",
            //     query
            // })

            // 2
            const {keyword} = this.$route.query;
            this.$router.push({
                path:"/search",
                query:{
                    keyword
                }
            })
        },
        moveKeyword(){
            // 1
            // this.$router.push({
            //     path:"/search",
            //     query:{
            //         keyword:undefined
            //     }
            // })

            // 2
            const query = {...this.$route.query};
            delete query.keyword;
            this.$router.push({
                path:"/search",
                query
            });
            this.$bus.$emit("clearKeyword");
        },
        moveTrademark(){
            const query = {...this.$route.query}
            delete query.trademark;
            this.$router.push({
                path:"/search",
                query
            })
        }
    },
   
    watch:{
        "$route.query":{
            handler(query){
                this.$store.dispatch("product/postProductListAsync",query)
            },
            immediate:true
        }
    },
    beforeDestroy() {
        this.$bus.$emit("clearKeyword");
    },
    computed:{
          upOrDown(){
            return this.flag ==="desc"?"iconfont icon-icon_down":"iconfont icon-icon_up"
        },

        isSelector(){
            return
            Object.values(this.$route.query).filter(v=>v).length>0
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
            .pagination {
                text-align: center;

                button {
                    margin: 0 5px;
                    background-color: #f4f4f5;
                    color: gray;
                    outline: none;
                    border-radius: 2px;
                    padding: 0 4px;
                    vertical-align: top;
                    display: inline-block;
                    font-size: 13px;
                    min-width: 35.5px;
                    height: 28px;
                    line-height: 28px;
                    cursor: pointer;
                    box-sizing: border-box;
                    text-align: center;
                    border: 0;

                    &[disabled] {
                        color: #c0c4cc;
                        cursor: not-allowed;
                    }

                    &.active {
                        cursor: not-allowed;
                        background-color: #c81623;
                        color: #fff;
                    }
                }

                span {
                    display: inline-block;
                    line-height: 28px;
                    font-size: 14px;
                    color: gray;
                    vertical-align: middle;
                }
            }
        }
     
    }
}
</style>