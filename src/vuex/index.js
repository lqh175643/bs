import { createStore } from "vuex";
const store = createStore({
  state() {
    return {
      count: 0,
      userInfo: {},
      clientHeight: document.documentElement.clientHeight
    };
  },
  mutations: {
    increment(state) {
      state.count++;
    },
    updateUserInfo(state, payload) {
      state.userInfo = payload
    },
    updateClientHeight(state){
      state.clientHeight = document.documentElement.clientHeight
    }
  },
  getters: {
    userInfo: state => {
      return state.userInfo
    },
    userId: state => {
      return state.userInfo.id
    },
    username: state => {
      return state.userInfo.username
    },
    shopBus: state => {
      return state.userInfo.shopBus || []
    },
    collection: state => {
      return state.userInfo.collect || []
    },
    footprint: state => {
      return state.userInfo.footprint || []
    },
    username: state => {
      return state.userInfo.username || ''
    },
    receivingAddress: state => {
      return state.userInfo.receivingAddress || []
    },
    consumerCoupon: state => {
      return state.userInfo.consumerCoupon || []
    },
    campusBean: state => {
      return state.userInfo.campusBean || 0
    },
    shopHistory: state => {
      return state.userInfo.shopHistory || []
    },
    clientHeight: state => {
      return state.clientHeight || 0
    },
    vip: state => {
      return state.userInfo.vip || {}
    },
    isAdministrator: state => {
      return state.userInfo.isAdministrator || false
    },
  },
  actions: {},
});

export default store;
