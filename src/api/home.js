import instance from "../utils/request";

export function getSwiperData(options){
  return instance(options)
}
export function getCategoryData(url,options){
  return instance({
    url:`/category/${url}`,
    method:'get',
    params:options
  })
}

export function getUserInfo(token){
  return instance({
    url:`/userInfo`,
    method:'get',
    headers:{
      token
    }
  })
}