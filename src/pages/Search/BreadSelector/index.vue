<template>
      <div class="bread" v-show="isSelector">
                <ul class="fl sui-breadcrumb">
                    <li>
                        <a href="#">全部结果</a>
                    </li>
                </ul>
                <ul class="fl sui-tag">
                    <!--  渲染类别名称 -->
                    <li v-if="$route.query.categoryName" class="with-x">
                        {{$route.query.categoryName}}<i @click="moveCategoryName">×</i>
                    </li>
                    <!--  关键词内容 -->
                    <li v-if="$route.query.keyword" class="with-x">
                        {{$route.query.keyword}}<i @click="moveKeyword">×</i>
                    </li>
                    <!-- 品牌 -->
                    <li v-if="$route.query.trademark" class="with-x">
                        {{$route.query.trademark.split(":")[1]}}
                        <i @click="moveTrademark">x</i>
                    </li>
                      <!-- 属性 -->
                    <li v-for="item in $route.query.props" class="with-x">
                        {{item.split(":")[1]}}
                        <i @click="moveProps(item)">x</i>
                    </li>
                </ul>
            </div>
</template>

<script>
export default {
    name:"BreadSelector",
    data(){
        // 转化为数组
        // const [type,flag] =(this.$route.query.order ||"1:desc").split(":");

        // return{
        //     // 排序方式
        //     // 排序类型（type） 1:综合 2.价格
        //     // 排序标识： asc:升序  dsec:降序
        //     // 示例：“1：desc”
        //     type,
        //     flag
        // }
    },
    methods:{

        // orderSearch(type){
        //     // 当前排序类别与选中的类别是否相同,如果
        //     if(this.type ===type){
        //         this.flag =this.flag ==="desc"?"asc":"desc";

        //     }else{
        //         this.type =type;
        //         this.flag ="desc";

        //     }
        //     this.$router.push({
        //         path:"/search",
        //         query:{
        //             ...this.$route.query,
        //             order:this.type+":"+this.flag
        //         }
        //     })

        // },

        // 移除属性
        moveProps(prop){
            this.$route.push({
                path:"/search",
                query:{
                    ...this.$route.query,
                    props:this.$route.query.props.filter(v=>v !== prop)
                }
            })
        },



        // 移除类别标签
        moveCategoryName(){
            // 1- category3Id=249&categoryName=台灯
            // const query = {...this.$route.query};
            // delete query.categoryName;
            // delete query.category3Id;
            // delete query.category2Id;
            // delete query.category1Id;
            // // console.log(this.$route.query)
            // this.$router.push({
            //     path:"/search",
            //     query
            // })

            // 2
            const {keyword} = this.$route.query;
            this.$router.push({
                path:"/search",
                query:{
                    keyword
                }
            })
        },
        moveKeyword(){
            // 1
            // this.$router.push({
            //     path:"/search",
            //     query:{
            //         keyword:undefined
            //     }
            // })

            // 2
            const query = {...this.$route.query};
            delete query.keyword;
            this.$router.push({
                path:"/search",
                query
            });
            this.$bus.$emit("clearKeyword");
        },
        moveTrademark(){
            const query = {...this.$route.query}
            delete query.trademark;
            this.$router.push({
                path:"/search",
                query
            })
        }
    },
   
    watch:{
        "$route.query":{
            handler(query){
                this.$store.dispatch("product/postProductListAsync",query)
            },
            immediate:true
        }
    },
    // beforeDestroy() {
    //     this.$bus.$emit("clearKeyword");
    // },
    computed:{
        //   upOrDown(){
        //     return this.flag ==="desc"?"iconfont icon-icon_down":"iconfont icon-icon_up"
        // },

        isSelector(){
            return
            Object.values(this.$route.query).filter(v=>v).length>0
        }
    }

}
</script>

<style lang="less" scoped>
      .bread{
            margin-bottom: 5px;
            overflow: hidden;
            .sui-breadcrumb{
                padding: 3px 15px;
                margin: 0;
                font-weight: 400;
                border-radius: 3px;
                float:left;
                li{
                    display: inline-block;
                    line-height: 18px;
                    a{
                        color: #666;
                        text-decoration: none;
                        &:hover{
                            color: #4cb9fc;
                        }
                    }
                }
            }
            .sui-tag{
                margin-top: -5px;
                list-style: none;
                font-size: 0;
                line-height: 0;
                padding: 5px 0 0;
                margin-bottom: 18px;
                float: left;
                .with-x{
                    font-size: 12px;
                    margin: 0 5px 5px 0;
                    display: inline-block;
                    overflow: hidden;
                    color: #000;
                    background: #f7f7f7;
                    padding: 0 7px;
                    height: 20px;
                    line-height: 20px;
                    border: 1px solid #dedede;
                    white-space: nowrap;
                    transition:color 400ms;
                    cursor: pointer;
                    i{
                        margin-left: 10px;
                        cursor: pointer;
                        font: 400 14px tahoma;
                        display: inline-block;
                        height: 100%;
                        vertical-align: middle;
                    }
                    &:hover{
                        color: #28a3ef;
                    }
                }
            }
        }


</style>