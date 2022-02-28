import { createStore } from "vuex";
const store = createStore({
  state() {
    return {
      count: 0,
      userInfo:{}
    };
  },
  mutations: {
    increment(state) {
      state.count++;
    },
    updateUserInfo(state,payload){
      state.userInfo = payload
    }
  },
  getters:{
    userInfo:state=>{
      return state.userInfo
    },
    username:state=>{
      return state.userInfo.username
    },
    shopBus:state=>{
      return state.userInfo.shopBus || []
    },
    collection:state=>{
      return state.userInfo.collect || []
    },
    footprint:state=>{
      return state.userInfo.footprint || []
    },
    username:state=>{
      return state.userInfo.username || ''
    },
    receivingAddress:state=>{
      return state.userInfo.receivingAddress || []
    },
    consumerCoupon:state=>{
      return state.userInfo.consumerCoupon || []
    },
    campusBean:state=>{
      return state.userInfo.campusBean || 0
    },
    shopHistory:state=>{
      return state.userInfo.shopHistory || []
    }
  },
  actions: {},
});

export default store;
