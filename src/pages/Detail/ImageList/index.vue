<template>
    <div class="specScroll">
        <!--左按钮-->
        <a class="prev">&lt;</a>
        <!-- 中间可滑动区域 -->
        <swiper class="swiper" :options="swiperOption">
            <swiper-slide :key="item.id" v-for="item in $store.state.product.productInfo.skuInfo.skuImageList">
                <img  @click="changeImg(item.id)"  :class="{active:item.isDefault/1===1}" :src="item.imgUrl" />
            </swiper-slide>
        </swiper>
        <!--右按钮-->
        <a class="next">&gt;</a>
    </div>
</template>

<script>
import { Swiper, SwiperSlide } from 'vue-awesome-swiper'
import 'swiper/css/swiper.css'
export default {
    name: "ImageList",
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
                slidesPerView: 5,
                // 屏之间的间隔
                spaceBetween: 10,
                navigation: {
                    nextEl: '.next',
                    prevEl: '.prev'
                }
            }
        }
    },
    methods:{
        changeImg(id){
            this.$store.commit("product/CAHNGE_IMAGE_LIST_BY_ID",id);
        }
    }
}
</script>

<style lang="less" scoped>
.specScroll {
    margin-top: 5px;
    width: 400px;
    overflow: hidden;
    display: flex;
    .prev, .next {
        text-align: center;
        width: 10px;
        height: 54px;
        line-height: 54px;
        border: 1px solid #CCC;
        background: #EBEBEB;
        cursor: pointer;
    }
    .swiper{
        width:100%;
        margin:0 10px;
    }
    img {
        text-align: center;
        border: 1px solid #CCC;
        padding: 2px 6px;
        width: 50px;
        height: 50px;
        margin-right: 20px;
        &.active{
            border-color:red;
        }
    }
}
</style>