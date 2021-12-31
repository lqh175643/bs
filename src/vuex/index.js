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
  actions: {},
});

export default store;
