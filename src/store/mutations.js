import Vue from "vue";

export default {
  shopCarData(state, goodsDetailData) {
    let haveData = false;
    state.shopCarData.forEach((item) => {
      if (item.data.id == goodsDetailData.data.id) {
        haveData = true;
        item.number += goodsDetailData.number;
      }
    });

    if (!haveData) {
      Vue.set(goodsDetailData.data, "goodsNumber", goodsDetailData.number);
      state.shopCarData.push(goodsDetailData);
    }

    // console.log(state);
    // console.log(goodsDetailData.data);
    // console.log(state.shopCarData[0].number);
    // console.log(goodsDetailData.data.goodsNumber);
  },
  shopCarNumberAdd(state, Goodsid) {
    state.shopCarData.forEach((item) => {
      if (item.data.id == Goodsid) {
        item.number++;
      }
    });
  },
  shopCarNumberSub(state, Goodsid) {
    state.shopCarData.forEach((item) => {
      if (item.data.id == Goodsid && item.number > 1) {
        item.number--;
      }
    });
  }
};
