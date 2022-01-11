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
    }
  },
  actions: {},
});

export default store;
