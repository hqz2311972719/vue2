<template>
    <div class="like">
        <div class="py-container">
            <div class="title">
                <h3 class="fl">猜你喜欢</h3>
                <a href="javascript:;" @click="changeActiveIndex" class="fr tip changeBnt">换一换</a>
            </div>
            <div class="bd">
                <ul v-show="activeIndex===index" v-for="(item,index) in likeList" :key="index" class="favourate">
                    <li v-for="info in item" :key="info.id">
                        <img :src="info.imgUrl" alt="" />
                        <div class="like-text">
                            <p>{{info.title}}</p>
                            <h3>{{info.price | currency(2,"￥")}}</h3>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
import axios from "axios";
export default {
    name: "Like",
    data(){
        return {
            likeList:[],
            activeIndex:0
        }
    },
    methods:{
        changeActiveIndex(){
            this.activeIndex++;
            if(this.activeIndex>this.likeList.length-1) this.activeIndex=0;
        }
    },
    mounted(){
        axios.get("http://mock.com/product/likeList").then(value=>{
            // console.log(value.data.data);
            this.likeList = value.data.data;
        })
    }
}
</script>

<style lang="less" scoped>
.like {
    margin-top: 15px;

    .py-container {
        width: 1200px;
        margin: 0 auto;

        .title {
            overflow: hidden;

            .fl {
                float: left;
                font-size: 20px;
                line-height: 30px;
            }

            .fr {
                float: right;
                background-image: url(../../../assets/images/home/icons.png);
                width: 66px;
                height: 25px;
                background-position: 182px -104px;
                line-height: 30px;
                font-size: 12px;
                font-weight: 400;
                color: #666;
                text-decoration: none;
            }
        }

        .bd {
            .favourate {
                border: 1px solid #e4e4e4;
                overflow: hidden;
                padding: 0 10px;
                box-sizing: border-box;
                display: flex;

                li {
                    height: 250px;
                    margin: 0 -1px;
                    overflow: hidden;
                    background: #fff;
                    position: relative;
                    width: 16.667%;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    cursor: pointer;

                    img {
                        width: 142px;
                        height: 142px;
                        transition: all 400ms;

                        &:hover {
                            opacity: 0.8;
                            transform: scale(1.1)
                        }
                    }

                    .like-text {
                        padding: 0;
                        width: 142px;
                        border-right: 1px solid #e4e4e4;

                        p {
                            margin: 5px 0;
                        }

                        h3 {
                            color: #df3033;
                            font-size: 20px;
                            line-height: 30px;
                            margin: 9px 0;
                            font-weight: 700;
                        }
                    }
                }
            }
        }
    }
}
</style>