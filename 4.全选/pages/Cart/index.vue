<template>
  <div>
    <!-- 购物车列表 -->
    <!-- v-if="cartList.length > 0" -->
    <div v-if="$store.state.cart.cartList.length>0"  class="cart">
      <h4>全部商品</h4>
      <div class="cart-main">
        <div class="cart-th">
          <div class="cart-th1">全部</div>
          <div class="cart-th2">商品</div>
          <div class="cart-th4">单价</div>
          <div class="cart-th4">数量</div>
          <div class="cart-th5">小计（元）</div>
          <div class="cart-th6">操作</div>
        </div>
        <div class="cart-body">
          <ul
            v-for="item in $store.state.cart.cartList" 
            :key="item.id"
            class="cart-list"
          >
            <li class="cart-list-con1">
              <input
                @change="
                  $store.dispatch('cart/getCartIsCheckedByIdAsync', {
                    skuID: item.skuId,
                    isChecked: item.isChecked === 1 ? 0 : 1,
                  })
                "
                type="checkbox"
                :checked="item.isChecked === 1"
                name="chk_list"
              />
            </li>
            <li class="cart-list-con2">
              <img :src="item.imgUrl" />
              <div class="item-msg">{{ item.skuName }}</div>
            </li>
            <li class="cart-list-con4">
              <span class="price">{{ item.skuPrice | currency(2, "￥") }}</span>
            </li>
            <li class="cart-list-con5">
              <!-- 减1，用num表示 -->
              <a
                @click="upBuyNum(item.skuId, item.skuNum, -1)"
                href="javascript:void(0)"
                class="mins"
                >-</a
              >

              <!-- 用防抖去实现功能 -->
              <input
                @change="changeBuyNum($event, item.skuName, item.skuId)"
                autocomplete="off"
                type="text"
                value="1"
                minnum="1"
                class="itxt"
              />

              <!-- 减1，用num表示 -->
              <a
                @click="item.skuId, item.skuNum, 1"
                href="javascript:void(0)"
                :class="{ 'plus': true,' disabled': item.skunNum >= 200 }"
                >+</a
              >
            </li>
            <li class="cart-list-con6">
              <span class="sum">{{
                (item.skuNum * item.skuPrice) | currency(2, "￥")
              }}</span>
            </li>
            <li class="cart-list-con7">
              <a @click.prevent="$store.dispatch('cart/deleteCartListByIdAsync',item.skuId)" href="#none" class="sindelet">删除</a>
              <br />
            </li>
          </ul>
        </div>
      </div>
      <div class="cart-tool">
        <div class="select-all">
          <input class="chooseAll" type="checkbox" />
          <span>全选</span>
        </div>
        <div class="option">
          <a @click="$store.dispatch('cart/deleteCartListBatchAsync')" href="#none">删除选中的商品</a>
        </div>
          <div class="money-box">
                <div class="chosed">已选择
                    <span>{{getCountResult.checkedNum}}</span>件商品</div>
                <div class="sumprice">
                    <em>总价（不含运费） ：</em>
                    <i class="summoney">{{getCountResult.checkedPrice | currency(2,"￥")}}</i>
                </div>
                <div class="sumbtn">
                    <a class="sum-btn" href="###" target="_blank">结算</a>
                </div>
            </div>
      </div>
    </div>
    <div v-else  class="empty">
        <h3>购物车空空如也！</h3>
        <img width="300" src="../../assets/images/empty.gif" alt="">
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import {goodsNumReg} from "@/utils/reg";
import {debounce,throttle} from "lodash";

export default {
  name: "Cart",
  computed:mapGetters("cart",["getCountResult","getIsAll"]),
  data(){
    return{
      // 是否锁定
      isLock:false
    }
    
  },
  // mounted(){
  //   this.$store.dispatch("cart/getCartListAsync")
  // },
  methods: {
    // 进行加减操作
    // skuId:操作商品的ID
    // skuNum:当前商品在购物车中的数量
    // num:1 加1 -1减1
    async upBuyNum(skuId, skuNum, num) {
      if (skuNum + num >= 200) return;
      if (skuNum + num < 1) {
        // 小于1，跟进商品ID删除购物车中的商品
        this.$store.dispatch("cart/deleteCartListByIdAsync", skuId);
      } else {
        // 调接口
        await this.$store.dispatch("cart/postAddToCartAsync", {
          skuId,
          skuNum: num,
        });

        await this.$store.dispatch("cart/getCartListAsync");
      }
    },

    inputBuyNum:debounce(async function(e,skuId,skuNum){
            // 修改后的数据.
            const buyNum = e.target.value.trim()/1;
            // skuNum:是修改前的数据
            if(goodsNumReg.test(buyNum)){
                // 调接口
                await this.$store.dispatch("cart/postAddToCartAsync",{
                    skuId,
                    // 更改后减去更改前
                    skuNum:buyNum-skuNum
                })
                await this.$store.dispatch("cart/getCartListAsync")
            }else{
                e.target.value =skuNum;
            }
        },1000),
    async changeBuyNum(e, skuId, skuNum) {
      // 修改后的数据
      const buyNum = e.target.value.trim() / 1;
      // skuNum是修改前的数据
      if (goodsNumReg.test(buyNum)) {
        // 调接口
        await this.$store.dispatch("cart/postAddToCartAsync", {
          skuId,
          // 更改后减去更改前
          skuNum: buyNum - skuNum,
        });
        await this.$store.dispatch("cart/getCartListAsync");
      } else {
        e.target.value = skuNum;
      }
    },
  },

  mounted() {
    this.$store.dispatch("cart/getCartListAsync");
    // console.log('cartList',this.cartList);
    
  },
};
</script>

<style lang="less" scoped>
.cart {
  width: 1200px;
  margin: 0 auto;

  h4 {
    margin: 9px 0;
    font-size: 14px;
    line-height: 21px;
  }

  .cart-main {
    .cart-th {
      background: #f5f5f5;
      border: 1px solid #ddd;
      padding: 10px;
      overflow: hidden;

      & > div {
        float: left;
      }

      .cart-th1 {
        width: 25%;

        input {
          vertical-align: middle;
        }

        span {
          vertical-align: middle;
        }
      }

      .cart-th2 {
        width: 25%;
      }

      .cart-th3,
      .cart-th4,
      .cart-th5,
      .cart-th6 {
        width: 12.5%;
      }
    }

    .cart-body {
      margin: 15px 0;
      border: 1px solid #ddd;

      .cart-list {
        padding: 10px;
        border-bottom: 1px solid #ddd;
        overflow: hidden;

        & > li {
          float: left;
        }

        .cart-list-con1 {
          width: 15%;
        }

        .cart-list-con2 {
          width: 35%;

          img {
            width: 82px;
            height: 82px;
            float: left;
          }

          .item-msg {
            float: left;
            width: 150px;
            margin: 0 10px;
            line-height: 18px;
          }
        }

        .cart-list-con4 {
          width: 10%;
        }

        .cart-list-con5 {
          width: 17%;

          .mins {
            border: 1px solid #ddd;
            border-right: 0;
            float: left;
            color: #666;
            width: 6px;
            text-align: center;
            padding: 8px;
          }

          input {
            border: 1px solid #ddd;
            width: 40px;
            height: 33px;
            float: left;
            text-align: center;
            font-size: 14px;
          }

          .plus {
            border: 1px solid #ddd;
            border-left: 0;
            float: left;
            color: #666;
            width: 6px;
            text-align: center;
            padding: 8px;
          }
        }

        .cart-list-con6 {
          width: 10%;

          .sum {
            font-size: 16px;
          }
        }

        .cart-list-con7 {
          width: 13%;

          a {
            color: #666;
          }
        }
      }
    }
  }

  .cart-tool {
    overflow: hidden;
    border: 1px solid #ddd;

    .select-all {
      padding: 10px;
      overflow: hidden;
      float: left;

      span {
        vertical-align: middle;
      }

      input {
        vertical-align: middle;
      }
    }

    .option {
      padding: 10px;
      overflow: hidden;
      float: left;

      a {
        float: left;
        padding: 0 10px;
        color: #666;
      }
    }

    .money-box {
      float: right;

      .chosed {
        line-height: 26px;
        float: left;
        padding: 0 10px;
      }

      .sumprice {
        width: 200px;
        line-height: 22px;
        float: left;
        padding: 0 10px;

        .summoney {
          color: #c81623;
          font-size: 16px;
        }
      }

      .sumbtn {
        float: right;

        a {
          display: block;
          position: relative;
          width: 96px;
          height: 52px;
          line-height: 52px;
          color: #fff;
          text-align: center;
          font-size: 18px;
          font-family: "Microsoft YaHei";
          background: #e1251b;
          overflow: hidden;
        }
      }
    }
  }
}
</style>