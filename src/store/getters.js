export default {
  isAllChecked(state) {
    let isChecked = true;
    state.shopCarData.forEach((item) => {
      if (!item.data.checked) {
        isChecked = false;
      }
    });
    return isChecked;
  },

  allGoodsNumber(state) {
    let number = 0;
    state.shopCarData.forEach((item) => {
      number += item.number;
    });
    return number;
  },

  isChoseGoods(state) {
    let number = 0;
    state.shopCarData.forEach((item) => {
      if (item.data.checked) {
        number += item.number;
      }
    });
    return number;
  },

  priceTotal(state) {
    let priceTotal = 0;
    state.shopCarData.forEach((item) => {
      if (item.data.checked) {
        priceTotal += item.number * item.data.goodsPrice;
      }
    });
    return priceTotal;
  }
};
