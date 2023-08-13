<template>
    <div class="preview">
        <vue-photo-zoom-pro
                :out-zoomer="true"
                :width="200"
                :height="200"
                :high-url="imgUrl">
            <img :src="imgUrl" />
        </vue-photo-zoom-pro>
    </div>
</template>

<script>
import VuePhotoZoomPro from 'vue-photo-zoom-pro'
import 'vue-photo-zoom-pro/dist/style/vue-photo-zoom-pro.css'
export default {
    name: "Zoom",
    components: {
        VuePhotoZoomPro,
    },
    computed:{
        imgUrl(){
            const info = this.$store.state.product.productInfo.skuInfo.skuImageList.find(v=>v.isDefault==="1");
            if(info) return info.imgUrl;
        }
    }
}
</script>

<style lang="less">
.preview {
    position: relative;
    width: 400px;
    height: 400px;
    border: 1px solid #DFDFDF;
    img{
        width:100%;
        height:100%;
    }
    .zoomer{
        z-index: 999;
        top:0!important;
        left:10px!important;
    }
    .selector{
        background-color: rgba(255,0,0,0.3);
    }
}
</style>