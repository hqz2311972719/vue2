<template>
    <div class="type-nav">
        <div class="container">
            <div class="nav-left" @mouseleave="categoryHide">
                <h2 class="all" @mouseenter="isShow=true">全部商品分类</h2>
                <div class="sort" v-show="isShow">
                    <div @click.prevent="goSearch" class="all-sort-list2">
                        <div v-for="c1 in categoryList" :key="c1.categoryId" class="item">
                            <h3>
                                <a data-level="1" :data-id="c1.categoryId" href="">{{ c1.categoryName }}</a>
                            </h3>
                            <div class="item-list clearfix">
                                <div v-for="c2 in c1.categoryChild" :key="c2.categoryId" class="subitem">
                                    <dl class="fore">
                                        <dt>
                                            <a data-level="2" :data-id="c2.categoryId" href="">{{ c2.categoryName }}</a>
                                        </dt>
                                        <dd>
                                            <em v-for="c3 in c2.categoryChild" :key="c3.categoryId">
                                                <a data-level="3" :data-id="c3.categoryId" href="">{{ c3.categoryName }}</a>
                                            </em>
                                        </dd>
                                    </dl>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <nav class="nav">
                <a>服装城</a>
                <a>美妆馆</a>
                <a>尚品汇超市</a>
                <a>全球购</a>
                <a>闪购</a>
                <a>团购</a>
                <a>有趣</a>
                <a>秒杀</a>
            </nav>
        </div>
    </div>
</template>

<script>
import {mapActions,mapState} from "vuex";

export default {
    name: "TypeNav",
    data() {
        return {
            isShow: this.$route.path === "/"
        }
    },
    methods: {
        ...mapActions("product", ["getBaseCategoryListAsync"]),
        categoryHide() {
            if (this.$route.path !== "/") this.isShow = false;
        },
        goSearch(e){
            const {id,level} = e.target.dataset;
            if(id){
                this.$router.push({
                    path:"/search",
                    query:{
                        ["category"+level+"Id"]:id,
                        categoryName:e.target.innerText.trim(),
                    }
                });
                this.isShow = false;
            }

        }
    },
    watch: {
        "$route.path": {
            handler() {
                this.isShow = this.$route.path === "/";
            }
        }
    },
    computed:mapState("product",["categoryList"]),
    mounted() {
        // 非简写：
        // this.$store.dispatch("product/getBaseCategoryListAsync", 15)

        // 简写:
        this.getBaseCategoryListAsync(15);
    }
}
</script>

<style lang="less" scoped>
.type-nav {
    border-bottom: 2px solid #e1251b;

    .container {
        width: 1200px;
        margin: 0 auto;
        display: flex;
        position: relative;

        .all {
            width: 210px;
            height: 45px;
            background-color: #e1251b;
            line-height: 45px;
            text-align: center;
            color: #fff;
            font-size: 14px;
            font-weight: bold;
        }

        .nav {
            a {
                height: 45px;
                margin: 0 22px;
                line-height: 45px;
                font-size: 16px;
                color: #333;
            }
        }

        .sort {
            position: absolute;
            left: 0;
            top: 45px;
            width: 210px;
            height: 461px;
            position: absolute;
            background: #fafafa;
            border-top: 2px solid #e1251b;
            z-index: 999;

            .all-sort-list2 {
                .item {
                    h3 {
                        line-height: 30px;
                        font-size: 14px;
                        font-weight: 400;
                        overflow: hidden;
                        padding: 0 20px;
                        margin: 0;

                        &:hover {
                            background-color: #d9d9d9;
                        }
                    }

                    .item-list {
                        display: none;
                        position: absolute;
                        width: 734px;
                        min-height: 460px;
                        background: #f7f7f7;
                        left: 210px;
                        border: 1px solid #ddd;
                        top: 0;
                        z-index: 9999 !important;

                        .subitem {
                            float: left;
                            width: 650px;
                            padding: 0 4px 0 8px;

                            dl {
                                border-top: 1px solid #eee;
                                padding: 6px 0;
                                overflow: hidden;
                                zoom: 1;

                                &.fore {
                                    border-top: 0;
                                }

                                dt {
                                    float: left;
                                    width: 74px;
                                    line-height: 22px;
                                    text-align: right;
                                    padding: 3px 6px 0 0;
                                    font-weight: 700;
                                }

                                dd {
                                    float: left;
                                    width: 570px;
                                    padding: 2px 0 0;
                                    overflow: hidden;

                                    em {
                                        float: left;
                                        height: 14px;
                                        line-height: 14px;
                                        padding: 0 8px;
                                        margin-top: 5px;
                                        border-left: 1px solid #ccc;
                                    }
                                }
                            }
                        }
                    }

                    &:hover {
                        .item-list {
                            display: block;
                        }
                    }
                }
            }
        }
    }
}
</style>