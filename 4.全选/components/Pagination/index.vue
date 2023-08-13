<template>
    <div class="pagination">
        <button  @click="$emit('change-page-no',pageNo-1)" :disabled="pageNo===1">上一页</button>
        <!-- 起始页数start大于1 -->
        <button  @click="$emit('change-page-no',1)" v-show="startAndEnd.start>1">1</button>
        <span v-show="startAndEnd.start>2">···</span>

        <button @click="$emit('change-page-no',startAndEnd.start + index)" :class="{active:(pageNo===startAndEnd.start+index)}"
                v-for="(_,index) in (startAndEnd.end - startAndEnd.start+1)">
            {{ startAndEnd.start + index }}
        </button>

        <span v-show="pageSum>startAndEnd.end+1">···</span>
        <button @click="$emit('change-page-no',pageSum)" v-show="pageSum>startAndEnd.end">{{ pageSum }}</button>
        <button @click="$emit('change-page-no',pageNo+1)" :disabled="pageNo===pageSum">下一页</button>

        <span>共 {{ total }} 条</span>
    </div>
</template>

<script>
export default {
    props: ["total", "pageSize", "continue", "pageNo"],
    name: "index",
    computed: {
        pageSum() {
            return Math.ceil(this.total / this.pageSize)
        },
        // 计算起始与结束位置
        startAndEnd() {
            let start = 0;
            let end = 0;
            // 如果连续页数大于总页数
            if (this.continue > this.pageSum) {
                start = 1;
                end = this.pageSum;
            } else {
                // pageNo = 16,start==>14 end=18
                start = this.pageNo - (this.continue - 1) / 2;
                end = this.pageNo + (this.continue - 1) / 2
                if (start < 1) {
                    start = 1;
                    end = start + this.continue - 1;
                }
                if(end>this.pageSum){
                    end = this.pageSum;
                    start = this.pageSum-this.continue+1;
                }
            }

            return {start, end}
        }
    }
}
</script>

<style lang="less" scoped>
.pagination {
    text-align: center;

    button {
        margin: 0 5px;
        background-color: #f4f4f5;
        color: gray;
        outline: none;
        border-radius: 2px;
        padding: 0 4px;
        vertical-align: top;
        display: inline-block;
        font-size: 13px;
        min-width: 35.5px;
        height: 28px;
        line-height: 28px;
        cursor: pointer;
        box-sizing: border-box;
        text-align: center;
        border: 0;

        &[disabled] {
            color: #c0c4cc;
            cursor: not-allowed;
        }

        &.active {
            cursor: not-allowed;
            background-color: #c81623;
            color: #fff;
        }
    }

    span {
        display: inline-block;
        line-height: 28px;
        font-size: 14px;
        color: gray;
        vertical-align: middle;
    }
}
</style>