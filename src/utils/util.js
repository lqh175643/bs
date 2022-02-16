import { get_local_storage,delete_local_storage } from '../utils/storage'
import { getUserInfo } from '../api/home'

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

export {
  str_parse,
  holdUserInfo,
  deleteUserInfo
}