<template>
    <div>
        <Header></Header>
        <div v-if="shopcarData.length>0" class="shopcart-wrapper">
            <table class="shopcart-header">
                <tr>
                    <td class="cart-select">
                        <input
                            style="cursor: pointer"
                            @click="choseAll"
                            :checked="isAllChecked"
                            type="checkbox"
                            class="cart-checkbox"
                        />
                        <span>全选</span>
                    </td>
                    <td class="cart-name">商品</td>
                    <td class="cart-price">单价(元)</td>
                    <td class="cart-num">数量</td>
                    <td class="cart-total">小计</td>
                    <td class="cart-operate">操作</td>
                </tr>
            </table>
            <div class="shopcart-list">
                <table>
                    <tr v-for="(item,index) in shopcarData" :key="index" class="cart-product">
                        <td class="cart-select">
                            <input
                                style="cursor: pointer"
                                :checked="item.data.checked"
                                type="checkbox"
                                class="cart-checkbox"
                                @click="choseGoods(item.data.id)"
                            />
                            <img class="cart-img" :src="item.data.imageUrl" alt />
                        </td>
                        <td class="cart-name">
                            <span class="cart-title">{{item.data.goodsName}}</span>
                            <span class="cart-desc">{{item.data.goodsDesc}}</span>
                        </td>
                        <td class="cart-price">￥{{item.data.goodsPrice}}</td>
                        <td class="cart-num">
                            <div class="cart-input clearfix">
                                <button
                                    class="fl"
                                    @click="subNumber(item.data.id)"
                                    style="cursor: pointer"
                                >-</button>
                                <input class="fl" v-model="item.number" type="number" />
                                <button
                                    class="fl"
                                    @click="addNumber(item.data.id)"
                                    style="cursor: pointer"
                                >+</button>
                            </div>
                        </td>
                        <td class="cart-total">￥{{item.data.goodsPrice*item.number}}</td>
                        <td class="cart-operate">
                            <i
                                @click="deleteGoods(index)"
                                style="cursor: pointer"
                                class="icon-font icon-close"
                            ></i>
                        </td>
                    </tr>
                </table>
            </div>
            <div class="claerfix shopcart-footer">
                <div class="fl">
                    <input
                        style="cursor: pointer"
                        @click="choseAll"
                        :checked="isAllChecked"
                        type="checkbox"
                        class="cart-checkbox"
                    />
                    <span>全选</span>
                    <span class="footer-remove">删除选中的商品</span>
                    <span>
                        共
                        <span class="footer-number gray">{{allGoodsNumber}}</span>件商品，已选
                        <span class="footer-number blue">{{isChoseGoods}}</span>件商品
                    </span>
                </div>
                <div class="fr">
                    <span>
                        已优惠
                        <span class="footer-number red">0.00</span>元，合计(不含运费)：
                        <span class="footer-number red footer-total">￥{{priceTotal}}</span>
                        <a class="btn success" :class="{'cancel':isChoseGoods<=0}" @click="goToOrder">去结算</a>
                    </span>
                </div>
            </div>
        </div>
        <div v-else class="shopcart-empty">
            <div class="empty-content">
                <div class="empty-left"></div>
                <div class="empty-right">
                    <p class="empty-desc">购物车内还没有商品，赶紧去选购吧~</p>
                    <a class="btn success" @click="goToIndex">返回商城首页</a>
                </div>
            </div>
        </div>

        <DelShopCarBox :index="Goddsindex" @closeWindowBox="recive" v-show="WindowBoxShow"></DelShopCarBox>
        <Footer></Footer>
    </div>
</template>
<script>
import Header from "@/components/Header.vue";
import Footer from "@/components/Footer";
import DelShopCarBox from "@/components/DelShopCarBox";
import { mapMutations, mapGetters } from "vuex";

export default {
    data() {
        return {
            WindowBoxShow: false,
            Goddsindex: ""
        };
    },
    components: {
        Header,
        Footer,
        DelShopCarBox
    },
    methods: {
        goToIndex() {
            this.$router.push({
                name: "index"
            });
        },
        ...mapMutations([
            "shopCarNumberAdd",
            "shopCarNumberSub",
            "checkedGoods",
            "choseAllGoods",
            "delGoods"
        ]),
        // addNumber(id) {
        //     this.$store.commit('shopCarNumberAdd',id)
        // },
        // subNumber(id) {
        //     this.$store.commit('shopCarNumberSub',id)
        // }
        addNumber(id) {
            this.shopCarNumberAdd(id);
        },
        subNumber(id) {
            this.shopCarNumberSub(id);
        },
        choseGoods(id) {
            this.checkedGoods(id);
        },
        choseAll() {
            this.choseAllGoods(this.isAllChecked);
        },
        deleteGoods(index) {
            this.WindowBoxShow = true;
            this.Goddsindex = index;
            // if (this.del) {
            //     this.delGoods(index);
            // }

            // this.delGoods(index);
        },
        recive(data) {
            if (!data) {
                this.WindowBoxShow = false;
            }
            // console.log(data);
        },
        goToOrder(){
            this.$router.push({
                name:'order'
            })
        }
    },
    computed: {
        shopcarData() {
            return this.$store.state.shopCarData;
        },
        ...mapGetters([
            "isAllChecked",
            "isChoseGoods",
            "priceTotal",
            "allGoodsNumber"
        ])
        // isAllChecked(){
        //     return this.$store.getters.isAllChecked
        // }
    }
};
</script>
<style lang="less" scoped>
.shopcart-wrapper {
    width: 1240px;
    margin: 10px auto;

    .shopcart-header {
        height: 50px;
        background-color: #ffffff;
        border-bottom: 1px solid #efefef;
        color: #333;
    }

    .cart-select {
        padding-left: 45px;
        text-align: center;
        width: 220px;

        .cart-checkbox {
            width: 18px;
            height: 18px;
            border-color: #bdbdbd;
            background-color: #ffffff;
            border-radius: 2px;
            font-size: 10px;
            vertical-align: middle;
        }

        .cart-img {
            width: 100px;
            height: 100px;
            margin-left: 35px;
            vertical-align: middle;
        }
    }

    .cart-name {
        width: 270px;
        text-align: left;

        .cart-title {
            display: inline-block;
            width: 100%;
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
        }

        .cart-desc {
            color: #999;
        }
    }

    .cart-price {
        width: 220px;
        text-align: center;
    }

    .cart-num {
        width: 200px;
        text-align: center;
    }

    .cart-total {
        width: 160px;
        text-align: center;
    }

    .cart-operate {
        width: 170px;
        text-align: right;
        padding-right: 40px;
    }

    .shopcart-list {
        background-color: #ffffff;
        margin-bottom: 10px;
    }

    .cart-product {
        height: 150px;
        border-top: 1px solid #efefef;

        &:last-child {
            border-bottom: 1px solid #efefef;
        }
    }

    .cart-input {
        width: 140px;
        height: 38px;
        border: 1px solid #efefef;
        border-radius: 4px;
        margin: 0 auto;

        button {
            width: 38px;
            height: 38px;
            text-align: center;
            background: transparent;
            border: none;
            font-size: 20px;
        }

        input {
            width: 58px;
            height: 36px;
            text-align: center;
            border: none;
            border-left: 1px solid #efefef;
            border-right: 1px solid #efefef;
        }
    }

    .shopcart-footer {
        height: 70px;
        line-height: 70px;
        background-color: #ffffff;
        padding: 0 45px;
        color: #666;
    }

    .footer-remove {
        color: #999;
        margin: 0 30px 0 20px;
    }

    .footer-number {
        margin: 0 5px;
        font-weight: bold;
    }

    .gray {
        color: #333;
    }

    .blue {
        color: #00c3f5;
    }

    .red {
        color: #e02b41;
    }

    .footer-totle {
        font-size: 20px;
        margin-right: 35px;
    }
}

.shopcart-empty {
    width: 1240px;
    height: 360px;
    margin: 10px auto;
    background: #ffffff;
    display: table;

    .empty-content {
        display: table-cell;
        text-align: center;
        vertical-align: middle;
    }

    .empty-left {
        display: inline-block;
        width: 100px;
        height: 114px;
        background: url("../assets/images/shopcart.png") no-repeat;
        margin-right: 30px;
        vertical-align: middle;
    }

    .empty-right {
        display: inline-block;
        vertical-align: middle;
        text-align: left;
    }

    .empty-desc {
        color: #666;
        font-size: 18px;
        font-weight: bold;
        margin-bottom: 15px;
    }
}
</style>
