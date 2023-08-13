<template>
    <div>
        <h3>注册界面</h3>
        <el-row>
            <el-button @click="fn">默认按钮</el-button>
            <el-button type="primary">主要按钮</el-button>
            <el-button type="success">成功按钮</el-button>
            <el-button type="info">信息按钮</el-button>
            <el-button type="warning">警告按钮</el-button>
            <el-button type="danger">危险按钮</el-button>
        </el-row>
    </div>
</template>
<script>
export default {
    name: "Register",
     methods:{
        fn(){
            this.$message.error('这是一条消息提示');
        }
    }
}
</script>

<style scoped>
h3{
    padding:50px;
    background: green;
}
</style>