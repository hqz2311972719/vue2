<template>
    <!-- 项目的最外层 -->
    <div>
        <!--  头部 -->
        <Header></Header>
        <router-view/>
        <!--  底部  -->
        <Footer></Footer>
    </div>
</template>

<script>
import Header from "@/components/Header";
import Footer from "@/components/Footer";
export default {
    name: "App",
    components: {Footer, Header}
}
</script>

<style lang="less" scoped>
</style>