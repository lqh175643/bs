export const routes = [
  {
    path: "/",
    component: () => import("../views/Home.vue"),
    redirect: "/home",
    meta: { title: "主页", icon: "" },
  },
  {
    name: "Home",
    path: "/home",
    redirect: "/home/homepage",
    component: () => import("../layout/homeLayout.vue"),
    meta: { title: "主页", icon: "" },
    children: [
      {
        name: "homepage",
        path: "/home/homepage",
        component: () => import("../views/Home.vue"),
        meta: { title: "主页", icon: "" },
      },
      {
        name: "Category",
        path: "/category/:url",
        component: () => import("../views/Category.vue"),
        meta: { title: "分类", icon: "" },
      },
      {
        name: "Detail",
        path: "/detail/:category/:id",
        component: () => import("../views/Detail.vue"),
        meta: { title: "详情", icon: "" },
      },
    ],
  },
  {
    path: "/login",
    component: () => import("../views/Login.vue"),
    meta: { title:"登录",icon:""}
  },
  {
    path: "/register",
    component: () => import("../views/Register.vue"),
    meta: { title:"注册",icon:""}
  },
  {
    path: "/userHome",
    component: () => import("../views/UserHome/index.vue"),
    meta: { title:"用户主页",icon:""},
    redirect: "/userHome/order",
    children:[
      {
        path:'/userHome/order',
        component:()=>import("../views/UserHome/Order.vue"),
        meta: { title:"我的订单",icon:"" }
      },
      {
        path:'/userHome/shopbus',
        component:()=>import("../views/UserHome/ShopBus.vue"),
        meta: { title:"购物车",icon:"" }
      },
    ]
  },
];
