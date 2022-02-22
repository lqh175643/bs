import instance from "../utils/request";

export function getShopBus(options){
  return instance({
    url:`/userInfo/shopBus`,
    method:'get',
    params:options
  })
}
export function deleteUserInfo(options){
  return instance({
    url:`/userInfo/delete`,
    method:'delete',
    data:options
  })
}

export function deleteUserInfoArr(options){
  return instance({
    url:`/userInfo/deleteArr`,
    method:'delete',
    data:options
  })
}

export function modifyUserInfo(options){
  return instance({
    url:`/userInfo/userinfo`,
    method:'post',
    data:options
  })
}

export function modifyReceivingAddress(options){
  return instance({
    url:`/userInfo/receivingAddress`,
    method:'post',
    data:options
  })
}
