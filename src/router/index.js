import Vue from "vue";
import Router from "vue-router";
import index from "@/page/index";
import category from "@/page/category";
import detail from "@/page/detail";
import shopCar from "@/page/shopCar";
import order from "@/page/order";

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/",
      name: "index",
      component: index
    },
    {
      path: "/category",
      name: "category",
      component: category
    },
    {
      path: "/detail/:id",
      name: "detail",
      component: detail
    },
    {
      path: "/shopcar",
      name: "shopcar",
      component: shopCar
    },
    {
      path: "/order",
      name: "order",
      component: order
    }
  ]
});
