import { get_local_storage,delete_local_storage } from '../utils/storage'
import { getUserInfo } from '../api/home'
import { addrMap } from './constant'

function str_parse(data){
  let result
  try {
    result = JSON.parse(data)
  } catch (error) {
    
  }
  return result
}

async function holdUserInfo(store){
  const token = get_local_storage('token')
  if (token) {
    await getUserInfo().then(res => {
      store.commit('updateUserInfo',res.data)
    }, err => {
      console.log(err)
    })
  }
}

function deleteUserInfo(store){
  delete_local_storage('token')
  store.state.userInfo = {}
}

function _addrMap(val){
  if(val.length){
    return addrMap[val[0]][0]+'/'+val[1]+addrMap[val[0]][1]
  }
  return ''
}

function formatDate(val) {
  if(!val) return
  const date = new Date(val);
  const YY = date.getFullYear() + '-';
  const MM = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
  const DD = (date.getDate() < 10 ? '0' + (date.getDate()) : date.getDate());
  const hh = (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) + ':';
  const mm = (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()) + ':';
  const ss = (date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds());
  return YY + MM + DD +" "+hh + mm + ss;
}

function hideName(val){
  val = val+''
  const len = val.length
  if(!len) return
  return val.slice(0,3)+'*****'+val.slice(-3)
}

function isVip(time){
  return (time-Date.now())>0
}

export {
  str_parse,
  holdUserInfo,
  deleteUserInfo,
  _addrMap,
  formatDate,
  hideName,
  isVip
}