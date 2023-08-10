<template>
    <div class="center">
        <swiper class="swiper" :options="swiperOption">
            <swiper-slide v-for="item in $store.state.adv.focusList" :key="item.id">
                <img :src="item.imgUrl" />
            </swiper-slide>
            <div class="swiper-pagination" slot="pagination"></div>
            <div class="swiper-button-prev" slot="button-prev"></div>
            <div class="swiper-button-next" slot="button-next"></div>
        </swiper>
    </div>
</template>

<script>
import { Swiper, SwiperSlide } from 'vue-awesome-swiper'
import 'swiper/css/swiper.css'
export default {
    name: "FocusAdv",
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
                loop: false,
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
        this.$store.dispatch("adv/getFocusListAsync");
    }
}
</script>

<style lang="less" scoped>
.center {
    box-sizing: border-box;
    width: 740px;
    height: 100%;
    padding: 5px;
    float: left;
    .swiper{
        height:100%;
        img{
            width:100%;
        }
    }
}
</style>