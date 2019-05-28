import Vue from "vue";

export default {
  shopCarData(state, goodsDetailData) {
    Vue.set(goodsDetailData.data, "goodsNumber", goodsDetailData.number);
    state.shopCarData.push(goodsDetailData);
    console.log(state);
    console.log(goodsDetailData.data);
  }
};
