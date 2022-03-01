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
    name:'login',
    path: "/login",
    component: () => import("../views/Login.vue"),
    meta: { title:"登录",icon:""}
  },
  {
    name:'register',
    path: "/register",
    component: () => import("../views/Register.vue"),
    meta: { title:"注册",icon:""}
  },
  {
    name:'userHome',
    path: "/userHome",
    component: () => import("../views/UserHome/index.vue"),
    meta: { title:"用户主页",icon:""},
    redirect: "/userHome/order",
    children:[
      {
        name:'order',
        path:'/userHome/order',
        component:()=>import("../views/UserHome/Order.vue"),
        meta: { title:"我的订单",icon:"" }
      },
      {
        name:'receiveorder',
        path:'/userHome/receiveorder',
        component:()=>import("../views/UserHome/ReceiveOrder.vue"),
        meta: { title:"待收货",icon:"" }
      },
      {
        name:'commitorder',
        path:'/userHome/commitorder',
        component:()=>import("../views/UserHome/CommitOrder.vue"),
        meta: { title:"待评价",icon:"" }
      },
      {
        name:'shopBus',
        path:'/userHome/shopbus',
        component:()=>import("../views/UserHome/ShopBus.vue"),
        meta: { title:"购物车",icon:"" }
      },
      {
        name:'collection',
        path:'/userHome/collection',
        component:()=>import("../views/UserHome/Collection.vue"),
        meta: { title:"收藏",icon:"" }
      },
      {
        name:'footprint',
        path:'/userHome/footprint',
        component:()=>import("../views/UserHome/FootPrint.vue"),
        meta: { title:"足迹",icon:"" }
      },
      {
        name:'userinfo',
        path:'/userHome/userinfo',
        component:()=>import("../views/UserHome/UserInfo.vue"),
        meta: { title:"个人信息",icon:"" }
      },
      {
        name:'receivingaddress',
        path:'/userHome/receivingaddress',
        component:()=>import("../views/UserHome/ReceivingAddress.vue"),
        meta: { title:"收货地址",icon:"" }
      },
    ]
  },
];
