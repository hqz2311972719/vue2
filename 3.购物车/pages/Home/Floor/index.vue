<template>
    <div>
        <div class="floor" v-for="floorInfo in $store.state.product.floorList">
            <div class="py-container">
                <div class="title clearfix">
                    <h3 class="fl">{{floorInfo.name}}</h3>
                    <div class="fr">
                        <ul class="nav-tabs clearfix">
                            <li :class="{active:index===0}" v-for="(item,index) in floorInfo.navList">
                                <a :href="item.url" data-toggle="tab">{{item.text}}</a>
                            </li>
                        </ul>
                    </div>
                </div>
                <div class="tab-content">
                    <div class="tab-pane">
                        <div class="floor-1">
                            <div class="blockgary">
                                <ul class="jd-list">
                                    <li v-for="(item,index) in floorInfo.keywords" :key="index">{{item}}</li>
                                </ul>
                                <img :src="floorInfo.imgUrl" />
                            </div>
                            <div class="floorBanner">
                                <swiper class="swiper" :options="swiperOption">
                                    <swiper-slide v-for="item in floorInfo.carouselList" :key="item.id">
                                        <img :src="item.imgUrl" />
                                    </swiper-slide>
                                    <div class="swiper-button-prev" slot="button-prev"></div>
                                    <div class="swiper-button-next" slot="button-next"></div>
                                </swiper>


                            </div>
                            <div class="split">
                                <span class="floor-x-line"></span>
                                <div class="floor-conver-pit">
                                    <img :src="floorInfo.recommendList[0]" />
                                </div>
                                <div class="floor-conver-pit">
                                    <img :src="floorInfo.recommendList[1]" />
                                </div>
                            </div>
                            <div class="split center">
                                <img :src="floorInfo.bigImg" />
                            </div>
                            <div class="split">
                                <span class="floor-x-line"></span>
                                <div class="floor-conver-pit">
                                    <img :src="floorInfo.recommendList[2]" />
                                </div>
                                <div class="floor-conver-pit">
                                    <img :src="floorInfo.recommendList[3]" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    </div>

</template>

<script>
import { Swiper, SwiperSlide } from 'vue-awesome-swiper'
import 'swiper/css/swiper.css'
export default {
    name: "Floor",
    props:["floorInfo"],
    components: {
        // 将vue-awesome-swiper提供的组件注册为当前组件
        Swiper,
        SwiperSlide
    },
    data() {
        return {
            // 配置项
            swiperOption: {
                // 显示多少屏
                slidesPerView: 1,
                // 屏之间的间隔
                spaceBetween: 1,
                // 是否循环
                loop: true,
                pagination: {
                    // 分页
                    el: '.swiper-pagination',
                    // 点击小圆点是否进行切换
                    clickable: true
                },
                autoplay: {
                    // 切换的间隔时间为3秒
                    delay: 3000,
                    // 如果设置为true，当切换到最后一个slide时停止自动切换
                    stopOnLastSlide: false,
                    // 用户操作swiper之后，是否禁止autoplay。默认为true：停止。
                    // 如果设置为false，用户操作swiper之后自动切换不会停止，每次都会重新启动autoplay。
                    // 操作包括触碰(touch)，拖动，点击pagination等。
                    disableOnInteraction: true,
                },
                navigation: {
                    nextEl: '.swiper-button-next',
                    prevEl: '.swiper-button-prev'
                }
            }
        }
    },
    mounted(){
        this.$store.dispatch("product/getFloorListAsync");
    }
}
</script>

<style lang="less" scoped>
.floor {
    margin-top: 15px;

    .py-container {
        width: 1200px;
        margin: 0 auto;

        .title {
            .fl {
                float: left;
                color: #c81623;
                font-size: 20px;
                line-height: 30px;
                margin: 9px 0;
                font-weight: 700;
            }

            .fr {
                float: right;

                .nav-tabs {
                    margin: 10px 0 0;
                    display: inline-block;

                    li {
                        float: left;
                        line-height: 18px;

                        a {
                            padding-top: 1px;
                            font-weight: 400;
                            background-color: #fff;

                            &::after {
                                content: "|";
                                padding: 0 10px;
                            }
                        }

                        &:nth-child(7) {
                            a {
                                &::after {
                                    content: "";
                                }
                            }
                        }

                        &.active {
                            a {
                                color: #e1251b;
                            }
                        }
                    }
                }
            }
        }

        .tab-content {
            border-top: 2px solid #c81623;
            border-bottom: 1px solid #e4e4e4;

            .tab-pane {
                .floor-1 {
                    height: 360px;
                    display: flex;

                    .blockgary {
                        width: 210px;
                        height: 100%;
                        background: #f7f7f7;

                        .jd-list {
                            padding: 15px 0;
                            overflow: hidden;

                            li {
                                list-style-type: none;
                                float: left;
                                width: 40%;
                                margin: 0 10px;
                                border-bottom: 1px solid #e4e4e4;
                                text-align: center;
                                line-height: 26px;
                            }
                        }

                        img {
                            width: 100%;
                            height:243px;
                        }
                    }

                    .floorBanner {
                        width: 330px;
                        height: 100%;
                        img{
                            width:100%;
                            height:360px;
                        }
                    }

                    .split {
                        width: 220px;
                        height: 100%;
                        position: relative;

                        .floor-x-line {
                            position: absolute;
                            background: #e4e4e4;
                            width: 220px;
                            height: 1px;
                            top: 180px;
                        }

                        .floor-conver-pit {
                            width: 100%;
                            height: 50%;

                            img {
                                width: 100%;
                                height: 100%;
                                transition: all 400ms;

                                &:hover {
                                    opacity: 0.8;
                                }
                            }
                        }
                    }

                    .center {
                        border: 1px solid #e4e4e4;
                    }
                }
            }
        }
    }
}
</style>