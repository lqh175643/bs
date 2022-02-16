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
    username:state=>{
      return state.userInfo.username
    },
    shopBus:state=>{
      return state.userInfo.shopBus
    },
    collection:state=>{
      return state.userInfo.collect
    },
    footprint:state=>{
      return state.userInfo.footprint
    },
  },
  actions: {},
});

export default store;
