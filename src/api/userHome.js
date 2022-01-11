import instance from "../utils/request";

export function getShopBus(options){
  return instance({
    url:`/userInfo/shopBus`,
    method:'get',
    params:options
  })
}