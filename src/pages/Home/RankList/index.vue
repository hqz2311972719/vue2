<template>
    <div class="rank">
        <div class="tab">
            <div class="tab-tit clearfix">
                <a @click="type=0" href="javascript:;" :class="{on:type===0}">
                    <p class="img">
                        <i></i>
                    </p>
                    <p class="text">热卖排行</p>
                </a>
                <a @click="type=1" href="javascript:;" :class="{on:type===1}">
                    <p class="img">
                        <i></i>
                    </p>
                    <p class="text">特价排行</p>
                </a>
                <a @click="type=2" href="javascript:;" :class="{on:type===2}">
                    <p class="img">
                        <i></i>
                    </p>
                    <p class="text">新品排行</p>
                </a>
            </div>

        </div>
        <div class="content">
            <ul>
                <li>
                    <div v-for="item in $store.state.product.rankList2" class="img-item">
                        <p class="tab-pic">
                            <a href="#">
                                <img :src="item.imgUrl"/>
                            </a>
                        </p>
                        <div class="tab-info">
                            <div class="info-title">
                                <a href="#">{{item.name}}</a>
                            </div>
                            <p class="info-price">定金：{{item.price | currency(2,"￥")}}</p>
                        </div>
                    </div>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
export default {
    name: "RankList",
    data(){
        return {
            type:0
        }
    },
    watch:{
        type:{
            handler(){
                this.$store.dispatch("product/getRankList2Async",this.type)
            },
            immediate:true
        }
    }
}
</script>

<style lang="less" scoped>
.rank {
    width: 1200px;
    margin: 0 auto;

    .tab {
        margin: 0 auto;
        overflow: hidden;
        width: 312px;

        .tab-tit {
            text-align: center;

            a {
                display: block;
                padding: 0 18px;
                float: left;
                text-decoration: none;
                font-size: 16px;
                color: #999;

                p {
                    margin: 5px 0;
                }

                .img {
                    i {
                        width: 35px;
                        height: 35px;
                        display: block;
                        background: url(./images/bg0.png);
                        margin-left: 10px;
                    }
                }

                .text {
                    line-height: 28px;
                }
            }

            .on {
                color: #e60012;

                .img {
                    i {
                        background-position: -35px 0;
                    }
                }
            }
        }
    }

    .content {
        overflow: hidden;
        padding: 10px;

        ul {
            li {
                overflow: hidden;
                list-style: none;
                line-height: 18px;

                .img-item {
                    border: 1px solid #e1251b;
                    width: 269px;
                    float: left;
                    overflow: hidden;
                    margin: 0 12px 10px;
                    background: #fff;

                    .tab-pic {
                        width: 230px;
                        height: 210px;
                        overflow: hidden;
                        text-align: center;
                        margin: 5px auto 18px;

                        a {
                            img {
                                width: 200px;
                                height: 200px;
                            }
                        }
                    }

                    .tab-info {
                        background: #fafafa;

                        .info-title {
                            height: 50px;
                            line-height: 28px;
                            overflow: hidden;
                            margin: 0 auto;
                            padding-left: 10px;

                            a {
                                color: #333;
                                text-decoration: none;
                            }
                        }

                        .info-price {
                            font-size: 20px;
                            color: #e1251b;
                            height: 35px;
                            padding-left: 10px;
                            display: block;
                            line-height: 24px;
                            margin: 10px auto 0;
                        }
                    }
                }
            }
        }
    }
}
</style>