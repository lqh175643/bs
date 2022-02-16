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
