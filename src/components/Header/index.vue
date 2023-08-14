<template>
    <div>
        <!-- 头部 -->
        <header class="header">
            <!-- 头部的第一行 -->
            <div class="top">
                <div class="container">
                    <div class="loginList">
                        <p v-if="userInfo">
                            <span>尚品汇欢迎{{userInfo.nickName}}!</span>
                            <a @click.prevent="$store.dispatch('user/getLogOutAsync')" href="" class="register">退出登陆</a>

                        </p>
                        <p v-else>
                            <span>请</span>
                            <router-link to="/login">登录</router-link>
                            <router-link to="/register" class="register">免费注册</router-link>
                        </p>
                    </div>
                    <div class="typeList">
                        <a>我的订单</a>
                        <router-link to="/cart">我的购物车</router-link>
                        <a>我的尚品汇</a>
                        <a>尚品汇会员</a>
                        <a>企业采购</a>
                        <a>关注尚品汇</a>
                        <a>合作招商</a>
                        <a>商家后台</a>
                    </div>
                </div>
            </div>
            <!--头部第二行 搜索区域-->
            <div class="bottom">
                <h1 class="logoArea">
                    <router-link to="/" class="logo" title="尚品汇">
                        <img src="./images/logo.png" alt="">
                    </router-link>
                </h1>
                <div class="searchArea">
                    <!-- 1-->
                    <!--                    <form method="get" action="/search" autocomplete="off" class="searchForm">-->
                    <!--                        <input name="keyword" placeholder="请输入搜索的关键词" type="text" ref="keyword" id="autocomplete" class="input-error input-xxlarge" />-->
                    <!--                        <button @click="goSearch" class="sui-btn btn-xlarge btn-danger" type="button">搜索</button>-->
                    <!--                    </form>-->

                    <!-- 2-->
                    <form @submit.prevent="goSearch" autocomplete="off" class="searchForm">
                        <input name="keyword" placeholder="请输入搜索的关键词" type="text" ref="keyword"
                               id="autocomplete" class="input-error input-xxlarge"/>
                        <button class="sui-btn btn-xlarge btn-danger" type="submit">搜索</button>
                    </form>
                </div>
            </div>
        </header>
        <TypeNav v-show="$route.meta.isTypeNav"></TypeNav>
    </div>

</template>

<script>
import TypeNav from "@/components/Header/TypeNav";
import {mapState} from "vuex";
export default {
    name: "Header",
    components: {TypeNav},
    computed:mapState("user",["userInfo"]),
    methods: {
        goSearch() {
            // 收集输入的关键词
            const keyword = this.$refs.keyword.value.trim();
            // 判断关键词是否有值，如果有值跳转至搜索界面，并将关键词进行传递
            if (keyword)
                this.$router.push({
                    path: "/search",
                    query: {
                        ...this.$route.query,
                        keyword
                    }});
        }
    },
    mounted() {
        // 判断查询字符串中是否有keyword,如果有将其值设置为搜索框的内容。
        this.$refs.keyword.value = this.$route.query.keyword || null;
        this.$bus.$on("clearKeyword", () => {
            this.$refs.keyword.value = null;
        })
    }
}
</script>

<style lang="less" scoped>
.header {
    & > .top {
        background-color: #eaeaea;
        height: 30px;
        line-height: 30px;

        .container {
            width: 1200px;
            margin: 0 auto;
            overflow: hidden;

            .loginList {
                float: left;

                p {
                    float: left;
                    margin-right: 10px;

                    .register {
                        border-left: 1px solid #b3aeae;
                        padding: 0 5px;
                        margin-left: 5px;
                    }
                }
            }

            .typeList {
                float: right;

                a {
                    padding: 0 10px;

                    & + a {
                        border-left: 1px solid #b3aeae;
                    }
                }

            }

        }
    }

    & > .bottom {
        width: 1200px;
        margin: 0 auto;
        overflow: hidden;

        .logoArea {
            float: left;

            .logo {
                img {
                    width: 175px;
                    margin: 25px 45px;
                }
            }
        }

        .searchArea {
            float: right;
            margin-top: 35px;

            .searchForm {
                overflow: hidden;

                input {
                    box-sizing: border-box;
                    width: 490px;
                    height: 32px;
                    padding: 0px 4px;
                    border: 2px solid #ea4a36;
                    float: left;

                    &:focus {
                        outline: none;
                    }
                }

                button {
                    height: 32px;
                    width: 68px;
                    background-color: #ea4a36;
                    border: none;
                    color: #fff;
                    float: left;
                    cursor: pointer;

                    &:focus {
                        outline: none;
                    }
                }
            }
        }
    }
}
</style>