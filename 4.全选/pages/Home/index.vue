<template>
    <div>
        <!--列表-->
        <div class="list-container">
            <div class="sortList clearfix">

                <!-- 轮播图广告 -->
                <FocusAdv></FocusAdv>


                <div class="right">
                    <div class="news">
                        <h4>
                            <em class="fl">尚品汇快报</em>
                            <span class="fr tip">更多 ></span>
                        </h4>
                        <div class="clearix"></div>
                        <ul class="news-list unstyled">
                            <li>
                                <span class="bold">[特惠]</span>备战开学季 全民半价购数码
                            </li>
                            <li>
                                <span class="bold">[公告]</span>备战开学季 全民半价购数码
                            </li>
                            <li>
                                <span class="bold">[特惠]</span>备战开学季 全民半价购数码
                            </li>
                            <li>
                                <span class="bold">[公告]</span>备战开学季 全民半价购数码
                            </li>
                            <li>
                                <span class="bold">[特惠]</span>备战开学季 全民半价购数码
                            </li>
                        </ul>
                    </div>
                    <ul class="lifeservices">
                        <li class=" life-item ">
                            <i class="list-item"></i>
                            <span class="service-intro">话费</span>
                        </li>
                        <li class=" life-item ">
                            <i class="list-item"></i>
                            <span class="service-intro">机票</span>
                        </li>
                        <li class=" life-item ">
                            <i class="list-item"></i>
                            <span class="service-intro">电影票</span>
                        </li>
                        <li class=" life-item ">
                            <i class="list-item"></i>
                            <span class="service-intro">游戏</span>
                        </li>
                        <li class=" life-item">
                            <i class="list-item"></i>
                            <span class="service-intro">彩票</span>
                        </li>
                        <li class=" life-item">
                            <i class="list-item"></i>
                            <span class="service-intro">加油站</span>
                        </li>
                        <li class=" life-item">
                            <i class="list-item"></i>
                            <span class="service-intro">酒店</span>
                        </li>
                        <li class=" life-item">
                            <i class="list-item"></i>
                            <span class="service-intro">火车票</span>
                        </li>
                        <li class=" life-item ">
                            <i class="list-item"></i>
                            <span class="service-intro">众筹</span>
                        </li>
                        <li class=" life-item">
                            <i class="list-item"></i>
                            <span class="service-intro">理财</span>
                        </li>
                        <li class=" life-item">
                            <i class="list-item"></i>
                            <span class="service-intro">礼品卡</span>
                        </li>
                        <li class=" life-item">
                            <i class="list-item"></i>
                            <span class="service-intro">白条</span>
                        </li>
                    </ul>
                    <div class="ads">
                        <img src="../../assets/images/home/ad1.png" />
                    </div>
                </div>
            </div>
        </div>

        <!--今日推荐-->
       <TodayRecommend></TodayRecommend>

        <!-- 商品排行 -->
        <RankList></RankList>

        <!-- 猜你喜欢 -->
        <Like></Like>

        <Floor></Floor>

        <!--商标-->
        <div class="brand">
            <div class="py-container">
                <ul class="brand-list">
                    <li class="brand-item">
                        <img src="../../assets/images/home/brand_21.png" />
                    </li>
                    <li class="brand-item">
                        <img src="../../assets/images/home/brand_03.png" />
                    </li>
                    <li class="brand-item">
                        <img src="../../assets/images/home/brand_05.png" />
                    </li>
                    <li class="brand-item">
                        <img src="../../assets/images/home/brand_07.png" />
                    </li>
                    <li class="brand-item">
                        <img src="../../assets/images/home/brand_09.png" />
                    </li>
                    <li class="brand-item">
                        <img src="../../assets/images/home/brand_11.png" />
                    </li>
                    <li class="brand-item">
                        <img src="../../assets/images/home/brand_13.png" />
                    </li>
                    <li class="brand-item">
                        <img src="../../assets/images/home/brand_15.png" />
                    </li>
                    <li class="brand-item">
                        <img src="../../assets/images/home/brand_17.png" />
                    </li>
                    <li class="brand-item">
                        <img src="../../assets/images/home/brand_19.png" />
                    </li>
                </ul>
            </div>
        </div>
    </div>

</template>

<script>
import FocusAdv from "@/pages/Home/FocusAdv";
import TodayRecommend from "@/pages/Home/TodayRecommend";
import Floor from "@/pages/Home/Floor";
import RankList from "@/pages/Home/RankList";
import Like from "@/pages/Home/Like";
export default {
    name: "Home",
    components: {Like, RankList, Floor, TodayRecommend, FocusAdv}
}
</script>

<style lang="less" scoped>


.list-container {
    width: 1200px;
    margin: 0 auto;


    .sortList {
        height: 464px;

        padding-left: 210px;



        .right {
            float: left;
            width: 250px;

            .news {
                border: 1px solid #e4e4e4;
                margin-top: 5px;

                h4 {
                    border-bottom: 1px solid #e4e4e4;
                    padding: 5px 10px;
                    margin: 5px 5px 0;
                    line-height: 22px;
                    overflow: hidden;
                    font-size: 14px;

                    .fl {
                        float: left;
                    }

                    .fr {
                        float: right;
                        font-size: 12px;
                        font-weight: 400;
                    }
                }

                .news-list {
                    padding: 5px 15px;
                    line-height: 26px;

                    .bold {
                        font-weight: 700;
                    }
                }
            }

            .lifeservices {
                border-right: 1px solid #e4e4e4;
                overflow: hidden;
                display: flex;
                flex-wrap: wrap;

                .life-item {
                    border-left: 1px solid #e4e4e4;
                    border-bottom: 1px solid #e4e4e4;
                    margin-right: -1px;
                    height: 64px;
                    text-align: center;
                    position: relative;
                    cursor: pointer;
                    width: 25%;

                    .list-item {
                        background-image: url(../../assets/images/home/icons.png);
                        width: 61px;
                        height: 40px;
                        display: block;
                    }

                    .service-intro {
                        line-height: 22px;
                        width: 60px;
                        display: block;
                    }

                    &:nth-child(1) {
                        .list-item {
                            background-position: 0px -5px;
                        }
                    }

                    &:nth-child(2) {
                        .list-item {
                            background-position: -62px -5px;
                        }
                    }

                    &:nth-child(3) {
                        .list-item {
                            background-position: -126px -5px;
                        }
                    }

                    &:nth-child(4) {
                        .list-item {
                            background-position: -190px -5px;
                        }
                    }

                    &:nth-child(5) {
                        .list-item {
                            background-position: 0px -76px;
                        }
                    }

                    &:nth-child(6) {
                        .list-item {
                            background-position: -62px -76px;
                        }
                    }

                    &:nth-child(7) {
                        .list-item {
                            background-position: -126px -76px;
                        }
                    }

                    &:nth-child(8) {
                        .list-item {
                            background-position: -190px -76px;
                        }
                    }

                    &:nth-child(9) {
                        .list-item {
                            background-position: 0px -146px;
                        }
                    }

                    &:nth-child(10) {
                        .list-item {
                            background-position: -62px -146px;
                        }
                    }

                    &:nth-child(11) {
                        .list-item {
                            background-position: -126px -146px;
                        }
                    }

                    &:nth-child(12) {
                        .list-item {
                            background-position: -190px -146px;
                        }
                    }
                }
            }

            .ads {
                margin-top: 5px;

                img {
                    opacity: 0.8;
                    transition: all 400ms;

                    &:hover {
                        opacity: 1;
                    }
                }
            }
        }
    }
}








.brand {
    margin: 10px 0;

    .py-container {
        width: 1200px;
        margin: 0 auto;

        .brand-list {
            overflow: hidden;
            padding: 15px 0;
            background: #f7f7f7;
            line-height: 18px;

            .brand-item {
                width: 120px;
                float: left;
                height: 37px;

                img {
                    border-left: 1px dotted #ccc;
                    padding: 0 10px;
                }

                &:first-child {
                    img {
                        border-left: 0;
                    }
                }
            }
        }
    }
}
</style>