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
export {
  str_parse,
  holdUserInfo,
  deleteUserInfo,
  _addrMap
}