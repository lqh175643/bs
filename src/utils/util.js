import { get_local_storage } from '../utils/storage'
import { getUserInfo } from '../api/home'

function str_parse(data){
  let result
  try {
    result = JSON.parse(data)
  } catch (error) {
    
  }
  return result
}

function holdUserInfo(store){
  const token = get_local_storage('token')
  if (token) {
    getUserInfo(token).then(res => {
      console.log(res)
      store.commit('updateUserInfo',res.data)
    }, err => {
      console.log(err)
    })
  }
}

export {
  str_parse,
  holdUserInfo
}